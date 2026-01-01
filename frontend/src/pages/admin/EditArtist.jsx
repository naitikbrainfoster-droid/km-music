import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AdminLayout from "../../components/admin/AdminLayout";

const EditArtist = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    instagram: "",
    youtube: "",
    facebook: "",
    isActive: true,
  });

  const [currentImage, setCurrentImage] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  useEffect(() => {
    fetchArtist();
  }, [id]);

  const fetchArtist = async () => {
    try {
      setFetchLoading(true);
      const res = await axios.get(`/api/artists/${id}`);
      const artist = res.data.artist;

      setFormData({
        name: artist.name || "",
        bio: artist.bio || "",
        instagram: artist.socialLinks?.instagram || "",
        youtube: artist.socialLinks?.youtube || "",
        facebook: artist.socialLinks?.facebook || "",
        isActive: artist.isActive,
      });
      setCurrentImage(artist.imageUrl);
    } catch (err) {
      console.error("Error fetching artist:", err);
      alert("Failed to fetch artist details");
      navigate("/admin/artists/view");
    } finally {
      setFetchLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();
      data.append("name", formData.name);
      data.append("bio", formData.bio);
      data.append("instagram", formData.instagram);
      data.append("youtube", formData.youtube);
      data.append("facebook", formData.facebook);
      data.append("isActive", formData.isActive);

      if (newImage) {
        data.append("image", newImage);
      }

      const res = await axios.put(
        `/api/artists/${id}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Artist updated successfully ✅");
      console.log(res.data);
      navigate("/admin/artists/view");
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
            <h2 className="text-3xl font-bold text-white">Edit Artist</h2>
            <p className="text-gray-400 mt-1">Update artist information</p>
          </div>
          <button
            onClick={() => navigate("/admin/artists/view")}
            className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200"
          >
            ← Back to List
          </button>
        </div>

        {/* Form */}
        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] p-8 rounded-2xl shadow-2xl border border-purple-900/20">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Current Image Preview */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Current Image
              </label>
              <img
                src={currentImage}
                alt={formData.name}
                className="w-32 h-32 rounded-xl object-cover shadow-lg"
              />
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Artist Name *
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter artist name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-xl bg-[#0d0d0d] border border-gray-800 outline-none focus:border-purple-500 transition text-white"
              />
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Bio / Description
              </label>
              <textarea
                name="bio"
                placeholder="Enter artist bio"
                value={formData.bio}
                onChange={handleChange}
                rows="4"
                className="w-full p-3 rounded-xl bg-[#0d0d0d] border border-gray-800 outline-none focus:border-purple-500 transition text-white resize-none"
              />
            </div>

            {/* Social Links */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Instagram Link
                </label>
                <input
                  type="text"
                  name="instagram"
                  placeholder="Instagram URL"
                  value={formData.instagram}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl bg-[#0d0d0d] border border-gray-800 outline-none focus:border-purple-500 transition text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  YouTube Link
                </label>
                <input
                  type="text"
                  name="youtube"
                  placeholder="YouTube URL"
                  value={formData.youtube}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl bg-[#0d0d0d] border border-gray-800 outline-none focus:border-purple-500 transition text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Facebook Link
                </label>
                <input
                  type="text"
                  name="facebook"
                  placeholder="Facebook URL"
                  value={formData.facebook}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl bg-[#0d0d0d] border border-gray-800 outline-none focus:border-purple-500 transition text-white"
                />
              </div>
            </div>

            {/* Upload New Image */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Upload New Image (optional)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-3 rounded-xl bg-[#0d0d0d] border border-gray-800 text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-600 file:text-white file:cursor-pointer hover:file:bg-purple-700"
              />
              <p className="text-xs text-gray-500 mt-2">
                Leave empty to keep current image
              </p>
            </div>

            {/* Status */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                name="isActive"
                id="isActive"
                checked={formData.isActive}
                onChange={handleChange}
                className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
              />
              <label htmlFor="isActive" className="text-white font-medium">
                Active Status
              </label>
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
                  "💾 Update Artist"
                )}
              </button>
              <button
                type="button"
                onClick={() => navigate("/admin/artists/view")}
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

export default EditArtist;
