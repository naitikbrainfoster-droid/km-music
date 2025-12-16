import LogoutButton from "./LogoutButton";

const AdminNavbar = () => {
  return (
    <header className="h-16 bg-[#111] flex items-center justify-between px-6 border-b border-[#222]">
      <h3 className="font-semibold">Admin Dashboard</h3>
      <LogoutButton />
    </header>
  );
};

export default AdminNavbar;
