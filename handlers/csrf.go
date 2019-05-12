package handlers

import (
	"encoding/json"
	"log"
	"net/http"
	"restaurant-app/models"
	"restaurant-app/utils"
)

// Csrf is a handler for generating and returning AntiForgery tokens for the web forms used on the FE side
func Csrf(w http.ResponseWriter, r *http.Request) {
	utils.SetupCors(&w, r)

	w.Header().Set("Content-Type", "application/json")

	csrf, err := utils.GenerateRandomString(32)
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

	marshaledCsrfToken, err := json.Marshal(models.CsrfToken{
		Token: csrf,
	})

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

	w.Write(marshaledCsrfToken)
}
