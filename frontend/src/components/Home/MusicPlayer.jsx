import { useEffect, useState } from "react";
import { usePlayer } from "../../context/PlayerContext";
import "./Playerstyle.css"; 
import artistAvatar from "../../assets/artist-avatar.png";
import downloadIcon from "../../assets/musicplayer/material-symbols_download.svg";
import heartIcon from "../../assets/musicplayer/solar_heart-line-duotone.svg";

const MusicPlayer = () => {
  const { currentSong, isPlaying, playSong, pauseSong, audioRef } = usePlayer();

  const [currentTime, setCurrentTime] = useState("00:00");
  const [duration, setDuration] = useState("00:00");
  const [progress, setProgress] = useState(0);

  const [volume, setVolume] = useState(1);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  const [popup, setPopup] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);

  /* ================= ANIMATION ================= */

  const miniSlideStyle = {
    animation: "miniSlideIn 0.3s ease-out",
  };

  const keyframes = `
    @keyframes miniSlideIn {
      from { transform: translateX(-30px); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  `;

  /* ================= HELPERS ================= */

  const formatTime = (sec) => {
    if (!sec || isNaN(sec)) return "00:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const togglePlay = () => {
    isPlaying ? pauseSong() : playSong(currentSong);
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;

    const width = e.currentTarget.clientWidth;
    const clickX = e.nativeEvent.offsetX;
    audio.currentTime = (clickX / width) * audio.duration;
  };

  const handleVolume = (e) => {
    const vol = Number(e.target.value);
    audioRef.current.volume = vol;
    setVolume(vol);
  };

  /* ================= DOWNLOAD FIX ================= */

  const handleDownload = async () => {
    try {
      const response = await fetch(currentSong.audioUrl);
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${currentSong.songName || "song"}.mp3`;
      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed:", err);
      alert("Download failed");
    }
  };

  const addToFavorites = async () => {
    try {
      await fetch("http://localhost:5000/favorites/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentSong),
      });

      setPopup("Song added to favorites ❤️");
      setTimeout(() => setPopup(""), 2500);
    } catch (err) {
      console.error("Favorite error:", err);
    }
  };

  /* ================= EFFECTS ================= */

  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;

    const update = () => {
      setCurrentTime(formatTime(audio.currentTime));
      setDuration(formatTime(audio.duration));
      setProgress((audio.currentTime / audio.duration) * 100 || 0);
    };

    audio.addEventListener("timeupdate", update);
    audio.addEventListener("loadedmetadata", update);
    audio.addEventListener("ended", pauseSong);

    return () => {
      audio.removeEventListener("timeupdate", update);
      audio.removeEventListener("loadedmetadata", update);
      audio.removeEventListener("ended", pauseSong);
    };
  }, [audioRef, currentSong, pauseSong]);

  /* ================= SAFE RETURN ================= */

  if (!currentSong) return null;

  /* ================= JSX ================= */

  return (
    <>
      <style>{keyframes}</style>

      {/* MINI PLAYER */}
      {isMinimized && (
        <div
          className="
            fixed bottom-4 left-4 z-[60]
            w-[60px] h-[60px]
            rounded-full shadow-xl cursor-pointer
            bg-gradient-to-r from-[#4668E7] via-[#8A4BF0] to-[#C625EB]
            flex items-center justify-center
          "
          style={miniSlideStyle}
          onClick={() => setIsMinimized(false)}
        >
          <img
            src={currentSong.thumbnailUrl || artistAvatar}
            className="w-[48px] h-[48px] rounded-full object-cover"
            alt=""
          />
        </div>
      )}

      {/* FULL PLAYER */}
      <div
        className={`
          fixed bottom-0 left-0 right-0 z-50
          bg-gradient-to-r from-[#4668E7] via-[#8A4BF0] to-[#C625EB]
          shadow-lg transition-all duration-500
          ${isMinimized ? "-translate-x-full" : "translate-x-0"}
        `}
      >
        <div
          className="
            max-w-[1500px] mx-auto w-full
            px-4 sm:px-6 md:px-8
            py-3 sm:py-4
            flex flex-col sm:flex-row
            items-center justify-between gap-4
          "
        >
          {/* LEFT */}
          <div className="flex items-center gap-3 sm:gap-4">
            <img
              src={currentSong.thumbnailUrl || artistAvatar}
              className="w-10 h-10 sm:w-14 sm:h-14 rounded-full object-cover"
              alt=""
            />
            <div>
              <h3 className="text-white text-base sm:text-xl font-semibold">
                {currentSong.songName}
              </h3>
              <p className="text-white/70 text-xs sm:text-sm -mt-1">
                {currentSong.artistName}
              </p>
            </div>
          </div>

          {/* MINIMIZE */}
          <div className="flex justify-end w-full sm:w-auto">
            <button
              onClick={() => setIsMinimized(true)}
              className="
                text-white bg-white/20 hover:bg-white/30
                rounded-full px-4 py-1
                text-xs sm:text-sm transition
              "
            >
              Minimize
            </button>
          </div>

          <div className="hidden sm:block w-px h-[56px] bg-white/30"></div>

          {/* CENTER CONTROLS */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto">
            <button
              onClick={togglePlay}
              className="
                w-10 h-10 sm:w-[44px] sm:h-[44px]
                rounded-full bg-white/20
                flex items-center justify-center
                hover:bg-white/30 transition
              "
            >
              {isPlaying ? (
                <svg width="16" height="16" fill="white" viewBox="0 0 20 20">
                  <rect x="5" y="3" width="3" height="14" />
                  <rect x="12" y="3" width="3" height="14" />
                </svg>
              ) : (
                <svg width="16" height="16" fill="white" viewBox="0 0 20 20">
                  <path d="M4 3L17 10L4 17V3Z" />
                </svg>
              )}
            </button>

            <div className="text-white text-xs sm:text-sm font-medium flex gap-3 whitespace-nowrap">
              <span>{currentTime}</span>
              <span>{duration}</span>
            </div>

            {/* VOLUME */}
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setShowVolumeSlider(!showVolumeSlider)}>
                <svg width="22" height="22" stroke="white" fill="none" strokeWidth="2">
                  <polygon points="5 9 9 9 13 5 13 19 9 15 5 15" />
                  <path d="M16 8.82a4 4 0 0 1 0 6.36" />
                </svg>
              </button>

              {showVolumeSlider && (
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolume}
                  className="absolute left-6 -top-10 w-[120px] z-50"
                />
              )}
            </div>

            {/* PROGRESS */}
            <div
              className="bg-white/30 h-[4px] sm:h-[2px] rounded-full w-full sm:w-[400px] md:w-[520px] cursor-pointer"
              onClick={handleSeek}
            >
              <div
                className="h-[4px] sm:h-[2px] bg-white rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="hidden sm:block w-px h-[56px] bg-white/30"></div>

          {/* RIGHT */}
          <div
            className="
              flex items-center
              border border-white/50 rounded-full
              px-3 sm:px-6 py-2 sm:py-3
              gap-3 sm:gap-4 text-xs sm:text-sm
            "
          >
            <button onClick={addToFavorites}>
              <img src={heartIcon} className="w-4 sm:w-[18px]" alt="" />
            </button>

            <button onClick={handleDownload}>
              <img
                src={downloadIcon}
                className="w-4 sm:w-[18px] cursor-pointer"
                alt="download"
              />
            </button>
          </div>
        </div>

        {popup && (
          <div className="absolute top-[-60px] left-1/2 -translate-x-1/2 bg-white text-black px-6 py-3 rounded-xl shadow-xl">
            {popup}
          </div>
        )}
      </div>
    </>
  );
};

export default MusicPlayer;

