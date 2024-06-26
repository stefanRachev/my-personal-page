import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        localStorage.removeItem("accessToken");

        await logout();

        navigate("/");
      } catch (error) {
        console.error("Failed to logout:", error);
      }
    };

    handleLogout();
  }, [logout, navigate]);

  return null;
};

export default Logout;
