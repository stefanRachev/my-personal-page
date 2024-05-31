import styles from "./AboutMe.module.css";

function AboutMe() {
  return (
    <div className={styles.aboutContainer}>
      <h1 className={styles.title}>About Me</h1>
      <section className={styles.section}>
        <h2 className={styles.subtitle}>Professional Summary</h2>
        <p>
          I am a web developer with extensive experience in JavaScript and
          related technologies. I have completed various modules at SoftUni,
          including JavaScript Basics, Fundamentals, Advanced, Applications,
          Node.js, Express, Express-Handlebars, MongoDB, Mongoose, HTML, CSS,
          and React Client-Side Rendering. Additionally, I have basic knowledge
          of Python, Git, and Linux. I actively maintain my LinkedIn and GitHub
          profiles to showcase my projects and professional growth.
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
