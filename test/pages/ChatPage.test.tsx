import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ChatPage from "@/app/chat/page";

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useSearchParams: () => ({
    get: vi.fn().mockImplementation((param) => {
      if (param === 'agent') return 'junior';
      return null;
    }),
  }),
  useRouter: () => ({
    push: vi.fn(),
  }),
  Link: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

// Mock next/dynamic
vi.mock('next/dynamic', () => ({
  __esModule: true,
  default: () => {
    return function DynamicComponent(props: any) {
      return <div data-testid="dynamic-component" {...props} />;
    };
  },
}));

// Mock next/link
vi.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

// Mock AgentChat component
vi.mock('@/components/AgentChat', () => ({
  __esModule: true,
  default: ({ onHtmlContentUpdate, agentType }: any) => (
    <div data-testid="agent-chat" data-agent-type={agentType}>
      <button 
        data-testid="mock-send" 
        onClick={() => onHtmlContentUpdate("<p>Test HTML Content</p>")}
      >
        Mock Send
      </button>
    </div>
  ),
}));

// Mock html2pdf
vi.mock('html2pdf.js', () => ({
  __esModule: true,
  default: vi.fn().mockReturnValue({
    set: vi.fn().mockReturnThis(),
    from: vi.fn().mockReturnThis(),
    save: vi.fn(),
  }),
}));

describe("ChatPage Component", () => {
  // Mock window.open for the print function
  const originalOpen = window.open;
  
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock window resize for mobile detection
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024, // Desktop by default
    });
    
    // Mock window.open
    window.open = vi.fn().mockReturnValue({
      document: {
        write: vi.fn(),
        close: vi.fn(),
      },
      focus: vi.fn(),
      print: vi.fn(),
      close: vi.fn(),
    });
  });
  
  afterEach(() => {
    window.open = originalOpen;
  });

  it("renders the correct agent name from URL parameter", () => {
    render(<ChatPage />);
    expect(screen.getByText("🌈 Pequeños Exploradores")).toBeInTheDocument();
  });

  it("renders desktop layout on large screens", () => {
    // Set desktop width
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 1024,
    });
    
    const { container } = render(<ChatPage />);
    // Desktop layout doesn't use tabs
    expect(container.querySelector('[role="tablist"]')).not.toBeInTheDocument();
  });

  it("renders mobile layout with tabs on small screens", () => {
    // Set mobile width
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 500,
    });
    
    // Trigger resize event
    fireEvent(window, new Event('resize'));
    
    const { container } = render(<ChatPage />);
    // Check for tabs in mobile layout
    expect(container.querySelector('[role="tablist"]')).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /chat/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /visualización/i })).toBeInTheDocument();
  });

  it("updates the render area when HTML content is received", () => {
    render(<ChatPage />);
    
    // Find the mock send button from our mocked AgentChat
    const mockSendButton = screen.getByTestId('mock-send');
    
    // Simulate sending a message that produces HTML
    fireEvent.click(mockSendButton);
    
    // Check the render area has been updated
    const renderArea = document.querySelector('.render-area');
    expect(renderArea?.innerHTML).toContain("Test HTML Content");
  });

  it("passes the correct agent type to AgentChat component", () => {
    render(<ChatPage />);
    
    const agentChatComponent = screen.getByTestId('agent-chat');
    expect(agentChatComponent.getAttribute('data-agent-type')).toBe('junior');
  });
});
