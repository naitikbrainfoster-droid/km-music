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
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!trailerFile) {
      alert("Trailer file is required");
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
      data.append("sungBy", formData.sungBy);
      data.append("previewInfo", formData.previewInfo);
      data.append("publishedDate", formData.publishedDate);
      data.append("itemType", formData.itemType);
      data.append("trailer", trailerFile);
      data.append("thumbnail", thumbnailFile);
      
      if (formData.itemType === "Video" && videoThumbnailFile) {
        data.append("videoThumbnail", videoThumbnailFile);
      }

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
      setThumbnailFile(null);
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
        <h2 className="text-3xl font-bold mb-8 text-white">Add Upcoming Song</h2>

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

                {/* Sung By */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Sung By *
                  </label>
                  <input
                    type="text"
                    name="sungBy"
                    placeholder="Enter artist name"
                    value={formData.sungBy}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded-xl bg-[#0d0d0d] border border-gray-800 outline-none focus:border-purple-500 transition text-white"
                  />
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

                {/* Item Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Item Type *
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="itemType"
                        value="MP3"
                        checked={formData.itemType === "MP3"}
                        onChange={handleChange}
                        className="w-4 h-4 text-purple-600"
                      />
                      <span className="text-white">MP3</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="itemType"
                        value="Video"
                        checked={formData.itemType === "Video"}
                        onChange={handleChange}
                        className="w-4 h-4 text-purple-600"
                      />
                      <span className="text-white">Video</span>
                    </label>
                  </div>
                </div>

                {/* Trailer Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Upload Trailer {formData.itemType === "MP3" ? "Audio" : "Video"} *
                  </label>
                  <input
                    type="file"
                    accept={formData.itemType === "MP3" ? "audio/*" : "video/*"}
                    onChange={(e) => setTrailerFile(e.target.files[0])}
                    className="w-full p-3 rounded-xl bg-[#0d0d0d] border border-gray-800 text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-600 file:text-white file:cursor-pointer hover:file:bg-purple-700"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Upload {formData.itemType === "MP3" ? "audio" : "video"} file
                  </p>
                </div>
              </div>

              {/* RIGHT COLUMN */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-purple-400 mb-4">
                  Additional Details
                </h3>

                {/* Preview Information */}
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

                {/* Thumbnail Upload */}
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

            {/* Submit Button */}
            <div className="mt-8">
              <button
                type="submit"
                disabled={loading}
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
                  "🎵 Add Upcoming Song"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AddUpcoming;
