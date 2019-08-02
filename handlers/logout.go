package handlers

import (
	"crypto/rsa"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"restaurant-app/models"
	"restaurant-app/utils"
	"strconv"
	"time"

	"github.com/dgrijalva/jwt-go"
)

const (
	// privateKeyPath = "keys/app.rsa"
	publicKeyPath = "keys/app.rsa.pub"
)

var (
	// signKey *rsa.PrivateKey
	verifyKey *rsa.PublicKey
)

// Logout represents handler for user logout
// CSRF protection with double submit token ( cookie & body )
// Parses, Validates & Verifies AuthToken
// Queries redis DB based on UserID from sub claim in AuthToken received from cookie
// Compares AuthToken from Cookie & AuthToken from redis DB
// Upon passing all above conditions it annihilates hashset with Auth&RefreshToken for a user
// TODO: Check if expired and if so send the response to logout the user
func Logout(w http.ResponseWriter, r *http.Request) {
	utils.SetupCors(&w, r)

	w.Header().Set("Content-Type", "application/json ")

	user := models.User{
		RequestAntiForgeryToken: "",
	}

	data, err := ioutil.ReadAll(r.Body)
	if err != nil {
		log.Println("Readll: " + err.Error())
	}

	err = json.Unmarshal(data, &user)
	if err != nil {
		log.Println(err.Error())
		panic(err)
	}

	// csrfToken := r.FormValue("RequestAntiForgeryToken")

	cookie, err := r.Cookie("RequestAntiForgeryToken")
	if err != nil {
		response := models.Response{
			ReturnCode: -1,
			Message:    "Sorry something went wrong, please contact our admins",
		}

		byteResponse, marshalError := response.Response()
		if marshalError != nil {
			// Internal server errorA
			log.Println("Error while marshaling the Response object")
			return
		}
		w.Write(byteResponse)
		return
	}

	if len(user.RequestAntiForgeryToken) > 0 {
		if user.RequestAntiForgeryToken == cookie.Value {
			authCookie, cookieError := r.Cookie("AuthToken")
			if cookieError != nil {
				response := models.Response{
					ReturnCode: http.StatusUnauthorized,
					Message:    "Unauthorized",
				}
				byteResponse, marshalError := response.Response()
				if marshalError != nil {
					// Internal server errorA
					log.Println("Error while marshaling the response object")
					return
				}
				w.Write(byteResponse)
				return
			}

			verifyKeyBytes, err := ioutil.ReadFile(publicKeyPath)

			if err != nil {
				log.Println("Error while reading the pub key")
			}

			verifyKey, err = jwt.ParseRSAPublicKeyFromPEM(verifyKeyBytes)

			if err != nil {
				log.Println("Error while parsing the pub key")
			}

			authCookieWithoutPrefix := authCookie.Value[7:]

			token, parErr := jwt.Parse(authCookieWithoutPrefix, func(token *jwt.Token) (interface{}, error) {

				if _, ok := token.Method.(*jwt.SigningMethodRSA); !ok {
					return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
				}

				return verifyKey, nil
			})

			if parErr != nil {
				response := models.Response{
					ReturnCode: http.StatusUnauthorized,
					Message:    "Unauthorized",
				}
				byteResponse, marshalError := response.Response()
				if marshalError != nil {
					log.Println("Error while marshaling the response object")
					return
				}
				w.Write(byteResponse)
				return
			}

			if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
				id, err := strconv.ParseUint(claims["sub"].(string), 10, 64)
				if err != nil {
					log.Println("Error while parsing UserID from claims")
					return
				}

				tokenFromRedis, err := models.GetAuthTokenWithUserID(id)

				if err != nil {
					log.Println("Failed to retrieve auth token from redis db")

					response := models.Response{
						ReturnCode: http.StatusUnauthorized,
						Message:    "Unauthorized",
					}
					byteResponse, marshalError := response.Response()
					if marshalError != nil {
						// Internal server errorA
						log.Println("Error while marshaling the response object")
						return
					}
					w.Write(byteResponse)
					return
				}

				if tokenFromRedis == authCookieWithoutPrefix {
					delNum, revokeErr := models.RevokeUserTokensWithUserID(id)
					if revokeErr != nil {
						fmt.Println(revokeErr)
					}

					// Annihilate cookies
					authCookie := &http.Cookie{
						Name:    "AuthCookie",
						Value:   "",
						Path:    "/",
						Expires: time.Unix(0, 0),

						HttpOnly: true,
					}

					http.SetCookie(w, authCookie)

					refreshCookie := &http.Cookie{
						Name:    "RefreshCookie",
						Value:   "",
						Path:    "/",
						Expires: time.Unix(0, 0),

						HttpOnly: true,
					}

					http.SetCookie(w, refreshCookie)

					if delNum == 1 {
						response := models.Response{
							ReturnCode: http.StatusOK,
							Message:    "OK",
						}
						byteResponse, marshalError := response.Response()
						if marshalError != nil {
							// Internal server errorA
							log.Println("Error while marshaling the Response object")
							return
						}
						w.Write(byteResponse)
						return
					}
				}

			} else {
				response := models.Response{
					ReturnCode: http.StatusUnauthorized,
					Message:    "Unauthorized",
				}
				byteResponse, marshalError := response.Response()
				if marshalError != nil {
					// Internal server errorA
					log.Println("Error while marshaling the response object")
					return
				}
				w.Write(byteResponse)
				return
			}
		}
	}
}
