import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ITEMS_PER_PAGE = 8;

const ArtistsSection = () => {
  const [artists, setArtists] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  /* ================= FETCH ARTISTS FROM BACKEND ================= */
  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const res = await axios.get("/api/artists");
        setArtists(res.data.artists); // 👈 backend artists
      } catch (err) {
        console.error("Artists fetch error:", err);
      }
    };

    fetchArtists();
  }, []);

  const totalPages = Math.ceil(artists.length / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const currentItems = artists.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <section className="bg-black py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* ================= GRID (DESIGN SAME) ================= */}
        <div className="grid grid-cols-4 gap-10 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {currentItems.map((artist) => (
            <div
              key={artist._id}
              onClick={() =>
                navigate(`/artist/${encodeURIComponent(artist.name)}`, {
                  state: { artist }, // 👈 same flow as before
                })
              }
              className="relative h-[460px] rounded-3xl overflow-hidden cursor-pointer group"
            >
              {/* IMAGE */}
              <img
                src={artist.imageUrl}        // 👈 backend image
                alt={artist.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />


              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-purple-800/90 via-purple-600/40 to-transparent opacity-0 group-hover:opacity-100 transition flex flex-col justify-end items-center pb-6">
                <h3 className="text-white text-xl font-bold">
                  {artist.name}
                </h3>
                <p className="text-white/80 text-sm">
                  {artist.studio}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ================= PAGINATION (SAME) ================= */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-6 mt-16">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="px-6 py-2 border border-white/30 rounded-full disabled:opacity-40"
            >
              Prev
            </button>

            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              className="px-6 py-2 border border-white/30 rounded-full disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

export default ArtistsSection;
