// axiosClient.ts

import axios from "axios";

// Create an Axios instance with a base URL
const axiosClient = axios.create({
  baseURL: "http://localhost:8080", // Replace with your API's base URL
  headers: {
    "Content-Type": "application/json", // Set content type if needed
    // Add other global headers like Authorization here
    // "Authorization": `Bearer ${token}`,
  },
  timeout: 10000, // Optional: Set a timeout for requests (in ms)
});

// You can add request or response interceptors here if needed
axiosClient.interceptors.request.use(
  (config) => {
    // Modify the request before sending (e.g., adding token)
    // Example: config.headers['Authorization'] = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    return response; // Handle the response globally if needed
  },
  (error) => {
    return Promise.reject(error); // Handle errors globally if needed
  }
);

export default axiosClient;
