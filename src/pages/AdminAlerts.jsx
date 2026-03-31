import React, { useEffect, useState } from "react";
import socket from "../services/socket";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import {
  Button,
  Paper,
  Typography,
  Stack,
  Box,
  TextField,
  Pagination,
  InputAdornment,
  Chip,
  Skeleton,
} from "@mui/material";

function AdminAlerts() {
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [page, setPage] = useState(1);
  const alertsPerPage = 5;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlerts = async () => {
      const res = await API.get("/alerts/admin");
      setTimeout(() => {
        setAlerts(res.data);
        setLoading(false);
      }, 2000);
    };
    fetchAlerts();
  }, []);

  useEffect(() => {
    socket.on("newAlert", (alert) => {
      setAlerts((prev) => [alert, ...prev]);
    });
    return () => socket.off("newAlert");
  }, []);

  const filteredAlerts = selectedDate
    ? alerts.filter((alert) => {
        const alertDate = new Date(alert.created_at)
          .toISOString()
          .split("T")[0];
        return alertDate === selectedDate;
      })
    : alerts;

  const startIndex = (page - 1) * alertsPerPage;
  const paginatedAlerts = filteredAlerts.slice(
    startIndex,
    startIndex + alertsPerPage,
  );
  const totalPages = Math.ceil(filteredAlerts.length / alertsPerPage);
