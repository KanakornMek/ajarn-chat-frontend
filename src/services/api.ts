import apiAxios from "../utils/apiAxios";

export const loginUser = async (credentials: {email: string | undefined, id: string | undefined, password: string}, setToken: (newToken: string | null) => void) => {
  const token = await apiAxios.post('/auth/login', credentials); 
  apiAxios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  setToken(token.data.accessToken);
  localStorage.setItem("refreshToken", token.data.refreshToken);
};