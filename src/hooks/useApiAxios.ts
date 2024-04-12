import apiAxios from "../utils/apiAxios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import refreshToken from "../utils/refreshToken";

const useApiAxios = () => {
    const { setToken } = useAuth();

    useEffect(() => {
        const responseInterceptor = apiAxios.interceptors.response.use(
            res => res,
            async (error) => {
                const originalRequest = error.config;
            
                if (error.response.status === 403 && !originalRequest._retry) {
                  originalRequest._retry = true;
                  const newToken = await refreshToken();
                  setToken(newToken);
                  originalRequest.headers.Authorization = `Bearer ${newToken}`;
                  apiAxios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
                  return apiAxios(originalRequest);
                }
                return Promise.reject(error);
              }
        );
        return () => {
            apiAxios.interceptors.response.eject(responseInterceptor);
        }
    }, [])

    return apiAxios;
}

export default useApiAxios;