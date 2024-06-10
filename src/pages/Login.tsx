import { useEffect, useState } from "react";
import supabase from "../auth/supabaseClient";
import "../styles/Forms.css";
import { useNavigate } from "react-router-dom";
import Icon from "react-icons-kit";
import { view_off } from "react-icons-kit/ikons/view_off";
import { view } from "react-icons-kit/ikons/view";
import React, { FormEvent } from "react";
import { LoginProps } from "../types/auth_types";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

type UserData = {
  email: string;
  password: string;
};

const Login = (props: LoginProps) => {
  const [userData, setUserData] = useState<UserData>({
    email: "",
    password: "",
  });

  const {
    setAuthenticated,
    setGuest,
    onTogglePasswordVisibility,
    isPasswordVisible,
  } = props;

  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: userData.email,
        password: userData.password,
      });

      if (error) {
        // setError(error.message);
      } else {
        setAuthenticated(true); // Mark the user as a guest
        navigate("/");
        // setSuccess(
        //   "Login successful! Please check your email for confirmation."
        // );
      }
    } catch (error) {
      // setError("An unexpected error occurred.");
    }
  };

  const handleGuest = async () => {
    try {
      const { error } = await supabase.auth.signInAnonymously();

      if (error) {
        console.error("Guest sign-in error:", error); // Log the error
        // setError(error.message);
      } else {
        console.log("Guest sign-in successful."); // Log success
        setGuest(true); // Mark the user as a guest
        toast.success("Signed in as guest", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1000,
        });
        navigate("/");
        // console.log(guest);
      }
    } catch (error) {
      console.error("Unexpected error during guest sign-in:", error); // Log unexpected errors
      // setError("An unexpected error occurred while signing in as guest.");
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

  return (
    <>
      {/* <ToastContainer limit={1} /> */}
      <div className="login-form-container">
        <h1 className="onLogin-header">Login</h1>
        <form onSubmit={handleLogin}>
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
            // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            // title="Must contain at least one number, one uppercase letter, one special character, and at least 8 or more characters"
            required
          />
          <button type="submit" id="submit" name="submit" className="login-btn">
            Login
          </button>
          <p className="form-p">
            Don't have an account?{" "}
            <a className="form-link" href="/signup">
              Sign Up
            </a>{" "}
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
        </form>
      </div>
    </>
  );
};

export default Login;
