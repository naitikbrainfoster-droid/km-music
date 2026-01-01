import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";

const ViewUsers = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    const res = await axios.get(
      "/api/admin/users"
    );
    setUsers(res.data.users || []);
  };

  useEffect(() => {
    const loadUsers = async () => {
      await fetchUsers();
    };

    loadUsers();
  }, []);


  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    await axios.delete(
      `/api/admin/users/${id}`
    );
    fetchUsers();
  };

  return (
    <AdminLayout>
      <div className="p-6 text-white">
        <h1 className="text-3xl font-bold mb-6">👥 Users</h1>

        <div className="bg-[#111] rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#1f1f1f] text-gray-400">
              <tr>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4">Status</th>
                <th className="p-4">Created</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u) => (
                <tr
                  key={u._id}
                  className="border-t border-[#222] hover:bg-[#1a1a1a]"
                >
                  <td className="p-4">{u.name}</td>
                  <td className="p-4">{u.email}</td>

                  <td className="p-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${u.status === "inactive"
                          ? "bg-red-600/20 text-red-400"
                          : "bg-green-600/20 text-green-400"
                        }`}
                    >
                      {u.status || "active"}
                    </span>
                  </td>

                  <td className="p-4 text-center">
                    {u.createdAt
                      ? new Date(u.createdAt).toDateString()
                      : "—"}
                  </td>

                  <td className="p-4 flex gap-2 justify-center">
                    <button
                      onClick={() =>
                        navigate(`/admin/users/edit/${u._id}`)
                      }
                      className="px-4 py-1 bg-blue-600 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteUser(u._id)}
                      className="px-4 py-1 bg-red-600 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ViewUsers;
