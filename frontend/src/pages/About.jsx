import React from "react";

// Import all aboutpage components
import AboutHero from "../components/About/abouthero";
import AboutSection from "../components/About/AboutSection";
import AboutSection2 from "../components/About/AboutSection2";
import AboutSection3 from "../components/About/AboutSection3";
import AboutSection4 from "../components/About/AboutSection4";
import AboutSection5 from "../components/About/AboutSection5";
import MusicPlayer from "../components/Home/MusicPlayer";
const About = () => {
  return (
    <div className="bg-[#111] text-white">
      <AboutHero />
      <MusicPlayer />
      <AboutSection />
      <AboutSection2/>
      <AboutSection3 />
      <AboutSection4 />
      <AboutSection5 />
    </div>
  );
};

export default About;
