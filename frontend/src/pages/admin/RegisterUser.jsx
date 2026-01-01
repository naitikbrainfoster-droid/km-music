import { useState } from "react";
import axios from "axios";
import AdminLayout from "../../components/admin/AdminLayout";
import { FaUserPlus } from "react-icons/fa";

const RegisterUser = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.password) {
      return alert("All fields are required");
    }

    try {
      setLoading(true);

      await axios.post("/api/admin/register", form);

      alert("User registered successfully ✅");

      setForm({
        name: "",
        email: "",
        password: "",
        role: "user",
      });
    } catch (error) {
      console.error(error);
      alert("Registration failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto">

        {/* HEADER */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center">
            <FaUserPlus className="text-white text-xl" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">
              Register New User
            </h1>
            <p className="text-sm text-gray-400">
              Create admin or normal user account
            </p>
          </div>
        </div>

        {/* FORM CARD */}
        <div className="bg-[#111] border border-[#222] rounded-2xl p-8 shadow-xl space-y-6">

          {/* NAME */}
          <div>
            <label className="text-sm text-gray-400 block mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter full name"
              className="w-full bg-[#0b0b0b] border border-[#222] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm text-gray-400 block mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="w-full bg-[#0b0b0b] border border-[#222] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm text-gray-400 block mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Create password"
              className="w-full bg-[#0b0b0b] border border-[#222] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* ROLE */}
          <div>
            <label className="text-sm text-gray-400 block mb-2">
              Role
            </label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full bg-[#0b0b0b] border border-[#222] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* BUTTON */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full mt-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 transition rounded-xl py-3 text-white font-semibold flex items-center justify-center gap-2"
          >
            {loading ? "Registering..." : "Register User"}
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default RegisterUser;
