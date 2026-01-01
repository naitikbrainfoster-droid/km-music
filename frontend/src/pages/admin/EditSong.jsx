import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AdminLayout from "../../components/admin/AdminLayout";

const EditSong = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    songName: "",
    category: "",
    audioType: "MP3",
    description: "",
    likes: 0,
  });

  const [currentThumbnail, setCurrentThumbnail] = useState("");
  const [newSongFile, setNewSongFile] = useState(null);
  const [newThumbnailFile, setNewThumbnailFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  const categories = [
    "Poetry", "Adventure", "Classical", "Birthday", "Contemporary",
    "Country", "Documentary", "Fiction", "Culture", "Hip-Hop",
    "Punjabi", "Haryanvi", "Bollywood", "Hollywood", "Rock",
    "Rap", "Playful", "Soulful", "Sad", "Gym"
  ];

  useEffect(() => {
    fetchSong();
  }, [id]);

  const fetchSong = async () => {
    try {
      setFetchLoading(true);
      const res = await axios.get(`/api/songs/${id}`);
      const song = res.data.song;

      setFormData({
        songName: song.songName || "",
        category: song.category || "",
        audioType: song.audioType || "MP3",
        description: song.description || "",
        likes: song.likes || 0,
      });
      setCurrentThumbnail(song.thumbnailUrl);
    } catch (err) {
      console.error("Error fetching song:", err);
      alert("Failed to fetch song details");
      navigate("/admin/songs");
    } finally {
      setFetchLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();
      data.append("songName", formData.songName);
      data.append("category", formData.category);
      data.append("audioType", formData.audioType);
      data.append("description", formData.description);
      data.append("likes", formData.likes);

      if (newSongFile) {
        data.append("song", newSongFile);
      }
      if (newThumbnailFile) {
        data.append("thumbnail", newThumbnailFile);
      }

      const res = await axios.put(
        `/api/songs/${id}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Song updated successfully ✅");
      console.log(res.data);
      navigate("/admin/songs");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
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
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white">Edit Song</h2>
            <p className="text-gray-400 mt-1">Update song information</p>
          </div>
          <button
            onClick={() => navigate("/admin/songs")}
            className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200"
          >
            ← Back to List
          </button>
        </div>

        {/* Form */}
        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] p-8 rounded-2xl shadow-2xl border border-purple-900/20">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Current Thumbnail */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Current Thumbnail
              </label>
              <img
                src={currentThumbnail}
                alt={formData.songName}
                className="w-32 h-32 rounded-xl object-cover shadow-lg"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Song Name */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Song Name *
                </label>
                <input
                  type="text"
                  name="songName"
                  placeholder="Enter song name"
                  value={formData.songName}
                  onChange={handleChange}
                  required
                  className="w-full p-3 rounded-xl bg-[#0d0d0d] border border-gray-800 outline-none focus:border-purple-500 transition text-white"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full p-3 rounded-xl bg-[#0d0d0d] border border-gray-800 outline-none focus:border-purple-500 transition text-white"
                >
                  <option value="">Choose category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Audio Type */}
              {/* <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Audio Type *
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="audioType"
                      value="MP3"
                      checked={formData.audioType === "MP3"}
                      onChange={handleChange}
                      className="w-4 h-4 text-purple-600"
                    />
                    <span className="text-white">MP3</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="audioType"
                      value="Video"
                      checked={formData.audioType === "Video"}
                      onChange={handleChange}
                      className="w-4 h-4 text-purple-600"
                    />
                    <span className="text-white">Video</span>
                  </label>
                </div>
              </div> */}

              {/* Likes */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Likes
                </label>
                <input
                  type="number"
                  name="likes"
                  placeholder="0"
                  value={formData.likes}
                  onChange={handleChange}
                  min="0"
                  className="w-full p-3 rounded-xl bg-[#0d0d0d] border border-gray-800 outline-none focus:border-purple-500 transition text-white"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description / Lyrics
              </label>
              <textarea
                name="description"
                placeholder="Add song description or lyrics..."
                value={formData.description}
                onChange={handleChange}
                rows="5"
                className="w-full p-3 rounded-xl bg-[#0d0d0d] border border-gray-800 outline-none focus:border-purple-500 transition text-white resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Upload New Song File */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Upload New Song File (optional)
                </label>
                <input
                  type="file"
                  accept="audio/*"
                  onChange={(e) => setNewSongFile(e.target.files[0])}
                  className="w-full p-3 rounded-xl bg-[#0d0d0d] border border-gray-800 text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-600 file:text-white file:cursor-pointer hover:file:bg-purple-700"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Leave empty to keep current file
                </p>
              </div>

              {/* Upload New Thumbnail */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Upload New Thumbnail (optional)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setNewThumbnailFile(e.target.files[0])}
                  className="w-full p-3 rounded-xl bg-[#0d0d0d] border border-gray-800 text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-600 file:text-white file:cursor-pointer hover:file:bg-purple-700"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Leave empty to keep current thumbnail
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-4 rounded-xl font-semibold text-lg shadow-2xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Updating...
                  </span>
                ) : (
                  "💾 Update Song"
                )}
              </button>
              <button
                type="button"
                onClick={() => navigate("/admin/songs")}
                className="px-8 bg-gray-700 hover:bg-gray-600 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default EditSong;
