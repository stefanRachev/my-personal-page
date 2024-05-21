import { useState } from "react";
import styles from "./Login.module.css";

const formInitialState = {
  email: "",
  password: "",
};

function Login() {
  const [formValues, setFormValues] = useState(formInitialState);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const formChangeHandler = (e) => {
    setFormValues((state) => ({ ...state, [e.target.id]: e.target.value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formValues.email) {
      newErrors.email = "Email is required";
    }
    if (!formValues.password) {
      newErrors.password = "Password is required";
    }
    return newErrors;
  };

  const logHandler = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        const response = await fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formValues),
        });
        if (response.ok) {
          setMessage("Login successful!");
          setFormValues(formInitialState); // Optionally reset form here
          setErrors({});
        } else {
          setMessage("Invalid email or password. Please try again.");
        }
      } catch (error) {
        setMessage("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <>
      <h2 className={styles.title}>Login</h2>
      {message && <p className={styles.message}>{message}</p>}
      <form onSubmit={logHandler} className={styles.form}>
        <div>
          <label htmlFor="email" className={styles.label}>Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formValues.email}
            onChange={formChangeHandler}
            className={styles.input}
          />
          {errors.email && <span className={styles.error}>{errors.email}</span>}
        </div>
        <div>
          <label htmlFor="password" className={styles.label}>Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formValues.password}
            onChange={formChangeHandler}
            className={styles.input}
          />
          {errors.password && (
            <span className={styles.error}>{errors.password}</span>
          )}
        </div>
        <div>
          <button type="submit" className={styles.button}>Login</button>
        </div>
      </form>
    </>
  );
}

export default Login;

