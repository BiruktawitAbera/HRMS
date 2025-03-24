import { render, screen } from "@testing-library/react";
import App from "./App";
import { describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";
describe("App", () => {
  it("should have headline", () => {
    // eslint-disable-next-line react/react-in-jsx-scope
    render(<App />);
    expect(screen.getByText(/vitest/i)).toBeInTheDocument();
  });
  it("should toggle notification", async () => {
    // eslint-disable-next-line react/react-in-jsx-scope
    render(<App />);
    expect(screen.getByRole("alert")).toHaveClass("d-none");
    await userEvent.click(screen.getByRole("button"));
    expect(screen.getByRole("alert")).not.toHaveClass("d-none");
  });
});