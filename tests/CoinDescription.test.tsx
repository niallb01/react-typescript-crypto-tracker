import { render, screen } from "@testing-library/react";
import { it, describe, expect } from "vitest";
import CoinDescription from "../src/pagecomponents/CoinDescription";
import React from "react";
import { MemoryRouter } from "react-router";
import "@testing-library/jest-dom/vitest";

describe("coin description", () => {
  it("should render coin description data for selected coin and link to portfolio", () => {
    // check typeof coinDescription={[]}
    const { getByText } = render(
      <MemoryRouter>
        <CoinDescription coinDescription={[]} />
      </MemoryRouter>
    );
    const descHeader = screen.getByText(/all about/i);
    expect(descHeader).toBeInTheDocument();

    const portfolioLink = getByText(/portfolio/i);
    expect(portfolioLink).toBeInTheDocument();
    expect(portfolioLink.getAttribute("href")).toBe("/portfolio");
  });
});
