package db

import (
	"log"
	"restaurant-app/models"
	"restaurant-app/utils"

	"github.com/go-redis/redis"
	yaml "gopkg.in/yaml.v2"
)

const (
	redisConfigFilePath = "config/redis.yaml"
)

// RedisConnect returns client/connection or error if it fails
func RedisConnect() (*redis.Client, error) {
	redisConfig := models.RedisConfig{}

	data, ymlReadErr := utils.ReadYamlConfigFile(redisConfigFilePath)

	if ymlReadErr != nil {
		log.Println(ymlReadErr)
		return nil, ymlReadErr
	}

	err := yaml.Unmarshal(data, &redisConfig)

	if err != nil {
		log.Println(err)
		return nil, err
	}

	client := redis.NewClient(&redis.Options{
		Addr:     redisConfig.Address,
		Password: redisConfig.Password, // no password set
		DB:       redisConfig.DB,       // use default DB
	})

	pong, err := client.Ping().Result()
	log.Println(pong, err)
	return client, err
}
