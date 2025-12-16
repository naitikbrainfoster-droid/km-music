const LogoutButton = () => {
  const logout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin/login";
  };

  return (
    <button
      onClick={logout}
      className="bg-red-600 px-4 py-2 rounded text-sm text-white hover:bg-red-700"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
