import { Link, useLocation } from "react-router-dom";
import { FaCoins } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import { signOut } from "../auth/supabaseClient";
import { NavbarProps } from "../types/auth_types";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const Navbar = (props: NavbarProps) => {
  const { authenticated, guest, setGuest, addPortfolio, setAuthenticated } =
    props;

  const location = useLocation();
  const isAuthPage =
    location.pathname === "/signup" || location.pathname === "/login";

  const navigate = useNavigate();

  const handleGuestLogout = async () => {
    const success = await signOut();
    if (success) {
      setGuest(false);
      navigate("/");
      addPortfolio([]);
      toast.success("You have logged out as guest", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
      });
    }
  };

  const handleAuthLogout = async () => {
    const success = await signOut();
    if (success) {
      setAuthenticated(false);
      navigate("/");
      addPortfolio([]);
      toast.success("You have logged out", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
      });
    }
  };

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

        {!guest && !isAuthPage && !authenticated && (
          <div className="login-container">
            <Link to="/login">
              <button className="nav-login-btn">Login</button>
            </Link>
            <Link to="/signup">
              <button className="nav-sign-up-btn">Sign Up</button>
            </Link>
          </div>
        )}

        {(authenticated || guest) && !isAuthPage && (
          <div className="login-container">
            {authenticated && (
              <>
                <Link to="/account">
                  <button className="nav-login-btn">Account</button>
                </Link>
                <button className="nav-sign-up-btn" onClick={handleAuthLogout}>
                  Logout
                </button>
              </>
            )}
            {guest && (
              <button className="nav-sign-up-btn" onClick={handleGuestLogout}>
                Logout
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
