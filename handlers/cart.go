package handlers

import (
	"log"
	"net/http"
	"restaurant-app/models"
	"restaurant-app/utils"
)

// Cart handler for cart checkout
// TODO: Checkout cart feature
func Cart(w http.ResponseWriter, r *http.Request) {
	utils.SetupCors(&w, r)

	w.Header().Set("Content-Type", "application/json")

	csrfCookie, csrfCookieErr := r.Cookie("RequestAntiForgeryToken")
	if csrfCookieErr != nil {
		response := models.Response{
			ReturnCode: http.StatusUnauthorized,
			Message:    csrfCookieErr.Error(),
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

	authCookie, authCookieErr := r.Cookie("AuthToken")
	if authCookieErr != nil {
		response := models.Response{
			ReturnCode: http.StatusUnauthorized,
			Message:    authCookieErr.Error(),
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

	refreshCookie, refreshCookieErr := r.Cookie("RefreshToken")
	if refreshCookieErr != nil {
		response := models.Response{
			ReturnCode: http.StatusUnauthorized,
			Message:    refreshCookieErr.Error(),
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

	// authCookie, authCookieErr := r.Cookie()
}
