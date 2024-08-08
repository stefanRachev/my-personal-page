import { Link, Navigate } from "react-router-dom";
import styles from "./PersonallyForMe.module.css";
import { useAuth } from "../../contexts/AuthContext";

function PersonallyForMe() {
  const { user, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <Navigate to="/users/login" />;
  }

  return (
    <div className={styles.aboutMeContainer}>
      <h2>About Me</h2>

      <div className={styles.section}>
        <h3>My Pet - Sara</h3>
        <img
          src="https://i.imgur.com/Or5SwCq.jpg"
          alt="Fluffy"
          className={styles.image}
        />
        <p>
          Sarah is my beloved dog, fate brought us together and since then
          we&apos;ve been inseparable.
        </p>

        <Link to="/pet-gallery" className={styles.link}>
          View Pet Gallery
        </Link>
      </div>

      <div className={styles.section}>
        <h3>My Trips</h3>
        <img
          src="https://i.imgur.com/l4oxGw2.jpg"
          alt="Trips"
          className={styles.image}
        />
        <p>
          I love exploring new places and experiencing different cultures.
          Here&apos;s a snapshot from my recent holiday adventure.
        </p>
        <Link to="/trips-gallery" className={styles.link}>
          View Trips Gallery
        </Link>
      </div>

      <div className={styles.section}>
        <h3>Write me</h3>
        <img
          src="https://i.imgur.com/eBs6XHN.jpg"
          alt="Contact"
          className={styles.image}
        />
        <p>
          Want to get in touch? Send me a message directly, and I&apos;ll get back to
          you as soon as possible.
        </p>
        <Link to="/send-email" className={styles.link}>
          Send Email
        </Link>
      </div>
    </div>
  );
}

export default PersonallyForMe;
