import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLoginCard = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        "/api/admin/login",
        { email, password }
      );

      localStorage.setItem("adminToken", res.data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md bg-[#111] p-8 rounded-xl border border-[#222]"
    >
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-white">Admin Login</h2>
        <p className="text-sm text-gray-400 mt-1">
          KM Music Dashboard Access
        </p>
      </div>

      {error && (
        <p className="mb-4 text-red-500 text-sm text-center">
          {error}
        </p>
      )}

      <input
        type="email"
        placeholder="Admin Email"
        className="w-full mb-4 p-3 bg-[#222] text-white rounded outline-none"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full mb-6 p-3 bg-[#222] text-white rounded outline-none"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded text-white font-semibold"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default AdminLoginCard;
