package handlers

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	"regexp"
	"restaurant-app/models"
	"restaurant-app/utils"
)

// Error Mapping:
// -101 Bad username and password
//

// Login authenticates user, creates Auth&Referesh tokens for existing user
func Login(w http.ResponseWriter, r *http.Request) {
	utils.SetupCors(&w, r)

	w.Header().Set("Content-Type", "application/json")

	user := models.User{
		Username: "",
		Password: "",
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

	// Validation
	matched, _ := regexp.MatchString("^[A-Za-z]{1}[A-Za-z0-9]{0,19}$", user.Username)
	if !matched {
		response := models.Response{
			ReturnCode: -1,
			Message:    "Invalid data entered",
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

	cookie, err := r.Cookie("RequestAntiForgeryToken")
	if err != nil {
		response := models.Response{
			ReturnCode: http.StatusUnauthorized,
			Message:    err.Error(),
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
			retrievalError := user.GetUserByUsernameAndPassword()
			log.Println("ROLE: " + user.Role)
			if retrievalError != nil {
				response := models.Response{
					ReturnCode: -1,
					Message:    retrievalError.Error(),
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

			if user.UserID == 0 {
				response := models.Response{
					ReturnCode: -101,
					Message:    "Username or password is wrong.",
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

			authToken, refreshToken, err := user.CreateAndStoreAuthAndRefreshTokens()

			log.Println(err)
			models.SetAuthAndRefreshCookies(&w, authToken, refreshToken)

			response := models.Response{
				ReturnCode: 0,
				Message:    "OK",
			}

			if user.Role == "administrator" {
				response.Message = "admin"
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

	response := models.Response{
		ReturnCode: http.StatusUnauthorized,
		Message:    "Unauthorized",
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

// retrievalError := user.GetUserByUsernameAndPassword()
// if retrievalError != nil {
// 	response := models.Response{
// 		ReturnCode: -1,
// 		Message:    retrievalError.Error(),
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

// if user.UserID == 0 {
// 	response := models.Response{
// 		ReturnCode: -101,
// 		Message:    "Username or password is wrong.",
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

// authToken, refreshToken, err := user.CreateAndStoreAuthAndRefreshTokens()

// models.SetAuthAndRefreshCookies(&w, authToken, refreshToken)

// response := models.Response{
// 	ReturnCode: 0,
// 	Message:    "OK",
// }
// byteResponse, marshalError := response.Response()
// if marshalError != nil {
// 	// Internal server errorA
// 	log.Println("Error while marshaling the Response object")
// 	return
// }
// w.Write(byteResponse)
