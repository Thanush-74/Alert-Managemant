// import { Navigate } from "react-router-dom";

// function ProtectedAdminRoute({ children }) {

//   const admin = JSON.parse(localStorage.getItem("admin"));

//   // if (!admin) {
//   //   return <Navigate to="/admin-login" replace />;
//   // }
//  const token = localStorage.getItem("token");

//   if (!token) {
//     return <Navigate to="/admin-login" replace />;
//   }

//   return children;


// // function ProtectedAdminRoute({ children }) {
// //   const token = localStorage.getItem("token");
// //   const admin = JSON.parse(localStorage.getItem("admin") || "null");

// //   if (!token || !admin || admin.role !== "admin") {
// //     localStorage.clear();
// //     return <Navigate to="/admin-login" replace />;
// //   }

// //   return children;

// }

// export default ProtectedAdminRoute;



// import { Navigate } from "react-router-dom";

// const ProtectedAdminRoute = ({ children }) => {
//   const token = localStorage.getItem("adminToken"); // ✅ IMPORTANT

//   if (!token) {
//     return <Navigate to="/admin-login" replace />;
//   }

//   return children;
// };

// export default ProtectedAdminRoute;

import { Navigate, useLocation } from "react-router-dom";

function ProtectedAdminRoute({ children }) {
  const token = localStorage.getItem("adminToken");
  const location = useLocation();

  if (!token) {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
}

export default ProtectedAdminRoute;