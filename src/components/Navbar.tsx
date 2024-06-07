// import { Link } from "react-router-dom";
// import { FaCoins } from "react-icons/fa";
// import "../styles/Navbar.css";
// import SignUp from "../pagecomponents/SignUp";

// const Navbar = () => {
//   return (
//     <>
//       {/* <h1 className="header">
//         <Link to="/">
//           <FaCoins className="header-icon" />
//           Live Coin Tracker
//         </Link>
//       </h1> */}
//       <div className="navbar-container">
//         <div className="header-container">
//           <h1 className="header">
//             <Link to="/">
//               <FaCoins className="header-icon" />
//               Live Coin Tracker
//             </Link>
//           </h1>
//         </div>
//         {/* <div className="login-container">
//           <Link to="/signup">
//             <button className="nav-sign-up-btn">Sign up</button>
//           </Link>
//           <Link to="/login">
//             <button className="nav-login-btn">Login</button>
//           </Link>
//         </div> */}

//       </div>
//     </>
//   );
// };

// export default Navbar;

import { Link, useLocation } from "react-router-dom";
import { FaCoins } from "react-icons/fa";
import "../styles/Navbar.css";

const Navbar = () => {
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

        {!isAuthPage && (
          <div className="login-container">
            <Link to="/signup">
              <button className="nav-sign-up-btn">Sign Up</button>
            </Link>
            <Link to="/login">
              <button className="nav-login-btn">Login</button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
