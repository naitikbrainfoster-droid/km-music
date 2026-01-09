import { useEffect, useState } from "react";
import axios from "axios";

const Videoclip = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [embedUrl, setEmbedUrl] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  /* ===== SAME FETCH LOGIC AS ViewUpcoming.jsx ===== */
  useEffect(() => {
    const fetchLatestVideo = async () => {
      try {
        const res = await axios.get("http://kundramusic.com/api/upcoming");

        const videos = res.data.upcomingSongs || [];

        // ✅ only active videos
        const activeVideos = videos.filter(v => v.isActive);

        // ✅ latest video (by createdAt)
        const latestVideo = activeVideos.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )[0];

        if (!latestVideo?.youtubeUrl) return;

        // ✅ convert youtube → embed
        const youtubeEmbed =
          latestVideo.youtubeUrl
            .replace("youtu.be/", "www.youtube.com/embed/")
            .replace("watch?v=", "embed/")
            .split("&")[0];

        setEmbedUrl(youtubeEmbed);
        setThumbnail(latestVideo.thumbnailUrl);
      } catch (err) {
        console.error("LATEST VIDEO FETCH ERROR:", err);
      }
    };

    fetchLatestVideo();
  }, []);

  return (
    <section className="w-full py-20 text-center" id="newvideo">

      {/* TITLE */}
      <div className="max-w-[1400px] mx-auto px-4">
        <h2 className="text-white text-4xl md:text-5xl font-bold">
          New video clip is out now
        </h2>
        <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
          Our new video clip has been released.
        </p>
      </div>

      {/* VIDEO BOX (DESIGN SAME) */}
      <div className="max-w-[1400px] mx-auto mt-12 px-4 rounded-3xl overflow-hidden">

        {/* THUMBNAIL */}
        {!isPlaying && (
          <div className="relative">
            <img
              src={thumbnail}
              className="w-full h-[550px] object-cover rounded-3xl"
              alt="Latest Video"
            />

            <button
              onClick={() => setIsPlaying(true)}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-28 h-28 backdrop-blur-xl rounded-full border shadow-lg flex items-center justify-center hover:scale-110 ">
                <div className="w-16 h-16  rounded-full flex items-center justify-center">
                  ▶
                </div>
              </div>
            </button>
          </div>
        )}

        {/* YOUTUBE IFRAME */}
        {isPlaying && embedUrl && (
          <iframe
            className="w-full h-[550px] rounded-3xl"
            src={`${embedUrl}?autoplay=1`}
            title="Latest YouTube Video"
            frameBorder="0"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
    </section>
  );
};

export default Videoclip;

