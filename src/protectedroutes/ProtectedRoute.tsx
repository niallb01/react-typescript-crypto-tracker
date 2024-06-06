import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ authenticated, children }) => {
  if (!authenticated) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
