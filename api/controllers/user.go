package controller

import (
	"fmt"
	"net/http"

	"Project/api/model"

	"github.com/labstack/echo"

	dbconnect "Project/api/database"
)

func UserList() echo.HandlerFunc {
	return func(c echo.Context) error {
		db := dbconnect.Connect()
		defer db.Close()
		user := []model.User{}
		result := db.Preload("User_status").Find(&user)
		if result.RecordNotFound() {
			fmt.Println("レコードが見つかりません")
		}
		return c.JSON(http.StatusOK, user)
	}
}

//共通
func CreateUser() echo.HandlerFunc {
	return func(c echo.Context) error {
		//Project/api/database/connect.goで定義したやつ。
		db := dbconnect.Connect()
		//この記述は絶対に必要でdeferを書くことでメソッド終了後に発動し、DBをCloseしてくれる。そのためこの下にメソッドを書いても問題ありません。
		defer db.Close()

		result := new(model.User)
		//c.Bind()でリクエストボディから更新データを取得。
		//err変数にc.Bindを入れてエラーがnilでなければエラーを返す。
		if err := c.Bind(result); err != nil {
			return err
		}
		// 基本的にCreate(),Update(),Delete()などは値ではなくアドレス(&XXX)を渡す。
		// &を使うことで変数のアドレスを参照することができる。
		db.Create(&result)
		return c.JSON(http.StatusOK, result)
	}
}

func UserShow() echo.HandlerFunc {
	return func(c echo.Context) error {
		db := dbconnect.Connect()
		defer db.Close()
		//データが複数になる場合は[]model.User{}で配列にしてあげればOK！！
		//実際にデータを格納する構造体を選択し、変数に入れる。
		user := model.User{}
		// :id(プレースホルダー)の値を取り出す
		user_id := c.Param("id")
		//DB内のusersデーブルを使用するの意味。
		//SelectでもってくカラムのデータをGORMの構造体の中に入れてJSONとして渡している。
		result := db.Preload("User_status").Find(&user, "id = ?", user_id)
		if result.RecordNotFound() {
			fmt.Println("レコードが見つかりません")
		}
		//上で定義した変数をここで呼び出してJSONにする。
		return c.JSON(http.StatusOK, user)
	}
}

func UpdateUser() echo.HandlerFunc {
	return func(c echo.Context) error {
		db := dbconnect.Connect()
		defer db.Close()

		newPost := new(model.User)
		if err := c.Bind(newPost); err != nil {
			return err
		}
		user_id := c.Param("id")
		if user_id != "" {
			post := model.User{}
			db.First(&post, "id = ?", user_id).Update(newPost)
			fmt.Println(post)
			return c.JSON(http.StatusOK, post)
		} else {
			return c.JSON(http.StatusNotFound, nil)
		}

	}
}

func DeleteUser() echo.HandlerFunc {
	return func(c echo.Context) error {
		db := dbconnect.Connect()
		defer db.Close()

		newDelete := new(model.User)
		user_id := c.Param("id")
		db.Delete(&newDelete, "id = ?", user_id)
		return c.JSON(http.StatusOK, newDelete)
	}
}

//User_status
func Creating() echo.HandlerFunc {
	return func(c echo.Context) error {
		//Project/api/database/connect.goで定義したやつ。
		db := dbconnect.Connect()
		//この記述は絶対に必要でdeferを書くことでメソッド終了後に発動し、DBをCloseしてくれる。そのためこの下にメソッドを書いても問題ありません。
		defer db.Close()

		result := new(model.User_status)
		//c.Bind()でリクエストボディから更新データを取得。
		//err変数にc.Bindを入れてエラーがnilでなければエラーを返す。
		if err := c.Bind(result); err != nil {
			return err
		}
		// 基本的にCreate(),Update(),Delete()などは値ではなくアドレス(&XXX)を渡す。
		// &を使うことで変数のアドレスを参照することができる。
		db.Create(&result)
		return c.JSON(http.StatusOK, result)
	}
}

func Update() echo.HandlerFunc {
	return func(c echo.Context) error {
		db := dbconnect.Connect()
		defer db.Close()

		newPost := new(model.User_status)
		if err := c.Bind(newPost); err != nil {
			return err
		}
		User_status_id := c.Param("user_status_id")
		if User_status_id != "" {
			post := model.User_status{}
			db.First(&post, "user_status_id = ?", User_status_id).Update(newPost)
			fmt.Println(post)
			return c.JSON(http.StatusOK, post)
		} else {
			return c.JSON(http.StatusNotFound, nil)
		}

	}
}

func Delete() echo.HandlerFunc {
	return func(c echo.Context) error {
		db := dbconnect.Connect()
		defer db.Close()

		newDelete := new(model.User_status)
		User_status_id := c.Param("user_status_id")
		db.Delete(&newDelete, "user_status_id = ?", User_status_id)
		return c.JSON(http.StatusOK, newDelete)
	}
}
