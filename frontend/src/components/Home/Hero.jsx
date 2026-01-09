import { useState, useEffect } from "react";
import heroBg from "../../assets/banner2.png";
import herobg2 from "../../assets/banner4.png";
import herobg3 from "../../assets/banner3.png";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: heroBg,
      link: "http://kundramusic.com/artists",
    },
    {
      image: herobg3,
      link: "http://kundramusic.com/artists",
    },
    {
      image: herobg2,
      link: "http://kundramusic.com/artists",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section
      className="
         relative w-full
    max-w-[1900px] mx-auto
    px-4 sm:px-6 md:px-12 lg:px-[60px]
    pt-12 sm:pt-10 md:pt-10
    pb-4 sm:pb-16
      "
    >
      {/* HERO CONTAINER */}
      <div
        className="
          relative
          overflow-hidden
          rounded-lg sm:rounded-xl
          h-[420px] sm:h-[500px] md:h-[620px] lg:h-[700px] xl:h-[780px] 2xl:h-[900px]
        "
      >
        {/* SLIDER WRAPPER */}
        <div
          className="h-full transition-transform duration-[700ms] ease-[cubic-bezier(0.65,0,0.35,1)]"
          style={{ transform: `translateY(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <a
              key={index}
              href={slide.link}
              className="
                relative block w-full h-full
                overflow-hidden
                rounded-lg sm:rounded-xl
                cursor-pointer
              "
            >
              {/* IMAGE (NO OVERLAY) */}
              <img
                src={slide.image}
                alt="Banner"
                className="
                  absolute inset-0
                  w-full h-full
                  object-contain rounded-lg
                "
              />
            </a>
          ))}
        </div>

        {/* ARROW BUTTONS */}
        <div
          className="
            absolute right-3 sm:right-6 md:right-8
            top-1/2 -translate-y-1/2
            flex flex-col gap-3
            z-20
          "
        >
          <button
            onClick={goToPrevSlide}
            className="
              w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12
              bg-[#246BFD] rounded-full
              flex items-center justify-center shadow-lg
              hover:bg-[#1e5dd9] transition
            "
          >
            <svg width="16" height="8" viewBox="0 0 16 8">
              <path d="M2 6L8 2L14 6" stroke="white" strokeWidth="2.5" />
            </svg>
          </button>

          <button
            onClick={goToNextSlide}
            className="
              w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12
              bg-[rgba(84,84,84,0.8)]
              rounded-full
              flex items-center justify-center shadow-lg
              hover:bg-[rgba(84,84,84,1)] transition
            "
          >
            <svg width="16" height="8" viewBox="0 0 16 8">
              <path d="M2 2L8 6L14 2" stroke="white" strokeWidth="2.5" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;

