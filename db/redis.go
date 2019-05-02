package db

import (
	"log"
	"restaurant-app/utils"

	"github.com/go-redis/redis"
	yaml "gopkg.in/yaml.v2"
)

// RedisConfig represents a struct that mimics redis.yaml structure
type RedisConfig struct {
	Address  string `yaml:"addr"`
	Password string `yaml:"pass"`
	DB       int    `yaml:"db"`
}

const (
	redisConfigFilePath = "config/redis.yaml"
)

// RedisConnect returns client/connection or error if it fails
func RedisConnect() (*redis.Client, error) {
	config := RedisConfig{}

	data, ymlReadErr := utils.ReadYamlConfigFile(redisConfigFilePath)

	if ymlReadErr != nil {
		log.Println(ymlReadErr)
		return nil, ymlReadErr
	}

	err := yaml.Unmarshal(data, &config)

	if err != nil {
		log.Println(err)
		return nil, err
	}

	client := redis.NewClient(&redis.Options{
		Addr:     config.Address,
		Password: config.Password,
		DB:       config.DB,
	})

	pong, err := client.Ping().Result()
	log.Println(pong, err)
	return client, err
}
