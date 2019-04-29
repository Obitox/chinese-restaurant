package middleware

import (
	"crypto/rsa"
	"io/ioutil"

	"github.com/dgrijalva/jwt-go"
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

func CreateAuthAndRefreshToken(){

}

func StoreAuthAndRefreshToken

// func CreateNewTokens(uuid, role string) (authTokenString, refreshTokenString, csrfSecret string, err error){
// 	csrfSecret, err = utils.GenerateRandomString(32)
// 	if err != nil {
// 		Log.Printf(err)
// 		return
// 	}

// 	refreshTokenString, err = creat
// }

