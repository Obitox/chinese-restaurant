package models

import (
	"log"
	"restaurant-app/db"
)

// Item represents struct for one type of food or beverage
// FIXME: Unnecessary GORM
type Item struct {
	ItemID             uint64 `gorm:"primary_key"`
	CategoryID         uint64
	Title, Description string
	Mass, CalorieCount int
	Price              float64
	Category           Category `gorm:"foreignkey:CategoryID;association_foreignkey:CategoryID"`
	Ingredients        []Ingredient
	Image              Image `gorm:"foreignkey:ItemID;association_foreignkey:ItemID"`
}

// Item represents struct for one type of food or beverage
// type Item struct {
// 	ItemID, CategoryID uint64
// 	Title, Description string
// 	Mass, CalorieCount int
// 	Price              float64
// }

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
	conn.Set("gorm:auto_preload", true).Find(&items)

	ingredients := []Ingredient{}
	portions := []Portion{}
	if len(items) > 0 {
		for i, item := range items {
			conn.Joins("JOIN item_ingredient ON item_ingredient.ingredient_id = ingredient.ingredient_id").Where("item_ingredient.item_id = ?", item.ItemID).Find(&ingredients)
			items[i].Ingredients = append(items[i].Ingredients, ingredients...)

			conn.Joins("JOIN category_portion ON category_portion.portion_id = portion.portion_id").Where("category_portion.category_id = ?", item.CategoryID).Find(&portions)
			items[i].Category.Portions = append(items[i].Category.Portions, portions...)

			if items[i].Image.ImageID == 0 {
				items[i].Image.Path = "src/assets/images/default.png"
			}
		}
	}

	// log.Println(items)

	return items
}
