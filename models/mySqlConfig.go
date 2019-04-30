package models

// MySQLConfig model for pulling config data from the yaml file
type MySQLConfig struct {
	User, Password, DBName, Charset, ParseTime, Loc string
}