console.log("practice level good");
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

        @keyframes slideIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .alert-card {
          animation: slideIn 0.25s ease forwards;
        }

        .alert-card:nth-child(1) { animation-delay: 0.04s; }
        .alert-card:nth-child(2) { animation-delay: 0.08s; }
        .alert-card:nth-child(3) { animation-delay: 0.12s; }
        .alert-card:nth-child(4) { animation-delay: 0.16s; }
        .alert-card:nth-child(5) { animation-delay: 0.20s; }
      `}</style>

      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#f1f5f9",
          p: { xs: 2, md: 4 },
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <Box sx={{ maxWidth: 820, mx: "auto" }}>
          {/* HEADER */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 4,
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <Button
                variant="outlined"
                startIcon={
                  <ArrowBackIcon sx={{ fontSize: "1rem !important" }} />
                }
                onClick={() => navigate("/admin")}
                sx={{
                  borderColor: "#cbd5e1",
                  color: "#64748b",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: "0.8rem",
                  textTransform: "none",
                  borderRadius: "10px",
                  px: 2,
                  py: 0.8,
                  "&:hover": {
                    borderColor: "#ef4444",
                    color: "#ef4444",
                    backgroundColor: "#fef2f2",
                  },
                }}
              ></Button>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "12px",
                    backgroundColor: "#ef4444",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 4px 12px rgba(239,68,68,0.35)",
                  }}
                >
                  <NotificationsActiveIcon
                    sx={{ color: "#fff", fontSize: "1.2rem" }}
                  />
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 700,
                      fontSize: "1rem",
                      color: "#0f172a",
                      lineHeight: 1.1,
                    }}
                  >
                    
                    Alerts for adim
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "0.68rem",
                      color: "#94a3b8",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {filteredAlerts.length} TOTAL
                  </Typography>
                </Box>
              </Box>
            </Stack>

            {/* Date Filter */}
            <TextField
              type="date"
              label="Filter by Date"
              size="small"
              InputLabelProps={{ shrink: true }}
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                setPage(1);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CalendarTodayIcon
                      sx={{ color: "#94a3b8", fontSize: "0.9rem" }}
                    />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#ffffff",
                  borderRadius: "10px",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.875rem",
                  "& fieldset": { borderColor: "#e2e8f0" },
                  "&:hover fieldset": { borderColor: "#94a3b8" },
                  "&.Mui-focused fieldset": {
                    borderColor: "#ef4444",
                    borderWidth: "1.5px",
                  },
                },
                "& .MuiInputLabel-root": {
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.875rem",
                  color: "#94a3b8",
                },
                "& .MuiInputLabel-root.Mui-focused": { color: "#ef4444" },
              }}
            />
          </Box>

          {/* ALERT CARDS — single Stack, skeleton OR real cards */}
          <Stack spacing={2}>

            {/* SKELETON LOADER */}
            {loading &&
              Array.from(new Array(5)).map((_, i) => (
                <Paper
                  key={i}
                  elevation={0}
                  sx={{
                    borderRadius: "16px",
                    border: "1px solid #e2e8f0",
                    backgroundColor: "#ffffff",
                    overflow: "hidden",
                  }}
                >
                  {/* Colored stripe skeleton */}
                  <Skeleton variant="rectangular" height={4} sx={{ bgcolor: "#f1f5f9" }} />
                  <Box sx={{ p: 3 }}>
                    {/* Top row: badge + time */}
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                      <Skeleton variant="rounded" width={110} height={24} sx={{ borderRadius: "6px" }} />
                      <Skeleton variant="rounded" width={140} height={20} sx={{ borderRadius: "6px" }} />
                    </Box>
                    {/* Content rows */}
                    <Stack spacing={1.2}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Skeleton variant="rounded" width={28} height={28} sx={{ borderRadius: "8px", flexShrink: 0 }} />
                        <Skeleton width="60%" height={20} />
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Skeleton variant="rounded" width={28} height={28} sx={{ borderRadius: "8px", flexShrink: 0 }} />
                        <Skeleton width="45%" height={20} />
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Skeleton variant="rounded" width={28} height={28} sx={{ borderRadius: "8px", flexShrink: 0 }} />
                        <Skeleton width="35%" height={20} />
                      </Box>
                    </Stack>
                    {/* Message box skeleton */}
                    <Box
                      sx={{
                        mt: 2,
                        px: 2,
                        py: 1.2,
                        backgroundColor: "#f8fafc",
                        borderRadius: "10px",
                        borderLeft: "3px solid #e2e8f0",
                      }}
                    >
                      <Skeleton width="90%" height={18} />
                      <Skeleton width="70%" height={18} />
                    </Box>
                  </Box>
                </Paper>
              ))}

            {/* NO ALERTS */}
            {!loading && paginatedAlerts.length === 0 && (
              <Paper
                elevation={0}
                sx={{
                  p: 5,
                  textAlign: "center",
                  borderRadius: "16px",
                  border: "1px solid #e2e8f0",
                  backgroundColor: "#ffffff",
                }}
              >
                <NotificationsActiveIcon
                  sx={{ color: "#cbd5e1", fontSize: "2.5rem", mb: 1 }}
                />
                <Typography
                  sx={{
                    fontFamily: "'DM Sans', sans-serif",
                    color: "#94a3b8",
                    fontSize: "0.9rem",
                  }}
                >
                  No alerts found
                </Typography>
              </Paper>
            )}

            {/* REAL ALERT CARDS */}
            {!loading &&
              paginatedAlerts.map((alert, idx) => (
                <Paper
                  key={alert.id}
                  elevation={0}
                  className="alert-card"
                  sx={{
                    borderRadius: "16px",
                    border: "1px solid #e2e8f0",
                    backgroundColor: "#ffffff",
                    overflow: "hidden",
                    opacity: 0,
                    transition: "box-shadow 0.2s ease",
                    "&:hover": {
                      boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                    },
                  }}
                >
                  {/* Top colored stripe */}
                  <Box
                    sx={{
                      height: 4,
                      backgroundColor: alert.address ? "#ef4444" : "#f59e0b",
                      background: alert.address
                        ? "linear-gradient(90deg, #ef4444, #f87171)"
                        : "linear-gradient(90deg, #f59e0b, #fbbf24)",
                    }}
                  />

                  <Box sx={{ p: 3 }}>
                    {/* Top row: badge + time */}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        mb: 2,
                      }}
                    >
                      <Chip
                        icon={
                          alert.address ? (
                            <NotificationsActiveIcon
                              sx={{ fontSize: "0.85rem !important" }}
                            />
                          ) : (
                            <WarningAmberIcon
                              sx={{ fontSize: "0.85rem !important" }}
                            />
                          )
                        }
                        label={alert.address ? "Branch Alert" : "No Branch"}
                        size="small"
                        sx={{
                          fontFamily: "'DM Mono', monospace",
                          fontSize: "0.68rem",
                          fontWeight: 500,
                          letterSpacing: "0.05em",
                          borderRadius: "6px",
                          backgroundColor: alert.address ? "#fef2f2" : "#fffbeb",
                          color: alert.address ? "#b91c1c" : "#92400e",
                          border: `1px solid ${alert.address ? "#fecaca" : "#fde68a"}`,
                          "& .MuiChip-icon": {
                            color: alert.address ? "#ef4444" : "#f59e0b",
                          },
                        }}
                      />
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                      >
                        <AccessTimeIcon
                          sx={{ color: "#cbd5e1", fontSize: "0.85rem" }}
                        />
                        <Typography
                          sx={{
                            fontFamily: "'DM Mono', monospace",
                            fontSize: "0.72rem",
                            color: "#94a3b8",
                          }}
                        >
                          {new Date(alert.created_at).toLocaleString()}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Content */}
                    {alert.address ? (
                      <Stack spacing={1.2}>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <Box
                            sx={{
                              width: 28,
                              height: 28,
                              borderRadius: "8px",
                              backgroundColor: "#fef2f2",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                            }}
                          >
                            <LocationOnIcon
                              sx={{ color: "#ef4444", fontSize: "0.95rem" }}
                            />
                          </Box>
                          <Typography
                            sx={{
                              fontFamily: "'DM Sans', sans-serif",
                              fontWeight: 600,
                              fontSize: "0.95rem",
                              color: "#0f172a",
                            }}
                          >
                            {alert.address}, {alert.city}
                          </Typography>
                        </Box>

                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <Box
                            sx={{
                              width: 28,
                              height: 28,
                              borderRadius: "8px",
                              backgroundColor: "#f8fafc",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                            }}
                          >
                            <PersonIcon
                              sx={{ color: "#64748b", fontSize: "0.95rem" }}
                            />
                          </Box>
                          <Typography
                            sx={{
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: "0.85rem",
                              color: "#475569",
                            }}
                          >
                            <span
                              style={{ color: "#94a3b8", fontSize: "0.78rem" }}
                            >
                              Incharge:{" "}
                            </span>
                            {alert.branch_incharge}
                          </Typography>
                        </Box>

                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <Box
                            sx={{
                              width: 28,
                              height: 28,
                              borderRadius: "8px",
                              backgroundColor: "#f8fafc",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                            }}
                          >
                            <PhoneIcon
                              sx={{ color: "#64748b", fontSize: "0.95rem" }}
                            />
                          </Box>
                          <Typography
                            sx={{
                              fontFamily: "'DM Mono', monospace",
                              fontSize: "0.83rem",
                              color: "#475569",
                            }}
                          >
                            {alert.contact_number}
                          </Typography>
                        </Box>
                      </Stack>
                    ) : (
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Box
                          sx={{
                            width: 28,
                            height: 28,
                            borderRadius: "8px",
                            backgroundColor: "#fffbeb",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          <WarningAmberIcon
                            sx={{ color: "#f59e0b", fontSize: "0.95rem" }}
                          />
                        </Box>
                        <Typography
                          sx={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontWeight: 600,
                            fontSize: "0.9rem",
                            color: "#92400e",
                          }}
                        >
                          No Branch Assigned —{" "}
                          <span
                            style={{
                              fontFamily: "'DM Mono', monospace",
                              backgroundColor: "#fef9c3",
                              padding: "1px 6px",
                              borderRadius: "4px",
                              fontSize: "0.82rem",
                            }}
                          >
                            {alert.pincode}
                          </span>
                        </Typography>
                      </Box>
                    )}

                    {/* Message */}
                    <Box
                      sx={{
                        mt: 2,
                        px: 2,
                        py: 1.2,
                        backgroundColor: "#f8fafc",
                        borderRadius: "10px",
                        borderLeft: "3px solid #e2e8f0",
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "0.875rem",
                          color: "#334155",
                          lineHeight: 1.6,
                        }}
                      >
                        {alert.message}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              ))}
          </Stack>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={(e, value) => setPage(value)}
                sx={{
                  "& .MuiPaginationItem-root": {
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.8rem",
                    borderRadius: "8px",
                    color: "#64748b",
                    "&:hover": { backgroundColor: "#fef2f2", color: "#ef4444" },
                  },
                  "& .MuiPaginationItem-root.Mui-selected": {
                    backgroundColor: "#ef4444",
                    color: "#fff",
                    fontWeight: 600,
                    "&:hover": { backgroundColor: "#dc2626" },
                  },
                }}
              />
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
}

export default AdminAlerts;

// import React, { useEffect, useState } from "react";
// import socket from "../services/socket";
// import API from "../services/api";
// import { useNavigate } from "react-router-dom";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import PersonIcon from "@mui/icons-material/Person";
// import PhoneIcon from "@mui/icons-material/Phone";
// import WarningAmberIcon from "@mui/icons-material/WarningAmber";
// import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
// import AccessTimeIcon from "@mui/icons-material/AccessTime";
// import {
//   Button,
//   Paper,
//   Typography,
//   Stack,
//   Box,
//   TextField,
//   Pagination,
//   Grid,
//   InputAdornment,
//   Chip,
//   Skeleton, //
// } from "@mui/material";

// function AdminAlerts() {
//   const navigate = useNavigate();
//   const [alerts, setAlerts] = useState([]);
//   const [selectedDate, setSelectedDate] = useState("");
//   const [page, setPage] = useState(1);
//   const alertsPerPage = 5;
//   const [loading, setLoading] = useState(true); // ✅ ADDED

//   useEffect(() => {
//     const fetchAlerts = async () => {
//       const res = await API.get("/alerts/admin");
//       // setAlerts(res.data);
    
//     setTimeout(() => {
//       // ✅ delay for skeleton (2s)
//       setAlerts(res.data);
//       setLoading(false);
//     }, 2000); 
//     };
//     fetchAlerts();
//   }, []);

//   useEffect(() => {
//     socket.on("newAlert", (alert) => {
//       setAlerts((prev) => [alert, ...prev]);
//     });
//     return () => socket.off("newAlert");
//   }, []);

//   const filteredAlerts = selectedDate
//     ? alerts.filter((alert) => {
//         const alertDate = new Date(alert.created_at)
//           .toISOString()
//           .split("T")[0];
//         return alertDate === selectedDate;
//       })
//     : alerts;

//   const startIndex = (page - 1) * alertsPerPage;
//   const paginatedAlerts = filteredAlerts.slice(
//     startIndex,
//     startIndex + alertsPerPage,
//   );
//   const totalPages = Math.ceil(filteredAlerts.length / alertsPerPage);

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

//         @keyframes slideIn {
//           from { opacity: 0; transform: translateY(12px); }
//           to { opacity: 1; transform: translateY(0); }
//         }

//         .alert-card {
//           animation: slideIn 0.25s ease forwards;
//         }

//         .alert-card:nth-child(1) { animation-delay: 0.04s; }
//         .alert-card:nth-child(2) { animation-delay: 0.08s; }
//         .alert-card:nth-child(3) { animation-delay: 0.12s; }
//         .alert-card:nth-child(4) { animation-delay: 0.16s; }
//         .alert-card:nth-child(5) { animation-delay: 0.20s; }
//       `}</style>

