import styles from "./Home.module.css";

function Home() {
  return (
    <div className={styles.containerHome}>
      <div className={styles.poster}>
        <h1 className={styles.openingTitle}>Hello this is my personal page</h1>
      </div>

      <div className={styles.picImg}>
        <img
          className={styles.pic}
          src="https://i.imgur.com/Zvr50Nj.jpg"
          alt="Описание на снимката"
        />
      </div>

      <div className={styles.describeText}>
        <h2 className={styles.descriptive}>
          To view my website, rate it, and leave comments, registration is
          required!
        </h2>
      </div>
    </div>
  );
}

export default Home;

