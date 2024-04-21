import { CircularProgress } from "@mui/material";
import LoginForm from "../components/LoginForm";
import useAuth from "../hooks/useAuth";
import logo from "../assets/thinc.png";

export default function Home() {
  const { loading } = useAuth();
  if (loading) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </div>
    );
  }
  return (
    <div className="home">
      <div className="home-left">
        <img src={logo} />
      </div>
      <LoginForm />
    </div>
  );
}
