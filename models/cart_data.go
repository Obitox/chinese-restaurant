package models

// CartData represents merged data needed for cart checkout processing
type CartData struct {
	Items                   []Item
	RequestAntiForgeryToken string
}
