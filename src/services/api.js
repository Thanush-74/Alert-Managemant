// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5000/api",
// });

// // API.interceptors.request.use((config) => {
// //   const token =
// //     localStorage.getItem("adminToken") ||
// //     localStorage.getItem("branchToken") ||
// //     localStorage.getItem("customerToken");

// //   console.log("🔥 TOKEN:", token);

// //   if (token) {
// //     config.headers.Authorization = `Bearer ${token}`;
// //   }

// //   return config;
// // });

// API.interceptors.request.use((config) => {
//   const path = window.location.pathname;

//   let token = null;

//   if (path.startsWith("/admin")) {
//     token = localStorage.getItem("adminToken");
//   } else if (path.startsWith("/branch")) {
//     token = localStorage.getItem("branchToken");
//   } else {
//     token = localStorage.getItem("customerToken");
//   }

//   console.log("🔥 TOKEN:", token);

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

// export default API;

// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5000/api",
// });

// // ✅ REQUEST INTERCEPTOR (ONLY ONE)
// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token"); // ✅ SINGLE SOURCE

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

// // ✅ RESPONSE INTERCEPTOR (OPTIONAL BUT GOOD)
// API.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       // remove only token (not everything)
//       localStorage.removeItem("token");

//       const path = window.location.pathname;

//       if (path.includes("/admin")) {
//         window.location.href = "/admin-login";
//       } else if (path.includes("/branch")) {
//         window.location.href = "/branch-login";
//       } else {
//         window.location.href = "/customer-login";
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default API;








// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5000/api",
// });

// // ✅ Request interceptor - FIXED
// API.interceptors.request.use((config) => {
//   const token = sessionStorage.getItem("token"); // ✅ CHANGED from localStorage

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

// // ✅ Response interceptor

// API.interceptors.request.use((config) => {
//   const path = window.location.pathname;

//   let token = null;

//   if (path.includes("/admin")) {
//     token = sessionStorage.getItem("adminToken");
//   } else if (path.includes("/branch")) {
//     token = sessionStorage.getItem("branchToken");
//   } else {
//     token = sessionStorage.getItem("customerToken");
//   }

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

// export default API;



import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});


// ✅ REQUEST INTERCEPTOR
API.interceptors.request.use((config) => {
  const path = window.location.pathname;

  let token = null;

  if (path.startsWith("/admin")) {
    token = localStorage.getItem("adminToken");
  } else if (path.startsWith("/branch")) {
    token = localStorage.getItem("branchToken");
  } else {
    token = localStorage.getItem("customerToken");
  }

  console.log("🔥 TOKEN:", token);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


// ✅ RESPONSE INTERCEPTOR (VERY IMPORTANT)
API.interceptors.response.use(
  (response) => response,

  (error) => {
    const status = error.response?.status;

    if (status === 401 || status === 403) {
      console.log("❌ Unauthorized / Forbidden");

      const path = window.location.pathname;

      // 🔥 ADMIN
      if (path.startsWith("/admin")) {
        localStorage.removeItem("adminToken");
        window.location.href = "/admin-login";
      }

      // 🔥 BRANCH
      else if (path.startsWith("/branch")) {
        localStorage.removeItem("branchToken");
        window.location.href = "/branch-login";
      }

      // 🔥 CUSTOMER
      else {
        localStorage.removeItem("customerToken");
        window.location.href = "/customer-login";
      }
    }

    return Promise.reject(error);
  }
);

export default API;