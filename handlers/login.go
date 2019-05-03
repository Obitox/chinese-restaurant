package handlers

import (
	"encoding/json"
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

	decoder := json.NewDecoder(r.Body)
	user := models.User{}

	err := decoder.Decode(&user)
	if err != nil {
		panic(err)
	}

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
