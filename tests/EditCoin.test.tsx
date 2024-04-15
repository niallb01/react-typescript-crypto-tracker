import { render, screen } from "@testing-library/react";
import { it, expect, describe } from "vitest";
import React from "react";
import EditCoin from "../src/portfoliocomponents/EditCoin";
import { MemoryRouter } from "react-router";
import "@testing-library/jest-dom/vitest";

describe("edit coin", () => {
  it("should render with correct text and initial state", () => {
    render(
      <EditCoin
        onDeletePortfolioCoin={function (coin: string): void {
          throw new Error("Function not implemented.");
        }}
        onUpdatePortfolioCoin={function (name: string, quantity: string): void {
          throw new Error("Function not implemented.");
        }}
        name={""}
      />
    );
    // test modal
  });
});
