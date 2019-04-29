package utils

import (
	"crypto/rand"
	"encoding/base64"
)

// generateRandomBytes returns securely generated random bytes.
// It will return an error if the system's secure random
// number generator fails to function correctly, in which
// case the caller should not continue.
func generateRandomBytes(length int) ([]byte, error) {
	byteArray := make([]byte, length)

	_, err := rand.Read(byteArray)

	if err != nil {
		return nil, err
	}

	return byteArray, nil
}

// GenerateRandomString returns a URL-safe, base64 encoded
// securely generated random string.
// It will return an error if the system's secure random
// number generator fails to function correctly
func GenerateRandomString(length int) (string, error) {
	byteArray, err := generateRandomBytes(length)
	return base64.URLEncoding.EncodeToString(byteArray), err
}
