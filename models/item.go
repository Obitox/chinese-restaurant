package models

import (
	"log"
	"restaurant-app/db"
)

// Item represents struct for one type of food or beverage
type Item struct {
	ItemID, CategoryID uint64
	Title, Description string
	Mass, CalorieCount int
	Price              float64
}

// GetAllItems retrieves all items from the db
// Returns empty array of type item if no items found or err
func GetAllItems() []Item {
	conn, err := db.MySQLConnect()
	defer conn.Close()
	if err != nil {
		log.Println(err.Error())
		return []Item{}
	}

	items := []Item{}
	conn.Find(&items)

	return items
}
