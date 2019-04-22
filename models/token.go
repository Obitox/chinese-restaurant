package models

import (
	"time"

	jwt "github.com/dgrijalva/jwt-go"
)

const RefreshTokenValidTime = time.Hour * 72
const AuthTokenValidTime = time.Minute * 15

// TokenClaims represents information placed inside the JWT token
type TokenClaims struct {
	jwt.StandardClaims
	Role string `json:"role"`
	Csrf string `json:"csrf"`
}
