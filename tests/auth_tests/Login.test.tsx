import { render, screen } from "@testing-library/react";
import { it, expect, describe } from "vitest";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import Login from "../../src/pages/Login";

describe("login'", () => {
  it("should render login page with form", () => {
    render(
      <MemoryRouter>
        <Login
          setAuthenticated={() => {}}
          setGuest={() => {}}
          isPasswordVisible={false}
          onTogglePasswordVisibility={() => {}}
        />
      </MemoryRouter>
    );
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
  });
});

describe("login form", () => {
  const user = userEvent.setup();

  it("should contain text inputs and buttons", async () => {
    const { getByText } = render(
      <MemoryRouter>
        <Login
          setAuthenticated={() => {}}
          setGuest={() => {}}
          isPasswordVisible={false}
          onTogglePasswordVisibility={() => {}}
        />
      </MemoryRouter>
    );
    const emailInput = screen.getByPlaceholderText(/test email/i);
    expect(emailInput).toBeInTheDocument();

    const passwordInput = screen.getByPlaceholderText(/test password/i);
    expect(passwordInput).toBeInTheDocument();

    const passwordIcon = document.querySelector(
      "svg"
    ) as unknown as HTMLImageElement;
    expect(passwordIcon).toBeInTheDocument();

    const loginButton = screen.getByRole("button", {
      name: /login/i,
    });
    user.click(loginButton);
    expect(loginButton).toBeInTheDocument();

    const guestButton = screen.getByRole("button", {
      name: /continue as guest/i,
    });
    user.click(guestButton);
    expect(guestButton).toBeInTheDocument();

    const loginLink = getByText(/sign up/i);
    await user.click(loginLink);
    expect(loginLink).toBeInTheDocument();
    expect(loginLink.getAttribute("href")).toBe("/signup");
  });
});
