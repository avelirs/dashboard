import React, { createContext, useState, useContext, useEffect } from "react";
import { login as apiLogin, register as apiRegister } from "../api/apicalls";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // TODO: Implement a function to fetch user data using the token
      // For now, we'll just set a dummy user object
      setUser({ name: "Logged In User" });
    }
  }, []);

  const login = async (credentials) => {
    try {
      const data = await apiLogin(credentials);
      setUser(data.user);
      return data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const data = await apiRegister(userData);
      setUser(data.user);
      return data;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
