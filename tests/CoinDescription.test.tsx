import { render, screen } from "@testing-library/react";
import { it, describe, expect } from "vitest";
import CoinDescription from "../src/pagecomponents/CoinDescription";
import React from "react";
import { MemoryRouter } from "react-router";
import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";

describe("coin description", () => {
  it("should render coin description data for selected coin and link to portfolio", () => {
    const { container } = render(
      <MemoryRouter>
        <CoinDescription coinDescription={[]} />
      </MemoryRouter>
    );
    const descHeader = screen.getByText(/all about/i);
    expect(descHeader).toBeInTheDocument();

    const descriptionData = container.getElementsByClassName("desc-data");
    expect(descriptionData).toBeTruthy();

    const descriptionText = container.getElementsByClassName("coin-desc-text");
    expect(descriptionText).toBeTruthy();
  });
});

describe("portfolio link", () => {
  const user = userEvent.setup();
  it("should render portfolio page when navigating to portfolio page", async () => {
    const { getByText } = render(
      <MemoryRouter>
        <CoinDescription coinDescription={[]} />
      </MemoryRouter>
    );
    const portfolioLink = getByText(/portfolio/i);
    expect(portfolioLink).toBeInTheDocument();
    expect(portfolioLink.getAttribute("href")).toBe("/portfolio");
    await user.click(portfolioLink);
  });
});
