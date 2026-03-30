
// // console.log("ADMIN PAGE LOADED");

// import React, { useEffect, useState } from "react";
// import socket from "../services/socket";
// import API from "../services/api";
// import { useNavigate } from "react-router-dom";
// import { Button } from "@mui/material";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// import { Paper, Typography, Box, Grid } from "@mui/material";

// import AccountTreeIcon from "@mui/icons-material/AccountTree";
// import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
// import HighlightOffIcon from "@mui/icons-material/HighlightOff";
// import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
// import DashboardIcon from "@mui/icons-material/Dashboard";

// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
//   LineChart,
//   Line,
//   CartesianGrid,
// } from "recharts";
// import { red } from "@mui/material/colors";

// const statCards = [
//   {
//     key: "totalBranches",
//     label: "TotalBranch",
//     icon: AccountTreeIcon,
//     color: "#6366f1",
//     bg: "#eef2ff",
//     iconBg: "#6366f1",
//     border: "#c7d2fe",
    
//   },
//   {
//     key: "activeBranches",
//     label: "Active",
//     icon: CheckCircleOutlineIcon,
//     color: "#16a34a",
//     bg: "#f0fdf4",
//     iconBg: "#22c55e",
//     border: "#bbf7d0",
//   },
//   {
//     key: "inactiveBranches",
//     label: "Inactive",
//     icon: HighlightOffIcon,
//     color: "#dc2626",
//     bg: "#fef2f2",
//     iconBg: "#ef4444",
//     border: "#fecaca",
    
//   },
//   {
//     key: "totalAlerts",
//     label: "Total Alerts",
//     icon: NotificationsActiveIcon,
//     color: "#d97706",
//     bg: "#fffbeb",
//     iconBg: "#f59e0b",
//     border: "#fde68a",
//     clickable: true,
//   },
// ];

// function AdminDashboard() {
//   const [summary, setSummary] = useState({
//     totalBranches: 0,
//     activeBranches: 0,
//     inactiveBranches: 0,
//     totalAlerts: 0,
//   });

//   const [alertChartData, setAlertChartData] = useState([]);

//   const navigate = useNavigate();
//   const admin = JSON.parse(localStorage.getItem("admin"));

//   useEffect(() => {
//   // 🔥 prevent back navigation
//   window.history.pushState(null, "", window.location.href);

//   const handleBack = () => {
//     window.history.pushState(null, "", window.location.href);
//   };

//   window.addEventListener("popstate", handleBack);

//   return () => {
//     window.removeEventListener("popstate", handleBack);
//   };
// }, []);

//   useEffect(() => {
//     if (admin) socket.emit("joinAdmin");
//   }, [admin]);

//   // Dashboard summary
//   useEffect(() => {
//     const fetchSummary = async () => {
//       const res = await API.get("/branches/dashboard-summary");
//       setSummary(res.data);
//     };

//     fetchSummary();
//   }, []);

//   // Weekly alert stats
//   useEffect(() => {
//     const fetchWeeklyStats = async () => {
//       try {
//         const res = await API.get("/alerts/weekly-stats");
//         setAlertChartData(res.data);
//       } catch (err) {
//         console.error("Weekly chart error:", err);
//       }
//     };

//     fetchWeeklyStats();
//   }, []);

//   // realtime alerts
//   useEffect(() => {
//     const handleNewAlert = () => {
//       setSummary((prev) => ({
//         ...prev,
//         totalAlerts: prev.totalAlerts + 1,
//       }));
//     };

//     socket.on("newAlert", handleNewAlert);

//     return () => socket.off("newAlert", handleNewAlert);
//   }, []);

//   const branchChartData = [
//     { name: "Active", value: summary.activeBranches },
//     { name: "Inactive", value: summary.inactiveBranches },
//   ];

//   const PIE_COLORS = ["#22c55e", "#ef4444"];

//   const chartPaper = {
//     p: 3,
//     borderRadius: "16px",
//     border: "1px solid #e2e8f0",
//     backgroundColor: "#ffffff",
//   };
// // console.log('alertChartData:', alertChartData);
// // console.log('Is Array?', Array.isArray(alertChartData));
// // console.log('Length:', alertChartData?.length);
// // console.log('First item:', alertChartData?.[0]);

