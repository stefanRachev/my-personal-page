import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import styles from "./Register.module.css";
import { validateRegistrationForm } from "../../services/validationService";

const formInitialState = {
  email: "",
  password: "",
  repeatPassword: "",
  nickName: "",
};

function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formValues, setFormValues] = useState(formInitialState);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const formChangeHandler = (e) => {
    setFormValues((state) => ({ ...state, [e.target.id]: e.target.value }));
  };

  const logHandler = async (e) => {
    e.preventDefault();

    const validationErrors = validateRegistrationForm(formValues);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/users/register`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formValues),
            credentials: "include",
          }
        );
        if (response.ok) {
          const data = await response.json();
          login(data);
          setMessage("Registration successful!");
          setFormValues(formInitialState);

          localStorage.setItem("username", data.nickName);

          navigate("/");
        } else {
          const errorData = await response.json();
          setMessage(
            errorData.message || "Registration failed. Please try again."
          );
        }
      } catch (error) {
        setMessage("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <>
      <h2 className={styles.title}>Register</h2>
      {message && <p className={styles.message}>{message}</p>}
      <form onSubmit={logHandler} className={styles.form}>
        <div>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
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
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
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
          <label htmlFor="repeatPassword" className={styles.label}>
            Repeat Password
          </label>
          <input
            type="password"
            id="repeatPassword"
            name="repeatPassword"
            value={formValues.repeatPassword}
            onChange={formChangeHandler}
            className={styles.input}
          />
          {errors.repeatPassword && (
            <span className={styles.error}>{errors.repeatPassword}</span>
          )}
        </div>
        <div>
          <label htmlFor="nickName" className={styles.label}>
            Name
          </label>
          <input
            type="text"
            id="nickName"
            name="nickName"
            value={formValues.nickName}
            onChange={formChangeHandler}
            className={styles.input}
          />
          {errors.nickName && (
            <span className={styles.error}>{errors.nickName}</span>
          )}
        </div>
        <div>
          <button type="submit" className={styles.button}>
            Register
          </button>
        </div>
      </form>
    </>
  );
}

export default Register;
