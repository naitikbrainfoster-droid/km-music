import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../components/admin/AdminLayout";

const AddSong = () => {
  const [artists, setArtists] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedArtist, setSelectedArtist] = useState(null);

  const [formData, setFormData] = useState({
    songName: "",
    category: "",
    audioType: "MP3",
    likes: 0,
    description: "",
  });

  // 🔥 MULTIPLE SONG FILES
  const [songFiles, setSongFiles] = useState([]);
  const [thumbnailFile, setThumbnailFile] = useState(null);

  // VIDEO
  const [videoFile, setVideoFile] = useState(null);
  const [videoThumbnailFile, setVideoThumbnailFile] = useState(null);

  const [loading, setLoading] = useState(false);

  const categories = [
    "Poetry","Adventure","Classical","Birthday","Contemporary",
    "Country","Documentary","Fiction","Culture","Hip-Hop",
    "Punjabi","Haryanvi","Bollywood","Hollywood","Rock",
    "Rap","Playful","Soulful","Sad","Gym"
  ];

  useEffect(() => {
    fetchArtists();
  }, []);

  const fetchArtists = async () => {
    const res = await axios.get("http://localhost:5000/api/songs/artists");

    const withIds = (res.data.artists || []).map((a, index) => ({
      ...a,
      numericId: index + 1,
    }));

    setArtists(withIds);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedArtist) {
      alert("Please select an artist");
      return;
    }

    if (formData.audioType === "MP3") {
      if (!songFiles.length || !thumbnailFile) {
        alert("MP3 files & thumbnail required");
        return;
      }
    }

    if (formData.audioType === "Video") {
      if (!videoFile || !videoThumbnailFile) {
        alert("Video & video thumbnail required");
        return;
      }
    }

    const data = new FormData();
    data.append("artistId", selectedArtist._id);
    data.append("artistName", selectedArtist.name);
    data.append("songName", formData.songName);
    data.append("category", formData.category);
    data.append("audioType", formData.audioType);
    data.append("likes", formData.likes);
    data.append("description", formData.description);

    // 🔥 MULTIPLE MP3 FILES
    if (formData.audioType === "MP3") {
      songFiles.forEach((file) => {
        data.append("song", file); // backend: songs[]
      });
      data.append("thumbnail", thumbnailFile);
    }

    // 🔥 VIDEO
    if (formData.audioType === "Video") {
      data.append("video", videoFile);
      data.append("videoThumbnail", videoThumbnailFile);
    }

    try {
      setLoading(true);
      await axios.post("http://localhost:5000/api/songs/add", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Song(s) uploaded successfully 🎵");

      // reset
      setSongFiles([]);
      setThumbnailFile(null);
      setVideoFile(null);
      setVideoThumbnailFile(null);
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
      <div className="max-w-6xl mx-auto p-6 text-white">
        <h2 className="text-3xl font-bold mb-6">🎵 Add New Song</h2>

        {/* ARTIST */}
        <div className="mb-8">
          <input
            placeholder="Search artist by name or ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 bg-[#0b0b0b] border border-gray-700 rounded mb-2"
          />

          <div className="max-h-52 overflow-y-auto bg-[#0b0b0b] border border-gray-700 rounded">
            {filteredArtists.map((a) => (
              <div
                key={a._id}
                onClick={() => {
                  setSelectedArtist(a);
                  setSearch(`${a.numericId} ${a.name}`);
                }}
                className={`p-3 cursor-pointer hover:bg-purple-700 ${
                  selectedArtist?._id === a._id ? "bg-purple-600" : ""
                }`}
              >
                <span className="text-purple-400 mr-2">{a.numericId}</span>
                {a.name}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            name="songName"
            placeholder="Song Name"
            value={formData.songName}
            onChange={handleChange}
            className="w-full p-3 bg-[#0b0b0b] border border-gray-700 rounded"
            required
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-3 bg-[#0b0b0b] border border-gray-700 rounded"
            required
          >
            <option value="">Choose category</option>
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          {/* AUDIO TYPE */}
          <div className="flex gap-8">
            <label>
              <input
                type="radio"
                name="audioType"
                value="MP3"
                checked={formData.audioType === "MP3"}
                onChange={handleChange}
              /> MP3
            </label>
            <label>
              <input
                type="radio"
                name="audioType"
                value="Video"
                checked={formData.audioType === "Video"}
                onChange={handleChange}
              /> Video
            </label>
          </div>

          {/* MP3 MULTIPLE */}
          {formData.audioType === "MP3" && (
            <>
              <input
                type="file"
                multiple
                onChange={(e) => setSongFiles([...e.target.files])}
                className="file:bg-purple-600 file:text-white file:px-4 file:py-2 file:rounded"
              />
              <input
                type="file"
                onChange={(e) => setThumbnailFile(e.target.files[0])}
                className="file:bg-purple-600 file:text-white file:px-4 file:py-2 file:rounded"
              />
            </>
          )}

          {/* VIDEO */}
          {formData.audioType === "Video" && (
            <>
              <input
                type="file"
                onChange={(e) => setVideoFile(e.target.files[0])}
                className="file:bg-purple-600 file:text-white file:px-4 file:py-2 file:rounded"
              />
              <input
                type="file"
                onChange={(e) =>
                  setVideoThumbnailFile(e.target.files[0])
                }
                className="file:bg-purple-600 file:text-white file:px-4 file:py-2 file:rounded"
              />
            </>
          )}

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description / Lyrics"
            className="w-full p-3 bg-[#0b0b0b] border border-gray-700 rounded h-32"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 py-4 rounded text-lg font-semibold"
          >
            {loading ? "Uploading..." : "Add Song(s)"}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AddSong;
