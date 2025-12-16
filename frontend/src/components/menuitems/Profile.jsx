import { useState } from "react";
import axios from "axios";
import { FaCamera } from "react-icons/fa";

const Profile = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [fullName, setFullName] = useState(storedUser?.fullName || "");
  const [email, setEmail] = useState(storedUser?.email || "");
  const [password, setPassword] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [preview, setPreview] = useState(
    storedUser?.avatar
      ? `http://localhost:5000${storedUser.avatar}`
      : ""
  );

  const firstLetter = fullName?.charAt(0)?.toUpperCase() || "U";

  /* =====================
     IMAGE SELECT
  ===================== */
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setAvatarFile(file);
    setPreview(URL.createObjectURL(file));
  };

  /* =====================
     SAVE PROFILE
  ===================== */
  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("userId", storedUser._id);
      formData.append("fullName", fullName);
      formData.append("email", email);
      if (password) formData.append("password", password);
      if (avatarFile) formData.append("avatar", avatarFile);

      const res = await axios.put(
        "http://localhost:5000/user/update",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
         // ✅ ADD THIS LINE
  window.dispatchEvent(new Event("userUpdated"));
        alert("Profile updated successfully");
      }
    } catch (err) {
      console.error("PROFILE UPDATE ERROR:", err);
      alert("Failed to update profile");
    }
  };

  return (
    <div className="min-h-screen bg-black flex justify-center pt-28 px-4 text-white">
      <div className="max-w-xl w-full">

        {/* ================= AVATAR ================= */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          {preview ? (
            <img
              src={preview}
              alt="avatar"
              className="w-full h-full rounded-full border border-white object-cover"
            />
          ) : (
            <div className="w-full h-full rounded-full border border-white bg-white/10 flex items-center justify-center text-4xl font-semibold">
              {firstLetter}
            </div>
          )}

          <label className="absolute bottom-1 right-1 bg-black border border-white rounded-full p-2 cursor-pointer">
            <FaCamera />
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImage}
            />
          </label>
        </div>

        {/* ================= FORM ================= */}
        <div className="bg-[#111] border border-[#222] rounded-xl p-6 space-y-5">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full bg-black border border-[#333] px-4 py-3 rounded-lg outline-none"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full bg-black border border-[#333] px-4 py-3 rounded-lg outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="New Password"
            className="w-full bg-black border border-[#333] px-4 py-3 rounded-lg outline-none text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleSave}
            className="w-full bg-white text-black py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