//       <Box
//         sx={{
//           minHeight: "100vh",
//           backgroundColor: "#f1f5f9",
//           p: { xs: 2, md: 4 },
//           fontFamily: "'DM Sans', sans-serif",
//         }}
//       >
//         <Box sx={{ maxWidth: 820, mx: "auto" }}>
//           {/* HEADER */}
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-between",
//               mb: 4,
//               flexWrap: "wrap",
//               gap: 2,
//               // background:"red"
//             }}
//           >
//             <Stack direction="row" alignItems="center" spacing={2}>
             
//               <Button
//                 variant="outlined"
//                 startIcon={
//                   <ArrowBackIcon sx={{ fontSize: "1rem !important" }} />
//                 }
//                 onClick={() => navigate("/admin")}
//                 sx={{
//                   borderColor: "#cbd5e1",
//                   color: "#64748b",
//                   fontFamily: "'DM Sans', sans-serif",
//                   fontWeight: 600,
//                   fontSize: "0.8rem",
//                   textTransform: "none",
//                   borderRadius: "10px",
//                   px: 2,
//                   py: 0.8,
//                   "&:hover": {
//                     borderColor: "#ef4444",
//                     color: "#ef4444",
//                     backgroundColor: "#fef2f2",
//                   },
//                 }}
//               ></Button>

