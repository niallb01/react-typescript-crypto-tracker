// import React, { useState } from "react";
// import supabase from "../auth/supabaseClient";
// import { useNavigate } from "react-router-dom";
// import "../styles/Account.css";

// const Account = (props) => {
//   const [newPassword, setNewPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const { setAuthenticated, setGuest } = props;

//   const handleDeleteAccount = async () => {
//     const user = supabase.auth.user();

//     if (user) {
//       const { error } = await supabase.auth.api.deleteUser(user.id);

//       if (error) {
//         setMessage(`Error deleting account: ${error.message}`);
//       } else {
//         setAuthenticated(false);
//         setGuest(false);
//         navigate("/");
//         setMessage("Account successfully deleted");
//       }
//     }
//   };

//   const handleChangePassword = async () => {
//     const { user, error: authError } = await supabase.auth.update({
//       password: newPassword,
//     });

//     if (authError) {
//       setMessage(`Error changing password: ${authError.message}`);
//     } else {
//       setMessage("Password successfully changed");
//     }
//   };

//   return (
//     <div className="settings-container">
//       <h2>Settings</h2>
//       <button onClick={handleDeleteAccount}>Delete Account</button>
//       <div>
//         <input
//           type="password"
//           placeholder="New Password"
//           value={newPassword}
//           onChange={(e) => setNewPassword(e.target.value)}
//         />
//         <button onClick={handleChangePassword}>Change Password</button>
//       </div>
//       {message && <p>{message}</p>}
//     </div>
//   );
// };

import React, { useState } from "react";
import supabase from "../auth/supabaseClient";
import "../styles/Account.css";
import { useNavigate } from "react-router-dom";
import Icon from "react-icons-kit";
import { view_off } from "react-icons-kit/ikons/view_off";
import { view } from "react-icons-kit/ikons/view";

const Account = (props) => {
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const {
    setAuthenticated,
    setGuest,
    onTogglePasswordVisibility,
    isPasswordVisible,
  } = props;

  const handleChangePassword = async () => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        setMessage(`Error changing password: ${error.message}`);
      } else {
        setMessage("Password successfully changed");
      }
    } catch (error) {
      setMessage(`Error changing password: ${error.message}`);
    }
  };

  return (
    // <div className="settings-container login-form-container">
    //   <h2 className="onLogin-header">Settings</h2>
    //   <label className="password-label" htmlFor="password">
    //     Password:{" "}
    //     <button
    //       onClick={onTogglePasswordVisibility}
    //       className="password-icon-button"
    //     >
    //       <Icon icon={isPasswordVisible ? view : view_off} size="20" />
    //     </button>
    //   </label>{" "}
    //   <input
    //     type={isPasswordVisible ? "text" : "password"}
    //     placeholder="New Password"
    //     id="password"
    //     name="password"
    //     className="form-text-input"
    //     value={newPassword}
    //     onChange={(e) => setNewPassword(e.target.value)}
    //   />
    //   <button onClick={handleChangePassword} className="login-btn">
    //     Change Password
    //   </button>
    // </div>

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
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="Test Password"
        // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
        // title="Must contain at least one number, one uppercase letter, one special character, and at least 8 or more characters"
        required
      />
      <button onClick={handleChangePassword} className="login-btn">
        Change Password
      </button>
    </div>
  );
};

export default Account;
