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
import { PlayerProvider } from "./context/PlayerProvider";
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
import AddArtist from "./pages/admin/AddArtist";
import AddSong from "./pages/admin/AddSong";
import AddUpcoming from "./pages/admin/AddUpcoming";
import ViewArtists from "./pages/admin/ViewArtists";
import EditArtist from "./pages/admin/EditArtist";
import ViewSongs from "./pages/admin/ViewSongs";
import EditSong from "./pages/admin/EditSong";
import ViewUpcoming from "./pages/admin/ViewUpcoming";
import EditUpcoming from "./pages/admin/EditUpcoming";
import RegisterUser from "./pages/admin/RegisterUser";
import ViewUsers from "./pages/admin/ViewUsers";
import EditUser from "./pages/admin/EditUser";


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
      <PlayerProvider>
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

<Route path="/admin/artists/add" element={ <AdminProtectedRoute>
                                           <AddArtist />
                                          </AdminProtectedRoute>} />

<Route path="/admin/artists/view" element={ <AdminProtectedRoute>
                                           <ViewArtists />
                                          </AdminProtectedRoute>} />

<Route path="/admin/artists/edit/:id" element={ <AdminProtectedRoute>
                                           <EditArtist />
                                          </AdminProtectedRoute>} />

<Route path="/admin/songs/add" element={ <AdminProtectedRoute>
                                           <AddSong />
                                          </AdminProtectedRoute>} />

<Route path="/admin/songs" element={ <AdminProtectedRoute>
                                           <ViewSongs />
                                          </AdminProtectedRoute>} />

<Route path="/admin/songs/edit/:id" element={ <AdminProtectedRoute>
                                           <EditSong />
                                          </AdminProtectedRoute>} />

<Route path="/admin/upcoming/add" element={ <AdminProtectedRoute>
                                           <AddUpcoming />
                                          </AdminProtectedRoute>} />

<Route path="/admin/upcoming" element={ <AdminProtectedRoute>
                                           <ViewUpcoming />
                                          </AdminProtectedRoute>} />

<Route path="/admin/upcoming/edit/:id" element={
  <AdminProtectedRoute>
    <EditUpcoming />
  </AdminProtectedRoute>
}
/>
{/* USERS */}
<Route
  path="/admin/users/register"
  element={
    <AdminProtectedRoute>
      <RegisterUser />
    </AdminProtectedRoute>
  }
/>
<Route
  path="/admin/users"
  element={
    <AdminProtectedRoute>
      <ViewUsers />
    </AdminProtectedRoute>
  }
/>
<Route
  path="/admin/users/edit/:id"
  element={
    <AdminProtectedRoute>
      <EditUser />
    </AdminProtectedRoute>
  }
/>

      </Routes>
      </PlayerProvider>
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
