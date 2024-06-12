import { Link } from "react-router-dom";
import styles from "./PersonallyForMe.module.css";

function PersonallyForMe() {
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
          Sarah is my beloved dog, fate brought us together and since then we&apos;ve
          been inseparable.
        </p>

        <Link to="/pet-gallery" className={styles.link}>
          View Pet Gallery
        </Link>
      </div>

      <div className={styles.section}>
        <h3>My Holidays</h3>
        <img
          src="https://i.imgur.com/holiday1.jpg"
          alt="Holiday"
          className={styles.image}
        />
        <p>
          I love exploring new places and experiencing different cultures.
          Here&apos;s a snapshot from my recent holiday adventure.
        </p>
        <Link to="/comments/holidays" className={styles.link}>
          See Comments
        </Link>
      </div>

      <div className={styles.section}>
        <h3>Cycling Adventures</h3>
        <img
          src="https://i.imgur.com/cycling1.jpg"
          alt="Cycling"
          className={styles.image}
        />
        <p>
          Cycling is my passion. I enjoy exploring the countryside on my bike
          and discovering new routes.
        </p>
        <Link to="/comments/cycling" className={styles.link}>
          See Comments
        </Link>
      </div>

      <div className={styles.section}>
        <h3>My Hometown</h3>
        <img
          src="https://i.imgur.com/hometown1.jpg"
          alt="Hometown"
          className={styles.image}
        />
        <p>
          I live in a beautiful town surrounded by nature. Here&apos;s a view
          from my favorite spot in town.
        </p>
        <Link to="/comments/hometown" className={styles.link}>
          See Comments
        </Link>
      </div>
    </div>
  );
}

export default PersonallyForMe;
