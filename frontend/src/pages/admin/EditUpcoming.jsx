import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AdminLayout from "../../components/admin/AdminLayout";

const EditUpcoming = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    songTitle: "",
    sungBy: "",        // artist ID (backend ke liye)
    sungByName: "",    // artist NAME (UI ke liye)
    previewInfo: "",
    publishedDate: "",
    category: "Punjabi",
    youtubeUrl: "",
  });


  const [currentThumbnail, setCurrentThumbnail] = useState("");
  const [newThumbnailFile, setNewThumbnailFile] = useState(null);

  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  /* ================= FETCH ================= */
  useEffect(() => {
    fetchUpcoming();
    // eslint-disable-next-line
  }, [id]);

  const fetchUpcoming = async () => {
    try {
      setFetchLoading(true);
      const res = await axios.get(`/api/upcoming/${id}`);
      const song = res.data?.upcoming || res.data;

      setFormData({
        songTitle: song.songTitle || "",
        sungBy: song.sungBy?._id || "",       // ✅ ID save
        sungByName: song.sungBy?.name || "",  // ✅ NAME show
        category: song.category || "Punjabi",
        previewInfo: song.previewInfo || "",
        youtubeUrl: song.youtubeUrl || "",
        publishedDate: song.publishedDate?.split("T")[0] || "",
      });



      setCurrentThumbnail(song.thumbnailUrl || "");
    } catch (err) {
      alert("Failed to fetch upcoming song");
      navigate("/admin/upcoming");
    } finally {
      setFetchLoading(false);
    }
  };

  /* ================= CHANGE ================= */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* ================= UPDATE ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const data = new FormData();
      data.append("songTitle", formData.songTitle);
      data.append("sungBy", formData.sungBy);
      data.append("category", formData.category);
      data.append("previewInfo", formData.previewInfo);
      data.append("youtubeUrl", formData.youtubeUrl);
      data.append("publishedDate", formData.publishedDate);

      if (newThumbnailFile) {
        data.append("thumbnail", newThumbnailFile);
      }

      await axios.put(
        `/api/upcoming/${id}`,
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      alert("Video updated successfully ✅");
      navigate("/admin/upcoming");
    } catch (err) {
      alert("Update failed ❌");
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin h-14 w-14 border-t-2 border-purple-600 rounded-full"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-white mb-6">
          Edit Video Song
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6 bg-[#111] p-8 rounded-xl">

          <input
            name="songTitle"
            value={formData.songTitle}
            onChange={handleChange}
            placeholder="Song Title"
            required
            className="w-full p-3 rounded bg-black border border-gray-800 text-white"
          />

          <input
            value={formData.sungByName}
            disabled
            placeholder="Sung By"
            className="w-full p-3 rounded bg-black border border-gray-800 text-white cursor-not-allowed"
          />


          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full p-3 rounded bg-black border border-gray-800 text-white"
          >
            <option value="Punjabi">Punjabi</option>
            <option value="Haryanvi">Haryanvi</option>
            <option value="Bollywood">Bollywood</option>
            <option value="Hollywood">Hollywood</option>
            <option value="Rock">Rock</option>
            <option value="Culture">Culture</option>
          </select>

          <input
            name="youtubeUrl"
            value={formData.youtubeUrl}
            onChange={handleChange}
            placeholder="YouTube Video URL"
            required
            className="w-full p-3 rounded bg-black border border-gray-800 text-white"
          />


          <input
            type="date"
            name="publishedDate"
            value={formData.publishedDate}
            onChange={handleChange}
            required
            className="w-full p-3 rounded bg-black border border-gray-800 text-white"
          />

          <textarea
            name="previewInfo"
            value={formData.previewInfo}
            onChange={handleChange}
            placeholder="Preview Info"
            rows="4"
            className="w-full p-3 rounded bg-black border border-gray-800 text-white"
          />



          {currentThumbnail && (
            <img src={currentThumbnail} className="w-32 h-32 rounded-xl" />
          )}

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setNewThumbnailFile(e.target.files[0])}
            className="text-gray-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold"
          >
            {loading ? "Updating..." : "Update Video Song"}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default EditUpcoming;
