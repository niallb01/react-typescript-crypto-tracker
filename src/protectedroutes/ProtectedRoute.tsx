import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ authenticated, guest, children }) => {
  if (!authenticated && !guest) {
    return <Navigate to="/signup" />;
  }
  return children;
};

export default ProtectedRoute;

// children = portfolio component
