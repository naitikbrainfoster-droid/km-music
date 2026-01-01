import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    status: "active",
  });

  const [loading, setLoading] = useState(true);

  // ✅ FETCH SINGLE USER (CORRECT WAY)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `/api/admin/users/${id}`
        );

        const user = res.data.user;

        setForm({
          name: user.name || "",
          email: user.email || "",
          status: user.status || "active",
        });

        setLoading(false);
      } catch (error) {
        console.error("FETCH USER ERROR:", error);
        alert("Failed to load user");
      }
    };

    fetchUser();
  }, [id]);

  // ✅ UPDATE USER
  const updateUser = async () => {
    try {
      await axios.put(
        `/api/admin/users/${id}`,
        {
          name: form.name,
          status: form.status,
        }
      );

      alert("User updated successfully");
      navigate("/admin/users");
    } catch (error) {
      console.error("UPDATE USER ERROR:", error);
      alert("Update failed");
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-6 text-white">Loading...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6 text-white max-w-xl">
        <h1 className="text-2xl font-bold mb-4">Edit User</h1>

        {/* NAME */}
        <input
          className="w-full p-3 mb-3 bg-black border border-gray-700 rounded"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          placeholder="Name"
        />

        {/* EMAIL (READ ONLY) */}
        <input
          className="w-full p-3 mb-3 bg-black border border-gray-700 rounded opacity-60"
          value={form.email}
          disabled
        />

        {/* STATUS */}
        <select
          className="w-full p-3 mb-6 bg-black border border-gray-700 rounded"
          value={form.status}
          onChange={(e) =>
            setForm({ ...form, status: e.target.value })
          }
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        <button
          onClick={updateUser}
          className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded"
        >
          Update User
        </button>
      </div>
    </AdminLayout>
  );
};

export default EditUser;
