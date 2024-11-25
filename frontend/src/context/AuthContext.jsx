import React, { createContext, useState, useEffect, useContext } from "react";

// Create AuthContext
const AuthContext = createContext();

// AuthProvider component that will wrap the app
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    // Check if token and email exist in localStorage on app load
    const token = localStorage.getItem("authToken");
    const email = localStorage.getItem("userEmail");
    if (token && email) {
      setIsLoggedIn(true);
      setUserEmail(email);
      setAuthToken(token);
    }
  }, []);

  const login = (token, email) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("userEmail", email);
    setIsLoggedIn(true);
    setUserEmail(email);
    setAuthToken(token);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    setIsLoggedIn(false);
    setUserEmail(null);
    setAuthToken(null);
  };

  return <AuthContext.Provider value={{ isLoggedIn, userEmail, authToken, login, logout }}>{children}</AuthContext.Provider>;
};

// Custom hook to use AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
