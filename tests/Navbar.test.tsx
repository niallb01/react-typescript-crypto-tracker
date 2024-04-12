import Navbar from "../src/components/Navbar";
import { render } from "@testing-library/react";
import { it, expect, describe } from "vitest";
import "@testing-library/jest-dom/vitest";
import React from "react";
import { MemoryRouter } from "react-router";

describe("navbar", () => {
  it("should show header and link to home page", () => {
    const { getByText } = render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    const headerLink = getByText(/live coin tracker/i); // query method
    expect(headerLink).toBeInTheDocument(); // test component renders
    expect(headerLink.getAttribute("href")).toBe("/"); // getAttribute - matcher
  });
});
