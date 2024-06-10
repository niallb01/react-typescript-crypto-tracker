import { ReactNode } from "react";

export type SignUpProps = {
  setGuest: (guest: boolean) => void;
  isPasswordVisible: boolean;
  onTogglePasswordVisibility: () => void;
};

export type LoginProps = {
  setGuest: (guest: boolean) => void;
  setAuthenticated: (authenticated: boolean) => void;
  isPasswordVisible: boolean;
  onTogglePasswordVisibility: () => void;
};

export type AccountProps = {
  isPasswordVisible: boolean;
  onTogglePasswordVisibility: () => void;
};

export type NavbarProps = {
  setGuest: (guest: boolean) => void;
  setAuthenticated: (authenticated: boolean) => void;
  authenticated: boolean;
  guest: boolean;
  addPortfolio: any;
};

export type ProtectedRouteProps = {
  authenticated: boolean;
  guest: boolean;
  children: ReactNode;
};
