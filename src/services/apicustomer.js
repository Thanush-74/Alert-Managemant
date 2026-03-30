import axios from "axios";

const API_CUSTOMER = axios.create({
  baseURL: "http://localhost:5000/api",
});

API_CUSTOMER.interceptors.request.use((config) => {
  const token = localStorage.getItem("customerToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API_CUSTOMER;