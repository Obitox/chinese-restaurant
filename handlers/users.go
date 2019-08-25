package handlers

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"restaurant-app/models"
	"restaurant-app/utils"
	"strconv"
	"time"

	jwt "github.com/dgrijalva/jwt-go"
)

// Users handler returns all users inside the DB
func Users(w http.ResponseWriter, r *http.Request) {
	utils.SetupCors(&w, r)

	w.Header().Set("Content-Type", "application/json")

	csrf := models.CsrfToken{
		Token: "",
	}

	log.Println(r.Body)
	data, bodyErr := ioutil.ReadAll(r.Body)
	if bodyErr != nil {
		log.Println("Readll: " + bodyErr.Error())
	}

	unmarshErr := json.Unmarshal(data, &csrf)
	if unmarshErr != nil {
		log.Println(unmarshErr.Error())
		panic("ERROR: " + unmarshErr.Error())
	}

	csrfCookie, csrfCookieErr := r.Cookie("RequestAntiForgeryToken")
	if csrfCookieErr != nil {
		response := models.Response{
			ReturnCode: http.StatusUnauthorized,
			Message:    csrfCookieErr.Error(),
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

	refreshCookie, refreshCookieErr := r.Cookie("RefreshToken")
	if refreshCookieErr != nil {
		response := models.Response{
			ReturnCode: http.StatusUnauthorized,
			Message:    refreshCookieErr.Error(),
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

	if len(csrf.Token) > 0 {
		if csrf.Token == csrfCookie.Value {
			authCookie, authCookieError := r.Cookie("AuthToken")
			if authCookieError != nil {
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

			// FIXME: Fix this butcher style
			authCookieWithoutPrefix := authCookie.Value[7:]

			// TODO: Separate this logic
			token, parErr := jwt.Parse(authCookieWithoutPrefix, func(token *jwt.Token) (interface{}, error) {

				if _, ok := token.Method.(*jwt.SigningMethodRSA); !ok {
					return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
				}

				return verifyKey, nil
			})

			// TODO: Separate this logic
			if parErr != nil {
				parsedRefToken, refTokenParErr := jwt.Parse(authCookieWithoutPrefix, func(token *jwt.Token) (interface{}, error) {

					if _, ok := token.Method.(*jwt.SigningMethodRSA); !ok {
						return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
					}

					return verifyKey, nil
				})

				if refTokenParErr != nil {
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

				// BEGIn
				// TODO: Separate this logic
				if refTokenClaims, ok := parsedRefToken.Claims.(jwt.MapClaims); ok && parsedRefToken.Valid {
					log.Println("1 ---")
					id, err := strconv.ParseUint(refTokenClaims["sub"].(string), 10, 64)
					log.Println("1---")
					if err != nil {
						log.Println("Error while parsing UserID from claims")
						return
					}

					log.Println("2---")
					role := refTokenClaims["Role"].(string)
					log.Println("2---")

					if role != "administrator" {
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

					refTokenFromRedis, err := models.GetRefreshTokenWithUserID(id)

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

					// TODO: Separate this logic
					if refTokenFromRedis != refreshCookie.Value {
						delNum, revokeErr := models.RevokeUserTokensWithUserID(id)
						if revokeErr != nil {
							fmt.Println(revokeErr)
						}

						// Annihilate cookies
						authCookie := &http.Cookie{
							Name:    "AuthToken",
							Value:   "",
							Path:    "/",
							Expires: time.Unix(0, 0),

							HttpOnly: true,
						}

						http.SetCookie(w, authCookie)

						refreshCookie := &http.Cookie{
							Name:    "RefreshToken",
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

					// TODO: Separate this logic
					authCookie := &http.Cookie{
						Name:     "AuthToken",
						Value:    "Bearer " + authCookie.Value,
						Path:     "/",
						Expires:  time.Now().Add(models.AuthTokenValidTime),
						HttpOnly: true,
					}

					http.SetCookie(w, authCookie)

					refreshCookie := &http.Cookie{
						Name:     "RefreshToken",
						Value:    refreshCookie.Value,
						Path:     "/",
						Expires:  time.Now().Add(models.RefreshTokenValidTime),
						HttpOnly: true,
					}

					http.SetCookie(w, refreshCookie)
					// END

					// CART PROCESSING
					// 1. Create cart
					users := models.GetAllUsers()
					marshaledUsers, err := json.Marshal(users)

					if err != nil {
						response := models.Response{
							ReturnCode: -1,
							Message:    err.Error(),
						}
						byteResponse, marshalError := response.Response()
						if marshalError != nil {
							log.Println("Error while marshaling the Response object")
							return
						}
						w.Write(byteResponse)
						return
					}

					w.Write(marshaledUsers)
					return
				}
			}

			// AuthToken parsing
			if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
				log.Println("3---")
				id, err := strconv.ParseUint(claims["sub"].(string), 10, 64)
				log.Println("3---")
				if err != nil {
					log.Println("Error while parsing UserID from claims")
					return
				}

				log.Println("4---")
				role := claims["role"].(string)
				log.Println(role)
				log.Println("4---")

				if role != "administrator" {
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

				if tokenFromRedis != authCookieWithoutPrefix {
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

				users := models.GetAllUsers()
				marshaledUsers, err := json.Marshal(users)

				if err != nil {
					response := models.Response{
						ReturnCode: -1,
						Message:    err.Error(),
					}
					byteResponse, marshalError := response.Response()
					if marshalError != nil {
						log.Println("Error while marshaling the Response object")
						return
					}
					w.Write(byteResponse)
					return
				}

				w.Write(marshaledUsers)
				return
			}

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

	// // LOGIC TO ADD
	// users := models.GetAllUsers()
	// marshaledUsers, err := json.Marshal(users)

	// if err != nil {
	// 	response := models.Response{
	// 		ReturnCode: -1,
	// 		Message:    err.Error(),
	// 	}
	// 	byteResponse, marshalError := response.Response()
	// 	if marshalError != nil {
	// 		log.Println("Error while marshaling the Response object")
	// 		return
	// 	}
	// 	w.Write(byteResponse)
	// 	return
	// }

	// w.Write(marshaledUsers)
}
