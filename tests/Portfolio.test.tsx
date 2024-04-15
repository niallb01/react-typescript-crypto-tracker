import Portfolio from "../src/pagecomponents/Portfolio";
import { render, screen } from "@testing-library/react";
import { it, expect, describe } from "vitest";
import "@testing-library/jest-dom/vitest";
import React from "react";
import { MemoryRouter } from "react-router";

describe("portfolio", () => {
  it("should render with correct text and initial state", () => {
    render(
      <MemoryRouter>
        <Portfolio
          portfolio={[]}
          addPortfolio={function (coin: object): void {
            throw new Error("Function not implemented.");
          }}
          coins={[]}
        />
      </MemoryRouter>
    );
    // find header
    const heading = screen.getByRole("heading", { level: 4 });
    expect(heading).toBeInTheDocument();

    // find edit btn
    const editButton = screen.getByRole("button", { name: /add coin/i });
    expect(editButton).toBeInTheDocument();

    // delete button
    const deleteButton = screen.getByRole("button", {
      name: /delete portfolio/i,
    });
    expect(deleteButton).toBeInTheDocument();
  });
});
