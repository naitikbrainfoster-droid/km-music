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
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  /* FETCH UPCOMING SONGS */
  useEffect(() => {
    axios
      .get("http://kundramusic.com/api/upcoming")
      .then((res) => {
        setSongs(res.data.upcomingSongs || []);
      })
      .catch((err) => console.error(err));
  }, []);

  /* FILTER BY CATEGORY + SEARCH */
  const filteredSongs = songs.filter((song) => {
    const matchCategory = song.category === activeGenre;

    const keyword = searchTerm.toLowerCase();
    const matchSearch =
      song.songTitle?.toLowerCase().includes(keyword) ||
      song.sungBy?.name?.toLowerCase().includes(keyword);

    return matchCategory && matchSearch;
  });

  return (
    <section className="w-full py-12 sm:py-16 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6
                      grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8 lg:gap-10">

        {/* MOBILE CATEGORY */}
        <div className="flex lg:hidden gap-3 overflow-x-auto pb-2">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => setActiveGenre(genre)}
              className={`flex-shrink-0 px-6 py-3 rounded-full text-sm font-medium
                ${
                  activeGenre === genre
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                    : "bg-[#1c1c1c] text-white/70"
                }`}
            >
              {genre}
            </button>
          ))}
        </div>

        {/* DESKTOP CATEGORY */}
        <div className="hidden lg:block h-fit self-start sticky top-24">
          <div className="bg-[#111] rounded-2xl p-4 space-y-4">
            {genres.map((genre) => {
              const isActive = activeGenre === genre;

              return (
                <div
                  key={genre}
                  onClick={() => setActiveGenre(genre)}
                  className={`relative h-[64px] rounded-xl overflow-hidden cursor-pointer
                              transition-all duration-300 ${
                                isActive ? "scale-[1.03]" : ""
                              }`}
                  style={{
                    backgroundImage: isActive ? `url(${genreBg})` : "none",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div
                    className={`absolute inset-0 transition-all duration-300
                      ${
                        isActive
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
        </div>

        {/* RIGHT CONTENT */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center
                          sm:justify-between gap-4 mb-6">
            <h2 className="text-white text-xl sm:text-2xl font-bold">
              Video Songs
            </h2>

            <input
              type="text"
              placeholder="Search song or artist..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-[280px]
                         px-4 py-2 rounded-full bg-[#1c1c1c]
                         text-sm text-white placeholder-white/40
                         outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* SONG CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
                          gap-x-6 sm:gap-x-8 gap-y-6 sm:gap-y-8">
            {filteredSongs.length === 0 && (
              <p className="text-gray-400">No songs found</p>
            )}

            {filteredSongs.map((song) => (
              <div
                key={song._id}
                onClick={() =>
                  navigate(`/upcoming/${song._id}`, {
                    state: { song },
                  })
                }
                className="cursor-pointer rounded-3xl overflow-hidden
                           bg-[#121212]
                           hover:scale-[1.04]
                           transition-all duration-300"
              >
                {/* ✅ FIXED IMAGE WIDTH ISSUE */}
                <div
                  className="
                    h-[170px]
                    sm:h-[190px]
                    md:h-[200px]
                    bg-black
                  "
                >
                  <img
                    src={song.thumbnailUrl}
                    alt={song.songTitle}
                    className="
                      w-full h-full
                      object-cover
                      sm:object-contain
                    "
                  />
                </div>

                {/* INFO (now perfectly aligned) */}
                <div className="px-5 sm:px-6 py-4 sm:py-5 bg-[#1c1c1c]">
                  <h3 className="text-base sm:text-lg font-semibold line-clamp-1">
                    {song.songTitle}
                  </h3>
                  <p className="text-white/60 text-xs sm:text-sm mt-1">
                    {song.sungBy?.name}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default UpcomingSongs;
