import { useRef, useState } from "react";
import { PlayerContext } from "./PlayerContext";

export const PlayerProvider = ({ children }) => {
  const audioRef = useRef(new Audio());

  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playSong = (song) => {
    if (!song) return;

    if (currentSong?.songUrl === song.songUrl) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
      return;
    }

    audioRef.current.src = song.songUrl;
    audioRef.current.play();

    setCurrentSong(song);
    setIsPlaying(true);
  };

  return (
    <PlayerContext.Provider
      value={{
        audioRef,
        currentSong,
        isPlaying,
        playSong,
        setIsPlaying,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
