package db

import (
	"log"
	"restaurant-app/utils"

	"github.com/jinzhu/gorm" // Gorm default import
	yaml "gopkg.in/yaml.v2"
)

// MySQLConfig represents a struct that mimics redis.yaml structure
type MySQLConfig struct {
	User, Password, DBName, Charset, ParseTime, Loc string
}

const (
	mySQLConfigFilePath = "config/mysql.yaml"
)

// MySQLConnect returns connection to MySql DB or an error if it fails
// WARNING: Connection is not closed, ALWAYS close connection when using this func!
func MySQLConnect() (db *gorm.DB, err error) {
	config := MySQLConfig{}
	data, ymlReadErr := utils.ReadYamlConfigFile(mySQLConfigFilePath)

	if ymlReadErr != nil {
		log.Println(ymlReadErr)
		return nil, ymlReadErr
	}

	err = yaml.Unmarshal(data, &config)

	if err != nil {
		log.Println(err)
		return nil, err
	}

	// Example: user:password@/dbname?charset=utf8&parseTime=True&loc=Local
	connectionString := config.User + ":" +
		config.Password + "@/" +
		config.DBName + "?charset=" +
		config.Charset + "&parseTime=" +
		config.ParseTime + "&loc=" +
		config.Loc

	db, err = gorm.Open("mysql", connectionString)

	if err != nil {
		log.Println(err)
		return nil, err
	}

	return
}
