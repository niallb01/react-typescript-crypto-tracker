import { Link } from "react-router-dom";
import { FaCoins } from "react-icons/fa";

const Navbar = () => {
  return (
    <>
      <h1 className="header">
        <Link to="/">
          <FaCoins className="header-icon" />
          Live Coin Tracker
        </Link>
      </h1>
    </>
  );
};

export default Navbar;
