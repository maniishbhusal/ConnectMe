import { createContext, useContext, useEffect, useState } from "react";
import { isAuthenticated, removeStoredToken } from "../../../api/auth";

// Create the AuthContext
const AuthContext = createContext();

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);

  // Sync auth status when token changes (login or logout)
  useEffect(() => {
    // Check authentication status when component mounts
    setIsAuth(isAuthenticated());

    // Add event listener for storage changes (in case token is removed in another tab)
    const handleAuthChange = () => {
      setIsAuth(isAuthenticated());
    };
    window.addEventListener("authChange", handleAuthChange);
    window.addEventListener("storage", handleAuthChange);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("authChange", handleAuthChange);
      window.removeEventListener("storage", handleAuthChange);
    };
  }, []);

  // Handle Logout
  const handleLogout = () => {
    removeStoredToken();
    setIsAuth(false); // Update state after token removal
  };

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
