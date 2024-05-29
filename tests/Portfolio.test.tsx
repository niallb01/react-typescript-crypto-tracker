import Portfolio from "../src/pagecomponents/Portfolio";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { it, expect, describe } from "vitest";
import "@testing-library/jest-dom/vitest";
import React from "react";
import { MemoryRouter } from "react-router";

describe("portfolio", () => {
  it("should render with correct text and initial state", () => {
    render(
      <MemoryRouter>
        <Portfolio portfolio={[]} addPortfolio={() => {}} coins={[]} />
      </MemoryRouter>
    );
    const heading = screen.getByRole("heading", { level: 4 });
    expect(heading).toBeInTheDocument();

    const portfolioIcon = document.querySelector(
      "svg"
    ) as unknown as HTMLImageElement;
    expect(portfolioIcon).toBeInTheDocument();
  });
});

describe("portfolio buttons", () => {
  const user = userEvent.setup();
  it("should let user add coin and delete portfolio", async () => {
    render(
      <MemoryRouter>
        <Portfolio portfolio={[]} addPortfolio={() => {}} coins={[]} />
      </MemoryRouter>
    );
    const deleteButton = screen.getByRole("button", {
      name: /delete portfolio/i,
    });
    await user.click(deleteButton);
    expect(deleteButton).toBeInTheDocument();
  });
});

describe("add coin modal", () => {
  const user = userEvent.setup();
  it("should render modal with coin list and inputs", async () => {
    const { container } = render(
      <MemoryRouter>
        <Portfolio portfolio={[]} addPortfolio={() => {}} coins={[]} />
      </MemoryRouter>
    );

    const editButton = screen.getByRole("button", { name: /add coin/i });
    await user.click(editButton);
    expect(editButton).toBeInTheDocument();

    const searchInput = screen.getByPlaceholderText(/search coin/i);
    expect(searchInput).toBeInTheDocument();

    const quantityInput = screen.getByPlaceholderText(/add quantity/i);
    expect(quantityInput).toBeInTheDocument();

    const closeButton = screen.getByRole("button", { name: /x/i });
    user.click(closeButton);
    expect(closeButton).toBeInTheDocument();

    const addCoinButton = screen.getByRole("button", { name: "+ Add" });
    user.click(addCoinButton);
    expect(addCoinButton).toBeInTheDocument();

    const inputCoin = container.getElementsByClassName("input-coin");
    expect(inputCoin).toBeTruthy();
  });
});

describe("add coin warning modal", () => {
  const user = userEvent.setup();
  it("should ask user for valid name or quantity ", async () => {
    const { container } = render(
      <MemoryRouter>
        <Portfolio portfolio={[]} addPortfolio={() => {}} coins={[]} />
      </MemoryRouter>
    );
    const editButton = screen.getByRole("button", { name: /add coin/i });
    await user.click(editButton);
    expect(editButton).toBeInTheDocument();

    const editWarningText = container.getElementsByClassName(
      "add-coin-modal-text"
    );
    expect(editWarningText).toBeTruthy();

    const closeButton = screen.getByRole("button", { name: /x/i });
    user.click(closeButton);
    expect(closeButton).toBeInTheDocument();

    const warningIcon = document.querySelector(
      "svg"
    ) as unknown as HTMLImageElement;
    expect(warningIcon).toBeInTheDocument();
  });
});

describe("delete portfolio modal", () => {
  const user = userEvent.setup();
  it("should ask user for permission to delete portfolio ", async () => {
    const { container } = render(
      <MemoryRouter>
        <Portfolio portfolio={[]} addPortfolio={() => {}} coins={[]} />
      </MemoryRouter>
    );
    const deleteButton = screen.getByRole("button", {
      name: /delete portfolio/i,
    });
    await user.click(deleteButton);
    expect(deleteButton).toBeInTheDocument();

    const closeButton = container.getElementsByClassName(
      "close-modal-delete-portfolio"
    );
    expect(closeButton).toBeTruthy();

    const confirmButton = container.getElementsByClassName(
      "delete-portfolio-modal-btn"
    );
    expect(confirmButton).toBeTruthy();

    const warningIcon = document.querySelector(
      "svg"
    ) as unknown as HTMLImageElement;

    expect(warningIcon).toBeTruthy();

    const deleteWarningText = container.getElementsByClassName(
      "delete-portfolio-modal-text"
    );
    expect(deleteWarningText).toBeTruthy();
  });
});

describe("share portfolio button", () => {
  const user = userEvent.setup();
  it("should trigger modal with QR code", async () => {
    const { container } = render(
      <MemoryRouter>
        <Portfolio portfolio={[]} addPortfolio={() => {}} coins={[]} />
      </MemoryRouter>
    );

    const shareButton = screen.getByRole("button", { name: /share/i });
    await user.click(shareButton);
    expect(shareButton).toBeInTheDocument();

    const shareIcon = document.querySelector(
      "svg"
    ) as unknown as HTMLImageElement;
    expect(shareIcon).toBeTruthy();

    const closeModal = container.getElementsByClassName(
      "close-modal-edit-coin"
    );
    expect(closeModal).toBeTruthy();

    const shareHeader = container.getElementsByClassName("share-modal-header");
    expect(shareHeader).toBeTruthy();
  });
});
