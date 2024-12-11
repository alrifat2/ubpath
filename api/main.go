package main

import (
	"log"
	"net/http"

	"github.com/alrifat2/ubpath/db"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	// Load .env file
	if err := godotenv.Load(".env"); err != nil {
		log.Fatal("Error loading .env file")
	}

	if err := db.InitDB(); err != nil {
		panic(err)
	}
	defer db.ClosePool()

	r := gin.Default()

	r.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})

	r.Run(":8080")
}
