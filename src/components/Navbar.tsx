import { Link, useLocation } from "react-router-dom";
import { FaCoins } from "react-icons/fa";
import "../styles/Navbar.css";

const Navbar = (props) => {
  const { authenticated, guest } = props; // false
  // uselocation hook gives access to the location obj, which contains info on current url
  const location = useLocation(); // hook to get current location
  const isAuthPage =
    location.pathname === "/signup" || location.pathname === "/login"; // Check if current path is /signup or /login

  return (
    <>
      <div className="navbar-container">
        <div className="header-container">
          <h1 className="header">
            <Link to="/">
              <FaCoins className="header-icon" />
              Live Coin Tracker
            </Link>
          </h1>
        </div>

        {!authenticated && !isAuthPage && (
          <div className="login-container">
            <Link to="/login">
              <button className="nav-login-btn">Login</button>
            </Link>
            <Link to="/signup">
              <button className="nav-sign-up-btn">Sign Up</button>
            </Link>
          </div>
        )}

        {authenticated && !isAuthPage && (
          <div className="login-container">
            <button className="nav-login-btn">Settings</button>
            <button className="nav-sign-up-btn">Logout</button>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
