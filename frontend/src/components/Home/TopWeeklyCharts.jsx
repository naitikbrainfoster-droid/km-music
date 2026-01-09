import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { PlayerContext } from "../../context/PlayerContext";

export default function WeeklyPlaylists() {

  const { playSong } = useContext(PlayerContext);

  // 🔒 SAME STRUCTURE – design bilkul safe
  const [playlists, setPlaylists] = useState([
    { id: 1, title: "Loading...", artist: "", downloads: "", duration: "", song: null },
    { id: 2, title: "Loading...", artist: "", downloads: "", duration: "", song: null },
    { id: 3, title: "Loading...", artist: "", downloads: "", duration: "", song: null },
  ]);

  /* ================= FETCH LATEST UPLOADED SONGS ================= */
  useEffect(() => {
    const fetchLatestSongs = async () => {
      try {
        const res = await axios.get("/api/songs");

        // ✅ REAL LATEST FIRST
        const latestThree = [...res.data.songs]
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 3)
          .map((song) => ({
            id: song._id,
            title: song.songName,
            artist: song.artistName,
            downloads: "New",
            duration: "02:45",
            song, // 🔥 full song object for player
          }));

        setPlaylists(latestThree);
      } catch (err) {
        console.error("Weekly playlist fetch error:", err);
      }
    };

    fetchLatestSongs();
  }, []);

  return (
    <section className="w-full py-16 sm:py-20" id="topweeklychart" >
      <div className="max-w-[1900px] mx-auto px-4 sm:px-6 md:px-12">

        {/* HEADER */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 sm:mb-12">
          <h2 className="text-white text-2xl sm:text-3xl lg:text-[34px] font-extrabold tracking-tight">
            Weekly Top Playlists
          </h2>
          <DiscoverMoreButton />
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {playlists.map((p) => (
            <PlaylistCard
              key={p.id}
              {...p}
              onPlay={() => p.song && playSong(p.song)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                             DISCOVER MORE BUTTON                            */
/* -------------------------------------------------------------------------- */

function DiscoverMoreButton() {
  return (
    <button
      className="
        relative overflow-hidden
        px-5 sm:px-6 py-2 
        rounded-full border border-[#2D6BFF]
        text-[#2D6BFF] font-medium text-sm sm:text-base
        group transition-all duration-300 ease-in-out
      "
    >
      <span
        className="
          absolute inset-0 bg-[#2D6BFF]
          translate-x-[-100%] group-hover:translate-x-0
          transition-transform duration-300 ease-in-out
        "
      ></span>
      <span className="relative z-10">Discover More</span>
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   CARD                                      */
/* -------------------------------------------------------------------------- */

function PlaylistCard({ title, artist, downloads, duration, onPlay }) {
  return (
    <div
      className="
        bg-[#0B0B0B] rounded-2xl p-5 sm:p-6
        shadow-xl transition-all duration-300
        hover:-translate-y-1 hover:shadow-2xl
      "
    >
      {/* WAVEFORM BAR */}
      <div className="relative w-full h-[52px] sm:h-[58px] rounded-xl overflow-hidden bg-[#2B2B2B]">
        <WaveformBars />

        {/* 🔥 PLAY BUTTON (NOW WORKING) */}
        <button
          onClick={onPlay}
          className="
            absolute right-3 sm:right-4 top-1/2 -translate-y-1/2
            w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#555]
            flex items-center justify-center shadow-lg
          "
        >
          <svg width="16" height="16" fill="#fff" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7-11-7z" />
          </svg>
        </button>
      </div>

      {/* TITLE */}
      <h3 className="text-white font-extrabold text-lg sm:text-[20px] mt-5">
        {title}
      </h3>
      <p className="text-[#9A9A9A] text-sm mt-1">{artist}</p>

      {/* TAGS */}
      <div className="flex flex-wrap gap-2 sm:gap-3 mt-4">
        <Tag label="Happy" />
        <Tag label="Mellow" />
        <Tag label="Cool" />
      </div>

      {/* BOTTOM ROW */}
      <div className="flex items-center justify-between mt-6">
        <div
          className="
            flex items-center gap-3
            px-4 sm:px-5 py-2 rounded-full border border-[#2A2A2A]
          "
        >
          <span className="text-xs sm:text-sm text-white/80">
            Download: {downloads}
          </span>
        </div>

        <span className="text-white text-xs sm:text-sm">{duration}</span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                              WAVEFORM COMPONENT                             */
/* -------------------------------------------------------------------------- */

function WaveformBars() {
  return (
    <svg className="w-full h-full" viewBox="0 0 1000 60" preserveAspectRatio="none">
      <rect width="100%" height="100%" fill="#2B2B2B" />
      <g stroke="#E5E5E5" strokeWidth="3" strokeLinecap="round">
        {Array.from({ length: 60 }).map((_, i) => {
          const x = 10 + i * 16;
          const h = 10 + ((i * 7) % 32);
          const y = 30 - h / 2;
          return <line key={i} x1={x} x2={x} y1={y} y2={y + h} />;
        })}
      </g>
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   TAG                                       */
/* -------------------------------------------------------------------------- */

function Tag({ label }) {
  return (
    <span className="px-3 py-1 rounded-full border border-white/20 text-[#E0E0E0] text-xs sm:text-sm">
      {label}
    </span>
  );
}
