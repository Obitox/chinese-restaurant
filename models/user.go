package models

import (
	"crypto/rsa"
	"errors"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"regexp"
	"restaurant-app/db"
	"strconv"
	"time"

	jwt "github.com/dgrijalva/jwt-go"
	uuid "github.com/satori/go.uuid"
	"golang.org/x/crypto/bcrypt"
)

// User represents a model for a real user inside the Application
// Roles: Admin & Customer (Default)
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
	UserID                                                                                                             uint64 `gorm:"primary_key"`
	Username, Password, Role, FirstName, LastName, Address1, Address2, Address3, Phone, Email, RequestAntiForgeryToken string
	IsDeleted                                                                                                          int8
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

// GetAllUsers returns all users inside the DB
func GetAllUsers() []User {
	conn, err := db.MySQLConnect()
	defer conn.Close()

	if err != nil {
		log.Println(err)
		return []User{}
	}

	users := []User{}
	conn.Where("is_deleted=?", 0).Find(&users)

	return users
}

// AddUser Adds a new user to DB and returns the UserID of new user
func (user *User) AddUser() (UserID uint64, err error) {
	conn, err := db.MySQLConnect()
	defer conn.Close()

	if err != nil {
		log.Println(err)
		return 0, err
	}

	tempUser := User{}

	conn.Select("user_id").Where("username=?", user.Username).Find(&tempUser)

	if tempUser.UserID != 0 {
		log.Println("User already exist in the DB")
		return 0, errors.New("User with username " + user.Username + " already exist in the DB")
	}

	byteArray, hashingError := user.HashPassword()
	if hashingError != nil {
		log.Println(hashingError)
		return 0, hashingError
	}

	user.Password = string(byteArray)
	user.IsDeleted = 0

	createError := conn.Create(&user)
	return tempUser.UserID, createError.Error
}

// UpdateUser updates a user
// Admin feature
// FIXME: Can't update password
func (user User) UpdateUser() (err error) {
	conn, err := db.MySQLConnect()
	defer conn.Close()

	if err != nil {
		log.Println(err)
		return err
	}

	conn.Save(&user)

	return nil
}

// DeleteUser Deletes a user
// Admin feature
func (user *User) DeleteUser() (err error) {
	conn, err := db.MySQLConnect()
	defer conn.Close()

	if err != nil {
		log.Println(err)
		return err
	}

	log.Println("WORKS")
	// conn.Model(&user).Select("is_deleted").Updates(map[string]interface{}{"is_deleted": 1})

	user.IsDeleted = 1
	conn.Save(&user)

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

	temp := user.Password

	conn.Where("username=?", user.Username).First(&user)

	err = CheckPasswordHash([]byte(user.Password), []byte(temp))

	if err != nil {
		return err
	}

	return nil
}

// CreateUser adds a new user to the MySQL DB
func (user *User) CreateUser() (err error) {
	conn, err := db.MySQLConnect()
	defer conn.Close()

	if err != nil {
		log.Println(err)
		return err
	}

	tempUser := User{}

	conn.Select("user_id").Where("username=?", user.Username).Find(&tempUser)

	if tempUser.UserID != 0 {
		log.Println("User already exist in the DB")
		return errors.New("User with username " + user.Username + " already exist in the DB")
	}

	byteArray, hashingError := user.HashPassword()
	if hashingError != nil {
		log.Println(hashingError)
		return hashingError
	}

	user.Password = string(byteArray)
	user.IsDeleted = 0

	createError := conn.Create(&user)
	return createError.Error
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

	_, insertError := client.HMSet(strconv.FormatUint(id, 10), tokens).Result()
	if insertError != nil {
		log.Println(insertError)
		return insertError
	}

	return nil
}

func createAuthTokenString(id uint64, role string) (authTokenString string, err error) {
	authTokenExp := time.Now().Add(AuthTokenValidTime).Unix()

	authTokenClaims := TokenClaims{
		jwt.StandardClaims{
			Subject:   strconv.FormatUint(id, 10),
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
		Name:     "RefreshToken",
		Value:    refreshTokenString,
		HttpOnly: true,
	}

	http.SetCookie(*w, &refreshCookie)
}

// SetCsrfCookie sets cookie for current form, changes for every form request
func SetCsrfCookie(w http.ResponseWriter, csrf string) {
	expires := time.Now().AddDate(0, 0, 1)

	csrfCookie := http.Cookie{
		Name:  "RequestAntiForgeryToken",
		Value: csrf,
		// Domain:  "127.0.0.1",
		Expires: expires,
	}
	http.SetCookie(w, &csrfCookie)
}

// GetAuthTokenWithUserID accepts id with which it queries the redis db and retrieves a AuthToken at given id
func GetAuthTokenWithUserID(id uint64) (string, error) {
	client, err := db.RedisConnect()
	defer client.Close()

	if err != nil {
		log.Println(err)
		return "", err
	}

	authToken, err := client.HGet(strconv.FormatUint(id, 10), "AuthToken").Result()
	if err != nil {
		log.Println(err)
		return "", err
	}

	return authToken, nil
}

// GetRefreshTokenWithUserID accepts id with which it queries the redis db and retrieves a Refresh Token at given id
func GetRefreshTokenWithUserID(id uint64) (string, error) {
	client, err := db.RedisConnect()
	defer client.Close()

	if err != nil {
		log.Println(err)
		return "", err
	}

	refToken, err := client.HGet(strconv.FormatUint(id, 10), "RefreshToken").Result()
	if err != nil {
		log.Println(err)
		return "", err
	}

	return refToken, nil
}

// RevokeUserTokensWithUserID accepts userID and based on it deletes hashset in redis db
func RevokeUserTokensWithUserID(id uint64) (int64, error) {
	client, err := db.RedisConnect()
	defer client.Close()

	if err != nil {
		log.Println(err)
		return 0, err
	}

	delNum, deleteError := client.Del(strconv.FormatUint(id, 10)).Result()
	if deleteError != nil {
		log.Println(deleteError)
		return 0, deleteError
	}

	return delNum, nil
}

// Validate - performs regex check for all fields
// True - OK
// False - Failed
func (user User) Validate() bool {
	validUsername := regexp.MustCompile(`^[A-Za-z]{1}[A-Za-z0-9]{3,19}$`)
	validPassword := regexp.MustCompile(`^[A-Za-z0-9!@#$^&]{6,20}$`)
	validEmail := regexp.MustCompile(`^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$`)
	validFirstName := regexp.MustCompile(`^[A-Z]{1}[a-z]{1,99}$`)
	validLastName := regexp.MustCompile(`^[A-Z]{1}[a-z]{1,99}$`)
	validAddress1 := regexp.MustCompile(`^[A-Za-z0-9]{1,}[. ]{0,}[A-Za-z0-9 \/.]{0,}$`)
	validPhone := regexp.MustCompile(`^06[0-9]{2,8}$`)

	if validUsername.MatchString(user.Username) &&
		validPassword.MatchString(user.Password) &&
		validEmail.MatchString(user.Email) &&
		validFirstName.MatchString(user.FirstName) &&
		validLastName.MatchString(user.LastName) &&
		validAddress1.MatchString(user.Address1) &&
		validPhone.MatchString(user.Phone) {
		return true
	}
	return false
}
