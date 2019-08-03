package models

// ItemFE Represents a model for a FE data fetch
type ItemFE struct {
	ItemID                          uint64
	Title, Size, PersonalPreference string
	Price                           float64
	Amount                          int
}
