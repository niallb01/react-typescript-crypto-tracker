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
        <Navbar
          authenticated={false}
          setAuthenticated={() => {}}
          guest={false}
          setGuest={() => {}}
          addPortfolio={() => {}}
        />
      </MemoryRouter>
    );
    const headerLink = getByText(/live coin tracker/i); // query method
    expect(headerLink).toBeInTheDocument(); // test component renders
    expect(headerLink.getAttribute("href")).toBe("/"); // getAttribute - matcher
  });
});

describe("login navigation", () => {
  it("should show login and signup buttons", () => {
    const { container } = render(
      <MemoryRouter>
        <Navbar
          authenticated={false}
          setAuthenticated={() => {}}
          guest={false}
          setGuest={() => {}}
          addPortfolio={() => {}}
        />
      </MemoryRouter>
    );

    const loginButton = container.getElementsByClassName("nav-login-button");
    expect(loginButton).toBeTruthy();

    const signUpButton = container.getElementsByClassName("nav-sign-up-button");
    expect(signUpButton).toBeTruthy();

    const accountButton =
      container.getElementsByClassName("nav-account-button");
    expect(accountButton).toBeTruthy();

    const logoutButton = container.getElementsByClassName("nav-logout-button");
    expect(logoutButton).toBeTruthy();
  });
});
