import { useEffect, useState } from "react";
import axios from "axios";

const DashboardStats = () => {
  const [stats, setStats] = useState({
    totalArtists: 0,
    totalSongs: 0,
    totalVideos: 0,
  });

  useEffect(() => {
    (async () => {
      try {
        // 🔹 Parallel API calls (fast & clean)
        const [artistsRes, songsRes, videosRes] = await Promise.all([
          axios.get("http://kundramusic.com/api/artists"),
          axios.get("http://kundramusic.com/api/songs"),
          axios.get("http://kundramusic.com/api/upcoming"),
        ]);

        setStats({
          totalArtists: artistsRes.data.artists?.length || 0,
          totalSongs: songsRes.data.songs?.length || 0,
          totalVideos: videosRes.data.upcomingSongs?.length || 0,
        });
      } catch (err) {
        console.error("Dashboard stats error:", err);
      }
    })();
  }, []);

  const cards = [
    { title: "Active Users", value: "View in Google Analytics" },
    { title: "Total Artists", value: stats.totalArtists },
    { title: "Total Songs", value: stats.totalSongs },
    { title: "Total Videos", value: stats.totalVideos },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-[#111] border border-[#222] rounded-xl p-6"
        >
          <p className="text-gray-400 text-sm">{card.title}</p>
          <h2 className="text-3xl font-bold text-white mt-2">
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
