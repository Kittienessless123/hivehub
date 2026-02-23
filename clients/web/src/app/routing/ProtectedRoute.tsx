import { Navigate } from "react-router-dom";
import { ROUTES } from "shared/types/routes.types";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: Array<"user" | "admin" | "moderator">;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRoles }) => {
  // Здесь должна быть ваша логика проверки авторизации и ролей
  const isAuthenticated = true; // замените на реальную проверку
  const userRole = "user"; // замените на реальную роль пользователя

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.login.path} replace />;
  }

  if (requiredRoles && !requiredRoles.includes(userRole as never)) {
    return <Navigate to={ROUTES.home.path} replace />;
  }

  return <>{children}</>;
};

export const RedirectIfAuthenticated: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = true; 

  if (isAuthenticated) {
    return <Navigate to={ROUTES.home.path} replace />;
  }

  return <>{children}</>;
};
