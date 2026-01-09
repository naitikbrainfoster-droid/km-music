import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import logo from "../assets/flogo.svg";
import searchIcon from "../assets/search-icon.svg";
import loginIcon from "../assets/search-icon.svg";
import LoginModal from "./Login/LoginModel";

const BACKEND_URL = "http://kundramusic.com/";

const Navbar = () => {
  /* ================= AUTH ================= */
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const profileRef = useRef(null);

  /* ============== LOAD USER ============== */
  useEffect(() => {
    const loadUser = () => {
      try {
        const u = localStorage.getItem("user");
        setUser(u && u !== "undefined" ? JSON.parse(u) : null);
      } catch {
        setUser(null);
      }
    };
    loadUser();
    window.addEventListener("userUpdated", loadUser);
    return () => window.removeEventListener("userUpdated", loadUser);
  }, []);

  /* ============ OUTSIDE CLICK ============ */
  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* ============== LOGOUT ============== */
  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    setIsLoggedIn(false);
    setShowProfileMenu(false);
    setMobileMenuOpen(false);
  };

  const firstLetter = user?.fullName?.charAt(0)?.toUpperCase() || "U";
  const avatarUrl = user?.avatar ? `${BACKEND_URL}${user.avatar}` : null;

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Song", path: "/songs" },
    { name: "Video", path: "/videos" },
    { name: "Artists", path: "/artists" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/30 backdrop-blur-xl border-b border-white/30">
        <div className="max-w-[1920px] mx-auto px-6 lg:px-12">
          <div className="h-[92px] flex items-center gap-6">

            {/* LOGO */}
            <Link to="http://kundramusic.com/" className="flex-shrink-0">
              <img src={logo} alt="Logo" className="h-14
                md:h-16 lg:h-20 xl:h-22 object-conain" />
            </Link>

            {/* SEARCH + DIVIDER (DESKTOP) */}
            <div className="hidden md:flex items-center gap-10 flex-1 max-w-[520px]">
              <div className="w-full">
                <div className="flex items-center bg-[#3D3D3D] rounded-full px-6 py-3">
                  <input
                    placeholder="Search Here"
                    className="flex-1 bg-transparent text-white outline-none"
                  />
                  <img src={searchIcon} className="w-5 h-5 opacity-80" />
                </div>
              </div>

              <div className="h-[56px] w-[1px] bg-white/40" />
            </div>

            {/* NAV LINKS (DESKTOP - LEFT SHIFTED) */}
            <div className="hidden lg:flex items-center gap-10 flex-1 justify-start">
              {navLinks.map((l) => (
                <Link
                  key={l.name}
                  to={l.path}
                  className="text-[#9A9A9A] hover:text-white transition"
                >
                  {l.name}
                </Link>
              ))}
            </div>

            {/* AUTH / AVATAR */}
            <div className="flex items-center gap-4">
              {!isLoggedIn ? (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="bg-[#246BFD] rounded-full px-6 py-3 text-white font-medium hidden sm:flex"
                >
                  Login
                  <img src={loginIcon} className="inline w-4 h-4 ml-2" />
                </button>
              ) : (
                <div className="relative" ref={profileRef}>
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      className="w-10 h-10 rounded-full border border-white object-cover cursor-pointer"
                      onClick={() => setShowProfileMenu(!showProfileMenu)}
                    />
                  ) : (
                    <div
                      onClick={() => setShowProfileMenu(!showProfileMenu)}
                      className="w-10 h-10 rounded-full border border-white bg-white/10
                                 flex items-center justify-center text-white font-semibold cursor-pointer"
                    >
                      {firstLetter}
                    </div>
                  )}

                  {showProfileMenu && (
                    <div className="absolute right-0 mt-3 w-56 bg-[#111] border border-[#2A2A2A] rounded-xl">
                      <div className="px-4 py-3 border-b border-[#2A2A2A]">
                        <p className="text-white">{user?.fullName}</p>
                        <p className="text-xs text-gray-400">{user?.email}</p>
                      </div>

                      <Link
                        to="/profile"
                        onClick={() => setShowProfileMenu(false)}
                        className="block px-4 py-3 hover:bg-[#222] text-white"
                      >
                        Profile
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-3 text-red-400 hover:bg-[#222]"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* ☰ MOBILE MENU BUTTON */}
              <button
                className="lg:hidden text-white text-3xl"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                ☰
              </button>
            </div>
          </div>
        </div>

        {/* ================= MOBILE MENU ================= */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-black/90 backdrop-blur-xl border-t border-white/20 px-6 py-6 space-y-5">
            {navLinks.map((l) => (
              <Link
                key={l.name}
                to={l.path}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-white text-lg"
              >
                {l.name}
              </Link>
            ))}

            {!isLoggedIn && (
              <button
                onClick={() => {
                  setShowLoginModal(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full bg-[#246BFD] py-3 rounded-full text-white font-medium"
              >
                Login
              </button>
            )}
          </div>
        )}
      </nav>

      {/* LOGIN MODAL */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={(userData) => {
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
