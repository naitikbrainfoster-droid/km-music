import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import Upcominghero from "../components/Upcoming/upcominghero";

const UpcomingInner = () => {
  const { id } = useParams();
  const location = useLocation();

  const [song, setSong] = useState(location.state?.song || null);
  const [loading, setLoading] = useState(!location.state?.song);

  /* ================= FETCH SONG IF PAGE REFRESH ================= */
  useEffect(() => {
    if (!song && id) {
      axios
        .get(`/api/upcoming/${id}`)
        .then((res) => {
          setSong(res.data.upcoming);
          setLoading(false);
        })
        .catch((err) => {
          console.error("FETCH UPCOMING ERROR:", err);
          setLoading(false);
        });
    }
  }, [id, song]);

  /* ================= LOADING STATE ================= */
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  /* ================= NO DATA ================= */
  if (!song) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        Song not found
      </div>
    );
  }

  /* ================= YOUTUBE EMBED FIX ================= */
  const embedUrl = song.youtubeUrl
    ?.replace("youtu.be/", "www.youtube.com/embed/")
    ?.replace("watch?v=", "embed/")
    ?.split("?")[0];

  return (
    <div className="min-h-screen bg-black text-white">

      {/* ================= HERO SECTION ================= */}
      <Upcominghero song={song} />

      {/* ================= MAIN CONTENT ================= */}
      <section className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10 ">

        {/* VIDEO */}
        <div className="rounded-2xl overflow-hidden bg-black">
          <iframe
            className="w-full h-[420px]"
            src={embedUrl}
            title={song.songTitle}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* INFO */}
        <div className="bg-[#151515] rounded-2xl p-6 space-y-4">
          <p>
            <span className="text-gray-400">Sung By:</span>{" "}
            {song.sungBy?.name || "N/A"}
          </p>

          <p>
            <span className="text-gray-400">Category:</span>{" "}
            {song.category}
          </p>

          <p>
            <span className="text-gray-400">Published:</span>{" "}
            {song.publishedDate?.slice(0, 10)}
          </p>

          <p className="text-white/80 text-sm leading-relaxed">
            {song.previewInfo}
          </p>
        </div>

      </section>
    </div>
  );
};

export default UpcomingInner;
