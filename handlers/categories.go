package handlers

import (
	"encoding/json"
	"log"
	"net/http"
	"restaurant-app/models"
	"restaurant-app/utils"
)

// Categories handler to fetch all categories
func Categories(w http.ResponseWriter, r *http.Request) {
	utils.SetupCors(&w, r)

	categories := models.GetAllCategories()
	marshaledCategories, err := json.Marshal(categories)

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

	w.Write(marshaledCategories)
	return
}
