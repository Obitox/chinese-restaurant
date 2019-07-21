package models

import (
	"log"
	"restaurant-app/db"
)

// HomeItem represents strucct that merges item, portion & image
type HomeItem struct {
	Item    Item
	Portion []Portion
	Image   Image
}

// Data returns data needed for home handler
func Data() []HomeItem {
	conn, err := db.MySQLConnect()
	defer conn.Close()
	if err != nil {
		log.Println(err.Error())
		return []HomeItem{}
	}

	homeItems := []HomeItem{}
	items := GetAllItems()
	if len(items) > 0 {
		for _, item := range items {
			portions := GetPortionByCategoryID(item.CategoryID)
			image := GetImageByItemID(item.ItemID)
			homeItem := HomeItem{
				Item:    item,
				Portion: portions,
				Image:   image,
			}
			homeItems = append(homeItems, homeItem)
		}
	}

	return homeItems
}