//   return (
// <Box sx={{ minHeight: "100vh", background: "#f1f5f9", p: 2 }}>
// <Box 
//   sx={{
//     width: "100%",
//     // px: { xs: 2, md: 3, lg: 4 },
//   }}
// >
//     <Box
//       sx={{
//         display: "flex",
//         alignItems: "center",
//         gap: 2,
//         mb: 4,
//       }}
//     >
// <Button
//               variant="outlined"
//               startIcon={<ArrowBackIcon sx={{ fontSize: "1rem !important" }} />}
//               //  onClick={() => navigate("/admin-login")}
//               //  onClick={() => navigate("/admin-login", { replace: true })}
//               // onClick={() => {
// //   localStorage.removeItem("adminToken");
// //   window.location.replace("/admin-login");
// // }}
// onClick={() => navigate("/admin")} // stay same page
//               sx={{
//                 borderColor: "#cbd5e1",
//                 borderRadius: "10px",
//                 px: 2, py: 0.8,
//                 "&:hover": {
//                   borderColor: "#0ea5e9",
//                   color: "#0ea5e9",
//                   backgroundColor: "#f0f9ff",
//                 },
//               }}
//             >
//             </Button>
//  <DashboardIcon />
//       <Typography fontSize="1.1rem" fontWeight={700}> 
       
//          Dashboard 
//       </Typography>
//     </Box>

  


//         {/* Stat Cards */}

//         <Grid container spacing={1} mb={6} p={2} >
//           {statCards.map((card) => {
//             const Icon = card.icon;
//             const value = summary[card.key];

//             return (
//               <Grid item xs={12} sm={6} md={3} width="24%" key={card.key}>
//                 <Paper 
//                   onClick={
//                     card.clickable ? () => navigate("/admin/alerts") : undefined
//                   }
//                   sx={{
//                     p: 3,
//                     borderRadius: 3,
//                     background: card.bg,
//                     border: `1px solid ${card.border}`,
//                     cursor: card.clickable ? "pointer" : "default",
//                     // Width:"100%",
//                     // display:"flex"
//                   }}
//                 >
//                   <Box display="flex" justifyContent="space-between" alignItems="center">
//                     <Box width={92} >
//                       <Typography fontSize={12} color={card.col}>
//                         {card.label}
//                       </Typography>

//                       <Typography fontSize={23} fontWeight={700}>
//                         {value}
//                       </Typography>
//                     </Box>

//                     <Box
//                       sx={{                       
//                         width: 40,
//                         height: 40,
//                         borderRadius: 2,
//                         background: card.iconBg,
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         ml:1,
//                       }}
//                     >
//                       <Icon sx={{ color: "#fff" }} />
//                     </Box>
//                   </Box>
//                 </Paper>
//               </Grid>
//             );
//           })}
//         </Grid>

//         {/* Charts */}

//       <Grid container spacing={2} gap={2.8} background="red">
//   <Grid item xs={12} md={6} m={1.2} >
//     <Paper sx={{...chartPaper,width:"460px",mx:"auto"}}>
//       <Typography variant="h6" fontWeight={600} mb={2}>
//         Alerts Per Day
//       </Typography>

//       <ResponsiveContainer width="100%" height={280}>
//         <BarChart data={alertChartData}>
//           <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />

//           <XAxis
//             dataKey="day"
//             tick={{ fontSize: 12 }}
//             stroke="#6b7280"
//           />

//           <YAxis
//             tick={{ fontSize: 12 }}
//             stroke="#6b7280"
//           />

//           <Tooltip
//             contentStyle={{
//               backgroundColor: "#fff",
//               border: "1px solid #e5e7eb",
//               borderRadius: "8px",
//             }}
//           />

//           <Bar
//             dataKey="alerts"
//             fill="#6366f1"
//             radius={[8, 8, 0, 0]}
//             barSize={35}
//           />
//         </BarChart>
//       </ResponsiveContainer>
//     </Paper>
//   </Grid>

 
 

  
//   <Grid item xs={12} md={6}  m={1.2} >
//     <Paper sx={{...chartPaper,width:460,mx:"auto"}}>
//       <Typography variant="h6" fontWeight={600} mb={2}>
//         Alert Activity Trend
//       </Typography>