//               <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
//                 <Box
//                   sx={{
//                     width: 40,
//                     height: 40,
//                     borderRadius: "12px",
//                     backgroundColor: "#ef4444",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     boxShadow: "0 4px 12px rgba(239,68,68,0.35)",
//                   }}
//                 >
//                   <NotificationsActiveIcon
//                     sx={{ color: "#fff", fontSize: "1.2rem" }}
//                   />
//                 </Box>
//                 <Box>
//                   <Typography
//                     sx={{
//                       fontFamily: "'DM Sans', sans-serif",
//                       fontWeight: 700,
//                       fontSize: "1rem",
//                       color: "#0f172a",
//                       lineHeight: 1.1,
//                     }}
//                   >
//                     Alerts
//                   </Typography>
//                   <Typography
//                     sx={{
//                       fontFamily: "'DM Mono', monospace",
//                       fontSize: "0.68rem",
//                       color: "#94a3b8",
//                       letterSpacing: "0.06em",
//                     }}
//                   >
//                     {filteredAlerts.length} TOTAL
//                   </Typography>
//                 </Box>
//               </Box>
//             </Stack>

//             {/* Date Filter */}
//             <TextField
//               type="date"
//               label="Filter by Date"
//               size="small"
//               InputLabelProps={{ shrink: true }}
//               value={selectedDate}
//               onChange={(e) => {
//                 setSelectedDate(e.target.value);
//                 setPage(1);
//               }}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <CalendarTodayIcon
//                       sx={{ color: "#94a3b8", fontSize: "0.9rem" }}
//                     />
//                   </InputAdornment>
//                 ),
//               }}
//               sx={{
//                 "& .MuiOutlinedInput-root": {
//                   backgroundColor: "#ffffff",
//                   borderRadius: "10px",
//                   fontFamily: "'DM Sans', sans-serif",
//                   fontSize: "0.875rem",
//                   "& fieldset": { borderColor: "#e2e8f0" },
//                   "&:hover fieldset": { borderColor: "#94a3b8" },
//                   "&.Mui-focused fieldset": {
//                     borderColor: "#ef4444",
//                     borderWidth: "1.5px",
//                   },
//                 },
//                 "& .MuiInputLabel-root": {
//                   fontFamily: "'DM Sans', sans-serif",
//                   fontSize: "0.875rem",
//                   color: "#94a3b8",
//                 },
//                 "& .MuiInputLabel-root.Mui-focused": { color: "#ef4444" },
//               }}
//             />
//           </Box>

