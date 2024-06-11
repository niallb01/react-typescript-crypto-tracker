import { useState, useEffect } from "react";
import supabase from "../auth/supabaseClient";
import "../styles/Forms.css";
import { useNavigate } from "react-router-dom";
import Icon from "react-icons-kit";
import { view_off } from "react-icons-kit/ikons/view_off";
import { view } from "react-icons-kit/ikons/view";
import React, { FormEvent } from "react";
import { SignUpProps } from "../types/auth_types";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

type UserData = {
  email: string;
  password: string;
};

const SignUp = (props: SignUpProps) => {
  const [userData, setUserData] = useState<UserData>({
    email: "",
    password: "",
  });
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);

  const { setGuest, onTogglePasswordVisibility, isPasswordVisible } = props;

  const navigate = useNavigate();

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!termsAccepted) {
      toast.error("You must agree to terms and conditions", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
      return;
    }

    const { error } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
    });

    if (error) {
      toast.error(
        "Error creating account, check account details are not duplicate.",
        {
          position: toast.POSITION.TOP_CENTER,
          autoClose: false,
        }
      );
    } else {
      toast.success("Success, user account created", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
      });
      setUserData({ email: "", password: "" });
      navigate("/login");
    }
  };

  const handleGuest = async () => {
    const { error } = await supabase.auth.signInAnonymously();

    if (error) {
      toast.error("Guest sign-in error. Please try again.", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
      });
    } else {
      setGuest(true);
      toast.success("Signed in as Guest", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
      });
      navigate("/");
    }
  };

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const session = await supabase.auth.getSession();
        console.log(session);
      } catch (error) {
        console.error("Error fetching session:", error);
      }
    };
    fetchSession();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTermsAccepted(e.target.checked);
  };

  return (
    <>
      <div className="sign-up-form-container">
        <h1 className="onLogin-header">Create Account</h1>
        <form onSubmit={handleSignup}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-text-input"
            value={userData.email}
            onChange={handleChange}
            placeholder="Test Email"
            required
          />
          <label className="password-label" htmlFor="password">
            Password:{" "}
            <button
              type="button"
              onClick={onTogglePasswordVisibility}
              className="password-icon-button"
            >
              <Icon icon={isPasswordVisible ? view : view_off} size="20" />
            </button>
          </label>{" "}
          <input
            type={isPasswordVisible ? "text" : "password"}
            id="password"
            name="password"
            className="form-text-input"
            value={userData.password}
            onChange={handleChange}
            placeholder="Test Password"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}"
            title="Must contain at least one number, one uppercase letter and special character, and at least 8 or more characters"
            required
          />
          <button
            type="submit"
            id="submit"
            name="submit"
            className="sign-up-btn"
          >
            Sign Up
          </button>
          <p className="form-p">
            Already have an account?{" "}
            <a className="form-link" href="/login">
              Login
            </a>
          </p>
          <button
            type="button"
            onClick={handleGuest}
            id="guest"
            name="guest"
            className="guest-btn"
          >
            Continue as Guest
          </button>
          <br></br>
          <div className="terms-container">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              checked={termsAccepted}
              onChange={handleCheckboxChange}
            />
            <label className="terms" htmlFor="terms">
              I agree to terms and conditions
            </label>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;
