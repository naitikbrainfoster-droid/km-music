import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminProtectedRoute from "./components/AdminProtectedRoute";

/* user pages */
import Profile from "./components/menuitems/Profile";
import Setting from "./components/menuitems/Setting";

import Home from "./pages/Home";
import About from "./pages/About";
import Trending from "./pages/Trending";
import Artists from "./pages/Artists";
import Artistsmusic from "./pages/Artistsmusic";
import Upcoming from "./pages/Upcoming";
import Upcominginner from "./pages/Upcominginner";
import Contact from "./pages/Contact";

/* admin pages */
import AdminLogin from "./pages/admin/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import UploadSong from "./pages/admin/UploadSong";
import Enquiry from "./pages/admin/Enquiry";

function AppContent() {
  const location = useLocation();

  let navType = "black";

  if (
    location.pathname === "/about" ||
    location.pathname === "/songs" ||
    location.pathname === "/artists" ||
    location.pathname.startsWith("/artist") ||
    location.pathname === "/upcoming" ||
    location.pathname === "/song" ||
    location.pathname === "/contact"
  ) {
    navType = "transparent";
  }

  /* 🚫 Admin pages par Navbar/Footer nahi chahiye */
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Navbar navType={navType} />}

      <Routes>
        {/* ================= USER ROUTES ================= */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/songs" element={<Trending />} />
        <Route path="/artists" element={<Artists />} />
        <Route path="/artist/:name" element={<Artistsmusic />} />
        <Route path="/upcoming" element={<Upcoming />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/song" element={<Upcominginner />} />

        {/* 🔒 USER PROTECTED */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/setting"
          element={
            <ProtectedRoute>
              <Setting />
            </ProtectedRoute>
          }
        />

        {/* ================= ADMIN ROUTES ================= */}
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin/dashboard"
          element={
            <AdminProtectedRoute>
              <Dashboard />
            </AdminProtectedRoute>

          }
        />
     <Route
  path="/admin/upload"
  element={
    <AdminProtectedRoute>
      <UploadSong />
    </AdminProtectedRoute>
}
/>

<Route
  path="/admin/enquiry"
  element={
    <AdminProtectedRoute>
      <Enquiry />
    </AdminProtectedRoute>
  }
/>



      </Routes>

      {!isAdminRoute && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
