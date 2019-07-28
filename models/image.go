package models

import (
	"log"
	"restaurant-app/db"
)

// Image represents struct that is abstraction for Image of AN Item
type Image struct {
	ImageID, ItemID uint64
	Path            string
}

// GetImageByItemID retrieves image based on supplied ItemID
// Returns default image
func GetImageByItemID(ItemID uint64) Image {
	conn, err := db.MySQLConnect()
	defer conn.Close()
	if err != nil {
		log.Println(err.Error())
		return Image{
			ImageID: 0,
			ItemID:  0,
			Path:    "src/assets/images/default.png",
		}
	}

	image := Image{}
	conn.Where("item_id = ?", ItemID).Find(&image)

	if image.ImageID == 0 {
		return Image{
			ImageID: 0,
			ItemID:  0,
			Path:    "src/assets/images/default.png",
		}
	}

	return image
}
