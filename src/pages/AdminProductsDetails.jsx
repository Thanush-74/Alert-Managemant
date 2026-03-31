import {
  Box,
  Button,
  Paper,
  Typography,
  Card,
  Chip,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Skeleton,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import FilterListIcon from "@mui/icons-material/FilterList";
import RefreshIcon from "@mui/icons-material/Refresh";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import ProductSkeleton from "../components/SkeletonLoader";
const AdminProductDetails = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [customer, setCustomer] = useState("");
  const [status, setStatus] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchOrders = () => {
    setLoading(true);
    let url = "http://localhost:5000/api/orders/order-details?";
    if (customer) url += `customer=${customer}&`;
    if (status) url += `status=${status}&`;
    if (fromDate && toDate) url += `fromDate=${fromDate}&toDate=${toDate}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const grouped = {};
        data.forEach((item) => {
          const price = Number(item.price);
          if (!grouped[item.order_id]) {
            grouped[item.order_id] = {
              order_id: item.order_id,
              customer: item.customer_name,
              status: item.status,
              created_at: item.created_at,
              items: [],
              total: 0,
            };
          }
          const itemTotal = price * item.quantity;
          grouped[item.order_id].items.push({
            product_name: item.product_name,
            quantity: item.quantity,
            price: price,
            total: itemTotal,
          });
          grouped[item.order_id].total += itemTotal;
        });
        const finalData = Object.values(grouped);
        setTimeout(() => {
          setOrders(finalData);
          setFilteredOrders(finalData);
          setLoading(false);
        }, 800);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleApplyFilters = () => fetchOrders();

  const handleReset = () => {
    setCustomer("");
    setStatus("");
    setFromDate("");
    setToDate("");
    setFilteredOrders(orders);
  };

  const totalOrders = orders.length;
  const completedOrders = orders.filter((o) => o.status === "completed").length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  const stats = [
    {
      label: "Total Orders",
      value: totalOrders,
      icon: <ShoppingBagIcon />,
      color: "#6366f1",
      bg: "#eef2ff",
    },
    {
      label: "Completed",
      value: completedOrders,
      icon: <TaskAltIcon />,
      color: "#10b981",
      bg: "#ecfdf5",
    },
    {
      label: "Revenue",
      value: `₹${totalRevenue.toLocaleString()}`,
      icon: <TrendingUpIcon />,
      color: "#f59e0b",
      bg: "#fffbeb",
    },
  ];

  const inputSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
      fontFamily: "'DM Sans', sans-serif",
      fontSize: "0.875rem",
      background: "#f8fafc",
      "& fieldset": { borderColor: "#e2e8f0" },
      "&:hover fieldset": { borderColor: "#cbd5e1" },
      "&.Mui-focused fieldset": { borderColor: "#6366f1" },
    },
    "& .MuiInputLabel-root": {
      fontFamily: "'DM Sans', sans-serif",
      fontSize: "0.875rem",
      "&.Mui-focused": { color: "#6366f1" },
    },
  };

  const completedChipSx = {
    borderRadius: "8px",
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 600,
    fontSize: "0.75rem",
    px: 0.5,
    background: "#ecfdf5",
    color: "#059669",
    border: "1px solid #a7f3d0",
    "& .MuiChip-icon": { color: "#10b981", fontSize: 15 },
  };

  const pendingChipSx = {
    borderRadius: "8px",
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 600,
    fontSize: "0.75rem",
    px: 0.5,
    background: "#fffbeb",
    color: "#d97706",
    border: "1px solid #fde68a",
    "& .MuiChip-icon": { color: "#f59e0b", fontSize: 15 },
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&family=DM+Mono&display=swap"
        rel="stylesheet"
      />
      <Box
        sx={{
          minHeight: "100vh",
          background: "#f8fafc",
          padding: "32px",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {/* Back */}
        <Button
          startIcon={<ArrowBackIcon sx={{ fontSize: "16px !important" }} />}
          onClick={() => navigate("/admin")}
          disableRipple
          sx={{
            color: "#64748b",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 500,
            fontSize: "0.85rem",
            textTransform: "none",
            letterSpacing: 0,
            mb: 3,
            px: 0,
            "&:hover": { background: "transparent", color: "#1e293b" },
          }}
        >
          Back to Dashboard
        </Button>

        {/* Title */}
        <Typography
          sx={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: "1.75rem",
            color: "#0f172a",
            letterSpacing: "-0.5px",
            mb: 0.5,
          }}
        >
          Order Details
        </Typography>
        <Typography
          sx={{
            fontFamily: "'DM Sans', sans-serif",
            color: "#94a3b8",
            fontSize: "0.875rem",
            mb: 4,
          }}
        >
          Manage and track all customer orders
        </Typography>

        {/* Stats */}
        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          {stats.map((stat, i) => (
            <Card
              key={i}
              elevation={0}
              sx={{
                borderRadius: "16px",
                p: 2.5,
                flex: 1,
                display: "flex",
                alignItems: "center",
                gap: 2,
                background: "#fff",
                border: "1px solid #e2e8f0",
                transition: "transform 0.15s ease, box-shadow 0.15s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                },
              }}
            >
              {loading && <ProductSkeleton />}
              {/* {loading ? (
                <>
                  <Skeleton
                    variant="rounded"
                    width={44}
                    height={44}
                    sx={{ borderRadius: "12px", flexShrink: 0 }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Skeleton width="40%" height={14} sx={{ mb: 0.5 }} />
                    <Skeleton width="60%" height={22} />
                  </Box>
                </>
              ) : (
                <>
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: "12px",
                      background: stat.bg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: stat.color,
                      flexShrink: 0,
                      "& svg": { fontSize: 22 },
                    }}
                  >
                    {stat.icon}
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.72rem",
                        fontWeight: 600,
                        color: "#94a3b8",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    >
                      {stat.label}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "'Syne', sans-serif",
                        fontWeight: 700,
                        fontSize: "1.4rem",
                        color: "#0f172a",
                        lineHeight: 1.2,
                      }}
                    >
                      {stat.value}
                    </Typography>
                  </Box>
                </>
              )} */}
            </Card>
          ))}
        </Box>

        {/* Filters */}
        <Paper
          elevation={0}
          sx={{
            borderRadius: "16px",
            p: 2.5,
            mb: 3,
            background: "#fff",
            border: "1px solid #e2e8f0",
          }}
        >
          <Typography
            sx={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
              fontSize: "0.8rem",
              color: "#475569",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              display: "flex",
              alignItems: "center",
              gap: 0.75,
              mb: 2,
            }}
          >
            <FilterListIcon sx={{ fontSize: 16 }} />
            Filter
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <TextField
              placeholder="Search customer..."
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
              size="small"
              sx={{ ...inputSx, minWidth: 180 }}
            />

            <FormControl size="small" sx={{ ...inputSx, minWidth: 140 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                label="Status"
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
              </Select>
            </FormControl>

            <TextField
              type="date"
              label="From"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              size="small"
              InputLabelProps={{ shrink: true }}
              sx={{ ...inputSx, width: 150 }}
            />

            <TextField
              type="date"
              label="To"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              size="small"
              InputLabelProps={{ shrink: true }}
              sx={{ ...inputSx, width: 150 }}
            />

            <Box sx={{ display: "flex", gap: 1.5, ml: "auto" }}>
              <Button
                onClick={handleReset}
                startIcon={<RefreshIcon sx={{ fontSize: "15px !important" }} />}
                sx={{
                  borderRadius: "10px",
                  color: "#64748b",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  textTransform: "none",
                  px: 2.5,
                  py: 1,
                  border: "1px solid #e2e8f0",
                  background: "#fff",
                  "&:hover": { background: "#f1f5f9", borderColor: "#cbd5e1" },
                }}
              >
                Reset
              </Button>
              <Button
                onClick={handleApplyFilters}
                disabled={loading}
                sx={{
                  borderRadius: "10px",
                  background: "#6366f1",
                  color: "#fff",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  textTransform: "none",
                  px: 3,
                  py: 1,
                  boxShadow: "none",
                  "&:hover": {
                    background: "#4f46e5",
                    boxShadow: "0 4px 12px rgba(99,102,241,0.3)",
                  },
                  "&:disabled": { background: "#c7d2fe", color: "#fff" },
                }}
              >
                {loading ? "Loading..." : "Apply Filters"}
              </Button>
            </Box>
          </Box>
        </Paper>

        {/* Orders */}
        {loading ? (
          [...Array(3)].map((_, i) => (
            <Card
              key={i}
              elevation={0}
              sx={{
                borderRadius: "16px",
                p: 2.5,
                mb: 2,
                background: "#fff",
                border: "1px solid #e2e8f0",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 2,
                }}
              >
                <Box>
                  <Skeleton width={100} height={20} />
                  <Skeleton width={140} height={16} sx={{ mt: 0.5 }} />
                </Box>
                <Skeleton
                  variant="rounded"
                  width={80}
                  height={26}
                  sx={{ borderRadius: "8px" }}
                />
              </Box>
              {[...Array(2)].map((_, j) => (
                <Box key={j} sx={{ display: "flex", gap: 2, mb: 1 }}>
                  <Skeleton width="40%" height={16} />
                  <Skeleton width="15%" height={16} />
                  <Skeleton width="15%" height={16} />
                  <Skeleton width="15%" height={16} />
                </Box>
              ))}
              <Skeleton width="30%" height={20} sx={{ mt: 1, ml: "auto" }} />
            </Card>
          ))
        ) : filteredOrders.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography
              sx={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "1.1rem",
                color: "#94a3b8",
              }}
            >
              No orders found
            </Typography>
            <Typography
              sx={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.85rem",
                color: "#cbd5e1",
                mt: 0.5,
              }}
            >
              Try adjusting your filters
            </Typography>
          </Box>
        ) : (
          filteredOrders.map((order) => (
            <Card
              key={order.order_id}
              elevation={0}
              sx={{
                borderRadius: "16px",
                mb: 2,
                background: "#fff",
                border: "1px solid #e2e8f0",
                overflow: "hidden",
                transition: "box-shadow 0.15s ease",
                "&:hover": { boxShadow: "0 4px 20px rgba(0,0,0,0.06)" },
              }}
            >
              {/* Order Header */}
              <Box
                sx={{
                  px: 3,
                  py: 2,
                  borderBottom: "1px solid #f1f5f9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: "#fafbfc",
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      fontFamily: "'Syne', sans-serif",
                      fontWeight: 700,
                      fontSize: "0.95rem",
                      color: "#0f172a",
                    }}
                  >
                    Order #{order.order_id}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.82rem",
                      color: "#64748b",
                      mt: 0.25,
                    }}
                  >
                    {order.customer}
                  </Typography>
                </Box>
                <Chip
                  icon={
                    order.status === "completed" ? (
                      <CheckCircleIcon />
                    ) : (
                      <PendingActionsIcon />
                    )
                  }
                  label={order.status === "completed" ? "Completed" : "Pending"}
                  size="small"
                  sx={
                    order.status === "completed" ? completedChipSx : pendingChipSx
                  }
                />
              </Box>

              {/* Column Headers */}
              <Box
                sx={{
                  display: "flex",
                  px: 3,
                  py: 1,
                  background: "#f1f5f9",
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                {["Product", "Qty", "Unit Price", "Subtotal"].map((col, i) => (
                  <Typography
                    key={col}
                    sx={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      color: "#94a3b8",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      flex: i === 0 ? 2 : 1,
                      textAlign: i === 0 ? "left" : i === 1 ? "center" : "right",
                    }}
                  >
                    {col}
                  </Typography>
                ))}
              </Box>

              {/* Items */}
              {order.items.map((item, i) => (
                <Box
                  key={i}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    px: 3,
                    py: 1.25,
                    borderBottom:
                      i < order.items.length - 1
                        ? "1px solid #f8fafc"
                        : "none",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.875rem",
                      color: "#334155",
                      fontWeight: 500,
                      flex: 2,
                    }}
                  >
                    {item.product_name}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "0.8rem",
                      color: "#94a3b8",
                      flex: 1,
                      textAlign: "center",
                    }}
                  >
                    ×{item.quantity}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "0.82rem",
                      color: "#64748b",
                      flex: 1,
                      textAlign: "right",
                    }}
                  >
                    ₹{item.price.toFixed(2)}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "0.85rem",
                      color: "#1e293b",
                      fontWeight: 600,
                      flex: 1,
                      textAlign: "right",
                    }}
                  >
                    ₹{item.total.toLocaleString()}
                  </Typography>
                </Box>
              ))}

              {/* Footer Total */}
              <Box
                sx={{
                  px: 3,
                  py: 2,
                  background: "#f8fafc",
                  borderTop: "1px solid #e2e8f0",
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  gap: 1.5,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.82rem",
                    color: "#64748b",
                    fontWeight: 500,
                  }}
                >
                  Order Total
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: "1.1rem",
                    color: "#0f172a",
                    fontWeight: 700,
                  }}
                >
                  ₹{order.total.toLocaleString()}
                </Typography>
              </Box>
            </Card>
          ))
        )}
      </Box>
    </>
  );
};

export default AdminProductDetails;


// import {
//   Box,
//   Button,
//   Paper,
//   Typography,
//   Card,
//   Chip,
//   TextField,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Skeleton,
// } from "@mui/material";

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import PendingActionsIcon from "@mui/icons-material/PendingActions";

// const AdminProductDetails = () => {
//   const navigate = useNavigate();

//   const [orders, setOrders] = useState([]);
//   const [filteredOrders, setFilteredOrders] = useState([]);
//   const [customer, setCustomer] = useState("");
//   const [status, setStatus] = useState("");
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");
//   const [loading, setLoading] = useState(true); // ✅ start true

//   const fetchOrders = () => {
//     setLoading(true);

//     let url = "http://localhost:5000/api/orders/order-details?";

//     if (customer) url += `customer=${customer}&`;
//     if (status) url += `status=${status}&`;
//     if (fromDate && toDate)
//       url += `fromDate=${fromDate}&toDate=${toDate}`;

//     fetch(url)
//       .then((res) => res.json())
//       .then((data) => {
//         const grouped = {};

//         data.forEach((item) => {
//           const price = Number(item.price);

//           if (!grouped[item.order_id]) {
//             grouped[item.order_id] = {
//               order_id: item.order_id,
//               customer: item.customer_name,
//               status: item.status,
//               created_at: item.created_at,
//               items: [],
//               total: 0,
//             };
//           }

//           const itemTotal = price * item.quantity;

//           grouped[item.order_id].items.push({
//             product_name: item.product_name,
//             quantity: item.quantity,
//             price: price,
//             total: itemTotal,
//           });

//           grouped[item.order_id].total += itemTotal;
//         });

//         const finalData = Object.values(grouped);

//         // ⏳ small delay to SEE skeleton (optional)
//         setTimeout(() => {
//           setOrders(finalData);
//           setFilteredOrders(finalData);
//           setLoading(false);
//         }, 800);
//       })
//       .catch((err) => {
//         console.error(err);
//         setLoading(false);
//       });
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const handleApplyFilters = () => {
//     fetchOrders();
//   };

//   const handleReset = () => {
//     setCustomer("");
//     setStatus("");
//     setFromDate("");
//     setToDate("");
//     setFilteredOrders(orders);
//   };

//   const totalOrders = orders.length;
//   const completedOrders = orders.filter(
//     (o) => o.status === "completed"
//   ).length;
//   const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

//   const getStatusIcon = (status) =>
//     status === "completed" ? (
//       <CheckCircleIcon sx={{ fontSize: 20, color: "#10b981" }} />
//     ) : (
//       <PendingActionsIcon sx={{ fontSize: 20, color: "#f59e0b" }} />
//     );

//   return (
//     <Box sx={{ padding: "24px" }}>
//       {/* Header */}
//       <Button
//         startIcon={<ArrowBackIcon />}
//         onClick={() => navigate("/admin")}
//       >
//         Back
//       </Button>

//       <Typography variant="h5" sx={{ mb: 2 }}>
//         📦 Product Details
//       </Typography>

//       {/* Stats */}
//       <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
//         {[1, 2, 3].map((i) => (
//           <Card key={i} sx={{ p: 2, width: 150 }}>
//             {loading ? (
//               <>
//                 <Skeleton width="80%" />
//                 <Skeleton width="60%" />
//               </>
//             ) : (
//               <>
//                 <Typography>
//                   {i === 1
//                     ? "Total Orders"
//                     : i === 2
//                     ? "Completed"
//                     : "Revenue"}
//                 </Typography>
//                 <Typography>
//                   {i === 1
//                     ? totalOrders
//                     : i === 2
//                     ? completedOrders
//                     : `₹${totalRevenue.toLocaleString()}`}
//                 </Typography>
//               </>
//             )}
//           </Card>
//         ))}
//       </Box>

//       {/* Filters */}
//       <Paper sx={{ p: 2, mb: 3 }}>
//         <Box sx={{ display: "flex", gap: 2 }}>
//           <TextField
//             placeholder="Customer"
//             value={customer}
//             onChange={(e) => setCustomer(e.target.value)}
//             size="small"
//           />

//           <FormControl size="small">
//             <InputLabel>Status</InputLabel>
//             <Select
//               value={status}
//               onChange={(e) => setStatus(e.target.value)}
//               label="Status"
//             >
//               <MenuItem value="">All</MenuItem>
//               <MenuItem value="pending">Pending</MenuItem>
//               <MenuItem value="completed">Completed</MenuItem>
//             </Select>
//           </FormControl>

//           <Button onClick={handleApplyFilters} disabled={loading}>
//             {loading ? "Loading..." : "Apply"}
//           </Button>

//           <Button onClick={handleReset}>Reset</Button>
//         </Box>
//       </Paper>

//       {/* Orders */}
//       {loading ? (
//         [...Array(3)].map((_, i) => (
//           <Card key={i} sx={{ mb: 2, p: 2 }}>
//             <Skeleton width="40%" height={30} />
//             <Skeleton width="60%" />
//             <Skeleton width="30%" />

//             {[...Array(2)].map((_, j) => (
//               <Box key={j} sx={{ display: "flex", gap: 2, mt: 1 }}>
//                 <Skeleton width="30%" />
//                 <Skeleton width="20%" />
//                 <Skeleton width="20%" />
//               </Box>
//             ))}

//             <Skeleton width="50%" sx={{ mt: 1 }} />
//           </Card>
//         ))
//       ) : (
//         filteredOrders.map((order) => (
//           <Card key={order.order_id} sx={{ mb: 2, p: 2 }}>
//             <Typography>Order #{order.order_id}</Typography>
//             <Typography>{order.customer}</Typography>

//             <Chip
//               icon={getStatusIcon(order.status)}
//               label={order.status}
//             />

//             {order.items.map((item, i) => (
//               <Box
//                 key={i}
//                 sx={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   mt: 1,
//                 }}
//               >
//                 <Typography>
//                   {item.product_name} (x{item.quantity})
//                 </Typography>

//                 <Typography>
//                   ₹{item.price.toFixed(2)}
//                 </Typography>

//                 <Typography>
//                   ₹{item.total.toLocaleString()}
//                 </Typography>
//               </Box>
//             ))}

//             <Typography sx={{ mt: 1, fontWeight: "bold" }}>
//               Total: ₹{order.total.toLocaleString()}
//             </Typography>
//           </Card>
//         ))
//       )}
//     </Box>
//   );
// };

// export default AdminProductDetails;