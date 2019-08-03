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

// Cart handler for cart checkout
// TODO: Checkout cart feature
func Cart(w http.ResponseWriter, r *http.Request) {
	utils.SetupCors(&w, r)

	w.Header().Set("Content-Type", "application/json")

	cart := models.CartData{
		RequestAntiForgeryToken: "",
	}

	data, bodyErr := ioutil.ReadAll(r.Body)
	if bodyErr != nil {
		log.Println("Readll: " + bodyErr.Error())
	}

	unmarshErr := json.Unmarshal(data, &cart)
	if unmarshErr != nil {
		log.Println(unmarshErr.Error())
		panic(unmarshErr)
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

	// authCookie, authCookieErr := r.Cookie("AuthToken")
	// if authCookieErr != nil {
	// 	response := models.Response{
	// 		ReturnCode: http.StatusUnauthorized,
	// 		Message:    authCookieErr.Error(),
	// 	}

	// 	byteResponse, marshalError := response.Response()
	// 	if marshalError != nil {
	// 		// Internal server errorA
	// 		log.Println("Error while marshaling the Response object")
	// 		return
	// 	}
	// 	w.Write(byteResponse)
	// 	return
	// }

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

	// Separate this logic
	if len(cart.RequestAntiForgeryToken) > 0 {
		if cart.RequestAntiForgeryToken == csrfCookie.Value {
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
					id, err := strconv.ParseUint(refTokenClaims["sub"].(string), 10, 64)
					if err != nil {
						log.Println("Error while parsing UserID from claims")
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
					log.Println("REF PRINT")
					userCart := models.Cart{
						UserID: id,
					}

					userCart.CreateCart()

					cartRetrieveErr := userCart.RetrieveCartByUserID()
					if cartRetrieveErr != nil {
						log.Println(cartRetrieveErr.Error())
					}
					log.Printf("Pozvan %d", userCart.CartID)

					createErr := cart.CreateCartItem(userCart.CartID, userCart.UserID)
					if createErr != nil {
						log.Println(createErr.Error())
					}

				}
			}

			// AuthToken parsing
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

				log.Println("AUTH PRINT")
				userCart := models.Cart{
					UserID: id,
				}

				cartCreateErr := userCart.CreateCart()
				if cartCreateErr != nil {
					log.Println("CART CREATE ERROR")
					log.Println(cartCreateErr.Error())
				}

				cartRetrieveErr := userCart.RetrieveCartByUserID()
				if cartRetrieveErr != nil {
					log.Println(cartRetrieveErr.Error())
				}
				log.Printf("Pozvan %d", userCart.CartID)

				createErr := cart.CreateCartItem(userCart.CartID, userCart.UserID)
				if createErr != nil {
					log.Println(createErr.Error())
				}

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