//           {/* ALERT CARDS */}
//            <Stack spacing={2}>
//                 {/* ✅ SHOW SKELETON */}
//                 {loading &&
//                   Array.from(new Array(5)).map((_, i) => (
//                     <Paper key={i} sx={{ p: 3, borderRadius: "16px" }}>
//                       <Skeleton height={10} />
//                       <Skeleton width="40%" />
//                       <Skeleton width="70%" />
//                       <Skeleton width="90%" />
//                     </Paper>
//                   ))}

//                 {/* ✅ SHOW REAL DATA */}
//                 {!loading && paginatedAlerts.length === 0 && (
//                   <Paper> No alerts found </Paper>
//                 )}

//                 {!loading &&
//                   paginatedAlerts.map((alert) => (
//                     <Paper key={alert.id}>{/* YOUR ORIGINAL FULL UI */}</Paper>
//                   ))}
//               </Stack>

//           <Stack spacing={2}>
//             {paginatedAlerts.length === 0 && (
//               <Paper
//                 elevation={0}
//                 sx={{
//                   p: 5,
//                   textAlign: "center",
//                   borderRadius: "16px",
//                   border: "1px solid #e2e8f0",
//                   backgroundColor: "#ffffff",
//                 }}
//               >
//                 <NotificationsActiveIcon
//                   sx={{ color: "#cbd5e1", fontSize: "2.5rem", mb: 1 }}
//                 />
//                 <Typography
//                   sx={{
//                     fontFamily: "'DM Sans', sans-serif",
//                     color: "#94a3b8",
//                     fontSize: "0.9rem",
//                   }}
//                 >
//                   No alerts found
//                 </Typography>
//               </Paper>
//             )}

