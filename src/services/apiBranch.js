import axios from "axios";

const API_BRANCH = axios.create({
  baseURL: "http://localhost:5000/api",
});

API_BRANCH.interceptors.request.use((config) => {
  const token = localStorage.getItem("branchToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
API_BRANCH.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err.response?.status;

    if (status === 401 || status === 403) {
      console.log("❌ Branch Unauthorized");

      localStorage.removeItem("branchToken");
      localStorage.removeItem("branch");
      localStorage.removeItem("branchUser");

      window.location.href = "/branch-login";
    }

    return Promise.reject(err);
  }
);

export default API_BRANCH;