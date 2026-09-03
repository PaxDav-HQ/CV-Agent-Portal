// src/utils/errorParser.js

const cleanQuotes = (str) => (typeof str === "string" ? str.replace(/\"/g, "") : str);

export const extractErrorMessage = (
  err,
  fallback = "An unexpected error occurred. Please try again."
) => {
  if (!err) return fallback;

  // Direct string input
  if (typeof err === "string") return err;

  // 1. If backend didn't respond (Network failure, timeout, CORS)
  if (!err.response) {
    if (err.code === "ECONNABORTED") return "Request timed out. Please check your internet connection.";
    if (err.message === "Network Error") return "Network error. Please check your internet connection.";
    return err.message || fallback;
  }

  const { data, status } = err.response;

  // 2. If data is completely missing or empty
  if (!data) {
    if (status === 401) return "Session expired. Please log in again.";
    if (status === 403) return "You do not have permission to perform this action.";
    if (status === 404) return "The requested resource was not found.";
    if (status >= 500) return "Server error. Our team has been notified. Please try again later.";
    return fallback;
  }

  // 3. If the backend returned a simple string
  if (typeof data === "string") {
    return data.trim().startsWith("<") ? "Server error occurred. Please try again later." : data;
  }

  // 4. Nested validation details array (e.g. data.error.details or data.details)
  // Catches: { error: { code: "VALIDATION_ERROR", details: [{ field: "code", message: "\"code\" length..." }] } }
  const nestedDetails = data.error?.details || data.details;
  if (Array.isArray(nestedDetails) && nestedDetails.length > 0) {
    const detailMessages = nestedDetails
      .map((item) => {
        if (typeof item === "string") return cleanQuotes(item);
        const msg = item.message || item.msg || item.error || "";
        return cleanQuotes(msg);
      })
      .filter(Boolean);

    if (detailMessages.length > 0) {
      return detailMessages.join(" • ");
    }
  }

  // 5. Array of errors: e.g. { errors: ["..."] } or { message: [...] }
  const arrayCandidate = Array.isArray(data.errors)
    ? data.errors
    : Array.isArray(data.message)
    ? data.message
    : Array.isArray(data)
    ? data
    : null;

  if (arrayCandidate && arrayCandidate.length > 0) {
    return arrayCandidate
      .map((item) => {
        if (typeof item === "string") return cleanQuotes(item);
        return cleanQuotes(item.message || item.msg || item.error || JSON.stringify(item));
      })
      .join(" • ");
  }

  // 6. Key-Value validation maps: e.g. { errors: { email: ["Invalid email"] } }
  const objectCandidate =
    typeof data.errors === "object" && data.errors !== null && !Array.isArray(data.errors)
      ? data.errors
      : typeof data.fields === "object" && data.fields !== null && !Array.isArray(data.fields)
      ? data.fields
      : null;

  if (objectCandidate) {
    const errorStrings = [];
    for (const [key, val] of Object.entries(objectCandidate)) {
      const formattedKey = key.replace(/_/g, " ").replace(/^\w/, (c) => c.toUpperCase());
      if (typeof val === "string") {
        errorStrings.push(`${formattedKey}: ${cleanQuotes(val)}`);
      } else if (Array.isArray(val)) {
        errorStrings.push(`${formattedKey}: ${val.map(cleanQuotes).join(", ")}`);
      } else if (val && typeof val === "object") {
        errorStrings.push(`${formattedKey}: ${cleanQuotes(val.message || val.msg || JSON.stringify(val))}`);
      }
    }
    if (errorStrings.length > 0) {
      return errorStrings.join(" • ");
    }
  }

  // 7. Nested error object message without details: { error: { message: "Something broke" } }
  if (data.error && typeof data.error === "object" && typeof data.error.message === "string" && data.error.message.trim()) {
    return cleanQuotes(data.error.message);
  }

  // 8. Top-level standard string properties
  if (typeof data.message === "string" && data.message.trim()) return cleanQuotes(data.message);
  if (typeof data.error === "string" && data.error.trim()) return cleanQuotes(data.error);
  if (typeof data.detail === "string" && data.detail.trim()) return cleanQuotes(data.detail);

  // 9. Fallback
  return fallback;
};