//             {paginatedAlerts.map((alert, idx) => (
//               <Paper
//                 key={alert.id}
//                 elevation={0}
//                 className="alert-card"
//                 sx={{
//                   borderRadius: "16px",
//                   border: "1px solid #e2e8f0",
//                   backgroundColor: "#ffffff",
//                   overflow: "hidden",
//                   opacity: 0,
//                   transition: "box-shadow 0.2s ease",
//                   "&:hover": {
//                     boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
//                   },
//                 }}
//               >
//                 {/* Top colored stripe */}
//                 <Box
//                   sx={{
//                     height: 4,
//                     backgroundColor: alert.address ? "#ef4444" : "#f59e0b",
//                     background: alert.address
//                       ? "linear-gradient(90deg, #ef4444, #f87171)"
//                       : "linear-gradient(90deg, #f59e0b, #fbbf24)",
//                   }}
//                 />

//                 <Box sx={{ p: 3 }}>
//                   {/* Top row: badge + time */}
//                   <Box
//                     sx={{
//                       display: "flex",
//                       justifyContent: "space-between",
//                       alignItems: "flex-start",
//                       mb: 2,
//                     }}
//                   >
//                     <Chip
//                       icon={
//                         alert.address ? (
//                           <NotificationsActiveIcon
//                             sx={{ fontSize: "0.85rem !important" }}
//                           />
//                         ) : (
//                           <WarningAmberIcon
//                             sx={{ fontSize: "0.85rem !important" }}
//                           />
//                         )
//                       }
//                       label={alert.address ? "Branch Alert" : "No Branch"}
//                       size="small"
//                       sx={{
//                         fontFamily: "'DM Mono', monospace",
//                         fontSize: "0.68rem",
//                         fontWeight: 500,
//                         letterSpacing: "0.05em",
//                         borderRadius: "6px",
//                         backgroundColor: alert.address ? "#fef2f2" : "#fffbeb",
//                         color: alert.address ? "#b91c1c" : "#92400e",
//                         border: `1px solid ${alert.address ? "#fecaca" : "#fde68a"}`,
//                         "& .MuiChip-icon": {
//                           color: alert.address ? "#ef4444" : "#f59e0b",
//                         },
//                       }}
//                     />
//                     <Box
//                       sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
//                     >
//                       <AccessTimeIcon
//                         sx={{ color: "#cbd5e1", fontSize: "0.85rem" }}
//                       />
//                       <Typography
//                         sx={{
//                           fontFamily: "'DM Mono', monospace",
//                           fontSize: "0.72rem",
//                           color: "#94a3b8",
//                         }}
//                       >
//                         {new Date(alert.created_at).toLocaleString()}
//                       </Typography>
//                     </Box>
//                   </Box>

//                   {/* Content */}
//                   {alert.address ? (
//                     <Stack spacing={1.2}>
//                       <Box
//                         sx={{ display: "flex", alignItems: "center", gap: 1 }}
//                       >
//                         <Box
//                           sx={{
//                             width: 28,
//                             height: 28,
//                             borderRadius: "8px",
//                             backgroundColor: "#fef2f2",
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: "center",
//                             flexShrink: 0,
//                           }}
//                         >
//                           <LocationOnIcon
//                             sx={{ color: "#ef4444", fontSize: "0.95rem" }}
//                           />
//                         </Box>
//                         <Typography
//                           sx={{
//                             fontFamily: "'DM Sans', sans-serif",
//                             fontWeight: 600,
//                             fontSize: "0.95rem",
//                             color: "#0f172a",
//                           }}
//                         >
//                           {alert.address}, {alert.city}
//                         </Typography>
//                       </Box>

