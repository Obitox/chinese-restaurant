package models

import (
	"time"

	jwt "github.com/dgrijalva/jwt-go"
)

// RefreshTokenValidTime represents valid time of RefreshToken
const RefreshTokenValidTime = time.Hour * 48

// AuthTokenValidTime represents valid time of AccessToken/AuthToken
const AuthTokenValidTime = time.Minute * 15

// TokenClaims represents information placed inside the JWT token
type TokenClaims struct {
	jwt.StandardClaims
	Role string `json:"role"`
	Csrf string `json:"csrf"`
}
