import { Navigate } from "react-router-dom";
import { ProtectedRouteProps } from "../types/auth_types";

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  authenticated,
  guest,
  children,
}) => {
  if (!authenticated && !guest) {
    return <Navigate to="/signup" />;
  }
  return children;
};

export default ProtectedRoute;

// children = route that is being protected, portfolio, account
