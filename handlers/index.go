package handlers

import "net/http"

// IndexHandler for the main page of the restaurant =returns following data:
// - List of all food items
// - List of popular food items
// - Promo foods
// - Food categories
func IndexHandler(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Hello my name is Bojan!"))
}
