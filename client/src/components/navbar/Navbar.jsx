import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import styles from "./Navbar.module.css";
import { useAuth } from "../../contexts/AuthContext";

function Navbar() {
  const { user, loading } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  if (loading) {
    return <p>Loading...</p>;
  }

  console.log("Logged in user:", user);

  

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
            {user ? `Welcome, ${user.nickName}` : "Guest"}
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
              <NavLink to="/about-me" className={styles.navLink}>
                About Me
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink to="/activities/personal-life-hobbies" className={styles.navLink}>
                Activities
              </NavLink>
            </li>
          </>
        )}
        {!user && (
          <>
            <li className={styles.navItem}>
              <NavLink to="/users/register" className={styles.navLink}>
                Register
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink to="/users/login" className={styles.navLink}>
                Login
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
