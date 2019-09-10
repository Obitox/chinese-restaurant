package models

import (
	"log"
	"restaurant-app/db"
)

// REFACTORED CATEGORY
type Category struct {
	CategoryID uint64 `gorm:"primary_key"`
	Title      string
	Portions   []Portion `gorm:"foreignkey:CategoryID;association_foreignkey:CategoryID"`
	IsScalable int
}

// Category represents category of item
// type Category struct {
// 	CategoryID uint64
// 	Title      string
// 	IsScalable int
// }

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
	log.Println("HAPPEND")
	log.Println(categories)

	return categories
}
