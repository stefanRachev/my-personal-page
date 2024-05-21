import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.footerText}>
        &copy;2024 Stefan Rachev - Student Portfolio Project
      </p>
    </footer>
  );
}

export default Footer;
