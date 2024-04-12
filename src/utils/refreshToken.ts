import apiAxios from "./apiAxios";

const refreshToken = async () => {
    const response = await apiAxios.post("/auth/refresh", {
      refreshToken: localStorage.getItem("refreshToken"),
    });
    localStorage.setItem("token", response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);
    return response.data.accessToken;
};

export default refreshToken;