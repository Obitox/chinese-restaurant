package models

import (
	"log"
	"restaurant-app/db"
)

// Ingredient represents ingredients for items
type Ingredient struct {
	IngredientID     uint64
	Title, Allergens string
	IsBase           int8
}

func GetIngredientsByItemID(ItemID uint64) []Ingredient {
	conn, err := db.MySQLConnect()
	defer conn.Close()

	if err != nil {
		log.Println(err)
		return []Ingredient{}
	}

	ingredients := []Ingredient{}
	conn.Joins("JOIN item_ingredient ON item_ingredient.ingredient_id = ingredient.ingredient_id").Where("item_ingredient.item_id = ?", ItemID).Find(&ingredients)

	return ingredients
}
