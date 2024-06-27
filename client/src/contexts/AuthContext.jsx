// import { createContext, useState, useContext } from "react";
// import PropTypes from "prop-types";

// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   const login = (userData) => {
//     setUser(userData);
//   };

//   const logout = () => {
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// AuthProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };

// export const useAuth = () => useContext(AuthContext);

import { createContext, useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const token = localStorage.getItem("accessToken");
  //   console.log(token);
  //   if (token) {
  //     // Можете да направите проверка за валидност на токена тук, ако е необходимо
  //     // Примерно, може да изпратите заявка до сървъра за валидация на токена
  //     // Ако токенът е валиден, може да настроите потребителя
  //     const storedUser = JSON.parse(localStorage.getItem("user"));
  //     setUser(storedUser);
  //     console.log(storedUser );
  //   }
  // }, []);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const userStoredTime = localStorage.getItem("userStoredTime");

    if (token && userStoredTime) {
      const currentTime = new Date().getTime();
      const storedTime = parseInt(userStoredTime, 10);

      if (currentTime - storedTime > 60000) {
        // Проверяваме дали са изминали повече от 1 минута (60000 милисекунди)
        logout(); // Разлогваме потребителя
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        localStorage.removeItem("userStoredTime");
      } else {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        setUser(storedUser);
      }
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("accessToken", userData.accessToken);
    localStorage.setItem("user", JSON.stringify(userData)); // Запазваме целия обект на потребителя в локално съхранение
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
