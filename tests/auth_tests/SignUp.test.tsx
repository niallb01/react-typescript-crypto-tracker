import { render, screen } from "@testing-library/react";
import { it, expect, describe } from "vitest";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import SignUp from "../../src/pages/SignUp";

describe("signup", () => {
  it("should render signup page with form", () => {
    render(
      <MemoryRouter>
        <SignUp
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

describe("signup form", () => {
  const user = userEvent.setup();

  it("should contain text inputs and buttons", async () => {
    const { getByText } = render(
      <MemoryRouter>
        <SignUp
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

    const signUpButton = screen.getByRole("button", {
      name: /sign up/i,
    });
    user.click(signUpButton);
    expect(signUpButton).toBeInTheDocument();

    const guestButton = screen.getByRole("button", {
      name: /continue as guest/i,
    });
    user.click(guestButton);
    expect(guestButton).toBeInTheDocument();

    const loginLink = getByText(/login/i);
    await user.click(loginLink);
    expect(loginLink).toBeInTheDocument();
    expect(loginLink.getAttribute("href")).toBe("/login");

    const terms = screen.getByRole("checkbox");
    await user.click(terms);
    expect(terms).toBeInTheDocument();
  });
});
