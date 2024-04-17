import { render, screen } from "@testing-library/react";
import { it, expect, describe } from "vitest";
import Home from "../src/pagecomponents/Home";
import React from "react";
import { MemoryRouter } from "react-router";
import "@testing-library/jest-dom/vitest";

describe("home", () => {
  it("should render with correct text and initial state", () => {
    const { getByText } = render(
      // props that are being sent in need to be declared to test
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
