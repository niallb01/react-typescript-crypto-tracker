import { render, screen, fireEvent } from "@testing-library/react";
import { it, expect, describe } from "vitest";
import Home from "../src/pages/Home";
import React from "react";
import { MemoryRouter } from "react-router";
import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";

describe("home", () => {
  it("should render with correct text and initial state", () => {
    render(
      <MemoryRouter>
        <Home
          coins={[]}
          portfolio={[]}
          addPortfolio={() => {}}
          authenticated={false}
          guest={false}
        />
      </MemoryRouter>
    );
    const searchInput = screen.getByPlaceholderText(/search currency/i);
    expect(searchInput).toBeInTheDocument();
  });
});

describe("portfolio link", () => {
  const user = userEvent.setup();
  it("should render portfolio page when navigating to portfolio page", async () => {
    const { getByText } = render(
      <MemoryRouter>
        <Home
          coins={[]}
          portfolio={[]}
          addPortfolio={() => {}}
          authenticated={false}
          guest={false}
        />
      </MemoryRouter>
    );
    const portfolioLink = getByText(/portfolio/i);
    await user.click(portfolioLink);
    expect(portfolioLink).toBeInTheDocument();
    expect(portfolioLink.getAttribute("href")).toBe("#");

    const portfolioIcon = document.querySelector(
      "svg"
    ) as unknown as HTMLImageElement;
    expect(portfolioIcon).toBeInTheDocument();
  });
});

describe("portfolio button", () => {
  const user = userEvent.setup();
  it("should add or remove coin from portfolio and trigger toast message", async () => {
    const { container } = render(
      <MemoryRouter>
        <Home
          coins={[]}
          portfolio={[]}
          addPortfolio={() => {}}
          authenticated={false}
          guest={false}
        />
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

describe("dropdown button", () => {
  const user = userEvent.setup();
  it("should trigger dropdown menu", async () => {
    render(
      <MemoryRouter>
        <Home
          coins={[]}
          portfolio={[]}
          addPortfolio={() => {}}
          authenticated={false}
          guest={false}
        />
      </MemoryRouter>
    );
    const dropdownButton = screen.getByRole("button", { name: /customise/i });
    await user.click(dropdownButton);
    expect(dropdownButton).toBeInTheDocument();

    const dropdownIcon = document.querySelector(
      "svg"
    ) as unknown as HTMLImageElement;
    expect(dropdownIcon).toBeInTheDocument();
  });
});

describe("dropdown content", () => {
  const user = userEvent.setup();
  it("should show metrics and switches that trigger sorting functions", async () => {
    render(
      <MemoryRouter>
        <Home
          coins={[]}
          portfolio={[]}
          addPortfolio={() => {}}
          authenticated={false}
          guest={false}
        />
      </MemoryRouter>
    );
    // before user event
    expect(screen.queryByText("Price Change")).not.toBeInTheDocument();
    expect(screen.queryByText("24hr")).not.toBeInTheDocument();
    expect(screen.queryByText("Metrics")).not.toBeInTheDocument();
    expect(screen.queryByText("FDV")).not.toBeInTheDocument();
    expect(screen.queryByText("MktCap")).not.toBeInTheDocument();
    expect(screen.queryByText("Volume")).not.toBeInTheDocument();

    // click on the dropdown button
    await user.click(screen.getByRole("button", { name: /customise/i }));

    // after user event, dropdown content should be in the dom
    expect(screen.getByText("Price Change")).toBeInTheDocument();
    expect(screen.getByText("24hr")).toBeInTheDocument();
    expect(screen.getByText("Metrics")).toBeInTheDocument();
    expect(screen.getByText("FDV")).toBeInTheDocument();
    expect(screen.getByText("MktCap")).toBeInTheDocument();
    expect(screen.getByText("Volume")).toBeInTheDocument();
  });
});

describe("dropdown handler", () => {
  it("dropdown closes when clicking outside", () => {
    let dropdownClosed = false;
    const { container } = render(
      <MemoryRouter>
        <Home
          coins={[]}
          portfolio={[]}
          addPortfolio={() => {}}
          authenticated={false}
          guest={false}
        />
      </MemoryRouter>
    );
    const dropdown = container.getElementsByClassName("dropdown");
    expect(dropdown.length).toBeGreaterThan(0);

    fireEvent.mouseDown(document.body);
    expect(dropdownClosed).toBe(false);
    fireEvent.mouseDown(document.body);
  });
});
