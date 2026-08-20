import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

const backendUrl = import.meta.env.VITE_BACKEND_URL;

axios.defaults.baseURL = backendUrl;

import React from "react";


export const AuthContext = createContext();

 export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const checkAuth = async () => {
    try {
      const { data } = await axios.get("/users/current-user");
      if (data.success) {
        setAuthUser(data);
      }
    } catch (error) {
      console.log("Auth check failed:", error.message);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const values = {
    authUser,
    setAuthUser,
    checkAuth,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export function useAuthContext() {
  return useContext(AuthContext);
}
