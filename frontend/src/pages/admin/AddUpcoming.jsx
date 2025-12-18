import { useState } from "react";
import axios from "axios";
import AdminLayout from "../../components/admin/AdminLayout";

const AddUpcoming = () => {
  const [formData, setFormData] = useState({
    songTitle: "",
    sungBy: "",
    previewInfo: "",
    publishedDate: "",
    itemType: "MP3",
  });

  const [trailerFile, setTrailerFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle text inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle trailer file
  const handleTrailerChange = (e) => {
    setTrailerFile(e.target.files[0]);
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!trailerFile) {
      alert("Trailer file is required");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();
      data.append("songTitle", formData.songTitle);
      data.append("sungBy", formData.sungBy);
      data.append("previewInfo", formData.previewInfo);
      data.append("publishedDate", formData.publishedDate);
      data.append("itemType", formData.itemType);
      data.append("trailer", trailerFile);

      const res = await axios.post(
        "http://localhost:5000/api/upcoming/add",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Upcoming song added successfully ✅");
      console.log(res.data);

      // Reset form
      setFormData({
        songTitle: "",
        sungBy: "",
        previewInfo: "",
        publishedDate: "",
        itemType: "MP3",
      });
      setTrailerFile(null);
      document.getElementById("trailerInput").value = "";
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
        <h2 className="text-2xl font-bold mb-6">Add Upcoming Song</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Song Title */}
          <div>
            <label className="block text-sm mb-2">Song Title</label>
            <input
              type="text"
              name="songTitle"
              placeholder="Enter song title"
              value={formData.songTitle}
              onChange={handleChange}
              required
              className="w-full p-3 rounded bg-[#1f1f1f] outline-none"
            />
          </div>

          {/* Sung By */}
          <div>
            <label className="block text-sm mb-2">Sung By</label>
            <input
              type="text"
              name="sungBy"
              placeholder="Enter artist name"
              value={formData.sungBy}
              onChange={handleChange}
              required
              className="w-full p-3 rounded bg-[#1f1f1f] outline-none"
            />
          </div>

          {/* Preview Information */}
          <div>
            <label className="block text-sm mb-2">Preview Information</label>
            <textarea
              name="previewInfo"
              placeholder="Enter preview information (optional)"
              value={formData.previewInfo}
              onChange={handleChange}
              rows="4"
              className="w-full p-3 rounded bg-[#1f1f1f] outline-none"
            />
          </div>

          {/* Published Date */}
          <div>
            <label className="block text-sm mb-2">Published Date</label>
            <input
              type="date"
              name="publishedDate"
              value={formData.publishedDate}
              onChange={handleChange}
              required
              className="w-full p-3 rounded bg-[#1f1f1f] outline-none"
            />
          </div>

          {/* Item Type */}
          <div>
            <label className="block text-sm mb-2">Item Type</label>
            <select
              name="itemType"
              value={formData.itemType}
              onChange={handleChange}
              required
              className="w-full p-3 rounded bg-[#1f1f1f] outline-none"
            >
              <option value="MP3">MP3</option>
              <option value="Video">Video</option>
            </select>
          </div>

          {/* Trailer Upload */}
          <div>
            <label className="block text-sm mb-2">
              Trailer {formData.itemType === "MP3" ? "Song" : "Video"}
            </label>
            <input
              id="trailerInput"
              type="file"
              accept={formData.itemType === "MP3" ? "audio/*" : "video/*"}
              onChange={handleTrailerChange}
              className="w-full text-sm"
            />
            <p className="text-xs text-gray-400 mt-1">
              Upload {formData.itemType === "MP3" ? "audio" : "video"} file
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Uploading..." : "Add Upcoming Song"}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AddUpcoming;
