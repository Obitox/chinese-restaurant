package handlers

import (
	"encoding/json"
	"net/http"
	"restaurant-app/models"
	"restaurant-app/utils"
)

// Error mapping:
// -201 -
// -202 - Validation error

// username: '',
// password: '',
// email: '',
// firstname: '',
// lastname: '',
// address1: '',
// address2: '',
// address3: '',
// phone: '',

const ()

// Register creates a new user
func Register(w http.ResponseWriter, r *http.Request) {
	utils.SetupCors(&w, r)
	w.Header().Set("Content-Type", "application/json")

	decoder := json.NewDecoder(r.Body)
	user := models.User{}

	err := decoder.Decode(&user)
	if err != nil {
		panic(err)
	}

	isValidUser := user.Validate()

	if isValidUser {
		err = user.CreateUser()
		if err != nil {
			response := models.Response{
				ReturnCode: -201,
				Message:    err.Error(),
			}

			byteResponse, marshalError := response.Response()
			if marshalError != nil {
				panic(marshalError)
			}

			w.Write(byteResponse)
			return
		}

		response := models.Response{
			ReturnCode: 0,
			Message:    "OK",
		}

		byteResponse, marshalError := response.Response()
		if marshalError != nil {
			panic(marshalError)
		}

		w.Write(byteResponse)
		return
	}

	response := models.Response{
		ReturnCode: -202,
		Message:    "Validation error",
	}

	byteResponse, marshalError := response.Response()
	if marshalError != nil {
		panic(marshalError)
	}

	w.Write(byteResponse)
	return
}
