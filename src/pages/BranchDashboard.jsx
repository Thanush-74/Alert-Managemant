import React, { useState } from "react";
import { Skeleton } from "@mui/material";
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  MenuItem,
  Stack,
  Pagination,
  Chip,
  InputAdornment,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import FilterListIcon from "@mui/icons-material/FilterList";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useNavigate, useOutletContext } from "react-router-dom";
// import API from "../services/apiBranch";
import API_BRANCH from "../services/apiBranch";
import { useEffect } from "react";

function BranchDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
  const timer = setTimeout(() => {
    setLoading(false);
  }, 2000); // 2 seconds

  return () => clearTimeout(timer);
}, []);


  const { alerts = [], setAlerts } = useOutletContext();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const alertsPerPage = 5;

  const markAsRead = async (id) => {
    try {
      // await API.put(`/alerts/mark-read/${id}`);
      await API_BRANCH.put(`/alerts/mark-read/${id}`);
      setAlerts((prev) =>
        prev.map((alert) =>
          alert.id === id ? { ...alert, is_read: true } : alert
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const filteredAlerts = alerts.filter((alert) => {
    const searchValue = search.toLowerCase();
    const date = new Date(alert.created_at);
    const formattedDate = date.toLocaleString().toLowerCase();
    const formattedDateOnly = date.toLocaleDateString().toLowerCase();
    const formattedTime = date.toLocaleTimeString().toLowerCase();


    const matchesSearch =
      alert.message?.toLowerCase().includes(searchValue) ||
      (alert.is_read ? "read" : "new").includes(searchValue) ||
      formattedDate.includes(searchValue) ||
      formattedDateOnly.includes(searchValue) ||
      formattedTime.includes(searchValue);

    const matchesStatus =
      statusFilter === "all"
        ? true
        : statusFilter === "read"
        ? alert.is_read
        : !alert.is_read;

    return matchesSearch && matchesStatus;
  });

  const indexOfLastAlert = page * alertsPerPage;
  const indexOfFirstAlert = indexOfLastAlert - alertsPerPage;
  const currentAlerts = filteredAlerts.slice(indexOfFirstAlert, indexOfLastAlert);
  const totalPages = Math.ceil(filteredAlerts.length / alertsPerPage);

  const newCount = alerts.filter((a) => !a.is_read).length;

  const inputSx = {
    "& .MuiOutlinedInput-root": {
      backgroundColor: "#ffffff",
      borderRadius: "10px",
      fontFamily: "'DM Sans', sans-serif",
      fontSize: "0.875rem",
      "& fieldset": { borderColor: "#e2e8f0" },
      "&:hover fieldset": { borderColor: "#94a3b8" },
      "&.Mui-focused fieldset": { borderColor: "#0ea5e9", borderWidth: "1.5px" },
    },
    "& .MuiInputLabel-root": {
      fontFamily: "'DM Sans', sans-serif",
      fontSize: "0.875rem",
      color: "#94a3b8",
    },
    "& .MuiInputLabel-root.Mui-focused": { color: "#0ea5e9" },
    "& .MuiSelect-select": {
      fontFamily: "'DM Sans', sans-serif",
      fontSize: "0.875rem",
    },
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .row-animate {
          animation: fadeUp 0.22s ease forwards;
          opacity: 0;
        }
        .row-animate:nth-child(1) { animation-delay: 0.04s; }
        .row-animate:nth-child(2) { animation-delay: 0.08s; }
        .row-animate:nth-child(3) { animation-delay: 0.12s; }
        .row-animate:nth-child(4) { animation-delay: 0.16s; }
        .row-animate:nth-child(5) { animation-delay: 0.20s; }
      `}</style>

      <Box sx={{
        minHeight: "100vh",
        backgroundColor: "#f1f5f9",
        p: { xs: 2, md: 4 },
        fontFamily: "'DM Sans', sans-serif",
      }}>

        {/* HEADER */}
        <Box sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
          mb: 4,
        }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon sx={{ fontSize: "1rem !important" }} />}
              onClick={() => navigate("/branch/dashboard")}
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

            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Box sx={{
                width: 40, height: 40, borderRadius: "12px",
                backgroundColor: "#0ea5e9",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 4px 12px rgba(14,165,233,0.35)",
              }}>
                <NotificationsActiveIcon sx={{ color: "#fff", fontSize: "1.2rem" }} />
              </Box>
              <Box>
                <Typography sx={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: "1rem",
                  color: "#0f172a",
                  lineHeight: 1.1,
                }}>
                  Branch Alerts
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.2 }}>
                  <Typography sx={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.68rem",
                    color: "#94a3b8",
                    letterSpacing: "0.06em",
                  }}>
                    {filteredAlerts.length} TOTAL
                  </Typography>
                  {newCount > 0 && (
                    <Box sx={{
                      px: 1, py: 0.1,
                      backgroundColor: "#fef2f2",
                      border: "1px solid #fecaca",
                      borderRadius: "999px",
                    }}>
                      <Typography sx={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: "0.62rem",
                        color: "#dc2626",
                        letterSpacing: "0.04em",
                      }}>
                        {newCount} NEW
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
          </Stack>

          {/* Filters */}
          <Stack direction="row" spacing={1.5} alignItems="center">
            <TextField
              label="Search"
              size="small"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ ...inputSx, minWidth: 200 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "#94a3b8", fontSize: "1rem" }} />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              select
              label="Status"
              size="small"
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
              sx={{ ...inputSx, minWidth: 130 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FilterListIcon sx={{ color: "#94a3b8", fontSize: "1rem" }} />
                  </InputAdornment>
                ),
              }}
            >
              <MenuItem value="all" sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem" }}>All</MenuItem>
              <MenuItem value="read" sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem" }}>Read</MenuItem>
              <MenuItem value="new" sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem" }}>New</MenuItem>
            </TextField>
          </Stack>
        </Box>

        {/* TABLE */}
        <Paper elevation={0} sx={{
          borderRadius: "16px",
          border: "1px solid #e2e8f0",
          overflow: "hidden",
          backgroundColor: "#ffffff",
        }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f8fafc" }}>
                  {["Message", "Status", "Date", "Action"].map((col) => (
                    <TableCell key={col} sx={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "0.68rem",
                      fontWeight: 500,
                      color: "#94a3b8",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      borderBottom: "1px solid #e2e8f0",
                      py: 1.8,
                      px: 3,
                    }}>
                      {col}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>


              <TableBody>
                {loading ? (
  // 👉 SKELETON UI HERE
  [...Array(5)].map((_, i) => (
    <TableRow key={i}>
      <TableCell sx={{ px: 3, py: 2 }}>
        <Skeleton variant="text" width="80%" height={20} />
      </TableCell>

      <TableCell sx={{ px: 3, py: 2 }}>
        <Skeleton variant="rounded" width={60} height={24} />
      </TableCell>

      <TableCell sx={{ px: 3, py: 2 }}>
        <Skeleton variant="text" width="70%" height={20} />
      </TableCell>

      <TableCell sx={{ px: 3, py: 2 }}>
        <Skeleton variant="rounded" width={100} height={30} />
      </TableCell>
    </TableRow>
  ))
)
                 :filteredAlerts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} align="center" sx={{
                      py: 7,
                      fontFamily: "'DM Sans', sans-serif",
                      color: "#94a3b8",
                      fontSize: "0.9rem",
                    }}>
                      <NotificationsActiveIcon sx={{ color: "#cbd5e1", fontSize: "2rem", mb: 1, display: "block", mx: "auto" }} />
                      No alerts found
                    </TableCell>
                  </TableRow>
                ) : (
                 
                  currentAlerts.map((alert, idx) => (
                    <TableRow
                      key={alert.id}
                      className="row-animate"
                      sx={{
                        backgroundColor: !alert.is_read ? "#fefce8" : idx % 2 === 0 ? "#ffffff" : "#fdfeff",
                        "&:hover": { backgroundColor: !alert.is_read ? "#fef9c3" : "#f8fafc" },
                        "&:last-child td": { borderBottom: 0 },
                        transition: "background-color 0.15s ease",
                      }}
                    > 
                      {/* Message */}
                      <TableCell sx={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.875rem",
                        color: "#1e293b",
                        fontWeight: alert.is_read ? 400 : 600,
                        borderBottom: "1px solid #f1f5f9",
                        py: 2, px: 3,
                        maxWidth: 360,
                      }}>
                        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                          {!alert.is_read && (
                            <Box sx={{
                              width: 7, height: 7, borderRadius: "50%",
                              backgroundColor: "#f59e0b",
                              flexShrink: 0,
                              mt: "6px",
                            }} />
                          )}
                          {alert.message}
                        </Box>
                      </TableCell>

                      {/* Status */}
                      <TableCell sx={{ borderBottom: "1px solid #f1f5f9", py: 2, px: 3 }}>
                        {alert.is_read ? (
                          <Chip
                            icon={<CheckCircleOutlineIcon sx={{ fontSize: "0.85rem !important" }} />}
                            label="Read"
                            size="small"
                            sx={{
                              fontFamily: "'DM Mono', monospace",
                              fontSize: "0.68rem",
                              fontWeight: 500,
                              letterSpacing: "0.04em",
                              borderRadius: "6px",
                              backgroundColor: "#f0fdf4",
                              color: "#15803d",
                              border: "1px solid #bbf7d0",
                              "& .MuiChip-icon": { color: "#22c55e" },
                            }}
                          />
                        ) : (
                          <Chip
                            label="New"
                            size="small"
                            sx={{
                              fontFamily: "'DM Mono', monospace",
                              fontSize: "0.68rem",
                              fontWeight: 700,
                              letterSpacing: "0.05em",
                              borderRadius: "6px",
                              backgroundColor: "#fffbeb",
                              color: "#92400e",
                              border: "1px solid #fde68a",
                            }}
                          />
                        )}
                      </TableCell>

                      {/* Date */}
                      <TableCell sx={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: "0.78rem",
                        color: "#94a3b8",
                        borderBottom: "1px solid #f1f5f9",
                        py: 2, px: 3,
                        whiteSpace: "nowrap",
                      }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
                          <AccessTimeIcon sx={{ fontSize: "0.85rem", color: "#cbd5e1" }} />
                          {new Date(alert.created_at).toLocaleString()}
                        </Box>
                      </TableCell>

                      {/* Action */}
                      <TableCell sx={{ borderBottom: "1px solid #f1f5f9", py: 2, px: 3 }}>
                        {!alert.is_read && (
                          <Button
                            size="small"
                            onClick={() => markAsRead(alert.id)}
                            sx={{
                              fontFamily: "'DM Sans', sans-serif",
                              fontWeight: 600,
                              fontSize: "0.75rem",
                              textTransform: "none",
                              borderRadius: "8px",
                              px: 1.8, py: 0.6,
                              backgroundColor: "#f0f9ff",
                              color: "#0ea5e9",
                              border: "1px solid #bae6fd",
                              "&:hover": {
                                backgroundColor: "#0ea5e9",
                                color: "#ffffff",
                                borderColor: "#0ea5e9",
                              },
                              transition: "all 0.18s ease",
                            }}
                          >
                            Mark as Read
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          {totalPages > 1 && (
            <Box sx={{
              borderTop: "1px solid #f1f5f9",
              display: "flex",
              justifyContent: "center",
              py: 2,
            }}>
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
                    "&:hover": { backgroundColor: "#f0f9ff", color: "#0ea5e9" },
                  },
                  "& .MuiPaginationItem-root.Mui-selected": {
                    backgroundColor: "#0ea5e9",
                    color: "#fff",
                    fontWeight: 600,
                    "&:hover": { backgroundColor: "#0284c7" },
                  },
                }}
              />
            </Box>
          )}
        </Paper>
      </Box>
    </>
  );
}

export default BranchDashboard;











// import React, { useState } from "react";
// import {
//   Box,
//   Paper,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Button,
//   TextField,
//   MenuItem,
//   Stack,
//   Pagination
// } from "@mui/material";

// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import { useNavigate, useOutletContext } from "react-router-dom";
// import API from "../services/api";

// function BranchDashboard() {
//   const navigate = useNavigate();
//   const { alerts = [], setAlerts } = useOutletContext();

//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [page, setPage] = useState(1);

//   const alertsPerPage = 5;

//   const markAsRead = async (id) => {
//     try {
//       await API.put(`/alerts/mark-read/${id}`);

//       setAlerts((prev) =>
//         prev.map((alert) =>
//           alert.id === id ? { ...alert, is_read: true } : alert
//         )
//       );
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const filteredAlerts = alerts.filter((alert) => {
//     const searchValue = search.toLowerCase();

//     const date = new Date(alert.created_at);

//     const formattedDate = date.toLocaleString().toLowerCase();
//     const formattedDateOnly = date.toLocaleDateString().toLowerCase();
//     const formattedTime = date.toLocaleTimeString().toLowerCase();

//     const matchesSearch =
//       alert.message?.toLowerCase().includes(searchValue) ||
//       (alert.is_read ? "read" : "new").includes(searchValue) ||
//       formattedDate.includes(searchValue) ||
//       formattedDateOnly.includes(searchValue) ||
//       formattedTime.includes(searchValue);

//     const matchesStatus =
//       statusFilter === "all"
//         ? true
//         : statusFilter === "read"
//         ? alert.is_read
//         : !alert.is_read;

//     return matchesSearch && matchesStatus;
//   });

//   const indexOfLastAlert = page * alertsPerPage;
//   const indexOfFirstAlert = indexOfLastAlert - alertsPerPage;

//   const currentAlerts = filteredAlerts.slice(
//     indexOfFirstAlert,
//     indexOfLastAlert
//   );

//   const totalPages = Math.ceil(filteredAlerts.length / alertsPerPage);

//   return (
//     <Box sx={{ p: 3 }}>

//       {/* Header */}
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           mb: 3
//         }}
//       >
//         <Button
//           variant="contained"
//           startIcon={<ArrowBackIcon />}
//           onClick={() => navigate(-1)}
//           sx={{ textTransform: "none", borderRadius: 2, mr: 2 }}
//         >
//           Back
//         </Button>

//         <Typography variant="h4" fontWeight="bold">
//           Branch Alerts
//         </Typography>

//         <Stack direction="row" spacing={2} sx={{ ml: "auto" }}>
//           <TextField
//             label="Search Alert"
//             size="small"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />

//           <TextField
//             select
//             label="Status"
//             size="small"
//             value={statusFilter}
//             onChange={(e) => setStatusFilter(e.target.value)}
//           >
//             <MenuItem value="all">All</MenuItem>
//             <MenuItem value="read">Read</MenuItem>
//             <MenuItem value="new">New</MenuItem>
//           </TextField>
//         </Stack>
//       </Box>

//       {/* Table */}
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell><strong>Message</strong></TableCell>
//               <TableCell><strong>Status</strong></TableCell>
//               <TableCell><strong>Date</strong></TableCell>
//               <TableCell><strong>Action</strong></TableCell>
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {filteredAlerts.length === 0 ? (
//               <TableRow>
//                 <TableCell colSpan={4} align="center">
//                   No Alerts Found
//                 </TableCell>
//               </TableRow>
//             ) : (
//               currentAlerts.map((alert) => (
//                 <TableRow key={alert.id}>
//                   <TableCell>{alert.message}</TableCell>
//                   <TableCell>{alert.is_read ? "Read" : "New"}</TableCell>
//                   <TableCell>
//                     {new Date(alert.created_at).toLocaleString()}
//                   </TableCell>
//                   <TableCell>
//                     {!alert.is_read && (
//                       <Button
//                         variant="contained"
//                         color="error"
//                         size="small"
//                         onClick={() => markAsRead(alert.id)}
//                       >
//                         MARK AS READ
//                       </Button>
//                     )}
//                   </TableCell>
//                 </TableRow>
//               ))
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Pagination */}
//       <Stack mt={3} alignItems="center">
//         <Pagination
//           count={totalPages}
//           page={page}
//           onChange={(event, value) => setPage(value)}
//           color="primary"
//         />
//       </Stack>

//     </Box>
//   );
// }

// export default BranchDashboard;