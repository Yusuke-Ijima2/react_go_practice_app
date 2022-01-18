package main

import (
	controller "Project/api/controllers"
	"net/http"

	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

func newRouter() *echo.Echo {
	e := echo.New()
	e.Use(middleware.CORS())
	// ルーティング
	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello, World!")
	})
	e.GET("user_list/id", controller.UserList())
	//共通
	e.POST("user_all/all", controller.CreateUser())
	e.GET("user_all/:id", controller.UserShow())
	e.PUT("user_all/:id", controller.UpdateUser())
	e.DELETE("user_all/:id", controller.DeleteUser())
	//User_status
	e.POST("user/user_status_id", controller.Creating())
	e.PUT("user/:user_status_id", controller.Update())
	e.DELETE("user/:user_status_id", controller.Delete())
	return e
}
