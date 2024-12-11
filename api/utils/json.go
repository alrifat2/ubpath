package utils

import (
	"encoding/json"
	"errors"
	"net/http"
)

// ParseJSON decodes a JSON request body into the provided payload structure.
//
// Parameters:
//   - r: *http.Request - The HTTP request containing the JSON body
//   - payload: any - A pointer to the structure where the JSON should be decoded
//
// Returns:
//   - error: Returns nil if successful, or an error if:
//   - The request body is nil
//   - JSON decoding fails
func ParseJSON(r *http.Request, payload any) error {
	if r.Body == nil {
		return errors.New("request body is null")
	}

	return json.NewDecoder(r.Body).Decode(payload)
}

// WriteJSON writes a JSON response with the specified status code and payload.
//
// Parameters:
//   - w: http.ResponseWriter - The HTTP response writer
//   - statusCode: int - HTTP status code to be set in the response
//   - payload: any - The data to be encoded as JSON in the response
//
// Returns:
//   - error: Returns nil if successful, or an error if JSON encoding fails
func WriteJSON(w http.ResponseWriter, statusCode int, payload any) error {
	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(statusCode)
	return json.NewEncoder(w).Encode(payload)
}
