import styles from "./NotFound.module.css"

function NotFound() {
  return (
    <div className={styles.notFoundContainer}>
      <h2>404 - Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
}

export default NotFound;
