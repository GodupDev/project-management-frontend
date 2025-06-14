import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../store/slices/authSlice";

const PublicRoute = ({ children }) => {
  const token = useSelector(selectCurrentToken);
  const location = useLocation();

  if (token) {
    // Redirect to home page if already authenticated
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default PublicRoute;
