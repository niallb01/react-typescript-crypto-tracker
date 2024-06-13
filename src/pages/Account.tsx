import React, { useState } from "react";
import supabase from "../auth/supabaseClient";
import "../styles/Account.css";
import Icon from "react-icons-kit";
import { useNavigate } from "react-router-dom";
import { view_off } from "react-icons-kit/ikons/view_off";
import { view } from "react-icons-kit/ikons/view";
import { AccountProps } from "../types/auth_types";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const Account = (props: AccountProps) => {
  const [newPassword, setNewPassword] = useState("");

  const navigate = useNavigate();

  const {
    onTogglePasswordVisibility,
    isPasswordVisible,
    setAuthenticated,
    addPortfolio,
  } = props;

  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      toast.error("Error changing password", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    } else {
      toast.success("Password successfully changed", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
      });
      setNewPassword("");
      setAuthenticated(false);
      navigate("/login");
      addPortfolio([]);
    }
  };

  const onPasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  return (
    <div className="account-form-container">
      <h1 className="account-header">Change Password</h1>
      <form onSubmit={handleChangePassword}>
        <label className="password-label" htmlFor="password">
          New Password:{" "}
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
          value={newPassword}
          onChange={onPasswordInput}
          placeholder="New Test Password"
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}"
          title="Must contain at least one number, one uppercase letter and special character, and at least 8 or more characters"
          required
        />
        <button type="submit" className="login-btn">
          Confirm
        </button>
      </form>
    </div>
  );
};

export default Account;
