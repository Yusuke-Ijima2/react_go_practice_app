//API出力する際のDBのデータを格納する構造体を作成します。
package model

import "time"

type User struct {
	Id              int         `gorm:"primaryKey" json:"id"`
	First_name      string      `json:"first_name"`
	Family_name     string      `json:"family_name"`
	Email           string      `json:"email"`
	User_status_txt string      `json:"user_status_txt"`
	User_status     User_status `gorm:"foreignKey:Id" json:"user_status"`
	Created_at      time.Time   `json:"created_at"`
	Updated_at      time.Time   `json:"updated_at"`
	Deleted_at      *time.Time  `json:"deleted_at"`
}

type User_status struct {
	Id         string     `gorm:"primaryKey" json:"id"`
	StatusName string     `json:"status_name"`
	Created_at time.Time  `json:"created_at"`
	Updated_at time.Time  `json:"updated_at"`
	Deleted_at *time.Time `json:"deleted_at"`
}
