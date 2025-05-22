import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import AgentChat from "@/components/AgentChat";
import * as agentService from "@/services/agentService";

// Mock the agentService
vi.mock("@/services/agentService", () => ({
  sendMessageToAgent: vi.fn(),
}));

describe("AgentChat Component", () => {
  // Mock props
  const mockProps = {
    agentType: "default" as const,
    onHtmlContentUpdate: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the initial empty chat state", () => {
    const { getByText } = render(<AgentChat {...mockProps} />);

    expect(
      getByText("¡Haz una pregunta al agente educativo!")
    ).toBeInTheDocument();
  });
});
