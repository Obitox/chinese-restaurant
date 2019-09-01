package models

import (
	"log"
	"restaurant-app/db"
)

// Item represents struct for one type of food or beverage
// FIXME: Unnecessary GORM
type Item struct {
	ItemID                                      uint64 `gorm:"primary_key"`
	CategoryID                                  uint64
	Title, Description, RequestAntiForgeryToken string
	Mass, CalorieCount                          int
	Price                                       float64
	Category                                    Category `gorm:"foreignkey:CategoryID;association_foreignkey:CategoryID"`
	Ingredients                                 []Ingredient
	Image                                       Image `gorm:"foreignkey:ItemID;association_foreignkey:ItemID"`
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

// CreateItem adds new item to the DB
func (item Item) CreateItem() (err error) {
	conn, err := db.MySQLConnect()
	defer conn.Close()

	if err != nil {
		log.Println(err)
		return err
	}

	// category := item.Category
	// conn.Create(&category)
	createError := conn.Exec("INSERT INTO item(title, description, mass, calorie_count, price, category_id, request_anti_forgery_token) VALUES(?, ?, ?, ?, ?, ?, ?)", item.Title, item.Description, item.Mass, item.CalorieCount, item.Price, item.Category.CategoryID, item.RequestAntiForgeryToken)

	ingredients := item.Ingredients

	newItem := Item{}
	conn.Last(&newItem)

	for _, ingredient := range ingredients {
		log.Println(ingredient.IngredientID)
		log.Println(newItem.ItemID)
		conn.Exec("INSERT INTO item_ingredient(ingredient_id, item_id) VALUES(?, ?)", ingredient.IngredientID, newItem.ItemID)
	}

	// db.Exec("INSERT INTO orders SET shipped_at=? WHERE id IN (?)", time.Now(), []int64{11,22,33})

	return createError.Error
}
