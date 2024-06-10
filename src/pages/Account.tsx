import React, { useState } from "react";
import supabase from "../auth/supabaseClient";
import "../styles/Account.css";
import Icon from "react-icons-kit";
import { view_off } from "react-icons-kit/ikons/view_off";
import { view } from "react-icons-kit/ikons/view";
import { AccountProps } from "../types/auth_types";

const Account = (props: AccountProps) => {
  const [newPassword, setNewPassword] = useState("");
  // const [message, setMessage] = useState("");

  const { onTogglePasswordVisibility, isPasswordVisible } = props;

  const handleChangePassword = async () => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        // setMessage(`Error changing password: ${error.message}`);
      } else {
        // setMessage("Password successfully changed");
      }
    } catch (error) {
      // setMessage(`Error changing password: ${error.message}`);
    }
  };

  const onPasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  return (
    <div className="login-form-container">
      <h1 className="onLogin-header">Change Password</h1>
      <label className="password-label" htmlFor="password">
        Password:{" "}
        <button
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
        onChange={onPasswordInput}
        // onChange={(e) => setNewPassword(e.target.value)}
        placeholder="Test Password"
        required
      />
      <button onClick={handleChangePassword} className="login-btn">
        Change Password
      </button>
    </div>
  );
};

export default Account;
