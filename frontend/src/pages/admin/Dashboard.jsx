import AdminLayout from "../../components/admin/AdminLayout";
import DashboardStats from "../../components/admin/DashboardStats";
import ActiveUsersChart from "../../components/admin/ActiveUsersChart";

const Dashboard = () => {
  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold text-white mb-6">
        Admin Dashboard
      </h1>

      {/* 🔢 TOP STATS */}
      <DashboardStats />

      {/* 📈 ACTIVE USERS CHART */}
      <ActiveUsersChart />

      {/* 🎵 UPLOAD SONG */}
     
    </AdminLayout>
  );
};

export default Dashboard;
