import axios from "axios";
import { useAuthStore } from "@/store"; 

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true, // send cookies if needed
});

// Attach token from Zustand for every request
api.interceptors.request.use((config) => {
  // --- ADD THESE LINES ---
  const { token } = useAuthStore.getState();
  console.log("TOKEN FROM STORE:", token); 
  // -------------------------

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    // --- ADD THIS LINE ---
    console.error("NO TOKEN WAS FOUND IN ZUSTAND STORE!");
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;