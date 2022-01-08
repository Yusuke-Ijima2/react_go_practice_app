package dbconnect

import (
	"fmt"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

func Connect() *gorm.DB {
	db, err := gorm.Open("mysql", "root:d9rQ9uBa#@/go_api_db?charset=utf8&parseTime=True&loc=Local")
	if err != nil {
		fmt.Print("データベース接続に失敗しました。")
	}
	db.LogMode(true)
	return db
}