//       <ResponsiveContainer width="100%" height={280}>
//         <LineChart data={alertChartData}>
//           <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />

//           <XAxis
//             dataKey="day"
//             tick={{ fontSize: 12 }}
//             stroke="#6b7280"
//           />

//           <YAxis
//             tick={{ fontSize: 12 }}
//             stroke="#6b7280"
//           />

//           <Tooltip
//             contentStyle={{
//               backgroundColor: "#fff",
//               border: "1px solid #e5e7eb",
//               borderRadius: "8px",
//             }}
//           />

//           <Line
//             type="monotone"
//             dataKey="alerts"
//             stroke="#f59e0b"
//             strokeWidth={3}
//             dot={{ fill: "#f59e0b", r: 4 }}
//             activeDot={{ r: 6 }}
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     </Paper>
//   </Grid>

// </Grid>


   

// <Grid  container spacing={2} gap={2.8} background="red" >
//   <Grid item xs={12}  m={1.1}  >
//     <Paper sx={{...chartPaper ,width:460,mx:"auto"}} >
//       <Typography variant="h6" fontWeight={600} mb={2}>
//         Branch Status
//       </Typography>

//       <ResponsiveContainer width="100%" height={280}>
//         <PieChart>
//           <Pie
//             data={branchChartData}
//             dataKey="value"
//             nameKey="name"
//             cx="50%"
//             cy="50%"
//             outerRadius={100}
//             label={({ name, percent }) =>
//               `${name} ${(percent * 100).toFixed(0)}%`
//             }
//           >
//             {branchChartData.map((entry, index) => (
//               <Cell
//                 key={`cell-${index}`}
//                 fill={PIE_COLORS[index % PIE_COLORS.length]}
//               />
//             ))}
//           </Pie>

//           <Tooltip
//             contentStyle={{
//               backgroundColor: "#fff",
//               border: "1px solid #e5e7eb",
//               borderRadius: "8px",
//             }}
//           />
//         </PieChart>
//       </ResponsiveContainer>
//     </Paper>
//   </Grid>
  


//   {/* 4th Chart Example */}
//  <Grid item xs={12}  md={6} m={1.2} >
//     <Paper sx={{...chartPaper ,width:460,mx:"auto"}}>
//       <Typography variant="h6" fontWeight={600} mb={2}>
//         Alerts Overview
//       </Typography>

//       <ResponsiveContainer width="100%" height={280}>
//         <BarChart data={alertChartData}>
//           <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
//           <XAxis dataKey="day" />
//           <YAxis />
//           <Tooltip />
//           <Bar dataKey="alerts" fill="#22c55e" radius={[8,8,0,0]} />
//         </BarChart>
//       </ResponsiveContainer>
//     </Paper>

//   </Grid>
// </Grid>




// </Box>
//       </Box>
    
//   );
// }

// export default AdminDashboard;





// console.log("ADMIN PAGE LOADED");

import React, { useEffect, useState } from "react";
import socket from "../services/socket";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { Button, Skeleton } from "@mui/material"; // ✅ Skeleton added

import { Paper, Typography, Box, Grid } from "@mui/material";

import AccountTreeIcon from "@mui/icons-material/AccountTree";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";

const statCards = [
  {
    key: "totalBranches",
    label: "TotalBranch",
    icon: AccountTreeIcon,
    color: "#6366f1",
    bg: "#eef2ff",
    iconBg: "#6366f1",
    border: "#c7d2fe",
  },
  {
    key: "activeBranches",
    label: "Active",
    icon: CheckCircleOutlineIcon,
    color: "#16a34a",
    bg: "#f0fdf4",
    iconBg: "#22c55e",
    border: "#bbf7d0",
  },
  {
    key: "inactiveBranches",
    label: "Inactive",
    icon: HighlightOffIcon,
    color: "#dc2626",
    bg: "#fef2f2",
    iconBg: "#ef4444",
    border: "#fecaca",
  },
  {
    key: "totalAlerts",
    label: "Total Alerts",
    icon: NotificationsActiveIcon,
    color: "#d97706",
    bg: "#fffbeb",
    iconBg: "#f59e0b",
    border: "#fde68a",
    clickable: true,
  },
];

