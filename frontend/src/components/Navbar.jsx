import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import searchIcon from "../assets/search-icon.svg";
import loginIcon from "../assets/login-icon.svg";

const Navbar = ({ navType }) => {
  const [activeLink, setActiveLink] = useState("Home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    "Home",
    "About",
    "Songs",
    "Upcoming Song",
    "Artists",
    "Contact",
  ];

  const routeMap = {
    Home: "/",
    About: "/about",
    "Songs": "/songs",
    "Upcoming Song": "/upcoming",
    Artists: "/artists",
    Contact: "/contact",
  };

  return (
    <nav
      className={`
        w-full fixed top-0 left-0 z-50 transition-all duration-300
        ${
          navType === "transparent"
            ? "bg-transparent backdrop-blur-[6px] border-b border-[#ffffff22]"
            : "bg-[#111] border-t border-b border-[#303030]"
        }
      `}
    >
      <div className="max-w-[1920px] mx-auto px-12 py-4">
        <div className="flex items-center gap-10">

          {/* Logo */}
          <Link to="/" onClick={() => setActiveLink("Home")}>
            <img src={logo} alt="KM Music Logo" className="h-16 w-auto" />
          </Link>

          {/* Search bar */}
          <div className="hidden md:flex flex-1 max-w-[550px]">
            <div className="relative flex items-center bg-[#4A4A4A] rounded-full px-8 py-3 w-full">
              <input
                type="text"
                placeholder="Search Here"
                className="flex-1 bg-transparent text-white placeholder:text-white text-lg outline-none"
              />
              <img src={searchIcon} alt="search" className="w-5 h-5 ml-3" />
            </div>
          </div>

          {/* Vertical Divider */}
          <div className="hidden lg:block h-12 w-px bg-[#3A3A3A]"></div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link}
                to={routeMap[link]}
                onClick={() => setActiveLink(link)}
                className={`text-lg font-medium transition-colors ${
                  activeLink === link
                    ? "text-white"
                    : "text-[#7a7a7a] hover:text-white"
                }`}
              >
                {link}
              </Link>
            ))}
          </div>

          {/* Login Button */}
          <button className="flex items-center gap-2 bg-[#246BFD] rounded-full px-7 py-2.5 text-white text-lg font-medium hover:bg-[#1e5dd9] transition">
            Login
            <img src={loginIcon} alt="login" className="w-5 h-5" />
          </button>

          {/* Mobile Menu Icon */}
          <button
            className="lg:hidden p-2 ml-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              className="w-7 h-7 text-white"
              fill="none"
              strokeWidth="2"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-[#303030] pt-4">

            {/* Mobile Search */}
            <div className="mb-4">
              <div className="relative flex items-center bg-[#3F3F3F] rounded-full px-6 py-3">
                <input
                  type="text"
                  placeholder="Search Here"
                  className="flex-1 bg-transparent text-white placeholder:text-white text-base outline-none"
                />
                <img src={searchIcon} alt="search" className="w-5 h-5 ml-3" />
              </div>
            </div>

            {/* Mobile Nav Links */}
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link}
                  to={routeMap[link]}
                  onClick={() => {
                    setActiveLink(link);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-left text-lg font-medium transition-colors py-2 ${
                    activeLink === link
                      ? "text-white"
                      : "text-[#7a7a7a] hover:text-white"
                  }`}
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
