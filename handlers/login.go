package handlers

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
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
	// err := json.NewDecoder(r.Body).Decode(&user)

	data, err := ioutil.ReadAll(r.Body)
	if err != nil {
		log.Println("Readll: " + err.Error())
	}

	err = json.Unmarshal(data, &user)
	if err != nil {
		log.Println(err.Error())
		panic(err)
	}

	cookie, err := r.Cookie("RequestAntiForgeryToken")
	if err != nil {
		response := models.Response{
			ReturnCode: http.StatusUnauthorized,
			Message:    "",
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

	r.ParseForm()

	antiForgeryToken := r.Form.Get("_RequestAntiForgeryToken")

	if len(antiForgeryToken) > 0 {
		if antiForgeryToken == cookie.Value {
			retrievalError := user.GetUserByUsernameAndPassword()
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
			byteResponse, marshalError := response.Response()
			if marshalError != nil {
				// Internal server errorA
				log.Println("Error while marshaling the Response object")
				return
			}
			w.Write(byteResponse)
		}
	}

	response := models.Response{
		ReturnCode: http.StatusUnauthorized,
		Message:    "",
	}

	byteResponse, marshalError := response.Response()
	if marshalError != nil {
		// Internal server errorA
		log.Println("Error while marshaling the Response object")
		return
	}
	w.Write(byteResponse)
	return

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
}
