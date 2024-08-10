// Валидация на имейл
export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };
  
  // Валидация на формата за регистрация
  export const validateRegistrationForm = (formValues) => {
    const errors = {};
  
    if (!formValues.email) {
      errors.email = "Email is required";
    } else if (!validateEmail(formValues.email)) {
      errors.email = "Invalid email address";
    }
  
    if (!formValues.password) {
      errors.password = "Password is required";
    }
  
    if (formValues.password !== formValues.repeatPassword) {
      errors.repeatPassword = "Passwords do not match";
    }
  
    if (!formValues.nickName) {
      errors.nickName = "Name is required";
    }
  
    return errors;
  };