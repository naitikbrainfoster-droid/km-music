import AdminLoginCard from "../../components/admin/login/AdminLoginCard";
import { Navigate } from "react-router-dom";

const AdminLogin = () => {
  if (localStorage.getItem("adminToken")) {
    return <Navigate to="/admin/dashboard" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <AdminLoginCard />
    </div>
  );
};

export default AdminLogin;
