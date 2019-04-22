package models

// User represents a model for a real user inside the Application
// Roles: Admin, Dispatcher & Customer (Default)
// Address1: *
// Address2: Optional
// Address3: Optional
type User struct {
	UserID, Username, Password, Role, FirstName, LastName, Address1, Address2, Address3, Phone, Email string
}
