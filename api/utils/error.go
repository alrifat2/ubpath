package utils

import "net/http"

// WriteError writes a JSON error response with the specified status code and error message.
//
// Parameters:
//   - w: http.ResponseWriter - The HTTP response writer
//   - statusCode: int - HTTP status code to be set in the response
//   - err: error - The error to be converted into a JSON response
//
// Returns:
//   - error: Returns nil if successful, or an error if JSON encoding fails
//
// The error response will be in the format: {"error": "error message"}
func WriteError(w http.ResponseWriter, statusCode int, err error) error {
	return WriteJSON(w, statusCode, map[string]string{"error": err.Error()})
}
