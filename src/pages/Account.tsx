import { useState, useEffect } from "react";
import supabase from "../auth/supabaseClient";
import supabaseAdminClient from "../auth/supabaseAdminClient";
import "../styles/Account.css";
import Icon from "react-icons-kit";
import { useNavigate } from "react-router-dom";
import { view_off } from "react-icons-kit/ikons/view_off";
import { view } from "react-icons-kit/ikons/view";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { AccountProps } from "../types/auth_types";
import { TbPasswordUser } from "react-icons/tb";
import { IoWarningOutline } from "react-icons/io5";
import { IoMdCloseCircleOutline } from "react-icons/io";

const Account = (props: AccountProps) => {
  const [newPassword, setNewPassword] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [deleteAccModal, setDeleteAccModal] = useState<boolean>(false);
  const [passwordModal, setPasswordModal] = useState<boolean>(false);

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

  const handleChangePassword = async () => {
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
    setPasswordModal(false); // Close the modal after changing the password
  };

  const onPasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const toggleDeleteAccModal = () => {
    setDeleteAccModal(!deleteAccModal);
  };

  const togglePasswordModal = () => {
    setPasswordModal(!passwordModal);
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
        <TbPasswordUser />
        {""} Account
      </h1>
      <form>
        <p>
          Password must contain at least one number, one uppercase letter and
          special character, and at least 8 or more characters
        </p>
        <label className="password-label" htmlFor="new-password">
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
          id="new-password"
          name="new-password"
          className="form-text-input"
          value={newPassword}
          onChange={onPasswordInput}
          placeholder="New Password"
          pattern="(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\\W_]).{8,}"
          // title="Must contain at least one number, one uppercase letter and special character, and at least 8 or more characters"
          required
        />
        <button
          type="button"
          className="login-btn"
          onClick={togglePasswordModal}
        >
          Change Password
        </button>
        {passwordModal && (
          <div className="delete-portfolio-modal">
            <div onClick={togglePasswordModal} className="overlay"></div>
            <div className="modal-content-delete-portfolio">
              <IoWarningOutline
                size={24}
                className="delete-portfolio-modal-icon"
              />
              <p className="delete-portfolio-modal-text">
                Are you sure you want to change the password?
              </p>

              <div className="edit-coin-btn-container">
                <button
                  onClick={togglePasswordModal}
                  className="close-modal-delete-portfolio"
                >
                  <IoMdCloseCircleOutline />
                </button>

                <br />
                <button
                  onClick={handleChangePassword}
                  className="delete-portfolio-modal-btn"
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        )}
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

              <br />
              <button
                onClick={handleDeleteAccount}
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
