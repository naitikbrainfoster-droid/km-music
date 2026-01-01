import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Play } from "lucide-react";
import { PlayerContext } from "../../context/PlayerContext";

const TrendingList = ({ selectedGenre }) => {
  const { playSong, currentSong } = useContext(PlayerContext);
  const [songs, setSongs] = useState([]);

  /* ================= FETCH SONGS ================= */
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await axios.get("/api/songs");
        setSongs(res.data.songs || []);
      } catch (err) {
        console.error("Songs fetch error:", err);
      }
    };
    fetchSongs();
  }, []);

  /* ================= FILTER BY CATEGORY ================= */
  const filteredSongs = songs.filter(
    (song) =>
      song.category &&
      selectedGenre &&
      song.category.toLowerCase() === selectedGenre.toLowerCase()
  );

  return (
    <section className="bg-black py-12">
      <div className="max-w-7xl mx-auto px-4">

        {/* SONG GRID (2 PER ROW) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {filteredSongs.map((song) => (
            <div
              key={song._id}
              className="
                flex items-center gap-6
                px-6 py-6 rounded-2xl
                bg-[#141414]
                hover:bg-[#1c1c1c]
                transition
              "
            >
              {/* THUMBNAIL */}
              <img
                src={song.thumbnailUrl}
                alt={song.songName}
                className="w-20 h-20 rounded-xl object-cover"
              />

              {/* TEXT */}
              <div className="flex-1">
                <h4 className="text-white text-lg font-semibold">
                  {song.songName}
                </h4>
                <p className="text-white/60 text-sm mt-1">
                  {song.artistName}
                </p>
              </div>

              {/* PLAY BUTTON */}
              <button
                onClick={() => playSong(song)}
                className={`
                  w-14 h-14 rounded-full
                  flex items-center justify-center
                  transition
                  ${currentSong?._id === song._id
                    ? "bg-gradient-to-r from-[#4A78FF] to-[#B83CFF]"
                    : "bg-white/20 hover:bg-white/30"
                  }
                `}
              >
                <Play size={22} className="text-white" />
              </button>
            </div>
          ))}

        </div>

        {/* EMPTY STATE */}
        {filteredSongs.length === 0 && (
          <p className="text-white/50 text-center mt-10">
            No songs found in {selectedGenre}
          </p>
        )}
      </div>
    </section>
  );
};

export default TrendingList;
