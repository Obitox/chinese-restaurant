package models

import (
	"log"
	"restaurant-app/db"
)

// Category represents category of item
type Category struct {
	CategoryID uint64
	Title      string
	IsScalable int
}

// GetAllCategories retrieves all categories from db
// returns empty array of type category if no categories found or err
func GetAllCategories() []Category {
	conn, err := db.MySQLConnect()
	defer conn.Close()
	if err != nil {
		log.Println(err.Error())
		return []Category{}
	}

	categories := []Category{}
	conn.Find(&categories)

	return categories
}
