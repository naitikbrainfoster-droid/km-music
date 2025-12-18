import { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "../../components/admin/AdminLayout";

const AddSong = () => {
  const [artists, setArtists] = useState([]);
  const [selectedArtistId, setSelectedArtistId] = useState("");
  const [selectedArtistName, setSelectedArtistName] = useState("");
  const [isArtistVerified, setIsArtistVerified] = useState(false);
  
  // Search states
  const [searchId, setSearchId] = useState("");
  const [searchName, setSearchName] = useState("");
  
  const [formData, setFormData] = useState({
    songName: "",
    category: "",
    likes: 0,
  });

  const [songFile, setSongFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);

  // Categories (matching your image)
  const categories = [
    "Poetry", "Adventure", "Classical", "Birthday", "Contemporary",
    "Country", "Documentary", "Fiction", "Culture", "Hip-Hop",
    "Punjabi", "Haryanvi", "Bollywood", "Hollywood", "Rock",
    "Rap", "Playful", "Soulful", "Sad", "Gym"
  ];

  // Fetch all artists on mount
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

  // Handle artist verification
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

  // Handle text inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle song file
  const handleSongChange = (e) => {
    setSongFile(e.target.files[0]);
  };

  // Handle thumbnail file
  const handleThumbnailChange = (e) => {
    setThumbnailFile(e.target.files[0]);
  };

  // Submit form
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

    try {
      setLoading(true);

      const data = new FormData();
      data.append("artistId", selectedArtistId);
      data.append("artistName", selectedArtistName);
      data.append("songName", formData.songName);
      data.append("category", formData.category);
      data.append("likes", formData.likes);
      data.append("song", songFile);
      data.append("thumbnail", thumbnailFile);

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

      // Reset form
      setSelectedArtistId("");
      setSelectedArtistName("");
      setIsArtistVerified(false);
      setFormData({
        songName: "",
        category: "",
        likes: 0,
      });
      setSongFile(null);
      setThumbnailFile(null);
      
      // Reset file inputs
      document.getElementById("songInput").value = "";
      document.getElementById("thumbnailInput").value = "";
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto bg-[#111] p-6 rounded-lg text-white">
        <h2 className="text-2xl font-bold mb-6">Add Song</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* ARTIST VERIFICATION SECTION */}
          <div className="bg-[#1a1a1a] p-4 rounded-lg space-y-4">
            <h3 className="text-lg font-semibold text-purple-400">
              Step 1: Verify Artist
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Artist ID with Search */}
              <div>
                <label className="block text-sm mb-2">Artist ID</label>
                <input
                  type="text"
                  placeholder="Search and select ID..."
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  disabled={isArtistVerified}
                  className="w-full p-3 rounded bg-[#1f1f1f] outline-none disabled:opacity-50 mb-2"
                />
                <select
                  value={selectedArtistId}
                  onChange={(e) => {
                    setSelectedArtistId(e.target.value);
                    setIsArtistVerified(false);
                  }}
                  disabled={isArtistVerified}
                  required
                  className="w-full p-3 rounded bg-[#1f1f1f] outline-none disabled:opacity-50"
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

              {/* Artist Name with Search */}
              <div>
                <label className="block text-sm mb-2">Artist Name</label>
                <input
                  type="text"
                  placeholder="Search and select name..."
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  disabled={isArtistVerified}
                  className="w-full p-3 rounded bg-[#1f1f1f] outline-none disabled:opacity-50 mb-2"
                />
                <select
                  value={selectedArtistName}
                  onChange={(e) => {
                    setSelectedArtistName(e.target.value);
                    setIsArtistVerified(false);
                  }}
                  disabled={isArtistVerified}
                  required
                  className="w-full p-3 rounded bg-[#1f1f1f] outline-none disabled:opacity-50"
                  size="5"
                >
                  <option value="">Select Artist Name</option>
                  {artists
                    .filter((artist) =>
                      artist.name.toLowerCase().includes(searchName.toLowerCase())
                    )
                    .map((artist, index) => (
                      <option key={artist._id} value={artist.name}>
                        {artist.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            {/* Verify Button */}
            {!isArtistVerified && (
              <button
                type="button"
                onClick={handleVerifyArtist}
                disabled={verifyLoading}
                className="w-full bg-green-600 hover:bg-green-700 py-2 rounded font-semibold"
              >
                {verifyLoading ? "Verifying..." : "Verify Artist Match"}
              </button>
            )}

            {/* Verified Badge */}
            {isArtistVerified && (
              <div className="flex items-center justify-center gap-2 bg-green-600/20 text-green-400 py-2 rounded">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-semibold">Artist Verified ✓</span>
              </div>
            )}
          </div>

          {/* SONG DETAILS SECTION (Only enabled after verification) */}
          <div
            className={`space-y-4 ${
              !isArtistVerified ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            <h3 className="text-lg font-semibold text-purple-400">
              Step 2: Song Details
            </h3>

            {/* Song Name */}
            <input
              type="text"
              name="songName"
              placeholder="Song Name"
              value={formData.songName}
              onChange={handleChange}
              required
              disabled={!isArtistVerified}
              className="w-full p-3 rounded bg-[#1f1f1f] outline-none disabled:opacity-50"
            />

            {/* Category */}
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              disabled={!isArtistVerified}
              className="w-full p-3 rounded bg-[#1f1f1f] outline-none disabled:opacity-50"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            {/* Likes */}
            <input
              type="number"
              name="likes"
              placeholder="Initial Likes (optional)"
              value={formData.likes}
              onChange={handleChange}
              min="0"
              disabled={!isArtistVerified}
              className="w-full p-3 rounded bg-[#1f1f1f] outline-none disabled:opacity-50"
            />

            {/* Song File Upload */}
            <div>
              <label className="block text-sm mb-2">Upload Song File</label>
              <input
                id="songInput"
                type="file"
                accept="audio/*"
                onChange={handleSongChange}
                disabled={!isArtistVerified}
                className="w-full text-sm disabled:opacity-50"
              />
            </div>

            {/* Thumbnail Upload */}
            <div>
              <label className="block text-sm mb-2">Upload Thumbnail</label>
              <input
                id="thumbnailInput"
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
                disabled={!isArtistVerified}
                className="w-full text-sm disabled:opacity-50"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !isArtistVerified}
              className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Uploading..." : "Add Song"}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AddSong;
