package model

import "time"

type User struct {
	Id              int         `gorm:"primaryKey" json:"id"`
	First_name      string      `json:"first_name"`
	Family_name     string      `json:"family_name"`
	Email           string      `json:"email"`
	User_status_txt string      `json:"user_status_txt"`
	User_status     User_status `gorm:"foreignKey:User_status_id" json:"user_status"`
	Created_at      time.Time   `json:"created_at"`
	Updated_at      time.Time   `json:"updated_at"`
	Deleted_at      *time.Time  `json:"deleted_at"`
}

type User_status struct {
	Id             int        `gorm:"primaryKey" json:"id"`
	StatusName     string     `json:"status_name"`
	User_status_id int        `json:"user_status_id"`
	Created_at     time.Time  `json:"created_at"`
	Updated_at     time.Time  `json:"updated_at"`
	Deleted_at     *time.Time `json:"deleted_at"`
}
