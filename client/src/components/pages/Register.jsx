import { useState } from "react";

const formInitialState = {
  email: "",
  password: "",
  repeatPassword: "",
  nickName: "",
}

function Register() {
  const [formValues, setFormValues] = useState(formInitialState);

 

  const formChangeHandler = (e) => {
    setFormValues((state) => ({ ...state, [e.target.name]: e.target.value }));
  
  };

  const resetFormHandler = () => {
    setFormValues(formInitialState)
  };

  const logHandler = (e) => {
    e.preventDefault();
    console.log(formValues);
    resetFormHandler()
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
