import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import styles from "./AboutMe.module.css";

function AboutMe() {
  const { user, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <Navigate to="/users/login" />;
  }

  return (
    <div className={styles.aboutContainer}>
      <h1 className={styles.title}>About Me</h1>
      <section className={styles.section}>
        <h2 className={styles.subtitle}>Professional Summary</h2>
        <p>
          I am currently looking for a position as a web developer. I am a
          creative and proactive person with a professional attitude and good
          working habits. I am a web developer with a passion for growth in the
          industry as a Full Stack Developer. I have actively participated in
          various courses in the last two years to upgrade my skill set. My
          current focus is on the JavaScript environment. I&apos;ve knowledge of
          Git and Linux and a basic knowledge of Python. I am still learning
          Python with a passion for it. I am actively maintaining my LinkedIn
          and GitHub profiles to present my projects and professional growth.
          I&apos;ve completed various modules at SoftUni, including: -
          JavaScript Basics - Fundamentals - Advanced - Applications - Node.js -
          Express - Express-Handlebars - MongoDB - Mongoose - HTML - CSS - React
          Client-Side Rendering
        </p>
      </section>
      <section className={styles.section}>
        <h2 className={styles.subtitle}>Technical Skills</h2>
        <ul>
          <li>JavaScript: Basics, Fundamentals, Advanced, Applications</li>
          <li>Node.js, Express, Express-Handlebars</li>
          <li>MongoDB, Mongoose</li>
          <li>HTML, CSS, React Client-Side Rendering</li>
          <li>Basic Python</li>
          <li>Git, Linux</li>
        </ul>
      </section>
      <section className={styles.section}>
        <h2 className={styles.subtitle}>Profiles</h2>
        <p>
          <a
            href="https://www.linkedin.com/in/stefan-rachev-38040428b"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>{" "}
          |
          <a
            href="https://github.com/stefanRachev"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </p>
      </section>
    </div>
  );
}

export default AboutMe;
