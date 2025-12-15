import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import logo from "../assets/logo.svg";
import searchIcon from "../assets/search-icon.svg";
import loginIcon from "../assets/login-icon.svg";

import defaultAvatar from "../assets/artist-avatar.png";
import LoginModal from "./Login/LoginModel";

const Navbar = ({ navType }) => {
  /* =========================
     AUTH STATE (SAFE INIT)
  ========================== */
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser || storedUser === "undefined") return null;
      return JSON.parse(storedUser);
    } catch {
      localStorage.removeItem("user");
      return null;
    }
  });

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  /* =========================
     UI STATES
  ========================== */
  const [activeLink, setActiveLink] = useState("Home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  /* =========================
     PROFILE REF (OUTSIDE CLICK)
  ========================== */
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* =========================
     NAV LINKS
  ========================== */
  const navLinks = [
    "Home",
    "About",
    "Trending Song",
    "Upcoming Song",
    "Artists",
    "Contact",
  ];

  const routeMap = {
    Home: "/",
    About: "/about",
    "Trending Song": "/songs",
    "Upcoming Song": "/upcoming",
    Artists: "/artists",
    Contact: "/contact",
  };

  /* =========================
     LOGOUT
  ========================== */
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    setUser(null);
    setIsLoggedIn(false);
    setShowProfileMenu(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <nav
        className={`w-full fixed top-0 left-0 z-50 transition-all ${
          navType === "transparent"
            ? "bg-[#111]/70 border-b border-[#303030]"
            : "bg-[#111] border-b border-[#303030]"
        }`}
      >
        <div className="max-w-[1920px] mx-auto px-6 lg:px-12 py-4">
          <div className="flex items-center justify-between gap-6">
            {/* LOGO */}
            <Link to="/" onClick={() => setActiveLink("Home")}>
              <img src={logo} alt="Logo" className="h-16 lg:h-20 w-auto" />
            </Link>

            {/* SEARCH (DESKTOP) */}
            <div className="hidden md:flex flex-1 max-w-[420px]">
              <div className="relative flex items-center bg-[#3D3D3D] rounded-[22px] px-6 py-3 w-full">
                <input
                  type="text"
                  placeholder="Search Here"
                  className="flex-1 bg-transparent text-white outline-none"
                />
                <img
                  src={searchIcon}
                  alt="search"
                  className="w-5 h-5 ml-3 opacity-80"
                />
              </div>
            </div>

            {/* NAV LINKS (DESKTOP) */}
            <div className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link}
                  to={routeMap[link]}
                  onClick={() => setActiveLink(link)}
                  className={`text-[18px] font-medium transition ${
                    activeLink === link
                      ? "text-white"
                      : "text-[#7A7A7A] hover:text-white"
                  }`}
                >
                  {link}
                </Link>
              ))}
            </div>

            {/* AUTH */}
            {!isLoggedIn ? (
              <button
                onClick={() => setShowLoginModal(true)}
                className="flex items-center gap-2 bg-[#246BFD] rounded-full px-6 py-3 text-white text-sm font-medium"
              >
                Login
                <img src={loginIcon} alt="login" className="w-4 h-4" />
              </button>
            ) : (
              <div className="relative" ref={profileRef}>
                <img
                  src={defaultAvatar}
                  alt="profile"
                  className="w-10 h-10 rounded-full cursor-pointer border border-[#3A3A3A]"
                  onClick={() =>
                    setShowProfileMenu((prev) => !prev)
                  }
                />

                {showProfileMenu && (
                  <div className="absolute right-0 mt-3 w-52 bg-[#1A1A1A] rounded-xl border border-[#2A2A2A]">
                    <div className="px-4 py-3 border-b border-[#2A2A2A]">
                      <p className="text-white font-medium">
                        {user?.fullName || "User"}
                      </p>
                    </div>

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-[#222]"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* MOBILE MENU BUTTON */}
            <button
              className="lg:hidden text-white text-2xl"
              onClick={() => setIsMobileMenuOpen((p) => !p)}
            >
              ☰
            </button>
          </div>
        </div>

        {/* ================= MOBILE MENU ================= */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[#111] border-t border-[#303030] px-6 py-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link}
                to={routeMap[link]}
                onClick={() => {
                  setActiveLink(link);
                  setIsMobileMenuOpen(false);
                }}
                className="block text-white text-lg"
              >
                {link}
              </Link>
            ))}
          </div>
        )}
      </nav>

      {/* ================= LOGIN MODAL ================= */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={(userData) => {
          if (!userData) return;
          localStorage.setItem("user", JSON.stringify(userData));
          localStorage.setItem("isLoggedIn", "true");
          setUser(userData);
          setIsLoggedIn(true);
          setShowLoginModal(false);
        }}
      />
    </>
  );
};

export default Navbar;
