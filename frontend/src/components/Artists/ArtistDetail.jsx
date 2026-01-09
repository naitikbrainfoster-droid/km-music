import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Play } from "lucide-react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { PlayerContext } from "../../context/PlayerContext";
import { useNavigate } from "react-router-dom";

const ArtistDetail = ({ artist }) => {
  const { playSong } = useContext(PlayerContext);
  const navigate = useNavigate();

  const [songs, setSongs] = useState([]);       // MP3
  const [videos, setVideos] = useState([]);     // 🎥 VIDEO

  /* ================= FETCH ARTIST MP3 SONGS ================= */
  useEffect(() => {
    if (!artist?._id) return;

    const fetchSongs = async () => {
      try {
        const res = await axios.get("http://kundramusic.com/api/songs");

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

  /* ================= FETCH ARTIST VIDEO SONGS ================= */
  useEffect(() => {
    if (!artist?._id) return;

    const fetchVideos = async () => {
      try {
        const res = await axios.get("http://kundramusic.com/api/upcoming");

        const artistVideos = (res.data.upcomingSongs || []).filter(
          (video) => video.sungBy?._id === artist._id
        );

        setVideos(artistVideos);
      } catch (err) {
        console.error("Artist video fetch error:", err);
      }
    };

    fetchVideos();
  }, [artist]);

  if (!artist) return null;

  const facebook = artist.socialLinks?.facebook;
  const instagram = artist.socialLinks?.instagram;
  const youtube = artist.socialLinks?.youtube;

  return (
    <section className="bg-black text-white min-h-screen px-8 py-16">
      <div className="max-w-7xl mx-auto">

        {/* ================= ARTIST TOP ================= */}
        <div className="grid grid-cols-3 gap-14 max-lg:grid-cols-1 items-center">
          <div className="relative h-[520px] rounded-3xl overflow-hidden">
            <img
              src={artist.imageUrl}
              alt={artist.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-800/90 to-transparent" />
          </div>

          <div className="col-span-2">
            <h1 className="text-4xl font-extrabold mb-4">{artist.name}</h1>
            <p className="text-white/70 max-w-3xl leading-relaxed mb-6">
              {artist.bio}
            </p>

            <div className="flex gap-4">
              {facebook && <SocialIconLink url={facebook}><FaFacebookF size={18} /></SocialIconLink>}
              {instagram && <SocialIconLink url={instagram}><FaInstagram size={18} /></SocialIconLink>}
              {youtube && <SocialIconLink url={youtube}><FaYoutube size={18} /></SocialIconLink>}
            </div>
          </div>
        </div>

        {/* ================= MP3 SONGS ================= */}
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
                className="w-24 h-24 rounded-2xl object-cover"
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

        {/* ================= 🎥 ARTIST VIDEO SONGS ================= */}
        <h2 className="mt-24 mb-10 text-3xl font-bold">
          {artist.name} Videos
        </h2>

        <div className="grid grid-cols-3 gap-10 max-lg:grid-cols-2 max-md:grid-cols-1">
          {videos.map((video) => (
            <div
              key={video._id}
              onClick={() =>
                navigate(`/upcoming/${video._id}`, { state: { song: video } })
              }
              className="cursor-pointer rounded-3xl overflow-hidden bg-[#121212]
                         hover:scale-[1.04] transition-all duration-300"
            >
              <div className="h-[260px]">
                <img
                  src={video.thumbnailUrl}
                  alt={video.songTitle}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="px-6 py-5 bg-[#1c1c1c]">
                <h3 className="text-lg font-semibold line-clamp-1">
                  {video.songTitle}
                </h3>
                <p className="text-white/60 text-sm mt-1">
                  {artist.name}
                </p>
              </div>
            </div>
          ))}

          {videos.length === 0 && (
            <p className="text-white/50 col-span-3">
              No video songs uploaded for this artist yet.
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
    className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center hover:scale-110 transition"
  >
    {children}
  </a>
);
