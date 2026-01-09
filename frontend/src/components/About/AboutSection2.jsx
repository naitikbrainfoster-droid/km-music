import BgSection from "../../assets/About/bgsection.png";
import LeftCollage from "../../assets/About/image 6.png";
import RightGirl from "../../assets/About/Group-1747 1.png";

const AboutSection2 = () => {
  return (
    <section id="growAudience"
      className="w-full py-20 px-5 sm:px-10 md:px-[60px] relative overflow-hidden"
      style={{
        backgroundImage: `url(${BgSection})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-[1500px] mx-auto flex flex-col lg:flex-row items-center gap-12 relative">

        {/* LEFT IMAGE — HEIGHT INCREASED */}
        <div className="flex-shrink-0">
          <img
            src={LeftCollage}
            alt="Music Collage"
            className="w-[360px] md:w-[420px] lg:w-[480px] 
                       h-[480px] md:h-[490px] lg:h-[480px]
                       object-cover rounded-lg"
          />
        </div>

        {/* CENTER TEXT */}
        <div className="flex-1 text-white">
          <h2 className="text-4xl md:text-4xl lg:text-4xl font-semibold leading-tight">
            Grow Your Audience On Social <br /> Network With Our Platform
          </h2>

          <p className="mt-6 text-white/70 text-base md:text-lg max-w-[600px] leading-relaxed">
            Find amazing photography, videos & stunning vector illustrations.
            Fully guaranteed resources for personal or commercial use.
          </p>

          <ul className="mt-6 text-white/80 space-y-3 text-base md:text-lg max-w-[600px]">
            <li>• Access our entire library of images</li>
            <li>• Unlimited downloads</li>
            <li>• Pro license rights on all downloads</li>
            <li>• Online editor access</li>
            <li>• No attribution required</li>
          </ul>

          <button
            className="mt-6 border-2 border-[#246BFD] text-white rounded-full px-8 md:px-12 py-3 text-base md:text-lg hover:bg-[#246BFD] transition"
          >
            Discover More
          </button>
        </div>

{/* RIGHT SIDE IMAGE — SMALLER + BOTTOM TOUCHING + SIDE ALIGNED */}
<div className="absolute right-0 bottom-0 flex-shrink-0">
  <div
    className="relative overflow-hidden "
    style={{
      width: "280px",
      height: "380px",
    }}
  >
    <img
      src={RightGirl}
      alt="Model"
      className="w-full absolute left-0 bottom-0 "
    />
  </div>
</div>
</div>
    </section>
  );
};

export default AboutSection2;
