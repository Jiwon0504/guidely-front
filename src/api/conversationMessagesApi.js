// src/api/conversationMessagesApi.js
// Conversation messages API client for posting a new message to a conversation

import { API_BASE_URL } from "./conversationsApi";

/**
 * POST /api/conversations/{conversationId}/messages
 * Posts a message to an existing conversation.
 *
 * @param {number|string} conversationId - Conversation/session identifier
 * @param {{ role?: 'USER'|'ASSISTANT'|'SYSTEM', content: string }} body - Message payload
 * @param {Object} [options]
 * @param {Object} [options.headers] - Additional headers to merge
 * @param {number} [options.timeoutMs=15000] - Request timeout in milliseconds
 * @returns {Promise<{ success: boolean; data?: { messageId: number; sessionId: number; role: string; content: string; createdAt: string; assistantPreview?: string }; error?: { code?: string; message?: string; details?: any }; timestamp?: string }>} Parsed API response
 */
export async function postConversationMessage(conversationId, body, options = {}) {
  const { headers = {}, timeoutMs = 15000 } = options;

  if (conversationId == null || conversationId === "") {
    return {
      success: false,
      error: { code: "INVALID_ARGUMENT", message: "conversationId is required" },
      timestamp: new Date().toISOString(),
    };
  }

  if (!body || !body.content || typeof body.content !== "string") {
    return {
      success: false,
      error: { code: "INVALID_ARGUMENT", message: "body.content (string) is required" },
      timestamp: new Date().toISOString(),
    };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(`${API_BASE_URL}/api/conversations/${encodeURIComponent(conversationId)}/messages`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify({ role: body.role ?? "USER", content: body.content }),
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
          message: `postConversationMessage timed out after ${timeoutMs}ms`,
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


