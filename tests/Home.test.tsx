import { render, screen } from "@testing-library/react";
import { it, expect, describe, test } from "vitest";
import Home from "../src/pagecomponents/Home";
import React from "react";
import { MemoryRouter } from "react-router";
import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";

describe("home", () => {
  it("should render with correct text and initial state", () => {
    const { getByText } = render(
      <MemoryRouter>
        <Home coins={[]} portfolio={[]} addPortfolio={() => {}} />
      </MemoryRouter>
    );
    // test input/portfolio link
    const searchInput = screen.getByPlaceholderText(/search currency/i);
    expect(searchInput).toBeInTheDocument();
    // find portfolio link and test route
    const portfolioLink = getByText(/portfolio/i);
    expect(portfolioLink).toBeInTheDocument();
    expect(portfolioLink.getAttribute("href")).toBe("/portfolio");
  });
});

// test add coin to portfolio btn and toast
describe("portfolio button", () => {
  // const user = userEvent.setup();
  it("should add or remove portfolio coin", async () => {
    render(
      <MemoryRouter>
        <Home coins={[]} portfolio={[]} addPortfolio={() => {}} />
      </MemoryRouter>
    );
    const addCoin = document.querySelector(
      "svg"
    ) as unknown as HTMLImageElement;
    expect(addCoin).toBeInTheDocument();
  });
});
