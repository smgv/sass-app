import axios from "axios";
import { getItemInLocalStorage } from "@/utils/storage";

const { VITE_APP_API_BASE_URL } = import.meta.env as Record<string, string>;

console.log(VITE_APP_API_BASE_URL, "API URL");

// Create an instance of Axios with default configurations
const axiosInstance = axios.create({
  baseURL: VITE_APP_API_BASE_URL as string,
  // timeout: 10000,
});

// Add an interceptor to attach the bearer token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    // Get the token from your authentication system
    const token = getItemInLocalStorage("TOKEN");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
