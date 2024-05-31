import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import styles from "./Navbar.module.css";
import { useAuth } from "../../contexts/AuthContext";

function Navbar() {
  const { user } = useAuth();

  console.log("Logged in user:", user);

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
          <span className={styles.userField}>
            {user ? `Добре дошъл, ${user.nickName}` : "Гост"}
          </span>
        </li>
        {user && (
          <>
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
          </>
        )}
        {!user && (
          <>
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
              <NavLink to="/contact" className={styles.navLink}>
                Contact
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
