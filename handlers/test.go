package handlers

import (
	"encoding/json"
	"log"
	"net/http"
	"restaurant-app/models"
	"restaurant-app/utils"
)

// Test is a function for testing items fetch with GORM
func Test(w http.ResponseWriter, r *http.Request) {
	utils.SetupCors(&w, r)

	w.Header().Set("Content-Type", "application/json")

	items := models.GetAllItems()
	marshaledItems, err := json.Marshal(items)

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

	w.Write(marshaledItems)
}
