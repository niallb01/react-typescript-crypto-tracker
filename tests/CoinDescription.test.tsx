import { render, screen } from "@testing-library/react";
import { it, describe, expect } from "vitest";
import CoinDescription from "../src/pages/CoinDescription";
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

describe("portfolio and home link", () => {
  const user = userEvent.setup();
  it("should render portfolio and home page when navigating to pages", async () => {
    const { getByText, container } = render(
      <MemoryRouter>
        <CoinDescription coinDescription={[]} />
      </MemoryRouter>
    );
    const portfolioLink = getByText(/portfolio/i);
    expect(portfolioLink).toBeInTheDocument();
    expect(portfolioLink.getAttribute("href")).toBe("/portfolio");
    await user.click(portfolioLink);

    const portfolioIcon = document.querySelector(
      "svg"
    ) as unknown as HTMLImageElement;
    expect(portfolioIcon).toBeInTheDocument();

    const homeButton = container.getElementsByClassName("home-link-btn");
    expect(homeButton).toBeTruthy();

    const homeIcon = document.querySelector(
      "svg"
    ) as unknown as HTMLImageElement;
    expect(homeIcon).toBeInTheDocument();
  });
});
