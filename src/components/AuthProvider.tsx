import React, { useEffect, useMemo, useState } from "react";
import AuthContext from "../contexts/AuthContext";
import apiAxios from "../utils/apiAxios";
import axios from "axios";
import UserContext from "../contexts/UserContext";
import { jwtDecode } from "jwt-decode";

interface User {
  firstName: string;
  lastName: string;
  email: string;
}

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [serverError, setServerError] = useState<boolean>(false);
  const [userValue, setUserValue] = useState<User>();

  useEffect(() => {
    if (token) {
      apiAxios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem("token", token);
    } else {
      delete apiAxios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
    }
  }, [token]);

  useEffect(() => {
    const validateToken = async () => {
      try {
        if (token) {
          const response = await apiAxios.post("/auth/validate", {
            accessToken: token,
          });
          if (response.status === 200) {
            setIsAuthenticated(true);
          } else {
            setToken(null);
          }
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          if (err.code === "ERR_NETWORK" || err.status === 500)
            setServerError(true);
        } else {
          console.error(err);
        }
      } finally {
        console.log("Validation completed");
        setLoading(false);
      }
    };
    validateToken();
  }, [token]);

  useEffect(() => {
    console.log(isAuthenticated, loading);
  }, [isAuthenticated, loading]);

  const authValue = useMemo(
    () => ({
      token,
      setToken,
      isAuthenticated,
      loading,
      serverError,
    }),
    [token, isAuthenticated, loading, serverError]
  );

  useEffect(() => {
    if (token) setUserValue(jwtDecode(token));
  }, [token]);

  return (
    <AuthContext.Provider value={authValue}>
      <UserContext.Provider value={userValue}>{children}</UserContext.Provider>
    </AuthContext.Provider>
  );
};

export default AuthProvider;
