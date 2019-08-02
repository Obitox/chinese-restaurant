package models

import "time"

// Order represents user order data
type Order struct {
	OrderID, UserID, CartID                 uint64
	IsCanceled, IsDelivered                 int8
	Rating                                  int
	PersonalPreference, Comment, IsAccepted string
	DeliveryAt, CreatedAt, DeliveredAt      *time.Time
}
