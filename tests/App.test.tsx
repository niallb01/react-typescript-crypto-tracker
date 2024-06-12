import { render, screen } from "@testing-library/react";
import { it, expect, describe, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import App from "../src/App";

// Mock child components to focus on App routing logic
vi.mock("../src/components/Navbar", () => ({
  default: () => <div>Mocked Navbar</div>,
}));

vi.mock("../src/pages/Home", () => ({
  default: () => <div>Mocked Home Page</div>,
}));

vi.mock("../src/pages/Portfolio", () => ({
  default: () => <div>Mocked Portfolio Page</div>,
}));

vi.mock("../src/pages/CoinDescription", () => ({
  default: () => <div>Mocked Coin Description Page</div>,
}));

vi.mock("../src/pages/SignUp", () => ({
  default: () => <div>Mocked SignUp Page</div>,
}));

vi.mock("../src/pages/Login", () => ({
  default: () => <div>Mocked Login Page</div>,
}));

vi.mock("../src/pages/Account", () => ({
  default: () => <div>Mocked Account Page</div>,
}));
// children = route that is being protected
vi.mock("../src/protectedroutes/ProtectedRoute", () => ({
  default: ({ children }: { children: JSX.Element }) => children,
}));

// find routes
describe("App", () => {
  it("should render home page", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("Mocked Home Page")).toBeInTheDocument();
  });

  it("should render portfolio page when navigating to portfolio page", () => {
    render(
      <MemoryRouter initialEntries={["/portfolio"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("Mocked Portfolio Page")).toBeInTheDocument();
  });

  it("should render coin description page when navigating to coin-description page", () => {
    render(
      <MemoryRouter initialEntries={["/coin-description/coinName"]}>
        <App />
      </MemoryRouter>
    );
    expect(
      screen.getByText("Mocked Coin Description Page")
    ).toBeInTheDocument();
  });

  it("should render sign up page when navigating to signup page", () => {
    render(
      <MemoryRouter initialEntries={["/signup"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("Mocked SignUp Page")).toBeInTheDocument();
  });

  it("should render login page when navigating to login page", () => {
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("Mocked Login Page")).toBeInTheDocument();
  });

  it("should render account page when navigating to account page", () => {
    render(
      <MemoryRouter initialEntries={["/account"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("Mocked Account Page")).toBeInTheDocument();
  });
});
