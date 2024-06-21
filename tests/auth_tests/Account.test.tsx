import { render, screen } from "@testing-library/react";
import { it, expect, describe } from "vitest";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import Account from "../../src/pages/Account";

describe("account", () => {
  it("should render account page with form", () => {
    render(
      <MemoryRouter>
        <Account
          setAuthenticated={() => {}}
          addPortfolio={() => {}}
          isPasswordVisible={false}
          onTogglePasswordVisibility={() => {}}
        />
      </MemoryRouter>
    );
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
  });
});

describe("account form", () => {
  const user = userEvent.setup();
  it("should contain change password input and delete account buttons", async () => {
    const { container } = render(
      <MemoryRouter>
        <Account
          setAuthenticated={() => {}}
          addPortfolio={() => {}}
          isPasswordVisible={false}
          onTogglePasswordVisibility={() => {}}
        />
      </MemoryRouter>
    );

    const passwordInput = screen.getByPlaceholderText(/new test password/i);
    expect(passwordInput).toBeInTheDocument();

    const passwordIcon = document.querySelector(
      "svg"
    ) as unknown as HTMLImageElement;
    expect(passwordIcon).toBeInTheDocument();

    const confirmButton = screen.getByRole("button", {
      name: /change password/i,
    });
    user.click(confirmButton);
    expect(confirmButton).toBeInTheDocument();

    const deleteButton = screen.getByRole("button", {
      name: /delete account/i,
    });
    user.click(deleteButton);
    expect(deleteButton).toBeInTheDocument();

    const closeIcon = document.querySelector(
      "svg"
    ) as unknown as HTMLImageElement;
    expect(closeIcon).toBeInTheDocument();

    const warningIcon = document.querySelector(
      "svg"
    ) as unknown as HTMLImageElement;

    expect(warningIcon).toBeTruthy();

    const deleteWarningText = container.getElementsByClassName(
      "delete-portfolio-modal-text"
    );
    expect(deleteWarningText).toBeTruthy();
  });
});
