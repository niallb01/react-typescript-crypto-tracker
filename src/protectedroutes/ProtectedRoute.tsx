import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ authenticated, children }) => {
  if (!authenticated) {
    return <Navigate to="/signup" />;
  }
  return children;
};

export default ProtectedRoute;
