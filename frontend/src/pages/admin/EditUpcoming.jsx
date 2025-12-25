import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AdminLayout from "../../components/admin/AdminLayout";

const EditUpcoming = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  /* ================= STATE ================= */
  const [formData, setFormData] = useState({
    songTitle: "",
    sungBy: "",
    previewInfo: "",
    publishedDate: "",
    itemType: "MP3",
  });

  const [currentTrailer, setCurrentTrailer] = useState("");
  const [currentThumbnail, setCurrentThumbnail] = useState("");
  const [newTrailerFile, setNewTrailerFile] = useState(null);
  const [newThumbnailFile, setNewThumbnailFile] = useState(null);

  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  /* ================= FETCH UPCOMING ================= */
  useEffect(() => {
    fetchUpcoming();
    // eslint-disable-next-line
  }, [id]);

  const fetchUpcoming = async () => {
    try {
      setFetchLoading(true);

      const res = await axios.get(
        `http://localhost:5000/api/upcoming/${id}`
      );

      // ✅ SAFE RESPONSE (works for all backend formats)
      const song = res.data?.upcoming || res.data?.song || res.data;

      if (!song || !song._id) {
        throw new Error("Invalid upcoming data");
      }

      setFormData({
        songTitle: song.songTitle || "",
        sungBy: song.sungBy || "",
        previewInfo: song.previewInfo || "",
        publishedDate: song.publishedDate
          ? song.publishedDate.split("T")[0]
          : "",
        itemType: song.itemType || "MP3",
      });

      setCurrentTrailer(song.trailerUrl || "");
      setCurrentThumbnail(song.thumbnailUrl || "");
    } catch (error) {
      console.error("FETCH UPCOMING ERROR:", error);
      alert("Failed to fetch upcoming song ❌");
      navigate("/admin/upcoming");
    } finally {
      setFetchLoading(false);
    }
  };

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* ================= UPDATE ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();
      data.append("songTitle", formData.songTitle);
      data.append("sungBy", formData.sungBy);
      data.append("previewInfo", formData.previewInfo);
      data.append("publishedDate", formData.publishedDate);
      data.append("itemType", formData.itemType);

      if (newTrailerFile) {
        data.append("trailer", newTrailerFile);
      }

      if (newThumbnailFile) {
        data.append("thumbnail", newThumbnailFile);
      }

      await axios.put(
        `http://localhost:5000/api/upcoming/${id}`,
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      alert("Upcoming song updated successfully ✅");
      navigate("/admin/upcoming");
    } catch (error) {
      console.error("UPDATE ERROR:", error);
      alert(error.response?.data?.message || "Update failed ❌");
    } finally {
      setLoading(false);
    }
  };

  /* ================= LOADING UI ================= */
  if (fetchLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-purple-600"></div>
        </div>
      </AdminLayout>
    );
  }

  /* ================= UI ================= */
  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-white">
            Edit Upcoming Song
          </h2>
          <button
            onClick={() => navigate("/admin/upcoming")}
            className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-xl text-white"
          >
            ← Back
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] p-8 rounded-2xl border border-purple-900/20">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

              {/* LEFT COLUMN */}
              <div className="space-y-6">
                <input
                  type="text"
                  name="songTitle"
                  value={formData.songTitle}
                  onChange={handleChange}
                  placeholder="Song Title"
                  required
                  className="w-full p-3 rounded-xl bg-black border border-gray-800 text-white"
                />

                <input
                  type="text"
                  name="sungBy"
                  value={formData.sungBy}
                  onChange={handleChange}
                  placeholder="Sung By"
                  required
                  className="w-full p-3 rounded-xl bg-black border border-gray-800 text-white"
                />

                <input
                  type="date"
                  name="publishedDate"
                  value={formData.publishedDate}
                  onChange={handleChange}
                  required
                  className="w-full p-3 rounded-xl bg-black border border-gray-800 text-white"
                />

                {/* ITEM TYPE */}
                <div className="flex gap-6">
                  {["MP3", "Video"].map((type) => (
                    <label key={type} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="itemType"
                        value={type}
                        checked={formData.itemType === type}
                        onChange={handleChange}
                      />
                      <span className="text-white">{type}</span>
                    </label>
                  ))}
                </div>

                {/* CURRENT TRAILER */}
                {currentTrailer && (
                  <a
                    href={currentTrailer}
                    target="_blank"
                    rel="noreferrer"
                    className="text-purple-400 underline text-sm"
                  >
                    View Current Trailer
                  </a>
                )}

                <input
                  type="file"
                  accept={formData.itemType === "MP3" ? "audio/*" : "video/*"}
                  onChange={(e) => setNewTrailerFile(e.target.files[0])}
                  className="w-full text-gray-400"
                />
              </div>

              {/* RIGHT COLUMN */}
              <div className="space-y-6">
                <textarea
                  name="previewInfo"
                  value={formData.previewInfo}
                  onChange={handleChange}
                  rows="6"
                  placeholder="Preview Information"
                  className="w-full p-3 rounded-xl bg-black border border-gray-800 text-white resize-none"
                />

                {currentThumbnail && (
                  <img
                    src={currentThumbnail}
                    alt="Thumbnail"
                    className="w-32 h-32 rounded-xl object-cover"
                  />
                )}

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setNewThumbnailFile(e.target.files[0])}
                  className="w-full text-gray-400"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-8 w-full bg-gradient-to-r from-purple-600 to-indigo-600 py-4 rounded-xl text-white font-semibold disabled:opacity-50"
            >
              {loading ? "Updating..." : "💾 Update Upcoming Song"}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default EditUpcoming;
