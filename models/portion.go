package models

import (
	"log"
	"restaurant-app/db"
)

// Portion represents struct that defines one portion of meal or beverage
type Portion struct {
	PortionID                              uint64
	PriceMultiplier, MassCalorieMultiplier float64
	SizeName                               string
}

// GetAllPortions retrieves all portions from db
// Returns empty array of type portion if no portions found or err
func GetAllPortions() []Portion {
	conn, err := db.MySQLConnect()
	defer conn.Close()
	if err != nil {
		log.Println(err.Error())
		return []Portion{}
	}

	portions := []Portion{}
	conn.Find(&portions)

	return portions
}

// GetPortionByCategoryID retrieves portion based on CategoryID
// returns empty array of type if portion doesn't exist for provided category id or err
func GetPortionByCategoryID(CategoryID uint64) []Portion {
	conn, err := db.MySQLConnect()
	defer conn.Close()
	if err != nil {
		log.Println(err.Error())
		return []Portion{}
	}

	portions := []Portion{}
	conn.Joins("JOIN category_portion ON category_portion.portion_id = portion.portion_id").Where("category_portion.category_id = ?", CategoryID).Find(&portions)
	// conn.Raw("SELECT size_name FROM portion WHERE portion_id IN (SELECT portion_id FROM category_portion WHERE category_id = ?)", CategoryID).Scan(&portions)

	// portionNames := []string{}
	// if len(portions) > 0 {
	// 	for _, portion := range portions {
	// 		portionNames = append(portionNames, portion.SizeName)
	// 	}
	// }
	for _, portion := range portions {
		log.Println(portion.SizeName)
	}

	return portions
}
