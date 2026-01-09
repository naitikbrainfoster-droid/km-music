import { useState } from "react";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import "./LoginModal.css";
import avatarVideo from "./avatar/avatar1.mp4";

const LoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [activeTab, setActiveTab] = useState("login");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!isOpen) return null;

  // ================= REGISTER =================
  const handleRegister = async () => {
    try {
      const res = await axios.post("/api/auth/register", {
        fullName,
        email,
        password,
      });

      alert(res.data.message);

      if (res.data.success) {
        setActiveTab("login");
        setFullName("");
        setEmail("");
        setPassword("");
      }
    } catch (err) {
      console.error("REGISTER ERROR:", err);
      alert("Registration failed");
    }
  };

  // ================= LOGIN =================
  const handleLogin = async () => {
    try {
      const res = await axios.post("/api/auth/login", {
        email,
        password,
      });

      if (res.data.success) {
        onLoginSuccess(res.data.user); // ✅ SEND USER TO NAVBAR
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.error("LOGIN ERROR:", err);
      alert("Login failed");
    }
  };

  // ================= GOOGLE LOGIN =================
  const handleGoogleLogin = async (credential) => {
    try {
      const res = await axios.post("/api/auth/google-login", {
        token: credential,
      });

      if (res.data.success) {
        onLoginSuccess(res.data.user); // ✅ SEND USER TO NAVBAR
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.error("GOOGLE LOGIN ERROR:", err);
      alert("Google login failed");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999] flex justify-center items-center px-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#11132D] text-white rounded-3xl w-full max-w-[820px] shadow-2xl flex"
      >
        {/* LEFT */}
        <div className="hidden md:flex w-[300px] bg-[#0D0F27] items-center justify-center p-6">
          <video
            autoPlay
            muted
            loop
            playsInline
            src={avatarVideo}
            className="w-[260px] rounded-3xl"
          />
        </div>

        {/* RIGHT */}
        <div className="flex-1 p-8 md:p-10 relative">
          <button
            onClick={onClose}
            className="absolute right-5 top-5 text-xl hover:text-red-400"
          >
            ×
          </button>

          {/* TABS */}
          <div className="flex gap-6 mb-6 text-lg font-semibold">
            <button
              className={activeTab === "login" ? "text-white" : "text-gray-400"}
              onClick={() => setActiveTab("login")}
            >
              Login
            </button>
            <button
              className={activeTab === "register" ? "text-white" : "text-gray-400"}
              onClick={() => setActiveTab("register")}
            >
              Register
            </button>
          </div>

          {/* LOGIN */}
          {activeTab === "login" && (
            <>
              <label>Email</label>
              <input
                className="w-full mb-4 px-4 py-3 rounded-xl bg-[#1B1E42]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <label>Password</label>
              <input
                type="password"
                className="w-full mb-6 px-4 py-3 rounded-xl bg-[#1B1E42]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                onClick={handleLogin}
                className="w-full bg-blue-600 py-3 rounded-xl"
              >
                Login
              </button>

              <div className="my-6 text-center text-white/60">OR</div>

              <div className="flex justify-center">
                <GoogleLogin
                  onSuccess={(res) => handleGoogleLogin(res.credential)}
                  onError={() => alert("Google login failed")}
                />
              </div>
            </>
          )}

          {/* REGISTER */}
          {activeTab === "register" && (
            <>
              <input
                placeholder="Full Name"
                className="w-full mb-4 px-4 py-3 rounded-xl bg-[#1B1E42]"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              <input
                placeholder="Email"
                className="w-full mb-4 px-4 py-3 rounded-xl bg-[#1B1E42]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                placeholder="Password"
                type="password"
                className="w-full mb-6 px-4 py-3 rounded-xl bg-[#1B1E42]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                onClick={handleRegister}
                className="w-full bg-green-600 py-3 rounded-xl"
              >
                Create Account
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
