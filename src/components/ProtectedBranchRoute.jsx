// // import { Navigate } from "react-router-dom";

// // function ProtectedBranchRoute({ children }) {

// //   const branch = JSON.parse(localStorage.getItem("branch"));

// // if (!branch) {
// //   localStorage.clear();
// //   return <Navigate to="/branch-login" replace />;
// // }

// //   return children;
// // }

// // export default ProtectedBranchRoute;


// import { Navigate } from "react-router-dom";

// // // function ProtectedBranchRoute({ children }) {
// // //   const token = localStorage.getItem("token");
// // //   const branch = localStorage.getItem("branch");

// // //   // If not logged in, redirect to login
// // //   if (!token || !branch) {
// // //     localStorage.clear(); // Clean up any partial data
// // //     return <Navigate to="/branch-login" replace />;
// // //   }

// // //   return children;
// // // }
// // // ✅ ADD ROLE CHECK


// // function ProtectedBranchRoute({ children }) {
// //   const token = localStorage.getItem("token");
// //   const branch = localStorage.getItem("branch");
// //   const user = JSON.parse(localStorage.getItem("branchUser") || "null");

// //   if (!token || !branch || !user || user.role !== "branch_user") {
// //     localStorage.clear();
// //     return <Navigate to="/branch-login" replace />;
// //   }

// //   return children;
// // }



// function ProtectedBranchRoute({ children }) {
//   const token = localStorage.getItem("token");
//   const branch = localStorage.getItem("branch");
//   const user = JSON.parse(localStorage.getItem("branchUser") || "null");

//   if (!token || !branch || !user) {
//     localStorage.clear();
//     return <Navigate to="/branch-login" replace />;
//   }

//   return children;
// }
// export default ProtectedBranchRoute;


// import { Navigate } from "react-router-dom";

// function ProtectedBranchRoute({ children }) {
//   const token = localStorage.getItem("token");
//   const branch = localStorage.getItem("branch");
//   const user = localStorage.getItem("branchUser");

//   // ❌ DON'T clear storage here
//   if (!token || !branch || !user) {
//     return <Navigate to="/branch-login" replace />;
//   }

//   return children;
// }

// export default ProtectedBranchRoute;


import { Navigate, useLocation } from "react-router-dom";

function ProtectedBranchRoute({ children }) {
  const token = localStorage.getItem("branchToken");
  const location = useLocation();

  if (!token) {
    return <Navigate to="/branch-login" state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedBranchRoute;