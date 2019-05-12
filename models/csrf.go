package models

// CsrfToken struct used as return objedt for csrf handler
type CsrfToken struct {
	Token string `json:"_RequestAntiForgeryToken"`
}
