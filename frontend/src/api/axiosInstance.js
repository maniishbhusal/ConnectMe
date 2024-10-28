import axios from "axios";
import { getStoredToken, removeStoredToken } from "./auth";

// base for axios api
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Add request interceptor to attach auth token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getStoredToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("error from interceptor", error);
    // Handle different error cases
    if (error.response?.status === 401) {
      // Clear token on auth error
      removeStoredToken();
      // You might want to redirect to login or trigger a global auth state update
    }
    if (error.response) {
      // Server responded with error status
      console.error("API Error:", error.response.data);
      throw error.response.data;
    } else if (error.request) {
      // Request was made but no response
      console.error("Network Error:", error.request);
      throw {
        succeeded: false,
        errors: [{ description: "Network error occurred" }],
      };
    } else {
      console.error("Error:", error.message);
      throw { succeeded: false, errors: [{ description: error.message }] };
    }
  }
);

export default axiosInstance;
