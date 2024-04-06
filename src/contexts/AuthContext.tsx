import { createContext } from "react";

interface AuthContextProps {
    token: string | null;
    setToken: (newToken: string | null) => void;
    isAuthenticated: boolean;
    loading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export default AuthContext;