package db

import (
	"context"
	"fmt"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
)

var (
	pool *pgxpool.Pool
)

func InitDB() error {
	connStr := fmt.Sprintf(
		"postgres://%s:%s@%s:%s/%s",
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASSWORD"),
		os.Getenv("DB_HOST"),
		os.Getenv("DB_PORT"),
		os.Getenv("DB_NAME"),
	)

	config, err := pgxpool.ParseConfig(connStr)
	if err != nil {
		return fmt.Errorf("error parsing config: %v", err)
	}

	config.MaxConns = 10
	config.MinConns = 2

	pool, err = pgxpool.NewWithConfig(context.Background(), config)
	if err != nil {
		return fmt.Errorf("unable to create connection pool: %v", err)
	}

	if err := pool.Ping(context.Background()); err != nil {
		return fmt.Errorf("unable to ping database: %v", err)
	}

	fmt.Println("Successfully connected to database!")
	return nil
}

func GetPool() *pgxpool.Pool {
	return pool
}

func ClosePool() {
	if pool != nil {
		pool.Close()
	}
}
