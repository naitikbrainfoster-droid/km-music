import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

/* ================= HOME – ARTISTS SLIDER ================= */

const Artists = () => {
  const [artists, setArtists] = useState([]);
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  /* ================= FETCH ARTISTS FROM BACKEND ================= */
  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const res = await axios.get("http://kundramusic.com/api/artists");
        setArtists(res.data.artists || []);
      } catch (err) {
        console.error("Artists fetch error:", err);
      }
    };

    fetchArtists();
  }, []);

  /* ================= AUTO SLIDER ================= */
  useEffect(() => {
    const interval = setInterval(() => {
      if (!scrollRef.current) return;

      scrollRef.current.scrollBy({
        left: 320,
        behavior: "smooth",
      });

      if (
        scrollRef.current.scrollLeft + scrollRef.current.clientWidth >=
        scrollRef.current.scrollWidth - 10
      ) {
        scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* REMOVE SCROLLBAR */}
      <style>
        {`
          .artist-scroll::-webkit-scrollbar { display: none; }
          .artist-scroll { scrollbar-width: none; }
        `}
      </style>

      <section className="w-full py-16 sm:py-20 bg-black">
        <div className="max-w-[1900px] mx-auto px-4 sm:px-6 md:px-12 relative">

          {/* BADGE */}
          <div className="flex justify-center mb-6">
            <span className="px-6 py-2 rounded-full border border-purple-500 text-purple-300 font-semibold tracking-wide">
              ARTISTS
            </span>
          </div>

          {/* TITLE */}
          <h2 className="text-center text-white text-2xl sm:text-3xl md:text-4xl font-extrabold mb-10 sm:mb-14">
            Top Kundra Music Artists
          </h2>

          {/* LEFT ARROW */}
          <button
            onClick={() => scroll("left")}
            className="hidden sm:flex absolute left-2 md:left-0 top-1/2 -translate-y-1/2 z-20
            bg-white/10 text-white p-3 md:p-4 rounded-full backdrop-blur-md
            hover:bg-white/20 transition"
          >
            ◀
          </button>

          {/* RIGHT ARROW */}
          <button
            onClick={() => scroll("right")}
            className="hidden sm:flex absolute right-2 md:right-0 top-1/2 -translate-y-1/2 z-20
            bg-white/10 text-white p-3 md:p-4 rounded-full backdrop-blur-md
            hover:bg-white/20 transition"
          >
            ▶
          </button>

          {/* ================= SLIDER ================= */}
          <div
            ref={scrollRef}
            className="artist-scroll flex gap-6 sm:gap-10 overflow-x-auto scroll-smooth p-2 sm:p-4"
          >
            {artists.map((artist) => (
              <div
                key={artist._id}
                onClick={() => navigate(`/artist/${artist.name}`, { state: { artist } })}
                className="relative min-w-[220px] sm:min-w-[300px] md:min-w-[340px]
                h-[320px] sm:h-[420px] md:h-[460px]
                rounded-3xl overflow-hidden flex-shrink-0 group cursor-pointer"
              >
                {/* IMAGE */}
                <img
                  src={artist.imageUrl}
                  alt={artist.name}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                />

                {/* HOVER OVERLAY */}
                <div
                  className="absolute inset-0 bg-gradient-to-t
                  from-purple-800/90 via-purple-600/40 to-transparent
                  opacity-0 group-hover:opacity-100 transition-all duration-500
                  flex flex-col items-center justify-end pb-6"
                >
                  {/* SOCIAL ICONS */}
                  <div
                    className="flex gap-4 mb-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {artist.socialLinks?.facebook && (
                      <SocialIcon url={artist.socialLinks.facebook}>
                        <FBIcon />
                      </SocialIcon>
                    )}

                    {artist.socialLinks?.instagram && (
                      <SocialIcon url={artist.socialLinks.instagram}>
                        <InstaIcon />
                      </SocialIcon>
                    )}

                    {artist.socialLinks?.youtube && (
                      <SocialIcon url={artist.socialLinks.youtube}>
                        <YoutubeIcon />
                      </SocialIcon>
                    )}
                  </div>

                  {/* NAME */}
                  <h3 className="text-white text-lg sm:text-xl font-bold">
                    {artist.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
};

export default Artists;

/* ================= ICON WRAPPER ================= */

const SocialIcon = ({ url, children }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 bg-white rounded-full flex items-center justify-center
    hover:scale-110 transition"
  >
    {children}
  </a>
);

/* ================= SVG ICONS ================= */

const FBIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
    <path d="M22 12C22 6.48 17.52 2 12 2S2 6.48 2 12c0 5 3.66 9.13 8.44 9.88v-6.99H8v-2.89h2.44V9.83c0-2.42 1.44-3.76 3.64-3.76 1.06 0 2.17.19 2.17.19v2.38H15.9c-1.27 0-1.67.79-1.67 1.6v1.92h2.84l-.45 2.89H14.2v6.99C18.99 21.13 22 17 22 12z" />
  </svg>
);

const InstaIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#E4405F">
    <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm10 2H7a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3zm-5 3a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6zm5.5-.75a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0z" />
  </svg>
);

const YoutubeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#FF0000">
    <path d="M23.5 6.2s-.2-1.7-.8-2.5c-.8-.9-1.6-.9-2-.9C17.9 2.4 12 2.4 12 2.4s-5.9 0-8.7.4c-.4 0-1.2 0-2 .9-.6.8-.8 2.5-.8 2.5S0 8.1 0 10.1v1.8c0 2 .2 3.9.2 3.9s.2 1.7.8 2.5c.8.9 1.9.9 2.4 1 1.7.2 7.6.3 7.6.3s5.9 0 8.7-.3c.4-.1 1.2-.1 2-.9.6-.8.8-2.5.8-2.5s.2-1.9.2-3.9v-1.8c0-2-.2-3.9-.2-3.9zM9.5 14.6V7.8l6.2 3.4-6.2 3.4z" />
  </svg>
);
