export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

const validatePassword = (password) => {
  const minLength = 6;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);

  if (password.length < minLength) {
    return `Password must be at least ${minLength} characters long`;
  }
  if (!hasUpperCase) {
    return "Password must contain at least one uppercase letter";
  }
  if (!hasLowerCase) {
    return "Password must contain at least one lowercase letter";
  }
  return null;
};

export const validateRegistrationForm = (formValues) => {
  const errors = {};

  if (!formValues.email) {
    errors.email = "Email is required";
  } else if (!validateEmail(formValues.email)) {
    errors.email = "Invalid email address";
  }

  if (!formValues.password) {
    errors.password = "Password is required";
  } else {
    const passwordError = validatePassword(formValues.password);
    if (passwordError) {
      errors.password = passwordError;
    }
  }

  if (formValues.password !== formValues.repeatPassword) {
    errors.repeatPassword = "Passwords do not match";
  }

  if (!formValues.nickName) {
    errors.nickName = "Name is required";
  }

  return errors;
};
