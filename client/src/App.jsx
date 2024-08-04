import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./components/pages/Home";
import PersonallyForMe from "./components/personal/PersonallyForMe";
import Contact from "./components/pages/Contact";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import Logout from "./components/pages/Logout";
import NotFound from "./components/pages/NotFound";
import { AuthProvider } from "./contexts/AuthContext";
import AboutMe from "./components/pages/AboutMe";
import PetGallery from "./components/personal/PetGallery";
import TripsGallery from "./components/personal/TripsGallery";

function App() {
  return (
    <AuthProvider>
      <div className="container">
        <div className="navbar-container">
          <Navbar />
        </div>
        <div className="main-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users/register" element={<Register />} />
            <Route path="/users/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/about-me" element={<AboutMe />} />
            <Route
              path="/activities/personal-life-hobbies"
              element={<PersonallyForMe />}
            />
            <Route path="/pet-gallery" element={<PetGallery />} />
            <Route path="/trips-gallery" element={<TripsGallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <div className="footer-container">
          <Footer />
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
