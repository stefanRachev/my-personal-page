import { useState } from "react";

const formInitialState = {
  email: "",
  password: "",
  repeatPassword: "",
  nickName: "",
}

function Register() {
  const [formValues, setFormValues] = useState(formInitialState);
  const [errors, setErrors] = useState({});

 

  const formChangeHandler = (e) => {
    setFormValues((state) => ({ ...state, [e.target.name]: e.target.value }));
  
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formValues.email) {
      newErrors.email = "Email is required";
    }
    if (!formValues.password) {
      newErrors.password = "Password is required";
    }
    if (formValues.password !== formValues.repeatPassword) {
      newErrors.repeatPassword = "Passwords do not match";
    }
    if (!formValues.nickName) {
      newErrors.nickName = "Name is required";
    }
    return newErrors;
  };

  const resetFormHandler = () => {
    setFormValues(formInitialState)
  };

  const logHandler = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      console.log(formValues);
      resetFormHandler();
    }
  };

  return (
    <>
      <h1>register</h1>

      <form onSubmit={logHandler}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="register-email"
            value={formValues.email}
            onChange={formChangeHandler}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="register-password"
            value={formValues.password}
            onChange={formChangeHandler}
          />
          {errors.email && <span className="error">{errors.password}</span>}
        </div>
        <div>
          <label htmlFor="repeatPassword">Repeat Password</label>
          <input
            type="password"
            name="repeatPassword"
            id="register-repeatPassword"
            value={formValues.repeatPassword}
            onChange={formChangeHandler}
          />
          {errors.email && <span className="error">{errors.repeatPassword}</span>}
        </div>
        <div>
          <label htmlFor="nickName">Name</label>
          <input
            type="text"
            name="nickName"
            id="register-name"
            value={formValues.nickName}
            onChange={formChangeHandler}
          />
          {errors.email && <span className="error">{errors.nickName}</span>}
        </div>
        <div>
          <button type="submit">Register</button>
          <input type="button" value="Reset" onClick={resetFormHandler} />
        </div>
      </form>
    </>
  );
}

export default Register;
