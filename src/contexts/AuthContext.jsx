import { createContext, useContext, useState, useEffect } from "react";
import { authAPI } from "../utils/api.js";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is authenticated on app load
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("access_token");
      const storedUser = localStorage.getItem("user");

      if (token && storedUser) {
        try {
          // Verify token with backend
          await authAPI.verify();
          setUser(JSON.parse(storedUser));
          setIsAuthenticated(true);
        } catch {
          // Token is invalid, clear stored data
          localStorage.removeItem("access_token");
          localStorage.removeItem("user");
          localStorage.removeItem("user-name");
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = (userData, token) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem("access_token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem(
      "user-name",
      `${userData.first_name} ${userData.last_name}`
    );
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    authAPI.logout();
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
