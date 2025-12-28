import { useRef, useEffect, useState } from "react";
import axios from "axios";
import { FaPlay, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const RecentReleases = () => {
  const scrollRef = useRef();
  const [albums, setAlbums] = useState([]);

  const slideLeft = () => {
    scrollRef.current.scrollBy({ left: -280, behavior: "smooth" });
  };

  const slideRight = () => {
    scrollRef.current.scrollBy({ left: 280, behavior: "smooth" });
  };

  // ✅ FETCH RECENT SONGS (LATEST FIRST)
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/songs"
        );
        setAlbums(res.data.songs);
      } catch (error) {
        console.error("RECENT SONG FETCH ERROR:", error);
      }
    };

    fetchSongs();
  }, []);

  // Auto slide every 3s
  useEffect(() => {
    const auto = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({ left: 280, behavior: "smooth" });
      }
    }, 3000);

    return () => clearInterval(auto);
  }, []);

  const hideScrollbar = {
    scrollbarWidth: "none",
    msOverflowStyle: "none",
  };

  const hideScrollbarWebkit = `
    ::-webkit-scrollbar { display: none; }
  `;

  return (
    <div className="w-full flex justify-center overflow-hidden">
      <div className="w-full max-w-[1900px] px-3 sm:px-6 md:px-10">

        <style>{hideScrollbarWebkit}</style>

        {/* HEADER */}
        <div className="flex justify-between items-center mt-4">
          <button
            className="
              px-4 sm:px-6 
              py-1.5 sm:py-2
              border border-purple-300 
              rounded-full 
              text-white font-semibold 
              text-xs sm:text-sm 
              bg-gradient-to-r from-purple-500 to-indigo-600
            "
          >
            TOP SONGS
          </button>

          <div className="flex gap-2 sm:gap-4">
            <button
              onClick={slideLeft}
              className="
                w-8 h-8 sm:w-10 sm:h-10 
                flex items-center justify-center 
                border border-purple-300 
                rounded-full 
                text-white 
                hover:bg-purple-500 
                transition
              "
            >
              <FaChevronLeft size={14} />
            </button>

            <button
              onClick={slideRight}
              className="
                w-8 h-8 sm:w-10 sm:h-10 
                flex items-center justify-center 
                border border-purple-300 
                rounded-full 
                text-white 
                hover:bg-purple-500 
                transition
              "
            >
              <FaChevronRight size={14} />
            </button>
          </div>
        </div>

        <h2 className="text-white text-2xl sm:text-3xl font-bold mt-6">
          Recent Releases Songs
        </h2>

        {/* CARD SCROLLER */}
        <div
          ref={scrollRef}
          style={hideScrollbar}
          className="
            flex gap-4 sm:gap-6 
            overflow-x-scroll scroll-smooth 
            mt-6 pb-4
            snap-x snap-mandatory
          "
        >
          {albums.map((item) => (
            <div
              key={item._id}
              className="
                snap-start
                shrink-0
                min-w-[160px] 
                sm:min-w-[200px]
                md:min-w-[240px]
                lg:min-w-[260px]
                shadow-lg 
                hover:scale-105 
                transition
              "
            >
              {/* IMAGE */}
              <div
                className="
                  w-full 
                  h-[180px] 
                  sm:h-[220px] 
                  md:h-[260px] 
                  lg:h-[300px] 
                  overflow-hidden 
                  rounded-t-2xl
                "
              >
                <img
                  src={item.thumbnailUrl}
                  alt={item.songName}
                  className="
                    w-full 
                    h-full 
                    object-cover 
                    object-center 
                    bg-black
                  "
                />
              </div>

              {/* CONTENT */}
              <div
                className="
                  bg-[#3a3a3a] 
                  rounded-b-2xl 
                  px-3 sm:px-4 
                  py-3 
                  flex justify-between items-center
                "
              >
                <div className="min-h-[48px]">
                  <h3 className="text-white text-sm sm:text-lg font-semibold line-clamp-2">
                    {item.songName}
                  </h3>
                  <p className="text-gray-300 text-xs sm:text-sm truncate">
                    {item.artistName}
                  </p>
                </div>

                <button
                  className="
                    w-8 h-8 sm:w-10 sm:h-10 
                    rounded-full bg-gray-500 
                    flex items-center justify-center
                  "
                >
                  <FaPlay size={12} className="text-white" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default RecentReleases;
