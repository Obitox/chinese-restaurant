package db

import (
	"log"
	"restaurant-app/models"
	"restaurant-app/utils"

	"github.com/jinzhu/gorm" // Gorm default import
	yaml "gopkg.in/yaml.v2"
)

const (
	mySQLConfigFilePath = "config/mysql.yaml"
)

// MySQLConnect returns connection to MySql DB or an error if it fails
// WARNING: Connection is not closed, ALWAYS close connection when using this func!
func MySQLConnect() (db *gorm.DB, err error) {
	mySQLConfig := models.MySQLConfig{}

	data, ymlReadErr := utils.ReadYamlConfigFile(mySQLConfigFilePath)

	if ymlReadErr != nil {
		log.Println(ymlReadErr)
		return nil, ymlReadErr
	}

	err = yaml.Unmarshal(data, &mySQLConfig)

	if err != nil {
		log.Println(err)
		return nil, err
	}

	// Example: user:password@/dbname?charset=utf8&parseTime=True&loc=Local
	connectionString := mySQLConfig.User + ":" +
		mySQLConfig.Password + "@/" +
		mySQLConfig.DBName + "?charset=" +
		mySQLConfig.Charset + "&parseTime=" +
		mySQLConfig.ParseTime + "&loc=" +
		mySQLConfig.Loc

	db, err = gorm.Open("mysql", connectionString)

	if err != nil {
		log.Println(err)
		return nil, err
	}

	return
}
