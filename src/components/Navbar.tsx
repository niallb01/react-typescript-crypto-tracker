import { Link } from "react-router-dom";
import { FaCoins } from "react-icons/fa";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <>
      {/* <h1 className="header">
        <Link to="/">
          <FaCoins className="header-icon" />
          Live Coin Tracker
        </Link>
      </h1> */}
      <div className="navbar-container">
        <div className="header-container">
          <h1 className="header">
            <Link to="/">
              <FaCoins className="header-icon" />
              Live Coin Tracker
            </Link>
          </h1>
        </div>
        <div className="login-container">
          <Link to="/signup">
            <button className="nav-sign-up-btn">Sign up</button>
          </Link>
          <Link to="/login">
            <button className="nav-login-btn">Login</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
