import { useState } from "react";
import axios from "axios";
import AdminLayout from "../../components/admin/AdminLayout";

const AddArtist = () => {
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    instagram: "",
    youtube: "",
    facebook: "",
  });  

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // handle text inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // handle image
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Artist image is required");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();
      data.append("name", formData.name);
      data.append("bio", formData.bio);
      data.append("instagram", formData.instagram);
      data.append("youtube", formData.youtube);
      data.append("facebook", formData.facebook);
      data.append("image", image); // 🔥 must match backend field

      const res = await axios.post(
        "http://localhost:5000/api/artists/add",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Artist added successfully ✅");
      console.log(res.data);

      // reset
      setFormData({
        name: "",
        bio: "",
        instagram: "",
        youtube: "",
        facebook: "",
      });
      setImage(null);
    } catch (err) {
      console.error(err);
      alert("Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
    <div className="max-w-xl mx-auto bg-[#111] p-6 rounded-lg text-white">
      <h2 className="text-2xl font-bold mb-6">Add Artist</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="name"
          placeholder="Artist Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-3 rounded bg-[#1f1f1f] outline-none"
        />

        <textarea
          name="bio"
          placeholder="Artist Bio"
          value={formData.bio}
          onChange={handleChange}
          rows="4"
          className="w-full p-3 rounded bg-[#1f1f1f] outline-none"
        />

        <input
          type="text"
          name="instagram"
          placeholder="Instagram Link"
          value={formData.instagram}
          onChange={handleChange}
          className="w-full p-3 rounded bg-[#1f1f1f] outline-none"
        />

        <input
          type="text"
          name="youtube"
          placeholder="YouTube Link"
          value={formData.youtube}
          onChange={handleChange}
          className="w-full p-3 rounded bg-[#1f1f1f] outline-none"
        />

        <input
          type="text"
          name="facebook"
          placeholder="Facebook Link"
          value={formData.facebook}
          onChange={handleChange}
          className="w-full p-3 rounded bg-[#1f1f1f] outline-none"
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full text-sm"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded font-semibold"
        >
          {loading ? "Uploading..." : "Add Artist"}
        </button>

      </form>
    </div>
    </AdminLayout>
  );
};

export default AddArtist;
