import axios from "axios";

 const apiClient =  axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/'
  timeout: 5000,
  headers: {
    "Content-type": "application/json",
  }
});

export default apiClient;