package models

import (
	"log"
	"restaurant-app/db"
)

// HomeData represents data that merges item & info about item portion
type HomeData struct {
	Item     Item
	SizeName []string
}

var homeData []HomeData

// Data returns data needed for home handler
func Data() []HomeData {
	conn, err := db.MySQLConnect()
	defer conn.Close()
	if err != nil {
		log.Println(err.Error())
		return []HomeData{}
	}

	homeData := []HomeData{}
	items := GetAllItems()
	if len(items) > 0 {
		for _, item := range items {
			portionNames := GetPortionNameByItemID(item.CategoryID)
			d := HomeData{
				Item:     item,
				SizeName: portionNames,
			}
			homeData = append(homeData, d)
		}
	}

	return homeData
}
