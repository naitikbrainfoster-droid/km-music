import React from "react";
import heroBg from "../../assets/About/hero.png"; // correct path

const AboutHero = () => {
  return (
    <section
      className="w-full h-[55vh] md:h-[60vh] lg:h-[70vh] bg-center bg-cover bg-no-repeat flex items-center justify-center relative"
      style={{
        backgroundImage: `url(${heroBg})`,
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          Contact Us
        </h1>

        <p className="text-gray-300 text-lg md:text-xl">
          Home <span className="text-white mx-1">&gt;</span> Contact Us
        </p>
      </div>
    </section>
  );
};

export default AboutHero;
