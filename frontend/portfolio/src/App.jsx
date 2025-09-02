import React from "react";
import { Routes, Route, Link } from "react-router-dom";


import { ProfilePage } from "./pages/ProfilePage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { SearchPage } from "./pages/SearchPage";
import { EditProfilePage } from "./pages/EditProfilePage";
import { HealthPage } from "./pages/HealthPage";
import { LoginPage } from "./pages/LoginPage";
import { RequirePasskey } from "./RequirePasskey";
import { useNavigate, useLocation } from "react-router-dom";

function App() {
  const isLoggedIn = localStorage.getItem("passkey") === "playground";
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect logged-in users away from /login
  React.useEffect(() => {
    if (isLoggedIn && location.pathname === "/login") {
      navigate("/", { replace: true });
    }
    if (!isLoggedIn && location.pathname !== "/login") {
      navigate("/login", { replace: true });
    }
  }, [isLoggedIn, location.pathname, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("passkey");
    navigate("/login", { replace: true });
  };

  return (
    <>
      <nav className="navbar">
        {isLoggedIn && <>
          <Link to="/">Profile</Link>
          <Link to="/profile/edit">Edit Profile</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/search">Search</Link>
          <Link to="/health">Health</Link>
          <button onClick={handleLogout} style={{marginLeft:'2rem'}}>Logout</button>
        </>}
      </nav>
      <main style={{marginTop: '5.5rem'}}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<RequirePasskey><ProfilePage /></RequirePasskey>} />
          <Route path="/profile/edit" element={<RequirePasskey><EditProfilePage /></RequirePasskey>} />
          <Route path="/projects" element={<RequirePasskey><ProjectsPage /></RequirePasskey>} />
          <Route path="/search" element={<RequirePasskey><SearchPage /></RequirePasskey>} />
          <Route path="/health" element={<RequirePasskey><HealthPage /></RequirePasskey>} />
          <Route
            path="*"
            element={
              <div style={{ padding: "2rem", textAlign: "center" }}>
                No match for this route.
              </div>
            }
          />
        </Routes>
      </main>
    </>
  );
}

export default App;
