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
//------------------------------------------------------------------------
// import { createContext, useState, useContext, useEffect } from "react";
// import PropTypes from "prop-types";

// const host = "http://localhost:3001";

// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   // const getCookie = (name) => {
//   //   const value = `; ${document.cookie}`;
//   //   const parts = value.split(`; ${name}=`);
//   //   if (parts.length === 2) return parts.pop().split(";").shift();
//   // };

//   const getCookie = (name) => {
//     const cookies = document.cookie
//       .split("; ")
//       .find((row) => row.startsWith(`${name}=`));

//     return cookies ? cookies.split("=")[1] : null;
//    };

//   useEffect(() => {
//     const token = getCookie("authToken");
//     console.log("Token from cookie in useEffect:", token); // Добавете това съобщение

//     const fetchUser = async () => {
//       if (token) {
//         try {
//           const response = await fetch(host + "/auth/validate-token", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ token }),
//             credentials: "include", // Ensure cookies are sent
//           });

//           console.log("Response status in fetchUser:", response.status); // Добавете това съобщение

//           if (response.ok) {
//             const data = await response.json();
//             console.log("Response data in fetchUser:", data); // Добавете това съобщение
//             if (data.isValid) {
//               const username = localStorage.getItem("username");
//               setUser({ ...data.user, nickName: username });
//               console.log("User data set in fetchUser:", data.user); // Добавете това съобщение
//             } else {
//               console.log("Token is invalid in fetchUser");
//               logout();
//             }
//           } else {
//             console.log("Response not OK in fetchUser");
//             logout();
//           }
//         } catch (error) {
//           console.error("Fetch error in fetchUser:", error);
//           logout();
//         }
//       } else {
//         console.log("No token found in fetchUser");
//         logout();
//       }
//     };

//     fetchUser();
//   }, []);

//   const login = (userData) => {
//     setUser(userData);
//     document.cookie = `authToken=${userData.accessToken}; path=/;`;
//     localStorage.setItem("username", userData.nickName);
//     console.log("User logged in:", userData);
//   };

//   const logout = () => {
//     setUser(null);
//     document.cookie = "authToken=; Max-Age=0; path=/;";
//     localStorage.removeItem("username");
//     console.log("User logged out");
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
//---------------------------------------------------------
import { createContext, useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";

const host = "http://localhost:3001";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(host + "/auth/validate-token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Позволява изпращането на куки
        });

        if (response.ok) {
          const data = await response.json();
          if (data.isValid) {
            setUser(data.user);
          } else {
            console.log("Token is invalid");
            setUser(null);
          }
        } else {
          console.log("Response not OK");
          setUser(null);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    document.cookie = "authToken=; Max-Age=0; path=/;";
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
