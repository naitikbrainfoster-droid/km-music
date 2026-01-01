import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Play } from "lucide-react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { PlayerContext } from "../../context/PlayerContext";

const ArtistDetail = ({ artist }) => {
  const { playSong } = useContext(PlayerContext);
  const [songs, setSongs] = useState([]);

  /* ================= FETCH ARTIST SONGS ================= */
  useEffect(() => {
    if (!artist?._id) return;

    const fetchSongs = async () => {
      try {
        const res = await axios.get("/api/songs");

        const artistSongs = (res.data.songs || []).filter(
          (song) => song.artistId?._id === artist._id
        );

        setSongs(artistSongs);
      } catch (err) {
        console.error("Artist songs fetch error:", err);
      }
    };

    fetchSongs();
  }, [artist]);

  if (!artist) return null;

  // ✅ EXACT MONGODB SOCIAL LINKS
  const facebook = artist.socialLinks?.facebook;
  const instagram = artist.socialLinks?.instagram;
  const youtube = artist.socialLinks?.youtube;

  return (
    <section className="bg-black text-white min-h-screen px-8 py-16">
      <div className="max-w-7xl mx-auto">

        {/* ================= ARTIST TOP ================= */}
        <div className="grid grid-cols-3 gap-14 max-lg:grid-cols-1 items-center">

          {/* IMAGE */}
          <div className="relative h-[520px] rounded-3xl overflow-hidden">
            <img
              src={artist.imageUrl}
              alt={artist.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-800/90 to-transparent" />
          </div>

          {/* INFO */}
          <div className="col-span-2">
            <h1 className="text-4xl font-extrabold mb-4">
              {artist.name}
            </h1>

            <p className="text-white/70 max-w-3xl leading-relaxed mb-6">
              {artist.bio}
            </p>

            {/* ================= SOCIAL ICONS ================= */}
            <div className="flex gap-4">
              {facebook && (
                <SocialIconLink url={facebook}>
                  <FaFacebookF size={18} />
                </SocialIconLink>
              )}

              {instagram && (
                <SocialIconLink url={instagram}>
                  <FaInstagram size={18} />
                </SocialIconLink>
              )}

              {youtube && (
                <SocialIconLink url={youtube}>
                  <FaYoutube size={18} />
                </SocialIconLink>
              )}
            </div>
          </div>
        </div>

        {/* ================= MUSIC LIST ================= */}
        <h2 className="mt-20 mb-10 text-3xl font-bold">
          {artist.name} Music
        </h2>

        <div className="grid grid-cols-2 gap-8 max-md:grid-cols-1">
          {songs.map((song) => (
            <div
              key={song._id}
              className="flex items-center px-8 py-6 rounded-2xl bg-gradient-to-r from-[#141414] to-[#1c1c1c]"
            >
              <img
                src={song.thumbnailUrl || artist.imageUrl}
                alt={song.songName}
                className="w-24 h-24 rounded-2xl object-cover shadow-lg"
              />

              <div className="ml-6 flex-1">
                <h4 className="text-xl font-bold">{song.songName}</h4>
                <p className="text-white/60 mt-1">{artist.name}</p>
              </div>

              <button
                onClick={() => playSong(song)}
                className="w-16 h-16 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center"
              >
                <Play size={22} />
              </button>
            </div>
          ))}

          {songs.length === 0 && (
            <p className="text-white/50 col-span-2">
              No songs uploaded for this artist yet.
            </p>
          )}
        </div>

      </div>
    </section>
  );
};

export default ArtistDetail;

/* ================= SOCIAL ICON ================= */
const SocialIconLink = ({ url, children }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center hover:scale-110 transition cursor-pointer"
  >
    {children}
  </a>
);
