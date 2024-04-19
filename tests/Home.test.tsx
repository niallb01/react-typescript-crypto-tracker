import { render, screen } from "@testing-library/react";
import { it, expect, describe } from "vitest";
import Home from "../src/pagecomponents/Home";
import React from "react";
import { MemoryRouter } from "react-router";
import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";

describe("home", () => {
  it("should render with correct text and initial state", () => {
    render(
      <MemoryRouter>
        <Home coins={[]} portfolio={[]} addPortfolio={() => {}} />
      </MemoryRouter>
    );
    // test input
    const searchInput = screen.getByPlaceholderText(/search currency/i);
    expect(searchInput).toBeInTheDocument();
  });
});

describe("portfolio link", () => {
  const user = userEvent.setup();
  it("should render portfolio page when navigating to portfolio page", async () => {
    const { getByText } = render(
      <MemoryRouter>
        <Home coins={[]} portfolio={[]} addPortfolio={() => {}} />
      </MemoryRouter>
    );
    const portfolioLink = getByText(/portfolio/i);
    await user.click(portfolioLink);
    expect(portfolioLink).toBeInTheDocument();
    expect(portfolioLink.getAttribute("href")).toBe("/portfolio");
  });
});

// test adding coin to portfolio btn
describe("portfolio button", () => {
  const user = userEvent.setup();
  it("should add or remove coin from portfolio and trigger toast message", async () => {
    const { container } = render(
      <MemoryRouter>
        <Home coins={[]} portfolio={[]} addPortfolio={() => {}} />
      </MemoryRouter>
    );
    const addCoinButton = document.querySelector(
      "svg"
    ) as unknown as HTMLImageElement;
    await user.click(addCoinButton);
    expect(addCoinButton).toBeInTheDocument();
    // toast
    expect(container.firstChild).toHaveClass("Toastify");
    expect(container.firstChild).toBeTruthy();
  });
});
