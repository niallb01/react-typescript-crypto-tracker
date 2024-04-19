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

    const editButton = screen.getByRole("button", { name: /add coin/i });
    await user.click(editButton);
    expect(editButton).toBeInTheDocument();

    // delete button - function needs to
    const deleteButton = screen.getByRole("button", {
      name: /delete portfolio/i,
    });
    await user.click(deleteButton);
    expect(deleteButton).toBeInTheDocument();
  });
});

// test modals
