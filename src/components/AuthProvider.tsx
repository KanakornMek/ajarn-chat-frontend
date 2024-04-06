import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import AuthContext from "../contexts/AuthContext";

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            localStorage.setItem('token', token);
        } else {
            delete axios.defaults.headers.common['Authorization'];
            localStorage.removeItem('token');
        }
    }, [token]);

    useEffect(() => {
        const validateToken = async () => {
            try {
                if(token) {
                    const response = await axios.post('/api/auth/validate', { token });
                    if (response.data.valid){
                        setIsAuthenticated(true);
                    } else {
                        setToken(null);
                    }
                } else {
                    setIsAuthenticated(false);
                }
            } catch (err) {
                console.error("Error validating token", err);
            } finally {
                setLoading(false);
            }
        }
        validateToken();
    }, [token]);

    const authValue = useMemo(
        () => ({ 
            token,
            setToken,
            isAuthenticated,
            loading
        }),
        [token]
    )

    return (
        <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
    )
}


export default AuthProvider;