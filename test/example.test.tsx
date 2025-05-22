import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import * as RTL from "@testing-library/react";
import "@testing-library/jest-dom";

// Simple example component to test
const ExampleComponent = ({ title }: { title: string }) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>This is an example component for testing</p>
    </div>
  );
};

describe("Example Component", () => {
  it("renders correctly with provided title", () => {
    const { getByText } = render(<ExampleComponent title="EducaWeb Test" />);
    expect(getByText("EducaWeb Test")).toBeInTheDocument();
    expect(
      getByText("This is an example component for testing")
    ).toBeInTheDocument();
  });
});
