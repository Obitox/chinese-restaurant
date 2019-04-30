package middleware

import (
	"crypto/rsa"
	"io/ioutil"
	"log"
	"restaurant-app/db"
	"restaurant-app/models"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/satori/go.uuid"
)

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

// CreateAuthAndRefreshTokens
func CreateAndStoreAuthAndRefreshTokens(id uint64, role string) (authToken string, refreshToken string, err error) {
	authToken, err = createAuthTokenString(id, role)

	if err != nil {
		log.Println(err)
		return
	}

	refreshToken, err = createRefreshTokenString(id, role)

	if err != nil {
		log.Println(err)
		return
	}

	err = storeAuthAndRefreshTokens(id, authToken, refreshToken)

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
	authTokenExp := time.Now().Add(models.AuthTokenValidTime).Unix()

	authTokenClaims := models.TokenClaims{
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
	refreshTokenExp := time.Now().Add(models.RefreshTokenValidTime).Unix()

	jti, err := uuid.NewV4()
	if err != nil {
		log.Println(err)
		return refreshTokenString, err
	}

	refreshTokenClaims := models.TokenClaims{
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

// func CreateNewTokens(uuid, role string) (authTokenString, refreshTokenString, csrfSecret string, err error){
// 	csrfSecret, err = utils.GenerateRandomString(32)
// 	if err != nil {
// 		Log.Printf(err)
// 		return
// 	}

// 	refreshTokenString, err = creat
// }
