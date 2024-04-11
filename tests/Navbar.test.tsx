import Navbar from "../src/components/Navbar";
import { render, screen } from "@testing-library/react";
import { it, expect, describe } from "vitest";
import "@testing-library/jest-dom/vitest";
import React from "react";
import { MemoryRouter } from "react-router";

describe("navbar", () => {
  it("should link to home page", () => {
    const { getByText } = render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    const heading = getByText(/live coin tracker/i);
    expect(heading).toBeInTheDocument();
  });
});
