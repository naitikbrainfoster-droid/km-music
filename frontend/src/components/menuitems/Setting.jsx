import { useState } from "react";
import defaultAvatar from "../../assets/artist-avatar.png";

const Settings = () => {
  const initialUser = (() => {
    try {
      const stored = localStorage.getItem("user");
      if (!stored || stored === "undefined") return null;
      return JSON.parse(stored);
    } catch {
      localStorage.removeItem("user");
      return null;
    }
  })();

  const [user, setUser] = useState(initialUser);
  const [fullName, setFullName] = useState(initialUser?.fullName || "");
  const [avatarPreview, setAvatarPreview] = useState(null);

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Please login to access settings
      </div>
    );
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setAvatarPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    const updatedUser = {
      ...user,
      fullName,
      avatar: avatarPreview || user.avatar,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    alert("Profile updated successfully");
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-24">
      <div className="max-w-xl mx-auto bg-[#111] rounded-2xl border border-[#222] p-8">
        <h2 className="text-2xl font-semibold mb-6">Settings</h2>

        <div className="text-center mb-6">
          <img
            src={avatarPreview || user.avatar || defaultAvatar}
            alt="Avatar"
            className="w-28 h-28 mx-auto rounded-full border border-[#333] mb-4"
          />

          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        <div className="mb-6">
          <label className="block mb-1 text-sm text-gray-400">
            Full Name
          </label>
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full bg-[#1B1B1B] border border-[#333] rounded-lg px-4 py-3 outline-none"
          />
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Settings;
