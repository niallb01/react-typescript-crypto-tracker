import { useState } from "react";
import supabase from "../auth/supabaseClient";
import "../styles/Forms.css";

const Login = () => {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setTermsAccepted(e.target.checked);
  };

  return (
    <div className="login-form-container">
      <p className="onLogin-header">Login:</p>
      <form onSubmit={handleSignup}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          className="form-text-input"
          value={userData.email}
          onChange={handleChange}
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
          required
        />

        <div className="terms-container">
          <input
            type="checkbox"
            id="terms"
            name="terms"
            checked={termsAccepted}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="terms">I agree to terms and conditions</label>
        </div>

        <button type="submit" id="submit" name="submit" className="sign-up-btn">
          Sign Up
        </button>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </form>
    </div>
  );
};

export default Login;
