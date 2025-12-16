import { useState } from "react";
import axios from "axios";

const SongUploadForm = () => {
  const [form, setForm] = useState({});
  const [audio, setAudio] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);

  const uploadSong = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(form).forEach((key) => data.append(key, form[key]));
    data.append("audio", audio);
    data.append("thumbnail", thumbnail);

    await axios.post(
      "http://localhost:5000/api/songs/upload",
      data,
      {
        headers: {
          Authorization: localStorage.getItem("adminToken"),
        },
      }
    );

    alert("Song Uploaded 🎶");
  };

  return (
    <form onSubmit={uploadSong} className="bg-[#111] p-6 rounded-xl max-w-xl">
      <h3 className="text-xl mb-4">Upload New Song</h3>

      <input
        className="w-full mb-3 p-2 bg-[#222] rounded"
        placeholder="Title"
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <input
        className="w-full mb-3 p-2 bg-[#222] rounded"
        placeholder="Artist"
        onChange={(e) => setForm({ ...form, artist: e.target.value })}
      />

      <input
        className="w-full mb-3 p-2 bg-[#222] rounded"
        placeholder="Genre"
        onChange={(e) => setForm({ ...form, genre: e.target.value })}
      />

      <input type="file" accept="image/*" onChange={(e) => setThumbnail(e.target.files[0])} />
      <input type="file" accept="audio/*" className="mt-3" onChange={(e) => setAudio(e.target.files[0])} />

      <button className="mt-5 w-full bg-purple-600 py-2 rounded">
        Upload
      </button>
    </form>
  );
};

export default SongUploadForm;
