import axios from 'axios';
import refreshToken from './refreshToken';

const apiAxios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  // baseURL: "http://localhost:3000",
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newToken = await refreshToken();
      originalRequest.headers.Authorization = `Bearer ${newToken}`;
      apiAxios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
      return apiAxios(originalRequest);
    }
    return Promise.reject(error);
  }
);




export default apiAxios;
