import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminLayout from "../../components/admin/AdminLayout";

const ViewSongs = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const songsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/songs");
      setSongs(res.data.songs || []);
    } catch (err) {
      console.error("Error fetching songs:", err);
      alert("Failed to fetch songs");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) {
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/songs/${id}`);
      alert("Song deleted successfully ✅");
      fetchSongs(); // Refresh list
    } catch (err) {
      console.error("Error deleting song:", err);
      alert("Failed to delete song ❌");
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/songs/edit/${id}`);
  };

  // Pagination
  const indexOfLastSong = currentPage * songsPerPage;
  const indexOfFirstSong = indexOfLastSong - songsPerPage;
  const currentSongs = songs.slice(indexOfFirstSong, indexOfLastSong);
  const totalPages = Math.ceil(songs.length / songsPerPage);

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
            <h2 className="text-3xl font-bold text-white">All Songs</h2>
            <p className="text-gray-400 mt-1">
              Manage your songs ({songs.length} total)
            </p>
          </div>
          <button
            onClick={() => navigate("/admin/songs/add")}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-200"
          >
            + Add New Song
          </button>
        </div>

        {/* Songs Table */}
        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] rounded-2xl shadow-2xl border border-purple-900/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#0d0d0d] border-b border-gray-800">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Thumbnail
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Song Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Artist
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Likes
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
                {currentSongs.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="px-6 py-12 text-center text-gray-400">
                      No songs found. Add your first song!
                    </td>
                  </tr>
                ) : (
                  currentSongs.map((song, index) => (
                    <tr
                      key={song._id}
                      className="hover:bg-[#1f1f1f] transition-colors"
                    >
                      {/* Thumbnail */}
                      <td className="px-6 py-4">
                        <img
                          src={song.thumbnailUrl}
                          alt={song.songName}
                          className="w-14 h-14 rounded-lg object-cover shadow-lg"
                        />
                      </td>

                      {/* Song Name */}
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-white font-semibold">
                            {song.songName}
                          </div>
                          <div className="text-gray-400 text-sm">
                            ID: {indexOfFirstSong + index + 1}
                          </div>
                        </div>
                      </td>

                      {/* Artist */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {song.artistId?.imageUrl ? (
                            <img
                              src={song.artistId.imageUrl}
                              alt={song.artistName}
                              className="w-8 h-8 rounded-full object-cover"
                              onError={(e) => {
                                e.target.style.display = 'none';
                              }}
                            />
                          ) : null}
                          <span className="text-gray-300">{song.artistName}</span>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-purple-600/20 text-purple-400 border border-purple-500/30 rounded-full text-xs font-semibold">
                          {song.category}
                        </span>
                      </td>

                      {/* Type */}
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            song.audioType === "Video"
                              ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                              : "bg-green-600/20 text-green-400 border border-green-500/30"
                          }`}
                        >
                          {song.audioType || "MP3"}
                        </span>
                      </td>

                      {/* Likes */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 text-gray-300">
                          <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                          </svg>
                          <span>{song.likes || 0}</span>
                        </div>
                      </td>

                      {/* Created Date */}
                      <td className="px-6 py-4 text-gray-300">
                        {formatDate(song.createdAt)}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right space-x-2">
                        <button
                          onClick={() => handleEdit(song._id)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(song._id, song.songName)}
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
                Showing {indexOfFirstSong + 1} to{" "}
                {Math.min(indexOfLastSong, songs.length)} of {songs.length}{" "}
                songs
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
                    className={`px-4 py-2 rounded-lg transition ${
                      currentPage === i + 1
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

export default ViewSongs;
