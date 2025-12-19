import { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "../../components/admin/AdminLayout";

const AddSong = () => {
  const [artists, setArtists] = useState([]);
  const [selectedArtistId, setSelectedArtistId] = useState("");
  const [selectedArtistName, setSelectedArtistName] = useState("");
  const [isArtistVerified, setIsArtistVerified] = useState(false);
  
  const [searchId, setSearchId] = useState("");
  const [searchName, setSearchName] = useState("");
  
  const [formData, setFormData] = useState({
    songName: "",
    category: "",
    audioType: "MP3",
    description: "",
    likes: 0,
  });

  const [songFile, setSongFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [videoThumbnailFile, setVideoThumbnailFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);

  const categories = [
    "Poetry", "Adventure", "Classical", "Birthday", "Contemporary",
    "Country", "Documentary", "Fiction", "Culture", "Hip-Hop",
    "Punjabi", "Haryanvi", "Bollywood", "Hollywood", "Rock",
    "Rap", "Playful", "Soulful", "Sad", "Gym"
  ];

  useEffect(() => {
    fetchArtists();
  }, []);

  const fetchArtists = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/songs/artists");
      setArtists(res.data.artists || []);
    } catch (err) {
      console.error("Error fetching artists:", err);
    }
  };

  const handleVerifyArtist = async () => {
    if (!selectedArtistId || !selectedArtistName) {
      alert("Please select both Artist ID and Artist Name");
      return;
    }

    try {
      setVerifyLoading(true);
      const res = await axios.post(
        "http://localhost:5000/api/songs/verify-artist",
        {
          artistId: selectedArtistId,
          artistName: selectedArtistName,
        }
      );

      if (res.data.success) {
        setIsArtistVerified(true);
        alert("✅ Artist verified! You can now fill the song details.");
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Artist verification failed ❌");
      setIsArtistVerified(false);
    } finally {
      setVerifyLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isArtistVerified) {
      alert("Please verify the artist first!");
      return;
    }

    if (!songFile || !thumbnailFile) {
      alert("Song and thumbnail files are required");
      return;
    }

    if (formData.audioType === "Video" && !videoFile) {
      alert("Video file is required when Video type is selected");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();
      data.append("artistId", selectedArtistId);
      data.append("artistName", selectedArtistName);
      data.append("songName", formData.songName);
      data.append("category", formData.category);
      data.append("audioType", formData.audioType);
      data.append("description", formData.description);
      data.append("likes", formData.likes);
      data.append("song", songFile);
      data.append("thumbnail", thumbnailFile);
      
      if (formData.audioType === "Video" && videoFile) {
        data.append("video", videoFile);
      }
      if (videoThumbnailFile) {
        data.append("videoThumbnail", videoThumbnailFile);
      }

      const res = await axios.post(
        "http://localhost:5000/api/songs/add",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Song added successfully ✅");
      console.log(res.data);

      // Reset
      setSelectedArtistId("");
      setSelectedArtistName("");
      setIsArtistVerified(false);
      setSearchId("");
      setSearchName("");
      setFormData({
        songName: "",
        category: "",
        audioType: "MP3",
        description: "",
        likes: 0,
      });
      setSongFile(null);
      setThumbnailFile(null);
      setVideoFile(null);
      setVideoThumbnailFile(null);
      
      // Reset file inputs
      document.querySelectorAll('input[type="file"]').forEach(input => input.value = "");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-8 text-white">Add New Song</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* SECTION 1: ARTIST VERIFICATION */}
          <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] p-6 rounded-2xl shadow-2xl border border-purple-900/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-white">
                Artist Verification
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Artist ID */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Artist ID
                </label>
                <input
                  type="text"
                  placeholder="🔍 Search by ID..."
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  disabled={isArtistVerified}
                  className="w-full p-3 rounded-xl bg-[#0d0d0d] border border-gray-800 outline-none focus:border-purple-500 transition disabled:opacity-50 text-white mb-2"
                />
                <div className="h-40 overflow-y-auto border border-gray-800 rounded-xl bg-[#0d0d0d] scrollbar-thin scrollbar-thumb-purple-600 scrollbar-track-gray-800">
                  <select
                    value={selectedArtistId}
                    onChange={(e) => {
                      setSelectedArtistId(e.target.value);
                      setIsArtistVerified(false);
                    }}
                    disabled={isArtistVerified}
                    required
                    className="w-full p-3 bg-transparent outline-none text-white"
                    size="5"
                  >
                    <option value="">Select Artist ID</option>
                    {artists
                      .map((artist, index) => ({ ...artist, displayId: index + 1 }))
                      .filter((artist) =>
                        artist.displayId.toString().includes(searchId)
                      )
                      .map((artist) => (
                        <option key={artist._id} value={artist._id}>
                          ID: {artist.displayId} - {artist.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              {/* Artist Name */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Artist Name
                </label>
                <input
                  type="text"
                  placeholder="🔍 Search by name..."
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  disabled={isArtistVerified}
                  className="w-full p-3 rounded-xl bg-[#0d0d0d] border border-gray-800 outline-none focus:border-purple-500 transition disabled:opacity-50 text-white mb-2"
                />
                <div className="h-40 overflow-y-auto border border-gray-800 rounded-xl bg-[#0d0d0d] scrollbar-thin scrollbar-thumb-purple-600 scrollbar-track-gray-800">
                  <select
                    value={selectedArtistName}
                    onChange={(e) => {
                      setSelectedArtistName(e.target.value);
                      setIsArtistVerified(false);
                    }}
                    disabled={isArtistVerified}
                    required
                    className="w-full p-3 bg-transparent outline-none text-white"
                    size="5"
                  >
                    <option value="">Select Artist Name</option>
                    {artists
                      .filter((artist) =>
                        artist.name.toLowerCase().includes(searchName.toLowerCase())
                      )
                      .map((artist) => (
                        <option key={artist._id} value={artist.name}>
                          {artist.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Verify Button / Status */}
            <div className="mt-6">
              {!isArtistVerified ? (
                <button
                  type="button"
                  onClick={handleVerifyArtist}
                  disabled={verifyLoading}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 rounded-xl font-semibold shadow-lg transition-all duration-200"
                >
                  {verifyLoading ? "Verifying..." : "✓ Verify Artist Match"}
                </button>
              ) : (
                <div className="flex items-center justify-center gap-3 bg-green-600/20 border border-green-500/30 text-green-400 py-3 rounded-xl">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="font-semibold text-lg">Artist Verified ✓</span>
                </div>
              )}
            </div>
          </div>

          {/* SECTION 2: SONG DETAILS */}
          <div
            className={`bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] p-6 rounded-2xl shadow-2xl border border-purple-900/20 transition-all duration-300 ${
              !isArtistVerified ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-white">
                Song Details
              </h3>
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
                  disabled={!isArtistVerified}
                  className="w-full p-3 rounded-xl bg-[#0d0d0d] border border-gray-800 outline-none focus:border-purple-500 transition text-white"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Select Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  disabled={!isArtistVerified}
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
              <div>
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
                      disabled={!isArtistVerified}
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
                      disabled={!isArtistVerified}
                      className="w-4 h-4 text-purple-600"
                    />
                    <span className="text-white">Video</span>
                  </label>
                </div>
              </div>

              {/* Likes */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Initial Likes
                </label>
                <input
                  type="number"
                  name="likes"
                  placeholder="0"
                  value={formData.likes}
                  onChange={handleChange}
                  min="0"
                  disabled={!isArtistVerified}
                  className="w-full p-3 rounded-xl bg-[#0d0d0d] border border-gray-800 outline-none focus:border-purple-500 transition text-white"
                />
              </div>

              {/* Upload MP3 */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Upload MP3 File *
                </label>
                <input
                  type="file"
                  accept="audio/*"
                  onChange={(e) => setSongFile(e.target.files[0])}
                  disabled={!isArtistVerified}
                  className="w-full p-3 rounded-xl bg-[#0d0d0d] border border-gray-800 text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-600 file:text-white file:cursor-pointer hover:file:bg-purple-700"
                />
              </div>

              {/* Upload Thumbnail */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Upload Thumbnail Image *
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setThumbnailFile(e.target.files[0])}
                  disabled={!isArtistVerified}
                  className="w-full p-3 rounded-xl bg-[#0d0d0d] border border-gray-800 text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-600 file:text-white file:cursor-pointer hover:file:bg-purple-700"
                />
              </div>

              {/* Video File (conditional) */}
              {formData.audioType === "Video" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Upload Video File *
                    </label>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) => setVideoFile(e.target.files[0])}
                      disabled={!isArtistVerified}
                      className="w-full p-3 rounded-xl bg-[#0d0d0d] border border-gray-800 text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-600 file:text-white file:cursor-pointer hover:file:bg-purple-700"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Video Thumbnail (optional)
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setVideoThumbnailFile(e.target.files[0])}
                      disabled={!isArtistVerified}
                      className="w-full p-3 rounded-xl bg-[#0d0d0d] border border-gray-800 text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-600 file:text-white file:cursor-pointer hover:file:bg-purple-700"
                    />
                  </div>
                </>
              )}

              {/* Description (full width) */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description / Lyrics
                </label>
                <textarea
                  name="description"
                  placeholder="Add song description or lyrics..."
                  value={formData.description}
                  onChange={handleChange}
                  rows="5"
                  disabled={!isArtistVerified}
                  className="w-full p-3 rounded-xl bg-[#0d0d0d] border border-gray-800 outline-none focus:border-purple-500 transition text-white resize-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8">
              <button
                type="submit"
                disabled={loading || !isArtistVerified}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-4 rounded-xl font-semibold text-lg shadow-2xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Uploading...
                  </span>
                ) : (
                  "🎵 Add Song"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AddSong;
