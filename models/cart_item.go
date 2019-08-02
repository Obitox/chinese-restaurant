package models

// CartItem represents junction between user cart and items user puts in its cart
type CartItem struct {
	CartItemID, CartID, ItemID uint64
	Amount                     int
}
