package utils

import (
	"io/ioutil"
	"log"
)

const (
	configFilePath = "config/redis.yaml"
)

// ReadYamlConfigFile reads the config file from hardcoded path
// Returns data as a byte array if successful | Returns error if it fails
func ReadYamlConfigFile() ([]byte, error) {
	data, err := ioutil.ReadFile(configFilePath)
	if err != nil {
		log.Println(err)
		return data, err
	}

	return data, nil
}
