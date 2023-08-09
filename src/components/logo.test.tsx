import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Logo from "./logo";

describe("Logo Component", () => {
  it("renders without crashing", () => {
    render(<Logo />);
  });

  it("displays the logo text", () => {
    render(<Logo />);
    const logoText = screen.getByText("AstroQuest");
    expect(logoText).toBeInTheDocument();
  });

  it("renders a link when 'linkToHome' prop is true", () => {
    render(<Logo linkToHome={true} />);
    const logoLink = screen.getByRole("link", { name: "AstroQuest" });
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute("href", "/home");
  });

  it("does not render a link when 'linkToHome' prop is false", () => {
    render(<Logo />);
    const logoLink = screen.queryByRole("link", { name: "AstroQuest" });
    expect(logoLink).not.toBeInTheDocument();
  });
});
