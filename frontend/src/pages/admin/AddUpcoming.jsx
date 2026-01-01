import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../components/admin/AdminLayout";

const AddUpcoming = () => {
  /* ================= ARTIST STATES ================= */
  const [artists, setArtists] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [showArtistList, setShowArtistList] = useState(false);

  /* ================= FORM STATES ================= */
  const [formData, setFormData] = useState({
    songTitle: "",
    previewInfo: "",
    publishedDate: "",
    youtubeUrl: "",
    category: "Punjabi",
  });

  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH ARTISTS ================= */
  useEffect(() => {
    fetchArtists();
  }, []);

  const fetchArtists = async () => {
    try {
      const res = await axios.get(
        "/api/songs/artists"
      );

      const withIds = (res.data.artists || []).map((a, index) => ({
        ...a,
        numericId: index + 1,
      }));

      setArtists(withIds);
    } catch (err) {
      console.error("Artist fetch error:", err);
    }
  };

  /* ================= HANDLERS ================= */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedArtist) {
      alert("Please select artist");
      return;
    }

    if (!thumbnailFile) {
      alert("Thumbnail image is required");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();
      data.append("songTitle", formData.songTitle);
      data.append("sungBy", selectedArtist._id); // 🔥 IMPORTANT
      data.append("previewInfo", formData.previewInfo);
      data.append("publishedDate", formData.publishedDate);
      data.append("youtubeUrl", formData.youtubeUrl);
      data.append("thumbnail", thumbnailFile);
      data.append("category", formData.category);

      await axios.post(
        "/api/upcoming/add",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      alert("Upcoming song added successfully ✅");

      // RESET
      setFormData({
        songTitle: "",
        previewInfo: "",
        publishedDate: "",
        youtubeUrl: "",
        category: "Punjabi",
      });

      setSelectedArtist(null);
      setSearch("");
      setThumbnailFile(null);
    } catch (err) {
      console.error(err);
      alert("Upload failed ❌");
    } finally {
      setLoading(false);
    }
  };

  const filteredArtists = artists.filter(
    (a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      String(a.numericId).includes(search)
  );

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-8 text-white">
          Add Upcoming Song
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] p-8 rounded-2xl shadow-2xl border border-purple-900/20">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

              {/* LEFT COLUMN */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-purple-400 mb-4">
                  Basic Information
                </h3>

                {/* Song Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Song Title *
                  </label>
                  <input
                    type="text"
                    name="songTitle"
                    placeholder="Enter song title"
                    value={formData.songTitle}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded-xl bg-[#0d0d0d] border border-gray-800 outline-none focus:border-purple-500 transition text-white"
                  />
                </div>

                {/* SUNG BY (DESIGN SAME, CLICK TO OPEN) */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Sung By *
                  </label>

                  <input
                    type="text"
                    placeholder="Select artist"
                    value={
                      selectedArtist
                        ? `${selectedArtist.numericId} - ${selectedArtist.name}`
                        : search
                    }
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setShowArtistList(true);
                    }}
                    onFocus={() => setShowArtistList(true)}
                    className="w-full p-3 rounded-xl bg-[#0d0d0d] border border-gray-800 outline-none focus:border-purple-500 transition text-white cursor-pointer"
                  />

                  {showArtistList && (
                    <div className="absolute z-20 mt-2 w-full max-h-52 overflow-y-auto bg-[#0d0d0d] border border-gray-800 rounded-xl shadow-xl">
                      {filteredArtists.map((a) => (
                        <div
                          key={a._id}
                          onClick={() => {
                            setSelectedArtist(a);
                            setSearch(`${a.numericId} - ${a.name}`);
                            setShowArtistList(false);
                          }}
                          className="px-4 py-3 cursor-pointer hover:bg-purple-700 text-white"
                        >
                          <span className="text-purple-400 mr-2">
                            {a.numericId}
                          </span>
                          {a.name}
                        </div>
                      ))}

                      {filteredArtists.length === 0 && (
                        <div className="px-4 py-3 text-gray-400">
                          No artists found
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Published Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Published Date *
                  </label>
                  <input
                    type="date"
                    name="publishedDate"
                    value={formData.publishedDate}
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
                    <option value="Punjabi">Punjabi</option>
                    <option value="Haryanvi">Haryanvi</option>
                    <option value="Bollywood">Bollywood</option>
                    <option value="Hollywood">Hollywood</option>
                    <option value="Rock">Rock</option>
                    <option value="Culture">Culture</option>
                  </select>
                </div>


                {/* YouTube URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    YouTube Video URL *
                  </label>
                  <input
                    type="url"
                    name="youtubeUrl"
                    placeholder="https://www.youtube.com/watch?v=xxxxx"
                    value={formData.youtubeUrl}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded-xl bg-[#0d0d0d] border border-gray-800 outline-none focus:border-purple-500 transition text-white"
                  />
                </div>
              </div>

              {/* RIGHT COLUMN */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-purple-400 mb-4">
                  Additional Details
                </h3>

                {/* Preview Info */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Preview Information
                  </label>
                  <textarea
                    name="previewInfo"
                    placeholder="Add preview description..."
                    value={formData.previewInfo}
                    onChange={handleChange}
                    rows="6"
                    className="w-full p-3 rounded-xl bg-[#0d0d0d] border border-gray-800 outline-none focus:border-purple-500 transition text-white resize-none"
                  />
                </div>

                {/* Thumbnail */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Upload Thumbnail Image *
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setThumbnailFile(e.target.files[0])}
                    className="w-full p-3 rounded-xl bg-[#0d0d0d] border border-gray-800 text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-600 file:text-white file:cursor-pointer hover:file:bg-purple-700"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Main thumbnail for the song
                  </p>
                </div>
              </div>
            </div>

            {/* SUBMIT */}
            <div className="mt-8">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-4 rounded-xl font-semibold text-lg shadow-2xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Uploading..." : "🎵 Add Upcoming Song"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AddUpcoming;
