import React, { Suspense } from "react";
import { Navigate } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import ProtectedBranchRoute from "./components/ProtectedBranchRoute";

// Lazy loaded components
const EditUser = React.lazy(
  () => import("./pages/EditUsers")
);

const AdminProducts = React.lazy(
  () => import("./pages/AdminProducts")
);

const AdminProductsDetails = React.lazy(
  () => import("./pages/AdminProductsDetails")
);

const Home = React.lazy(
  () => import("./pages/Home")
);
const CustomerLogin = React.lazy(
  () => import("./pages/CustomerLogin")
);
const CustomerHome = React.lazy(
  () => import("./pages/CustomerHome")
);
const CustomerForm = React.lazy(
  () => import("./pages/Customerform")
);
const Cart = React.lazy(
  () => import("./pages/Cart")
);
const Checkout = React.lazy(
  () => import("./pages/Checkout")
);
const BranchLogin = React.lazy(
  () => import("./pages/Branchlogin")
);
const AdminLogin = React.lazy(
  () => import("./pages/Adminlogin")
);
const BranchLayout = React.lazy(
  () => import("./layout/BranchLayout")
);
const AdminLayout = React.lazy(
  () => import("./layout/AdminLayout")
);
const BranchOverview = React.lazy(
  () => import("./pages/BranchOverview")
);
const BranchDashboard = React.lazy(
  () => import("./pages/BranchDashboard")
);
const BranchUsers = React.lazy(
  () => import("./pages/BranchUsers")
);
const AdminDashboard = React.lazy(
  () => import("./pages/AdminDashboard")
);
const AdminBranches = React.lazy(
  () => import("./pages/AdminBranches")
);
const AdminAlerts = React.lazy(
  () => import("./pages/AdminAlerts")
);
const AdminUsers = React.lazy(
  () => import("./pages/AdminUsers")
);
const CreateUser = React.lazy(
  () => import("./pages/CreateUser")
);
const AdminUserView = React.lazy(
  () => import("./pages/AdminUserView")
);
const CreateBranch = React.lazy(
  () => import("./pages/CreateBranch")
);
const EditBranch = React.lazy(
  () => import("./pages/EditBranch")
);
const InchargeHistory = React.lazy(
  () => import("./pages/InchargeHistory")
);

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Suspense fallback={<h1>loading...</h1>}><Home /></Suspense>} />
      <Route path="/login" element={<Suspense fallback={<h1>loading...</h1>}><CustomerLogin /></Suspense>} />
      <Route path="/customer-home" element={<Suspense fallback={<h1>loading...</h1>}><CustomerHome /></Suspense>} />
      <Route path="/customer" element={<Suspense fallback={<h1>loading...</h1>}><CustomerForm /></Suspense>} />
      <Route path="/cart" element={<Suspense fallback={<h1>loading...</h1>}><Cart /></Suspense>} />
      <Route path="/checkout" element={<Suspense fallback={<h1>loading...</h1>}><Checkout /></Suspense>} />

      <Route path="/branch-login" element={<Suspense fallback={<h1>loading...</h1>}><BranchLogin /></Suspense>} />
      <Route path="/admin-login" element={<Suspense fallback={<h1>loading...</h1>}><AdminLogin /></Suspense>} />

      {/* Branch Layout */}
      <Route
        path="/branch"
        element={
          <ProtectedBranchRoute>
            <Suspense fallback={<h1>loading...</h1>}>
              <BranchLayout />
            </Suspense>
          </ProtectedBranchRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Suspense fallback={<h1>loading...</h1>}><BranchOverview /></Suspense>} />
        <Route path="alerts" element={<Suspense fallback={<h1>loading...</h1>}><BranchDashboard /></Suspense>} />
      </Route>

      {/* Admin Layout */}
      <Route
        path="/admin"
        element={
          <ProtectedAdminRoute>
            <Suspense fallback={<h1>loading...</h1>}>
              <AdminLayout />
            </Suspense>
          </ProtectedAdminRoute>
        }
      >
        <Route index element={<Suspense fallback={<h1>loading...</h1>}><AdminDashboard /></Suspense>} />
        <Route path="alerts" element={<Suspense fallback={<h1>loading...</h1>}><AdminAlerts /></Suspense>} />

        <Route path="branches" element={<Suspense fallback={<h1>loading...</h1>}><AdminBranches /></Suspense>} />
        <Route path="branches/create" element={<Suspense fallback={<h1>loading...</h1>}><CreateBranch /></Suspense>} />
        <Route path="branches/edit/:id" element={<Suspense fallback={<h1>loading...</h1>}><EditBranch /></Suspense>} />
        <Route path="branches/history/:id" element={<Suspense fallback={<h1>loading...</h1>}><InchargeHistory /></Suspense>} />

        {/* <Route path="users" element={<AdminUsers />} /> */}
        <Route path="customers" element={<Suspense fallback={<h1>loading...</h1>}><AdminUsers /></Suspense>} />

        {/* <Route path="users/create" element={<CreateUser />} /> */}
        <Route path="branch-users/create" element={<Suspense fallback={<h1>loading...</h1>}><CreateUser /></Suspense>} />

        <Route path="branch-users" element={<Suspense fallback={<h1>loading...</h1>}><BranchUsers /></Suspense>} />
        <Route path="users/:id" element={<Suspense fallback={<h1>loading...</h1>}><AdminUserView /></Suspense>} />


        {/* <Route path="users/edit/:id" element={<EditUser />} /> */}
        <Route path="users/edit/:id" element={<Suspense fallback ={<h1>loading...</h1>}><EditUser /></Suspense>} />

         {/* <Route path="products" element={<AdminProducts />} /> */}
        <Route path="products" element={<Suspense fallback={<h1>loading...</h1>}><AdminProducts /></Suspense>} />

        {/* <Route path="product-details" element={<AdminProductsDetails />} /> */}
        <Route path="product-details" element={<Suspense fallback={<h1>Loading...</h1>}><AdminProductsDetails /></Suspense>}/>
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Route>
    </Routes>
  );
}

export default App;
