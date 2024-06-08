import React, { useState } from "react";
import supabase from "../auth/supabaseClient";
import { useNavigate } from "react-router-dom";

const Account = (props) => {
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const { setAuthenticated, setGuest } = props;

  const handleDeleteAccount = async () => {
    const user = supabase.auth.user();

    if (user) {
      const { error } = await supabase.auth.api.deleteUser(user.id);

      if (error) {
        setMessage(`Error deleting account: ${error.message}`);
      } else {
        setAuthenticated(false);
        setGuest(false);
        navigate("/");
        setMessage("Account successfully deleted");
      }
    }
  };

  const handleChangePassword = async () => {
    const { user, error: authError } = await supabase.auth.update({
      password: newPassword,
    });

    if (authError) {
      setMessage(`Error changing password: ${authError.message}`);
    } else {
      setMessage("Password successfully changed");
    }
  };

  return (
    <div className="settings-container">
      <h2>Settings</h2>
      <button onClick={handleDeleteAccount}>Delete Account</button>
      <div>
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button onClick={handleChangePassword}>Change Password</button>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Account;
