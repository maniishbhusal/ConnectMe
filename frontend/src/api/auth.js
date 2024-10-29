import { jwtDecode } from "jwt-decode";
import axiosInstance from "./axiosInstance";

export const signUp = async (userData) => {
  try {
    // Format date to match DateOnly format (YYYY-MM-DD)
    const formattedData = {
      ...userData,
      dateOfBirth: userData.dateOfBirth.toISOString().split("T")[0],
    };
    const response = await axiosInstance.post("/signup", formattedData);
    console.log("response from axiosInstance", response);

    // If the API returns a token, store it
    if (response.data.token) {
      localStorage.setItem("authToken", response.data.token);
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const signIn = async (credentials) => {
  try {
    const response = await axiosInstance.post("/signin", credentials);

    // If the API returns a token, store it
    if (response.data.token) {
      localStorage.setItem("authToken", response.data.token);
      // Dispatch custom event
      window.dispatchEvent(new Event("authChange"));
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};

// functions for token management
export const getStoredToken = () => localStorage.getItem("authToken");
export const removeStoredToken = () => {
  localStorage.removeItem("authToken");
  // Dispatch custom event
  window.dispatchEvent(new Event("authChange"));
};
export const isAuthenticated = () => {
  const token = getStoredToken();

  if (!token) return false;

  try {
    const { exp } = jwtDecode(token); // Decode the token to get expiration time
    const isExpired = Date.now() >= exp * 1000; // Compare with the current time - we convert seconds to milliseconds by multiplying by 1000

    if (isExpired) {
      removeStoredToken(); // Remove the expired token
      return false;
    }

    return true; // Token is present and valid
  } catch (error) {
    // If decoding fails, consider the token invalid
    removeStoredToken();
    return false;
  }
};
