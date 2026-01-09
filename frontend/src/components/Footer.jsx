import React from "react";
import footerbg from "../assets/footerbg.png";
import logo from "../assets/flogo.svg";

const Footer = () => {
  return (
    <footer
      className="w-full text-white bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${footerbg})`,
      }}
    >
      {/* dark overlay */}
      <div className="w-full h-full">
        <div className="max-w-[1250px] mx-auto px-4 pt-28 pb-12">

          {/* Logo */}
          <div className="w-full flex justify-center mb-12">
            <img src={logo} alt="KM" className="h-45 object-contain" />
          </div>

          {/* Divider */}
          <div className="border-t border-white/30 mb-14"></div>

          {/* 4 Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-white/85">

            {/* Discover */}
            <div>
              <h3 className="text-2xl font-semibold text-white mb-5">Discover</h3>
              <ul className="space-y-3 text-[17px]">
                <li className="hover:text-white">
                  <a href="/artists" className="block">Artist</a>
                </li>
                <li className="hover:text-white">
                  <a href="#top" className="block">Popular Music</a>
                </li>
                <li className="hover:text-white">
                  <a href="#newvideo" className="block">New Release Video</a>
                </li>
                <li className="hover:text-white">
                  <a href="/songs" className="block">Music</a>
                </li>
              </ul>
            </div>

            {/* Helps */}
            <div>
              <h3 className="text-2xl font-semibold text-white mb-5">
                Helps And Faq
              </h3>
              <ul className="space-y-3 text-[17px]">
                <li className="hover:text-white">
                  <a href="/about" className="block">My Info Here</a>
                </li>
                <li className="hover:text-white">
                  <a href="/about/#growAudience" className="block">Grow Your Audience</a>
                </li>
                <li className="hover:text-white">
                  <a href="/about/#faq" className="block">FAQ</a>
                </li>
                <li className="hover:text-white">
                  <a href="/#genres" className="block">Genres Category</a>
                </li>
              </ul>
            </div>

            {/* Meet Kundra */}
            <div>
              <h3 className="text-2xl font-semibold text-white mb-5">
                Meet Kundra Music
              </h3>
              <ul className="space-y-3 text-[17px]">
                <li className="hover:text-white">
                  <a href="/about" className="block">About Kundra Music</a>
                </li>
                <li className="hover:text-white">
                  <a href="/contact" className="block">Contact</a>
                </li>
                <li className="hover:text-white">
                  <a href="/privacy-policy" className="block">Privacy Policy</a>
                </li>
                <li className="hover:text-white">
                  <a href="/contact/#map" className="block">Map</a>
                </li>
              </ul>
            </div>

            {/* Subscribe */}
            <div>
              <h3 className="text-2xl font-semibold text-white mb-5">
                Subscribe Now
              </h3>
              <p className="text-white/70 mb-4 text-[16px] leading-relaxed">
                Subscription our newsletter for get every update form gana
              </p>

              <div className="flex items-center bg-white rounded-full pl-5 pr-5 py-[5px]">
                <input
                  type="email"
                  placeholder="Enter Your Mail"
                  className="bg-transparent outline-none text-black w-full text-[15px]"
                />
                <button className="bg-black text-white p-2 rounded-full hover:bg-neutral-800 transition">
                  ➤
                </button>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <input type="checkbox" className="accent-white" />
                <p className="text-white/70 text-sm">
                  Agree With Our Terms & Conditions
                </p>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <p className="text-center text-white/75 mt-20 text-[16px]">
  Copyright © 2025 Kundra Music All Rights Reserved. <br />
  Design & Develop by{" "}
  <a
    href="https://brainfoster.com/"
    target="_blank"
    rel="noopener noreferrer"
    className="text-white underline hover:text-white/90 transition"
  >
    Brainfoster Tech Private Limited
  </a>
</p>

          
         </div>
      </div>
    </footer>
  );
};

export default Footer;

