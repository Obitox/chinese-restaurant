package models

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
)

// Route model
type Route struct {
	Name    string `json:"name"`
	Method  string `json:"method"`
	Pattern string `json:"pattern"`
}

// GetRoutes reads the conf.json file and Unmarshals all json objects to Route structs
func GetRoutes() []Route {
	routes := make([]Route, 0, 10)
	rawRoutes, err := ioutil.ReadFile("./conf.json")
	if err != nil {
		fmt.Println(err)
	}
	json.Unmarshal(rawRoutes, &routes)
	return routes
}
