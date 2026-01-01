import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

/* LEFT ACTIVE CATEGORY BG */
import genreBg from "../../assets/img/genrescategory/Rectangle 59.png";

/* GENRES */
const genres = [
  "Punjabi",
  "Haryanvi",
  "Bollywood",
  "Hollywood",
  "Rock",
  "Culture",
];

const UpcomingSongs = () => {
  const [songs, setSongs] = useState([]);
  const [activeGenre, setActiveGenre] = useState("Punjabi");
  const navigate = useNavigate();

  /* FETCH UPCOMING SONGS */
  useEffect(() => {
    axios
      .get("/api/upcoming")
      .then((res) => {
        setSongs(res.data.upcomingSongs || []);
      })
      .catch((err) => console.error(err));
  }, []);

  /* FILTER BY CATEGORY */
  const filteredSongs = songs.filter(
    (song) => song.category === activeGenre
  );

  return (
    <section className="w-full px-6 lg:px-16 py-16 bg-black">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10">

        {/* ================= LEFT CATEGORY ================= */}
        <div className="bg-[#111] rounded-2xl p-4 space-y-4">
          {genres.map((genre) => {
            const isActive = activeGenre === genre;

            return (
              <div
                key={genre}
                onClick={() => setActiveGenre(genre)}
                className={`relative h-[64px] rounded-xl overflow-hidden cursor-pointer
                            transition-all duration-300 ${isActive ? "scale-[1.03]" : ""
                  }`}
                style={{
                  backgroundImage: isActive ? `url(${genreBg})` : "none",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div
                  className={`absolute inset-0 transition-all duration-300
                    ${isActive
                      ? "bg-gradient-to-r from-blue-500/80 to-purple-600/80"
                      : "bg-black"
                    }`}
                />
                <div className="relative z-10 h-full flex items-center justify-center
                                text-white font-medium text-lg">
                  {genre}
                </div>
              </div>
            );
          })}
        </div>

        {/* ================= RIGHT SONG CARDS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredSongs.length === 0 && (
            <p className="text-gray-400">No songs available in this category</p>
          )}

          {filteredSongs.map((song) => (
            <div
              key={song._id}
              onClick={() =>
                navigate(`/upcoming/${song._id}`, {
                  state: { song },
                })
              }
              className="cursor-pointer rounded-[28px] overflow-hidden
                         bg-[#121212] shadow-[0_20px_40px_rgba(0,0,0,0.6)]
                         hover:scale-[1.04] transition-all duration-300"
            >
              {/* THUMBNAIL */}
              <div className="h-[320px] overflow-hidden">
                <img
                  src={song.thumbnailUrl}
                  alt={song.songTitle}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* INFO */}
              <div className="px-6 py-5 bg-[#2e2e2e]">
                <h3 className="text-white text-lg font-semibold line-clamp-1">
                  {song.songTitle}
                </h3>
                <p className="text-white/70 text-sm mt-1">
                  {song.sungBy?.name}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default UpcomingSongs;
