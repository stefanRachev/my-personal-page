import { Navigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import styles from "./EmailForm.module.css";

const EmailForm = () => {
  const { user, loading } = useAuth();

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <Navigate to="/users/login" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`${import.meta.env.VITE_API_URL}/email/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: user.nickName,
        email: user.email,
        subject,
        message,
      }),
    });

   
    if (response.ok) {
      alert("Email sent successfully!");
      setSubject("");
      setMessage("");
    } else {
      alert("Failed to send email.");
    }
  };


  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div>
        <label className={styles.label}>Name:</label>
        <input
          type="text"
          value={user.nickName}
          disabled
          className={`${styles.input} ${styles.disabledInput}`}
        />
      </div>
      <div>
        <label className={styles.label}>Email:</label>
        <input
          type="email"
          value={user.email}
          disabled
          className={`${styles.input} ${styles.disabledInput}`}
        />
      </div>
      <div>
        <label className={styles.label}>Subject:</label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className={styles.input}
        />
      </div>
      <div>
        <label className={styles.label}>Message:</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={styles.textarea}
        />
      </div>
      <button type="submit" className={styles.button}>
        Send Email
      </button>
    </form>
  );
};

export default EmailForm;
