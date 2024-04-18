import { getByRole, getByTestId, render, screen } from "@testing-library/react";
import { it, expect, describe, test } from "vitest";
import userEvent from "@testing-library/user-event";
import React from "react";
import EditCoin from "../src/portfoliocomponents/EditCoin";
import "@testing-library/jest-dom/vitest";

//() => {} - callback mocks function? - placeholder
describe("edit coin", () => {
  const user = userEvent.setup();
  it("should render with correct text and initial state", async () => {
    render(
      <EditCoin
        onDeletePortfolioCoin={() => {}}
        onUpdatePortfolioCoin={() => {}}
        name={""}
      />
    );
    // find edit button -
    const editButton = screen.getByRole("button", { name: /edit/i });
    await user.click(editButton);
    expect(editButton).toBeInTheDocument();

    // find heading
    const heading = screen.getByRole("heading", { level: 4 });
    expect(heading).toBeInTheDocument();
    // test text inputs

    // close btn
    const closeButton = screen.getByRole("button", { name: /x/i });
    await user.click(closeButton);
    // expect(closeButton).toBeInTheDocument();

    // const updateButton = screen.getByRole("button", { name: /update/i });
    // await user.click(updateButton);
  });
});

// separate test file?

describe("edit coin buttons", () => {
  const user = userEvent.setup();
  it("should let user edit coin quantity or delete coin", async () => {
    render(
      <EditCoin
        onDeletePortfolioCoin={() => {}}
        onUpdatePortfolioCoin={() => {}}
        name={""}
      />
    );
    // find button -
  });
});

// remember to test close modal btn
// remember to test inputs
