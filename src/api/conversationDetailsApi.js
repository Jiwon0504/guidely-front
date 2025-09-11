// src/api/conversationDetailsApi.js
// Conversation details API client for fetching a conversation with messages

import { API_BASE_URL } from "./conversationsApi";

/**
 * GET /api/conversations/{conversationId}
 * Retrieves conversation details with messages (paginated)
 *
 * @param {number|string} conversationId - Conversation/session identifier
 * @param {Object} [options]
 * @param {number} [options.page=0] - Page number (0-based)
 * @param {number} [options.size=20] - Page size
 * @param {Object} [options.headers] - Additional headers to merge
 * @param {number} [options.timeoutMs=15000] - Request timeout in milliseconds
 * @returns {Promise<{ success: boolean; data?: { sessionId: number; status: string; messages: Array<{ messageId: number; role: string; content: string; createdAt: string }>; total: number }; error?: { code?: string; message?: string; details?: any }; timestamp?: string }>} Parsed API response
 */
export async function getConversation(conversationId, options = {}) {
  const { page = 0, size = 20, headers = {}, timeoutMs = 15000 } = options;

  if (conversationId == null || conversationId === "") {
    return {
      success: false,
      error: { code: "INVALID_ARGUMENT", message: "conversationId is required" },
      timestamp: new Date().toISOString(),
    };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const url = new URL(`${API_BASE_URL}/api/conversations/${encodeURIComponent(conversationId)}`);
    url.searchParams.set("page", String(page));
    url.searchParams.set("size", String(size));

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        Accept: "application/json",
        ...headers,
      },
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

    return payload;
  } catch (err) {
    if (err?.name === "AbortError") {
      return {
        success: false,
        error: {
          code: "TIMEOUT",
          message: `getConversation timed out after ${timeoutMs}ms`,
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