function AdminDashboard() {
  const [summary, setSummary] = useState({
    totalBranches: 0,
    activeBranches: 0,
    inactiveBranches: 0,
    totalAlerts: 0,
  });

  const [alertChartData, setAlertChartData] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ ADDED

  const navigate = useNavigate();
  const admin = JSON.parse(localStorage.getItem("admin"));

  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    const handleBack = () => {
      window.history.pushState(null, "", window.location.href);
    };
    window.addEventListener("popstate", handleBack);
    return () => {
      window.removeEventListener("popstate", handleBack);
    };
  }, []);

  useEffect(() => {
    if (admin) socket.emit("joinAdmin");
  }, [admin]);

  // Dashboard summary
  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await API.get("/branches/dashboard-summary");

        // ✅ delay so skeleton is visible
        setTimeout(() => {
          setSummary(res.data);
          setLoading(false);
        }, 2000);

      } catch (err) {
        console.error(err);
        setLoading(false); // ✅ hide skeleton on error
      }
    };
    fetchSummary();
  }, []);

  // Weekly alert stats
  useEffect(() => {
    const fetchWeeklyStats = async () => {
      try {
        const res = await API.get("/alerts/weekly-stats");
        setAlertChartData(res.data);
      } catch (err) {
        console.error("Weekly chart error:", err);
      }
    };
    fetchWeeklyStats();
  }, []);

  // realtime alerts
  useEffect(() => {
    const handleNewAlert = () => {
      setSummary((prev) => ({
        ...prev,
        totalAlerts: prev.totalAlerts + 1,
      }));
    };
    socket.on("newAlert", handleNewAlert);
    return () => socket.off("newAlert", handleNewAlert);
  }, []);

  const branchChartData = [
    { name: "Active", value: summary.activeBranches },
    { name: "Inactive", value: summary.inactiveBranches },
  ];

  const PIE_COLORS = ["#22c55e", "#ef4444"];

  const chartPaper = {
    p: 3,
    borderRadius: "16px",
    border: "1px solid #e2e8f0",
    backgroundColor: "#ffffff",
  };

  return (
    <Box sx={{ minHeight: "100vh", background: "#f1f5f9", p: 2 }}>
      <Box sx={{ width: "100%" }}>

        {/* Header */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon sx={{ fontSize: "1rem !important" }} />}
            onClick={() => navigate("/admin")}
            sx={{
              borderColor: "#cbd5e1",
              borderRadius: "10px",
              px: 2, py: 0.8,
              "&:hover": {
                borderColor: "#0ea5e9",
                color: "#0ea5e9",
                backgroundColor: "#f0f9ff",
              },
            }}
          >
          </Button>
          <DashboardIcon />
          <Typography fontSize="1.1rem" fontWeight={700}>
            Dashboard
          </Typography>
        </Box>

        {/* ── STAT CARDS ── */}
        <Grid container spacing={1} mb={6} p={2}>
          {statCards.map((card) => {
            const Icon = card.icon;
            const value = summary[card.key];

            return (
              <Grid item xs={12} sm={6} md={3} width="24%" key={card.key}>
                <Paper
                  onClick={card.clickable ? () => navigate("/admin/alerts") : undefined}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    background: card.bg,
                    border: `1px solid ${card.border}`,
                    cursor: card.clickable ? "pointer" : "default",
                  }}
                >
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box width={92}>
                      <Typography fontSize={12} color={card.col}>
                        {card.label}
                      </Typography>

                      {/* ✅ Skeleton for number value */}
                      {loading ? (
                        <Skeleton width={60} height={36} sx={{ mt: 0.5 }} />
                      ) : (
                        <Typography fontSize={23} fontWeight={700}>
                          {value}
                        </Typography>
                      )}
                    </Box>

                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: 2,
                        background: card.iconBg,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        ml: 1,
                      }}
                    >
                      <Icon sx={{ color: "#fff" }} />
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            );
          })}
        </Grid>

        {/* ── CHARTS ROW 1 ── */}
        <Grid container spacing={2} gap={2.8}>

          {/* Alerts Per Day */}
          <Grid item xs={12} md={6} m={1.2}>
            <Paper sx={{ ...chartPaper, width: "460px", mx: "auto" }}>
              <Typography variant="h6" fontWeight={600} mb={2}>
                Alerts Per Day
              </Typography>

              {/* ✅ Skeleton for chart */}
              {loading ? (
                <Box>
                  <Box sx={{ display: "flex", alignItems: "flex-end", gap: 1, height: 280, px: 1 }}>
                    {Array.from({ length: 7 }).map((_, i) => (
                      <Skeleton
                        key={i}
                        variant="rounded"
                        width={35}
                        height={[80, 140, 100, 180, 120, 160, 90][i]}
                        sx={{ borderRadius: "8px 8px 0 0", flex: 1 }}
                      />
                    ))}
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "space-around", mt: 1 }}>
                    {Array.from({ length: 7 }).map((_, i) => (
                      <Skeleton key={i} width={28} height={14} />
                    ))}
                  </Box>
                </Box>
              ) : (
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={alertChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="#6b7280" />
                    <YAxis tick={{ fontSize: 12 }} stroke="#6b7280" />
                    <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px" }} />
                    <Bar dataKey="alerts" fill="#6366f1" radius={[8, 8, 0, 0]} barSize={35} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </Paper>
          </Grid>

          {/* Alert Activity Trend */}
          <Grid item xs={12} md={6} m={1.2}>
            <Paper sx={{ ...chartPaper, width: 460, mx: "auto" }}>
              <Typography variant="h6" fontWeight={600} mb={2}>
                Alert Activity Trend
              </Typography>

              {/* ✅ Skeleton for line chart */}
              {loading ? (
                <Box>
                  <Skeleton variant="rounded" width="100%" height={240} sx={{ borderRadius: "10px" }} />
                  <Box sx={{ display: "flex", justifyContent: "space-around", mt: 1 }}>
                    {Array.from({ length: 7 }).map((_, i) => (
                      <Skeleton key={i} width={28} height={14} />
                    ))}
                  </Box>
                </Box>
              ) : (
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={alertChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="#6b7280" />
                    <YAxis tick={{ fontSize: 12 }} stroke="#6b7280" />
                    <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px" }} />
                    <Line type="monotone" dataKey="alerts" stroke="#f59e0b" strokeWidth={3} dot={{ fill: "#f59e0b", r: 4 }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </Paper>
          </Grid>
        </Grid>

        {/* ── CHARTS ROW 2 ── */}
        <Grid container spacing={2} gap={2.8}>

          {/* Branch Status Pie */}
          <Grid item xs={12} m={1.1}>
            <Paper sx={{ ...chartPaper, width: 460, mx: "auto" }}>
              <Typography variant="h6" fontWeight={600} mb={2}>
                Branch Status
              </Typography>

              {/* ✅ Skeleton for pie chart */}
              {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: 280 }}>
                  <Skeleton variant="circular" width={200} height={200} />
                </Box>
              ) : (
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie
                      data={branchChartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {branchChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px" }} />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </Paper>
          </Grid>

          {/* Alerts Overview */}
          <Grid item xs={12} md={6} m={1.2}>
            <Paper sx={{ ...chartPaper, width: 460, mx: "auto" }}>
              <Typography variant="h6" fontWeight={600} mb={2}>
                Alerts Overview
              </Typography>

              {/* ✅ Skeleton for bar chart */}
              {loading ? (
                <Box>
                  <Box sx={{ display: "flex", alignItems: "flex-end", gap: 1, height: 280, px: 1 }}>
                    {Array.from({ length: 7 }).map((_, i) => (
                      <Skeleton
                        key={i}
                        variant="rounded"
                        width={35}
                        height={[60, 160, 110, 200, 90, 140, 75][i]}
                        sx={{ borderRadius: "8px 8px 0 0", flex: 1 }}
                      />
                    ))}
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "space-around", mt: 1 }}>
                    {Array.from({ length: 7 }).map((_, i) => (
                      <Skeleton key={i} width={28} height={14} />
                    ))}
                  </Box>
                </Box>
              ) : (
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={alertChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="alerts" fill="#22c55e" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </Paper>
          </Grid>

        </Grid>

      </Box>
    </Box>
  );
}

export default AdminDashboard;












































































