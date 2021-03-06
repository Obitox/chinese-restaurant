package handlers

import (
	"encoding/json"
	"log"
	"net/http"
	"restaurant-app/models"
	"restaurant-app/utils"
)

// Home for the main page of the restaurant =returns following data:
// - List of all food items
// - List of popular food items
// - Promo foods
// - Food categories
func Home(w http.ResponseWriter, r *http.Request) {
	// items := models.GetAllItems()
	// portions := models.GetAllPortions()
	// // categories := models.GetAllCategories()

	// for _, element := range items {
	// 	// element is the element from someSlice for where we are
	// }

	utils.SetupCors(&w, r)

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
	return

	// w.Write([]byte("Hello my name is Bojan!"))
}
