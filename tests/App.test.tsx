import { render, screen } from "@testing-library/react";
import { it, expect, describe } from "vitest";
import "@testing-library/jest-dom/vitest";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import App from "../src/App";

describe("App", () => {
  it("should render home page", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
    const homeSearchInput = screen.getByPlaceholderText(/search currency/i);
    expect(homeSearchInput).toBeInTheDocument();
  });

  it("should render portfolio page when navigating to portfolio page", () => {
    render(
      <MemoryRouter initialEntries={["/portfolio"]}>
        <App />
      </MemoryRouter>
    );

    const portfolioHeading = screen.getByRole("heading", { level: 4 });
    expect(portfolioHeading).toBeInTheDocument();
  });

  it("should render coin description page when navigating to coin-description page", () => {
    render(
      <MemoryRouter initialEntries={["/coin-description/coinName"]}>
        <App />
      </MemoryRouter>
    );

    const descHeader = screen.getByText(/all about/i);
    expect(descHeader).toBeInTheDocument();
  });
});
