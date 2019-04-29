package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"restaurant-app/utils"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gorilla/mux"
)

const (
	port     = ":8443"
	certFile = "certs\\ca.crt"
	keyFile  = "certs\\ca.key"
)

var jwtKey = []byte("DeusVult")

var users = map[string]string{
	"user1": "password1",
	"user2": "password2",
}

type Token struct {
	CsrfToken string `json:"token"`
}

// Credentials for the user login
type Credentials struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

// Claims for the JWT token
type Claims struct {
	Username string `json:"username"`
	jwt.StandardClaims
}

func main() {
	// errorChain := alice.New(loggerHandler, recoverHandler)
	muxHandler := mux.NewRouter()

	muxHandler.HandleFunc("/", rootHandler)
	muxHandler.HandleFunc("/token", tokenHandler)
	muxHandler.HandleFunc("/login", loginHandler)

	// Current APIS
	// muxHandler.Handle("/", errorChain.Then(muxHandler))
	// muxHandler.HandleFunc("/root", rootHandler)
	// muxHandler.HandleFunc("/login", loginHandler)
	// muxHandler.HandleFunc("/item", itemHandler)

	// Old code
	// muxHandler.HandleFunc("/login", loginHandler)
	// muxHandler.HandleFunc("/try", tryLoginHandler).Methods("GET")

	// server := &http.Server{
	// 	Addr: port,
	// 	TLSConfig: &tls.Config{
	// 		// Causes servers to use Go's default ciphersuite preferences,
	// 		// which are tuned to avoid attacks. Does nothing on clients.
	// 		PreferServerCipherSuites: true,
	// 		// Only use curves which have assembly implementations
	// 		CurvePreferences: []tls.CurveID{
	// 			tls.CurveP256,
	// 			tls.X25519, // Go 1.8 only
	// 		},
	// 	},
	// 	Handler: muxHandler,
	// }

	log.Printf("Service UP\n")
	serveError := http.ListenAndServe(":3000", muxHandler)

	if serveError != nil {
		log.Printf("Following error occured: %s", serveError)
	}

	// serverError := server.ListenAndServeTLS(certFile, keyFile)
	// if serverError != nil {
	// 	log.Fatal("ListenAndServe: ", serverError)
	// }
}

func rootHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Happend")
	fmt.Fprint(w, "Nobody should read this.")
}

func loggerHandler(h http.Handler) http.Handler {

	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()
		h.ServeHTTP(w, r)
		log.Printf("<< %s %s %v", r.Method, r.URL.Path, time.Since(start))
	})
}

func recoverHandler(next http.Handler) http.Handler {
	fn := func(w http.ResponseWriter, r *http.Request) {
		defer func() {
			if err := recover(); err != nil {
				log.Printf("panic: %+v", err)
				http.Error(w, http.StatusText(500), 500)
			}
		}()

		next.ServeHTTP(w, r)
	}

	return http.HandlerFunc(fn)
}

func loginHandler(w http.ResponseWriter, r *http.Request) {
	setupResponse(&w, r)
	if (*r).Method == "OPTIONS" {
		return
	}

	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		panic(err)
	}
	log.Println(string(body))
	var t Token
	err = json.Unmarshal(body, &t)
	if err != nil {
		panic(err)
	}
	fmt.Printf("Value is: %s", t.CsrfToken)

	// csrfToken := r.Header.Get("csrf-token")

	// if csrfToken == "" {
	// 	fmt.Fprintf(w, "I am being cheated")
	// }

	// fmt.Fprintf(w, csrfToken)

	// OLD CODE
	// var creds Credentials
	// err := json.NewDecoder(r.Body).Decode(&creds)
	// if err != nil {
	// 	w.WriteHeader(http.StatusBadRequest)
	// 	return
	// }

	// expectedPassword, ok := users[creds.Username]

	// if !ok || expectedPassword != creds.Password {
	// 	w.WriteHeader(http.StatusUnauthorized)
	// 	return
	// }

	// expirationTime := time.Now().Add(5 * time.Minute)

	// claims := &Claims{
	// 	Username: creds.Username,
	// 	StandardClaims: jwt.StandardClaims{
	// 		// In JWT, the expiry time is expressed as unix milliseconds
	// 		ExpiresAt: expirationTime.Unix(),
	// 	},
	// }

	// // Declare the token with the algorithm used for signing, and the claims
	// token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	// // Create the JWT string
	// tokenString, err := token.SignedString(jwtKey)
	// if err != nil {
	// 	// If there is an error in creating the JWT return an internal server error
	// 	w.WriteHeader(http.StatusInternalServerError)
	// 	return
	// }

	// // Finally, we set the client cookie for "token" as the JWT we just generated
	// // we also set an expiry time which is the same as the token itself
	// http.SetCookie(w, &http.Cookie{
	// 	Name:    "token",
	// 	Value:   tokenString,
	// 	Expires: expirationTime,
	// })
}

func tokenHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Hiya form Token")
	setupResponse(&w, r)
	if (*r).Method == "OPTIONS" {
		return
	}

	csrfToken, err := utils.GenerateRandomString(32)

	log.Printf("Value of the token is: %s", csrfToken)

	if err != nil {
		fmt.Println("Token generation failed!")
	}

	fmt.Printf("Value of the token: %s", csrfToken)

	token := Token{csrfToken}

	marshaledToken, jsonError := json.Marshal(token)
	if jsonError != nil {
		fmt.Println("Failed!")
		return
	}

	// r.Header.Add("csrf-token", csrfToken)
	w.Header().Set("Content-Type", "application/json")
	w.Write(marshaledToken)
	// w.Write(marshaledToken)
	// fmt.Fprintf(w, "Catch")
}

func itemHandler(w http.ResponseWriter, r *http.Request) {
	// We can obtain the session token from the requests cookies, which come with every request
	c, err := r.Cookie("token")
	if err != nil {
		if err == http.ErrNoCookie {
			// If the cookie is not set, return an unauthorized status
			w.WriteHeader(http.StatusUnauthorized)
			return
		}
		// For any other type of error, return a bad request status
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	// Get the JWT string from the cookie
	tknStr := c.Value

	// Initialize a new instance of `Claims`
	claims := &Claims{}

	// Parse the JWT string and store the result in `claims`.
	// Note that we are passing the key in this method as well. This method will return an error
	// if the token is invalid (if it has expired according to the expiry time we set on sign in),
	// or if the signature does not match
	tkn, err := jwt.ParseWithClaims(tknStr, claims, func(token *jwt.Token) (interface{}, error) {
		return jwtKey, nil
	})
	if !tkn.Valid {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}
	if err != nil {
		if err == jwt.ErrSignatureInvalid {
			w.WriteHeader(http.StatusUnauthorized)
			return
		}
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	// Finally, return the welcome message to the user, along with their
	// username given in the token
	w.Write([]byte(fmt.Sprintf("Welcome %s!", claims.Username)))
}

func setupResponse(w *http.ResponseWriter, req *http.Request) {
	// req.Header.Get(`origin`)
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	(*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
}
