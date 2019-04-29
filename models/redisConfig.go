package models

// RedisConfig represents a struct that mimics redis.yaml structure
type RedisConfig struct {
	Address  string `yaml:"addr"`
	Password string `yaml:"pass"`
	DB       int    `yaml:"db"`
}
