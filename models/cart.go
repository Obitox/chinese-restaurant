package models

import (
	"log"
	"restaurant-app/db"
)

// Cart represents user cart
type Cart struct {
	CartID, UserID uint64
}

// CreateCart creates cart for a user
func (cart *Cart) CreateCart() (err error) {
	conn, err := db.MySQLConnect()
	defer conn.Close()

	if err != nil {
		log.Println(err)
		return err
	}

	createErr := conn.Create(&cart)

	if createErr != nil {
		return createErr.Error
	}

	conn.Where("user_id=?", cart.UserID).Find(&cart)

	return nil
}

// RetrieveCartByUserID retrieves a user cart by user_id
func (cart *Cart) RetrieveCartByUserID() (err error) {
	conn, err := db.MySQLConnect()
	defer conn.Close()

	if err != nil {
		log.Println(err)
		return err
	}

	conn.Where("user_id=?", cart.UserID).Find(&cart)

	return nil
}
