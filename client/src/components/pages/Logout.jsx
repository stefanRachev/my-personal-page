import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        localStorage.removeItem("username");

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/users/logout`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (response.ok) {
          await logout();
          navigate("/users/login");
        } else {
          console.error("Failed to logout");
        }
      } catch (error) {
        console.error("An error occurred during logout:", error);
      }
    };

    handleLogout();
  }, [logout, navigate]);

  return null;
};

export default Logout;
