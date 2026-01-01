import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminLayout from "../../components/admin/AdminLayout";

const ViewArtists = () => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const artistsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    fetchArtists();
  }, []);

  const fetchArtists = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/artists");
      setArtists(res.data.artists || []);
    } catch (err) {
      console.error("Error fetching artists:", err);
      alert("Failed to fetch artists");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) {
      return;
    }

    try {
      await axios.delete(`/api/artists/${id}`);
      alert("Artist deleted successfully ✅");
      fetchArtists(); // Refresh list
    } catch (err) {
      console.error("Error deleting artist:", err);
      alert("Failed to delete artist ❌");
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/artists/edit/${id}`);
  };

  // Pagination
  const indexOfLastArtist = currentPage * artistsPerPage;
  const indexOfFirstArtist = indexOfLastArtist - artistsPerPage;
  const currentArtists = artists.slice(indexOfFirstArtist, indexOfLastArtist);
  const totalPages = Math.ceil(artists.length / artistsPerPage);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-600"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white">All Artists</h2>
            <p className="text-gray-400 mt-1">
              Manage your artists ({artists.length} total)
            </p>
          </div>
          <button
            onClick={() => navigate("/admin/artists/add")}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-200"
          >
            + Add New Artist
          </button>
        </div>

        {/* Artists Table */}
        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] rounded-2xl shadow-2xl border border-purple-900/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#0d0d0d] border-b border-gray-800">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Artist
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Created Date
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {currentArtists.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-gray-400">
                      No artists found. Add your first artist!
                    </td>
                  </tr>
                ) : (
                  currentArtists.map((artist, index) => (
                    <tr
                      key={artist._id}
                      className="hover:bg-[#1f1f1f] transition-colors"
                    >
                      {/* Artist Image */}
                      <td className="px-6 py-4">
                        <img
                          src={artist.imageUrl}
                          alt={artist.name}
                          className="w-14 h-14 rounded-lg object-cover shadow-lg"
                        />
                      </td>

                      {/* Artist Name */}
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-white font-semibold">
                            {artist.name}
                          </div>
                          <div className="text-gray-400 text-sm">
                            ID: {indexOfFirstArtist + index + 1}
                          </div>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${artist.isActive
                              ? "bg-green-600/20 text-green-400 border border-green-500/30"
                              : "bg-red-600/20 text-red-400 border border-red-500/30"
                            }`}
                        >
                          {artist.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>

                      {/* Created Date */}
                      <td className="px-6 py-4 text-gray-300">
                        {formatDate(artist.createdAt)}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right space-x-2">
                        <button
                          onClick={() => handleEdit(artist._id)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(artist._id, artist.name)}
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="bg-[#0d0d0d] px-6 py-4 border-t border-gray-800 flex items-center justify-between">
              <div className="text-gray-400 text-sm">
                Showing {indexOfFirstArtist + 1} to{" "}
                {Math.min(indexOfLastArtist, artists.length)} of {artists.length}{" "}
                artists
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-[#1f1f1f] text-white rounded-lg hover:bg-[#2a2a2a] disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  Previous
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-4 py-2 rounded-lg transition ${currentPage === i + 1
                        ? "bg-purple-600 text-white"
                        : "bg-[#1f1f1f] text-white hover:bg-[#2a2a2a]"
                      }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-[#1f1f1f] text-white rounded-lg hover:bg-[#2a2a2a] disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ViewArtists;
