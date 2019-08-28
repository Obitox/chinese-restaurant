package handlers

import (
	"encoding/json"
	"log"
	"net/http"
	"restaurant-app/models"
	"restaurant-app/utils"
)

// Ingredients handler that exposes all ingredients
func Ingredients(w http.ResponseWriter, r *http.Request) {
	utils.SetupCors(&w, r)

	ingredients := models.GetAllIngredients()
	marshaledIngredients, err := json.Marshal(ingredients)

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

	w.Write(marshaledIngredients)
}
