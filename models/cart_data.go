package models

import (
	"log"
	"restaurant-app/db"
	"time"
)

const DefaultOrderWaitTime = time.Minute * 60

// CartData represents merged data needed for cart checkout processing
type CartData struct {
	Items                   []ItemFE
	RequestAntiForgeryToken string
}

// CreateCartItem fills junction table for Cart and Item
func (cartData *CartData) CreateCartItem(CartID, UserID uint64) error {
	conn, err := db.MySQLConnect()
	// defer conn.Close()

	if err != nil {
		log.Println(err)
		conn.Close()
		return err
	}

	cartItem := CartItem{
		CartID: CartID,
	}

	log.Printf("Duzina: %d", len(cartData.Items))
	for _, item := range cartData.Items {
		cartItem.ItemID = item.ItemID
		cartItem.Amount = item.Amount
		log.Printf("ITEMID: %d", item.ItemID)
		conn.Create(&cartItem)
		// if createErr != nil {
		// 	log.Println("Drugi fail")
		// 	log.Println(createErr.Error)
		// 	conn.Close()
		// 	return createErr.Error
		// }
		// portions := GetPortionByCategoryID(item.CategoryID)
		// image := GetImageByItemID(item.ItemID)
		// ingredients := GetIngredientsByItemID(item.ItemID)
		// homeItem := HomeItem{
		// 	Item:       item,
		// 	Portion:    portions,
		// 	Ingredient: ingredients,
		// 	Image:      image,
		// }
		// homeItems = append(homeItems, homeItem)
	}

	deliveryAt := time.Now().Add(DefaultOrderWaitTime).Format("H:i:s")
	parsedDeliveryAt, parseErr := time.Parse("H:i:s", deliveryAt)
	if parseErr != nil {
		log.Println(parseErr.Error())
	}

	order := Order{
		UserID:      UserID,
		CartID:      CartID,
		IsCanceled:  0,
		IsDelivered: 0,
		IsAccepted:  "pending",
		DeliveryAt:  parsedDeliveryAt,
		CreatedAt:   time.Now(),
	}

	conn.Create(&order)
	// if createErr != nil {
	// 	log.Println("CreateERR")
	// 	log.Println(createErr.Error)
	// }
	conn.Close()

	return nil
}
