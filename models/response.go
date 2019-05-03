package models

import (
	"encoding/json"
	"log"
)

// Response used for displaying errors from handlers to end user in a json format
type Response struct {
	ReturnCode int16
	Message    string
}

// Response formats error response and returns it
func (response Response) Response() ([]byte, error) {
	// Example: -101: Username or password is wrong.
	// Example: 0: OK
	log.Println(string(response.ReturnCode) + ": " + response.Message)

	byteResponse, jsonError := json.Marshal(response)

	if jsonError != nil {
		log.Println("Failed to marshal the error")
		return byteResponse, jsonError
	}

	return byteResponse, nil
}