//                       <Box
//                         sx={{ display: "flex", alignItems: "center", gap: 1 }}
//                       >
//                         <Box
//                           sx={{
//                             width: 28,
//                             height: 28,
//                             borderRadius: "8px",
//                             backgroundColor: "#f8fafc",
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: "center",
//                             flexShrink: 0,
//                           }}
//                         >
//                           <PersonIcon
//                             sx={{ color: "#64748b", fontSize: "0.95rem" }}
//                           />
//                         </Box>
//                         <Typography
//                           sx={{
//                             fontFamily: "'DM Sans', sans-serif",
//                             fontSize: "0.85rem",
//                             color: "#475569",
//                           }}
//                         >
//                           <span
//                             style={{ color: "#94a3b8", fontSize: "0.78rem" }}
//                           >
//                             Incharge:{" "}
//                           </span>
//                           {alert.branch_incharge}
//                         </Typography>
//                       </Box>

//                       <Box
//                         sx={{ display: "flex", alignItems: "center", gap: 1 }}
//                       >
//                         <Box
//                           sx={{
//                             width: 28,
//                             height: 28,
//                             borderRadius: "8px",
//                             backgroundColor: "#f8fafc",
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: "center",
//                             flexShrink: 0,
//                           }}
//                         >
//                           <PhoneIcon
//                             sx={{ color: "#64748b", fontSize: "0.95rem" }}
//                           />
//                         </Box>
//                         <Typography
//                           sx={{
//                             fontFamily: "'DM Mono', monospace",
//                             fontSize: "0.83rem",
//                             color: "#475569",
//                           }}
//                         >
//                           {alert.contact_number}
//                         </Typography>
//                       </Box>
//                     </Stack>
//                   ) : (
//                     <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                       <Box
//                         sx={{
//                           width: 28,
//                           height: 28,
//                           borderRadius: "8px",
//                           backgroundColor: "#fffbeb",
//                           display: "flex",
//                           alignItems: "center",
//                           justifyContent: "center",
//                           flexShrink: 0,
//                         }}
//                       >
//                         <WarningAmberIcon
//                           sx={{ color: "#f59e0b", fontSize: "0.95rem" }}
//                         />
//                       </Box>
//                       <Typography
//                         sx={{
//                           fontFamily: "'DM Sans', sans-serif",
//                           fontWeight: 600,
//                           fontSize: "0.9rem",
//                           color: "#92400e",
//                         }}
//                       >
//                         No Branch Assigned —{" "}
//                         <span
//                           style={{
//                             fontFamily: "'DM Mono', monospace",
//                             backgroundColor: "#fef9c3",
//                             padding: "1px 6px",
//                             borderRadius: "4px",
//                             fontSize: "0.82rem",
//                           }}
//                         >
//                           {alert.pincode}
//                         </span>
//                       </Typography>
//                     </Box>
//                   )}

//                   {/* Message */}
//                   <Box
//                     sx={{
//                       mt: 2,
//                       px: 2,
//                       py: 1.2,
//                       backgroundColor: "#f8fafc",
//                       borderRadius: "10px",
//                       borderLeft: "3px solid #e2e8f0",
//                     }}
//                   >
//                     <Typography
//                       sx={{
//                         fontFamily: "'DM Sans', sans-serif",
//                         fontSize: "0.875rem",
//                         color: "#334155",
//                         lineHeight: 1.6,
//                       }}
//                     >
//                       {alert.message}
//                     </Typography>
//                   </Box>
//                 </Box>
//               </Paper>
//             ))}
//           </Stack>

//           {/* PAGINATION */}
//           {totalPages > 1 && (
//             <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
//               <Pagination
//                 count={totalPages}
//                 page={page}
//                 onChange={(e, value) => setPage(value)}
//                 sx={{
//                   "& .MuiPaginationItem-root": {
//                     fontFamily: "'DM Mono', monospace",
//                     fontSize: "0.8rem",
//                     borderRadius: "8px",
//                     color: "#64748b",
//                     "&:hover": { backgroundColor: "#fef2f2", color: "#ef4444" },
//                   },
//                   "& .MuiPaginationItem-root.Mui-selected": {
//                     backgroundColor: "#ef4444",
//                     color: "#fff",
//                     fontWeight: 600,
//                     "&:hover": { backgroundColor: "#dc2626" },
//                   },
//                 }}
//               />
//             </Box>
//           )}
//         </Box>
//       </Box>
//     </>
//   );
// }

// export default AdminAlerts;
