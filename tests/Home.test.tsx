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
        <Home
          coins={[]}
          portfolio={[]}
          addPortfolio={function (
            portfolio: {
              id: string;
              symbol: string;
              name: string;
              image: string;
              current_price: number;
              market_cap: number;
              market_cap_rank: number;
              fully_diluted_valuation: number;
              total_volume: number;
              volume: number;
              price_change_24h: number;
              twentyFourHour: number;
              price_change_percentage_24h: number;
              quantity: string | undefined;
              coin: string;
              filtered: object;
              item: object;
            }[]
          ): void {
            throw new Error("Function not implemented.");
          }}
        />
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
