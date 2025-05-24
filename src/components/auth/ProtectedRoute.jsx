import { Navigate, useLocation } from "react-router-dom";
import { ROUTES } from "../../config/navigation";

const ProtectedRoute = ({ children, requiredPermissions = [] }) => {
  const location = useLocation();

  // TODO: Replace with actual auth check
  const isAuthenticated = true; // This should come from your auth context/state
  const userPermissions = [
    "view_projects",
    "view_tasks",
    "view_worklogs",
    "view_performance",
    "view_settings",
  ]; // This should come from your auth context/state

  if (!isAuthenticated) {
    // Redirect to login page but save the attempted url
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  // Check if user has required permissions
  const hasRequiredPermissions = requiredPermissions.every((permission) =>
    userPermissions.includes(permission),
  );

  if (!hasRequiredPermissions) {
    // Redirect to home if user doesn't have required permissions
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return children;
};

export default ProtectedRoute;
