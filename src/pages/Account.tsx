import React, { useState, useEffect } from "react";
import supabase from "../auth/supabaseClient";
import supabaseAdminClient from "../auth/supabaseAdminClient"; // Import the admin client
import "../styles/Account.css";
import Icon from "react-icons-kit";
import { useNavigate } from "react-router-dom";
import { view_off } from "react-icons-kit/ikons/view_off";
import { view } from "react-icons-kit/ikons/view";
import { AccountProps } from "../types/auth_types";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { TbPasswordUser } from "react-icons/tb";
import { IoWarningOutline } from "react-icons/io5";
import { IoMdCloseCircleOutline } from "react-icons/io";

const Account = (props: AccountProps) => {
  const [newPassword, setNewPassword] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [deleteAccModal, setDeleteAccModal] = useState<boolean>(false);

  const navigate = useNavigate();

  const {
    onTogglePasswordVisibility,
    isPasswordVisible,
    setAuthenticated,
    addPortfolio,
  } = props;

  useEffect(() => {
    const fetchUserId = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        toast.error("Error fetching user information", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      } else {
        const fetchedUserId = data.user?.id || null;
        setUserId(fetchedUserId);
      }
    };
    fetchUserId();
  }, []);

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

  const toggleDeleteAccModal = () => {
    setDeleteAccModal(!deleteAccModal);
  };

  const handleDeleteAccount = async () => {
    if (!userId) {
      toast.error("User ID not found", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
      return;
    }

    const { error } = await supabaseAdminClient.auth.admin.deleteUser(userId);

    if (error) {
      toast.error("Error deleting account", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    } else {
      toast.success("Account deleted", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
      });
      setAuthenticated(false);
      navigate("/signup");
      addPortfolio([]);
    }
  };

  return (
    <div className="account-form-container">
      <h1 className="account-header">
        <TbPasswordUser /> Account
      </h1>
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
          Change Password
        </button>
      </form>

      <button onClick={toggleDeleteAccModal} className="delete-acc-btn">
        Delete Account
      </button>
      {deleteAccModal && (
        <div className="delete-portfolio-modal">
          <div onClick={toggleDeleteAccModal} className="overlay"></div>
          <div className="modal-content-delete-portfolio">
            <IoWarningOutline
              size={24}
              className="delete-portfolio-modal-icon"
            />
            <p className="delete-portfolio-modal-text">
              Are you sure you want to permanently delete account?
            </p>

            <div className="edit-coin-btn-container">
              <button
                onClick={toggleDeleteAccModal}
                className="close-modal-delete-portfolio"
              >
                <IoMdCloseCircleOutline />
              </button>

              <br></br>
              <button
                onClick={() => {
                  // toggleDeleteAccModal();
                  handleDeleteAccount();
                }}
                className="delete-portfolio-modal-btn"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
