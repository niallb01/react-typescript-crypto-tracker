import { render, screen } from "@testing-library/react";
import { it, expect, describe } from "vitest";
import userEvent from "@testing-library/user-event";
import React from "react";
import EditCoin from "../src/portfoliocomponents/EditCoin";
import "@testing-library/jest-dom/vitest";

describe("edit coin", () => {
  const user = userEvent.setup();
  it("should render with correct text and initial state", async () => {
    const { container } = render(
      <EditCoin
        onDeletePortfolioCoin={() => {}}
        onUpdatePortfolioCoin={() => {}}
        name={""}
      />
    );

    const editButton = screen.getByRole("button", { name: /edit/i });
    await user.click(editButton);
    expect(editButton).toBeInTheDocument();

    const heading = screen.getByRole("heading", { level: 4 });
    expect(heading).toBeInTheDocument();

    const editCoin = container.getElementsByClassName("edit-coin-input");
    expect(editCoin).toBeTruthy();

    const closeButton = screen.getByRole("button", { name: /x/i });
    user.click(closeButton);
    expect(closeButton).toBeInTheDocument();

    const updateButton = screen.getByRole("button", { name: /update/i });
    user.click(updateButton);
    expect(updateButton).toBeInTheDocument();

    const deleteButton = screen.getByRole("button", { name: /delete/i });
    user.click(deleteButton);
    expect(deleteButton).toBeInTheDocument();
  });
});
