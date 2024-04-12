import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import { CircularProgress } from "@mui/material";
import ServerErrorPage from "../pages/ServerErrorPage";

interface ProtectedRouteProps {
    children: React.ReactNode;
}
function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { isAuthenticated, loading, serverError } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        console.log(isAuthenticated, loading)
        if (!isAuthenticated && !loading && !serverError) {
            navigate("/", {replace: true});
            console.log("navigate")
        }
    }, [isAuthenticated, loading])
    if (loading) {
        return <CircularProgress />
    }
    if (serverError) {
        return <ServerErrorPage />
    }
    return children;
}

export default ProtectedRoute;