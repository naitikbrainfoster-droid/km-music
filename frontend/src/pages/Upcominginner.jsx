import React from "react";
import { useLocation } from "react-router-dom";

import UpcomingInnerSection from "../components/Upcoming/upcominginnersection";
import UpcomingHeroInner from "../components/Upcoming/upcomingheroinner";

const Upcominginner = () => {
  const { state } = useLocation();
  const song = state?.song; // Receive song object

  if (!song) return null;

  return (
    <div className="bg-[#111] text-white">
      {/* HERO */}
      <UpcomingHeroInner artistName={song.title} />

      {/* DETAIL */}
      <UpcomingInnerSection />
    </div>
  );
};

export default Upcominginner;
