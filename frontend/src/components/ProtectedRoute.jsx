import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (!isLoggedIn) {
    // ❌ Not logged in → Home page
    return <Navigate to="/" replace />;
  }

  // ✅ Logged in → allow accessCRE
  return children;
};

export default ProtectedRoute;
