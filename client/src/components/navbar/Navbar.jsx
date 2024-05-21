import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import styles from "./Navbar.module.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.title}>
        Home
      </Link>
      <div
        className={styles.menu}
        onClick={() => {
          setMenuOpen(!menuOpen);
        }}
      >
        <span className={styles.menuSpan}></span>
        <span className={styles.menuSpan}></span>
        <span className={styles.menuSpan}></span>
      </div>
      <ul className={`${styles.navList} ${menuOpen ? styles.navListOpen : ""}`}>
        <li className={styles.navItem}>
          <NavLink to="/register" className={styles.navLink}>
            Register
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink to="/login" className={styles.navLink}>
            Login
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink to="/logout" className={styles.navLink}>
            Logout
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink to="/about" className={styles.navLink}>
            About
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink to="/activities" className={styles.navLink}>
            Activities
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink to="/contact" className={styles.navLink}>
            Contact
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;

