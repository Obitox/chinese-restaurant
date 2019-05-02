package models

import (
	"crypto/rsa"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"restaurant-app/db"
	"time"

	jwt "github.com/dgrijalva/jwt-go"
	uuid "github.com/satori/go.uuid"
	"golang.org/x/crypto/bcrypt"
)

// User represents a model for a real user inside the Application
// Roles: Admin, Dispatcher & Customer (Default)
// Address1: *
// Address2: Optional
// Address3: Optional
// RefreshTokenValidTime represents valid time of RefreshToken
const RefreshTokenValidTime = time.Hour * 48

// AuthTokenValidTime represents valid time of AccessToken/AuthToken
const AuthTokenValidTime = time.Minute * 15

// TokenClaims represents information placed inside the JWT token
type TokenClaims struct {
	jwt.StandardClaims
	Role string `json:"role"`
	// Csrf string `json:"csrf"`
}

type User struct {
	UserID                                                                                    uint64
	Username, Password, Role, FirstName, LastName, Address1, Address2, Address3, Phone, Email string
}

const (
	privateKeyPath = "keys/app.rsa"
	publicKeyPath  = "keys/app.rsa.pub"
)

var (
	verifyKey *rsa.PublicKey
	signKey   *rsa.PrivateKey
)

func initJWT() error {
	signKeyBytes, err := ioutil.ReadFile(privateKeyPath)

	if err != nil {
		return err
	}

	signKey, err = jwt.ParseRSAPrivateKeyFromPEM(signKeyBytes)

	if err != nil {
		return err
	}

	verifyKeyBytes, err := ioutil.ReadFile(publicKeyPath)

	if err != nil {
		return err
	}

	verifyKey, err = jwt.ParseRSAPublicKeyFromPEM(verifyKeyBytes)

	if err != nil {
		return err
	}

	return nil
}

// GetUserByUsernameAndPassword retrieves user with matching username and password from the MySQL DB
func (user *User) GetUserByUsernameAndPassword() (err error) {
	conn, err := db.MySQLConnect()
	defer conn.Close()

	if err != nil {
		log.Println(err)
		return err
	}

	conn.Where("username=? AND password=?", user.Username, user.Password).First(&user)
	return err
}

// CreateUser adds a new user to the MySQL DB
func (user *User) CreateUser() (err error) {
	conn, err := db.MySQLConnect()
	defer conn.Close()

	if err != nil {
		log.Println(err)
		return err
	}

	conn.Create(&user)
	return nil
}

// CreateAndStoreAuthAndRefreshTokens
func (user User) CreateAndStoreAuthAndRefreshTokens() (authToken string, refreshToken string, err error) {
	initErr := initJWT()
	if initErr != nil {
		fmt.Println(initErr)
		return
	}

	authToken, err = createAuthTokenString(user.UserID, user.Role)

	if err != nil {
		log.Println(err)
		return
	}

	refreshToken, err = createRefreshTokenString(user.UserID, user.Role)

	if err != nil {
		log.Println(err)
		return
	}

	err = storeAuthAndRefreshTokens(user.UserID, authToken, refreshToken)

	if err != nil {
		log.Println(err)
		return
	}

	return
}

// storeAuthAndRefreshTokens stores the token in the format:
// uuid: map[string]interface
// Returns error if it fails
func storeAuthAndRefreshTokens(id uint64, authToken, refreshToken string) error {
	client, err := db.RedisConnect()
	defer client.Close()

	if err != nil {
		log.Println(err)
		return err
	}

	tokens := make(map[string]interface{})

	tokens["AuthToken"] = authToken
	tokens["RefreshToken"] = refreshToken

	_, tokenInsertError := client.HMSet(string(id), tokens).Result()
	if err != nil {
		log.Println(tokenInsertError)
		return tokenInsertError
	}

	return nil
}

func createAuthTokenString(id uint64, role string) (authTokenString string, err error) {
	authTokenExp := time.Now().Add(AuthTokenValidTime).Unix()

	authTokenClaims := TokenClaims{
		jwt.StandardClaims{
			Subject:   string(id),
			ExpiresAt: authTokenExp,
		},
		role,
	}

	authJwt := jwt.NewWithClaims(jwt.GetSigningMethod("RS256"), authTokenClaims)

	authTokenString, err = authJwt.SignedString(signKey)
	if err != nil {
		log.Println(err)
		return
	}

	return
}

func createRefreshTokenString(id uint64, role string) (refreshTokenString string, err error) {
	refreshTokenExp := time.Now().Add(RefreshTokenValidTime).Unix()

	jti, err := uuid.NewV4()
	if err != nil {
		log.Println(err)
		return refreshTokenString, err
	}

	refreshTokenClaims := TokenClaims{
		jwt.StandardClaims{
			Id:        jti.String(), // jti
			Subject:   string(id),
			ExpiresAt: refreshTokenExp,
		},
		role,
	}

	refreshJwt := jwt.NewWithClaims(jwt.GetSigningMethod("RS256"), refreshTokenClaims)

	// generate the refresh token string
	refreshTokenString, err = refreshJwt.SignedString(signKey)

	return
}

// HashPassword generates a bcrypt hash of the password using work factor 14.
func (user User) HashPassword() ([]byte, error) {
	return bcrypt.GenerateFromPassword([]byte(user.Password), 14)
}

// CheckPasswordHash securely compares a bcrypt hashed password with its possible
// plaintext equivalent.  Returns nil on success, or an error on failure.
func CheckPasswordHash(hash, password []byte) error {
	return bcrypt.CompareHashAndPassword(hash, password)
}

// SetAuthAndRefreshCookies sets auth&refresh tokens for a request
func SetAuthAndRefreshCookies(w *http.ResponseWriter, authTokenString, refreshTokenString string) {
	authCookie := http.Cookie{
		Name:     "AuthToken",
		Value:    "Bearer " + authTokenString,
		HttpOnly: true,
	}
	http.SetCookie(*w, &authCookie)

	refreshCookie := http.Cookie{
		Name:     "AuthToken",
		Value:    refreshTokenString,
		HttpOnly: true,
	}

	http.SetCookie(*w, &refreshCookie)
}
