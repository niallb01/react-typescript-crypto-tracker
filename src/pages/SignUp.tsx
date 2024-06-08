import { useState } from "react";
import supabase from "../auth/supabaseClient";
import "../styles/Forms.css";
// import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SignUp = (props) => {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const { authenticated, setAuthenticated, guest, setGuest } = props;

  const navigate = useNavigate();

  const handleSignup = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!termsAccepted) {
      setError("You must accept the terms and conditions.");
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
      });

      if (error) {
        setError(error.message);
      } else {
        setSuccess(
          "Sign up successful! Please check your email for confirmation."
        );
      }
    } catch (error) {
      setError("An unexpected error occurred.");
    }
  };

  // const handleGuest = async () => {
  //   const { data, error } = await supabase.auth.signInAnonymously();
  // };
  // const handleGuest = async () => {
  //   try {
  //     const { data, error } = await supabase.auth.signInAnonymously();

  //     if (error) {
  //       setError(error.message);
  //     } else {
  //       setGuest(true); // Mark the user as a guest
  //       setSuccess("Signed in as guest!");
  //       navigate("/home");
  //     }
  //   } catch (error) {
  //     setError("An unexpected error guest occurred.");
  //   }
  //   console.log(guest);
  // };
  const handleGuest = async () => {
    try {
      const { data, error } = await supabase.auth.signInAnonymously();

      if (error) {
        console.error("Guest sign-in error:", error); // Log the error
        setError(error.message);
      } else {
        console.log("Guest sign-in successful."); // Log success
        setGuest(true); // Mark the user as a guest
        setSuccess("Signed in as guest!");
        navigate("/");
        // console.log(guest);
      }
    } catch (error) {
      console.error("Unexpected error during guest sign-in:", error); // Log unexpected errors
      setError("An unexpected error occurred while signing in as guest.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e: any) => {
    setTermsAccepted(e.target.checked);
  };

  return (
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

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          className="form-text-input"
          value={userData.password}
          onChange={handleChange}
          placeholder="Test Password"
          // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})"
          // title="Must contain at least one number, one uppercase letter, one special character, and at least 8 or more characters"
          required
        />

        <button type="submit" id="submit" name="submit" className="sign-up-btn">
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

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </form>
    </div>
  );
};

export default SignUp;
