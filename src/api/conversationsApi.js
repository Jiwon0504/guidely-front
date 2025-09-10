// src/api/conversationsApi.js
// Conversations API client for starting a new conversation session

/**
 * Resolve backend base URL from Vite env or fallback to provided Azure host.
 * Ensures there is no trailing slash.
 */
const API_BASE_URL = (import.meta?.env?.VITE_BACKEND_URL || "https://yerak-chat-cyfze4hnhbeaawc8.koreacentral-01.azurewebsites.net").replace(/\/$/, "");

/**
 * POST /api/conversations
 * Starts a new conversation session.
 *
 * @param {Object} [options]
 * @param {Object} [options.body] - Optional JSON payload (e.g., { userId, language })
 * @param {Object} [options.headers] - Additional headers to merge
 * @param {number} [options.timeoutMs=15000] - Request timeout in milliseconds
 * @returns {Promise<{ success: boolean; data?: { sessionId: number; status: string; startedAt: string }; error?: { code?: string; message?: string; details?: any }; timestamp?: string }>} Parsed API response
 */
export async function startConversation(options = {}) {
  const { body = {}, headers = {}, timeoutMs = 15000 } = options;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(`${API_BASE_URL}/api/conversations`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    const contentType = response.headers.get("content-type") || "";
    const isJson = contentType.includes("application/json");
    const payload = isJson ? await response.json() : await response.text();

    if (!response.ok) {
      const message = isJson && payload?.error?.message
        ? payload.error.message
        : `Request failed with status ${response.status}`;
      const error = {
        success: false,
        error: {
          code: String(response.status),
          message,
          details: isJson ? payload : { raw: payload },
        },
        timestamp: new Date().toISOString(),
      };
      throw Object.assign(new Error(message), { response, payload: error });
    }

    // Return parsed JSON (swagger-style shape expected)
    return payload;
  } catch (err) {
    if (err?.name === "AbortError") {
      return {
        success: false,
        error: {
          code: "TIMEOUT",
          message: `startConversation timed out after ${timeoutMs}ms`,
        },
        timestamp: new Date().toISOString(),
      };
    }

    return {
      success: false,
      error: {
        code: err?.response?.status ? String(err.response.status) : "NETWORK_ERROR",
        message: err?.message || "Network error",
        details: err?.payload || undefined,
      },
      timestamp: new Date().toISOString(),
    };
  } finally {
    clearTimeout(timeout);
  }
}

export { API_BASE_URL };


