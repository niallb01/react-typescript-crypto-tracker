import { render, screen } from "@testing-library/react";
import { it, expect, describe } from "vitest";
import React from "react";
import EditCoin from "../src/portfoliocomponents/EditCoin";
import "@testing-library/jest-dom/vitest";

// () => {} - callback mocks function? - placeholder
describe("edit coin", () => {
  it("should render with correct text and initial state", () => {
    render(
      <EditCoin
        onDeletePortfolioCoin={() => {}}
        onUpdatePortfolioCoin={() => {}}
        name={""}
      />
    );
    // test modal
  });
});
