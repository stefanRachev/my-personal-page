import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import About from "./components/pages/About";
import Home from "./components/pages/Home";
import Activities from "./components/pages/Activities";
import Contact from "./components/pages/Contact";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import Logout from "./components/pages/Logout";

function App() {
  return (
    <div className="container">
      <div className="navbar-container">
        <Navbar />
      </div>
      <div className="main-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/about" element={<About />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
      <div className="footer-container">
        <Footer />
      </div>
    </div>
  );
}

export default App;
