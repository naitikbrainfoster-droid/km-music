import { useState } from "react";

const faqs = [
  {
    q: "Are Music Really Free?",
    a: "Yes! All music on our platform comes with full personal usage rights...",
  },
  {
    q: "How can I support this site?",
    a: "You can support us by subscribing to a premium plan...",
  },
  {
    q: "What Kundra Music Offers?",
    a: "Kundra Music provides a huge library of high-quality tracks...",
  },
  {
    q: "How long until we deliver your first blog post?",
    a: "You will receive your first curated blog post within 24–48 hours...",
  },
  {
    q: "Do you provide copyrights?",
    a: "Yes, all downloads come with license proof for safe usage.",
  },
  {
    q: "Can I use sounds on YouTube?",
    a: "Absolutely! Our sounds are safe for YouTube monetization.",
  },
];

const WeeklyTopPlaylists = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="w-full py-20 bg-[#0d0d0d]" id="faq">
      
      {/* FIX: CENTER THE CONTENT (1600px like other sections) */}
      <div className="max-w-[1600px] mx-auto px-5 sm:px-10 md:px-16 lg:px-[60px]">

        {/* Top Row */}
        <div className="flex items-center justify-between mb-10 flex-wrap gap-6">
          {/* Badge */}
          <span className="px-8 py-3 rounded-full border border-[#5936FF] text-lg shadow-[0_0px_25px_rgba(89,54,255,0.45)]">
            FAQ LISTS
          </span>

          {/* Button */}
          <button className="px-10 py-3 rounded-full border border-[#246BFD] hover:bg-[#246BFD] transition text-lg">
            Discover More
          </button>
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-12 text-white">
          Weekly Top Playlists
        </h2>

        {/* GRID (Responsive + Centered + Equal Height Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {faqs.map((item, index) => (
            <div
              key={index}
              className="
                bg-[#181818] p-8 rounded-2xl 
                shadow-[0_20px_50px_rgba(36,107,253,0.15)]
                flex flex-col justify-start
              "
            >
              {/* Question Row */}
              <div
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex items-center gap-5 cursor-pointer select-none"
              >
                <span className="text-3xl font-bold text-white">
                  {openIndex === index ? "—" : "+"}
                </span>
                <h3 className="text-xl font-semibold text-white">
                  {item.q}
                </h3>
              </div>

              {/* Animated Answer */}
              <div
                className={`overflow-hidden transition-all duration-500 ${
                  openIndex === index ? "mt-5 max-h-screen" : "max-h-0"
                }`}
              >
                <p className="text-white/70 leading-relaxed">
                  {item.a}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

    </section>
  );
};

export default WeeklyTopPlaylists;
