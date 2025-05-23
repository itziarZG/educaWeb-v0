import { describe, it, expect, vi, beforeEach } from "vitest";
import { sendMessageToAgent, getConversationHistory } from "@/services/agentService";

// Mock fetch
global.fetch = vi.fn();

describe("Agent Service", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe("sendMessageToAgent", () => {
    it("sends a message to the agent and returns the response", async () => {
      // Mock a successful response
      const mockResponse = {
        message: "This is a test response",
        htmlContent: "<p>Test HTML content</p>",
        conversationId: "test-convo-id",
      };

      // Set up fetch mock
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      // Call the service
      const result = await sendMessageToAgent("Hello, agent!", "junior");

      // Check the result
      expect(result).toEqual(mockResponse);

      // Verify fetch was called correctly
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/agents/AGENT_JUNIOR_ID/chat"),
        expect.objectContaining({
          method: "POST",
          headers: expect.objectContaining({
            "Content-Type": "application/json",
          }),
          body: JSON.stringify({
            message: "Hello, agent!",
            conversationId: undefined,
            options: {
              includeHtmlContent: true,
            },
          }),
        })
      );
    });

    it("handles API errors gracefully", async () => {
      // Mock a failed response
      (global.fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

      // Call the service
      const result = await sendMessageToAgent("Hello, agent!", "junior");

      // Check that it returns an error
      expect(result).toHaveProperty("error");
      expect(result.message).toBe("");
    });

    it("handles network errors gracefully", async () => {
      // Mock a network error
      (global.fetch as any).mockRejectedValueOnce(new Error("Network error"));

      // Call the service
      const result = await sendMessageToAgent("Hello, agent!", "junior");

      // Check that it returns an error
      expect(result).toHaveProperty("error", "Network error");
      expect(result.message).toBe("");
    });

    it("respects the conversationId parameter for continuing conversations", async () => {
      // Mock a successful response
      const mockResponse = {
        message: "This is a follow-up response",
        htmlContent: "<p>Follow-up HTML content</p>",
        conversationId: "existing-convo-id",
      };

      // Set up fetch mock
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      // Call the service with a conversation ID
      const result = await sendMessageToAgent(
        "Follow-up question",
        "senior",
        "existing-convo-id"
      );

      // Check the fetch call included the conversation ID
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/agents/AGENT_SENIOR_ID/chat"),
        expect.objectContaining({
          body: expect.stringContaining("existing-convo-id"),
        })
      );

      // Check the result
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getConversationHistory", () => {
    it("fetches conversation history for a given ID", async () => {
      // Mock conversation history response
      const mockMessages = [
        {
          content: "Hello, agent!",
          role: "user",
          timestamp: 1620000000000,
        },
        {
          content: "Hello! How can I help you?",
          role: "assistant",
          timestamp: 1620000001000,
        },
      ];

      // Set up fetch mock
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ messages: mockMessages }),
      });

      // Call the service
      const result = await getConversationHistory("test-convo-id", "middle");

      // Check the result
      expect(result).toEqual(mockMessages);

      // Verify fetch was called correctly
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/agents/AGENT_MIDDLE_ID/conversations/test-convo-id"),
        expect.objectContaining({
          method: "GET",
        })
      );
    });

    it("returns an empty array when the API call fails", async () => {
      // Mock a failed response
      (global.fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 404,
      });

      // Call the service
      const result = await getConversationHistory("invalid-id", "default");

      // Check that it returns an empty array
      expect(result).toEqual([]);
    });
  });
});
