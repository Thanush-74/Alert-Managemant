// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import {
//   Box,
//   Typography,
//   Paper,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Chip,
//   Button,
//   TableContainer,
//   Avatar,
//   IconButton,
//   TextField,
//   InputAdornment,
//   Stack,
//   Pagination,
//   Skeleton,
//   Fade,
//   Tooltip,
//   alpha,
// } from "@mui/material";
// import {
//   Add as AddIcon,
//   ArrowBack as ArrowBackIcon,
//   Search as SearchIcon,
//   Edit as EditIcon,
//   Visibility as VisibilityIcon,
//   DeleteOutline as DeleteIcon,
//   PersonOutline as PersonIcon,
//   Business as BranchIcon,
//   Email as EmailIcon,
//   Circle as CircleIcon,
// } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";
// import API from "../services/api";
// import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
// import PeopleIcon from "@mui/icons-material/People";

// function BranchUsers() {
//   const location = useLocation();
//   const [users, setUsers] = useState([]);
//   const [filteredUsers, setFilteredUsers] = useState([]);
//   const [page, setPage] = useState(1);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [hoveredRow, setHoveredRow] = useState(null);
//   const usersPerPage = 8;

//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchUsers();
//   }, [location.key]);

//   useEffect(() => {
//     if (!searchQuery) {
//       setFilteredUsers(users);
//     } else {
//       const q = searchQuery.toLowerCase();
//       setFilteredUsers(
//         users.filter(
//           (u) =>
//             u.name?.toLowerCase().includes(q) ||
//             u.email?.toLowerCase().includes(q) ||
//             u.role?.toLowerCase().includes(q) ||
//             u.branch_name?.toLowerCase().includes(q),
//         ),
//       );
//       setPage(1); // Reset to first page on search
//     }
//   }, [searchQuery, users]);

//   const fetchUsers = async () => {
//     setLoading(true);
//     try {
//       const res = await API.get("/users");

//       const data = Array.isArray(res.data) ? res.data : res.data.users || [];

//       // ✅ IMPORTANT FILTER
//       const branchUsers = data.filter((u) => u.role === "branch_user");

//       setUsers(branchUsers);
//       setFilteredUsers(branchUsers);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this user? This action cannot be undone."))
//       return;
//     try {
//       await API.delete(`/users/${id}`);
//       fetchUsers();
//     } catch (err) {
//       console.error("Failed to delete user:", err);
//     }
//   };

//   const currentUsers = filteredUsers.slice(
//     (page - 1) * usersPerPage,
//     page * usersPerPage,
//   );

//   const getRoleColor = (role) => {
//     const roleColors = {
//       admin: "#8b5cf6",
//       manager: "#3b82f6",
//       staff: "#10b981",
//       viewer: "#6b7280",
//     };
//     return roleColors[role?.toLowerCase()] || "#6b7280";
//   };

//   const getInitials = (name) => {
//     if (!name) return "?";
//     const parts = name.split(" ");
//     if (parts.length >= 2) {
//       return (parts[0][0] + parts[1][0]).toUpperCase();
//     }
//     return name.charAt(0).toUpperCase();
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
//         p: { xs: 2, sm: 3, md: 4 },
//       }}
//     >
//       <Fade in timeout={600}>
//         <Box maxWidth="1400px" mx="auto">
//           {/* Header Section */}
//           <Stack spacing={4}>
//             <Stack direction="row" alignItems="center" spacing={2}>
//               <IconButton
//                 onClick={() => navigate("/admin")}
//                 sx={{
//                   bgcolor: "white",
//                   boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
//                   transition: "all 0.2s ease",
//                   "&:hover": {
//                     bgcolor: "white",
//                     transform: "translateX(-2px)",
//                     boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
//                   },
//                 }}
//               >
//                 <ArrowBackIcon />
//               </IconButton>
//               < PeopleIcon  />

//               <Box flex={1}>
                
//                 <Typography
//                   variant="h6"
//                   sx={{
//                     fontWeight: 500,
//                     background:
//                       "linear-gradient(135deg, #1e293b 0%, #475569 100%)",
//                     WebkitBackgroundClip: "text",
//                     WebkitTextFillColor: "transparent",
//                     letterSpacing: "-0.02em",
//                     mb: 0.5,
//                   }}
//                 >
//                   User Management
//                 </Typography>
//                 <Stack direction="row" alignItems="center" spacing={1}>
//                   <PersonIcon sx={{ fontSize: 16, color: "text.secondary" }} />
//                   <Typography variant="body2" color="text.secondary">
//                     {filteredUsers.length}{" "}
//                     {filteredUsers.length === 1 ? "user" : "users"}
//                     {searchQuery && ` matching "${searchQuery}"`}
//                   </Typography>
//                 </Stack>
//               </Box>

//               <Button
//                 startIcon={<AddIcon />}
//                 variant="contained"
//                 onClick={() =>
//                   navigate("/admin/branch-users/create", {
//                     state: { role: "branch_user" },
//                   })
//                 }
//                 sx={{
//                   bgcolor: "#1e293b",
//                   px: 3,
//                   py: 1.2,
//                   borderRadius: 2,
//                   textTransform: "none",
//                   fontWeight: 600,
//                   fontSize: "0.95rem",
//                   boxShadow: "0 4px 12px rgba(30, 41, 59, 0.2)",
//                   transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
//                   "&:hover": {
//                     bgcolor: "#334155",
//                     transform: "translateY(-2px)",
//                     boxShadow: "0 6px 20px rgba(30, 41, 59, 0.3)",
//                   },
//                 }}
//               >
//                 Create User
//               </Button>
//             </Stack>

//             {/* Search Bar */}
//             <Paper
//               elevation={0}
//               sx={{
//                 p: 0.5,
//                 borderRadius: 2.5,
//                 bgcolor: "white",
//                 border: "1px solid",
//                 borderColor: "divider",
//                 transition: "all 0.3s ease",
//                 "&:focus-within": {
//                   borderColor: "#1e293b",
//                   boxShadow: "0 0 0 3px rgba(30, 41, 59, 0.08)",
//                 },
//               }}
//             >
//               <TextField
//                 fullWidth
//                 placeholder="Search by name, email, role, or branch..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <SearchIcon sx={{ color: "text.secondary", ml: 1 }} />
//                     </InputAdornment>
//                   ),
//                 }}
//                 sx={{
//                   "& .MuiOutlinedInput-root": {
//                     border: "none",
//                     "& fieldset": { border: "none" },
//                   },
//                   "& input": {
//                     py: 1.5,
//                     fontSize: "0.95rem",
//                   },
//                 }}
//               />
//             </Paper>

//             {/* Table */}
//             <Paper
//               elevation={0}
//               sx={{
//                 borderRadius: 3,
//                 overflow: "hidden",
//                 border: "1px solid",
//                 borderColor: "divider",
//                 bgcolor: "white",
//               }}
//             >
//               <TableContainer>
//                 <Table>
//                   <TableHead>
//                     <TableRow
//                       sx={{
//                         bgcolor: "#f8fafc",
//                         "& th": {
//                           fontWeight: 700,
//                           fontSize: "0.75rem",
//                           textTransform: "uppercase",
//                           letterSpacing: "0.05em",
//                           color: "#64748b",
//                           py: 2,
//                           borderBottom: "2px solid #e2e8f0",
//                         },
//                       }}
//                     >
//                       <TableCell>User</TableCell>
//                       <TableCell>Contact</TableCell>
//                       <TableCell>Role</TableCell>
//                       <TableCell>Branch</TableCell>
//                       <TableCell>Status</TableCell>
//                       <TableCell align="right">Actions</TableCell>
//                     </TableRow>
//                   </TableHead>

//                   <TableBody>
//                     {loading ? (
//                       Array.from({ length: 5 }).map((_, i) => (
//                         <TableRow key={i}>
//                           <TableCell colSpan={6}>
//                             <Skeleton
//                               variant="rectangular"
//                               height={60}
//                               sx={{ borderRadius: 1 }}
//                             />
//                           </TableCell>
//                         </TableRow>
//                       ))
//                     ) : currentUsers.length === 0 ? (
//                       <TableRow>
//                         <TableCell colSpan={6} align="center" sx={{ py: 8 }}>
//                           <PersonIcon
//                             sx={{ fontSize: 48, color: "text.disabled", mb: 2 }}
//                           />
//                           <Typography variant="h6" color="text.secondary">
//                             No users found
//                           </Typography>
//                           <Typography variant="body2" color="text.disabled">
//                             {searchQuery
//                               ? "Try adjusting your search"
//                               : "Get started by creating your first user"}
//                           </Typography>
//                         </TableCell>
//                       </TableRow>
//                     ) : (
//                       currentUsers.map((u, i) => (
//                         <TableRow
//                           key={u.id || i}
//                           onMouseEnter={() => setHoveredRow(u.id)}
//                           onMouseLeave={() => setHoveredRow(null)}
//                           sx={{
//                             transition: "all 0.2s ease",
//                             bgcolor:
//                               hoveredRow === u.id
//                                 ? alpha("#1e293b", 0.02)
//                                 : "transparent",
//                             "&:hover": {
//                               "& .action-buttons": {
//                                 opacity: 1,
//                               },
//                             },
//                             "& td": {
//                               borderBottom: "1px solid #f1f5f9",
//                               py: 2,
//                             },
//                           }}
//                         >
//                           <TableCell>
//                             <Stack
//                               direction="row"
//                               spacing={2}
//                               alignItems="center"
//                             >
//                               <Avatar
//                                 sx={{
//                                   bgcolor: getRoleColor(u.role),
//                                   fontWeight: 600,
//                                   fontSize: "0.9rem",
//                                   width: 44,
//                                   height: 44,
//                                   boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//                                 }}
//                               >
//                                 {getInitials(u.name)}
//                               </Avatar>
//                               <Box>
//                                 <Typography
//                                   variant="body1"
//                                   sx={{
//                                     fontWeight: 600,
//                                     color: "#1e293b",
//                                     mb: 0.25,
//                                   }}
//                                 >
//                                   {u.name || "Unknown User"}
//                                 </Typography>
//                                 <Typography
//                                   variant="caption"
//                                   sx={{
//                                     color: "text.secondary",
//                                     display: "flex",
//                                     alignItems: "center",
//                                     gap: 0.5,
//                                   }}
//                                 >
//                                   ID: {u.id}
//                                 </Typography>
//                               </Box>
//                             </Stack>
//                           </TableCell>

//                           <TableCell>
//                             <Stack spacing={0.5}>
//                               <Stack
//                                 direction="row"
//                                 alignItems="center"
//                                 spacing={1}
//                               >
//                                 <EmailIcon
//                                   sx={{ fontSize: 14, color: "text.secondary" }}
//                                 />
//                                 <Typography
//                                   variant="body2"
//                                   color="text.primary"
//                                 >
//                                   {u.email || "No email"}
//                                 </Typography>
//                               </Stack>
//                             </Stack>
//                           </TableCell>

//                           <TableCell>
//                             <Chip
//                               label={u.role || "N/A"}
//                               size="small"
//                               sx={{
//                                 bgcolor: alpha(getRoleColor(u.role), 0.1),
//                                 color: getRoleColor(u.role),
//                                 fontWeight: 600,
//                                 fontSize: "0.75rem",
//                                 borderRadius: 1.5,
//                                 textTransform: "capitalize",
//                                 border: `1px solid ${alpha(getRoleColor(u.role), 0.2)}`,
//                               }}
//                             />
//                           </TableCell>

//                           <TableCell>
//                             <Stack
//                               direction="row"
//                               alignItems="center"
//                               spacing={1}
//                             >
//                               <BranchIcon
//                                 sx={{ fontSize: 16, color: "text.secondary" }}
//                               />
//                               <Typography
//                                 variant="body2"
//                                 color="text.secondary"
//                               >
//                                 {u.branch_name || "No branch"}
//                               </Typography>
//                             </Stack>
//                           </TableCell>

//                           <TableCell>
//                             <Stack
//                               direction="row"
//                               alignItems="center"
//                               spacing={1}
//                             >
//                               <CircleIcon
//                                 sx={{
//                                   fontSize: 8,
//                                   color: u.is_active ? "#10b981" : "#ef4444",
//                                 }}
//                               />
//                               <Typography
//                                 variant="body2"
//                                 sx={{
//                                   color: u.is_active ? "#10b981" : "#ef4444",
//                                   fontWeight: 600,
//                                 }}
//                               >
//                                 {u.is_active ? "Active" : "Inactive"}
//                               </Typography>
//                             </Stack>
//                           </TableCell>

//                           <TableCell align="right">
//                             <Stack
//                               direction="row"
//                               spacing={0.5}
//                               justifyContent="flex-end"
//                               className="action-buttons"
//                               sx={{
//                                 opacity: {
//                                   xs: 1,
//                                   md: hoveredRow === u.id ? 1 : 0.4,
//                                 },
//                                 transition: "opacity 0.2s ease",
//                               }}
//                             >
//                               <Tooltip title="View Details" arrow>
//                                 <IconButton
//                                   size="small"
//                                   onClick={() =>
//                                     navigate(`/admin/users/${u.id}`)
//                                   }
//                                   sx={{
//                                     color: "#64748b",
//                                     transition: "all 0.2s ease",
//                                     "&:hover": {
//                                       bgcolor: alpha("#3b82f6", 0.1),
//                                       color: "#3b82f6",
//                                     },
//                                   }}
//                                 >
//                                   <VisibilityIcon fontSize="small" />
//                                 </IconButton>
//                               </Tooltip>

//                               <Tooltip title="Edit User" arrow>
//                                 <IconButton
//                                   size="small"
//                                   onClick={() =>
//                                     navigate(`/admin/users/edit/${u.id}`)
//                                   }
//                                   sx={{
//                                     color: "#64748b",
//                                     transition: "all 0.2s ease",
//                                     "&:hover": {
//                                       bgcolor: alpha("#8b5cf6", 0.1),
//                                       color: "#8b5cf6",
//                                     },
//                                   }}
//                                 >
//                                   <EditIcon fontSize="small" />
//                                 </IconButton>
//                               </Tooltip>

//                               <Tooltip title="Delete User" arrow>
//                                 <IconButton
//                                   size="small"
//                                   onClick={() => handleDelete(u.id)}
//                                   sx={{
//                                     color: "#64748b",
//                                     transition: "all 0.2s ease",
//                                     "&:hover": {
//                                       bgcolor: alpha("#ef4444", 0.1),
//                                       color: "#ef4444",
//                                     },
//                                   }}
//                                 >
//                                   <DeleteIcon fontSize="small" />
//                                 </IconButton>
//                               </Tooltip>
//                             </Stack>
//                           </TableCell>
//                         </TableRow>
//                       ))
//                     )}
//                   </TableBody>
//                 </Table>
//               </TableContainer>

//               {/* Pagination */}
//               {!loading && filteredUsers.length > usersPerPage && (
//                 <Box
//                   sx={{
//                     p: 3,
//                     display: "flex",
//                     justifyContent: "center",
//                     borderTop: "1px solid #f1f5f9",
//                     bgcolor: "#fafbfc",
//                   }}
//                 >
//                   <Pagination
//                     count={Math.ceil(filteredUsers.length / usersPerPage)}
//                     page={page}
//                     onChange={(e, v) => setPage(v)}
//                     color="primary"
//                     size="large"
//                     sx={{
//                       "& .MuiPaginationItem-root": {
//                         fontWeight: 600,
//                         borderRadius: 2,
//                         transition: "all 0.2s ease",
//                         "&.Mui-selected": {
//                           bgcolor: "#1e293b",
//                           color: "white",
//                           "&:hover": {
//                             bgcolor: "#334155",
//                           },
//                         },
//                         "&:hover": {
//                           bgcolor: alpha("#1e293b", 0.08),
//                         },
//                       },
//                     }}
//                   />
//                 </Box>
//               )}
//             </Paper>

//             {/* Footer Stats */}
//             {/* <Stack
//               direction={{ xs: "column", sm: "row" }}
//               spacing={2}
//               sx={{
//                 pt: 2,
//                 "& > *": {
//                   flex: 1,
//                 },
//               }}
//             >
//               <Paper
//                 elevation={0}
//                 sx={{
//                   p: 2.5,
//                   borderRadius: 2,
//                   bgcolor: "white",
//                   border: "1px solid",
//                   borderColor: "divider",
//                   transition: "all 0.3s ease",
//                   "&:hover": {
//                     boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
//                     transform: "translateY(-2px)",
//                   },
//                 }}
//               >
//                 <Typography
//                   variant="caption"
//                   color="text.secondary"
//                   fontWeight={600}
//                 >
//                   TOTAL USERS
//                 </Typography>
//                 <Typography
//                   variant="h4"
//                   fontWeight={700}
//                   color="#1e293b"
//                   mt={0.5}
//                 >
//                   {users.length}
//                 </Typography>
//               </Paper>

//               <Paper
//                 elevation={0}
//                 sx={{
//                   p: 2.5,
//                   borderRadius: 2,
//                   bgcolor: "white",
//                   border: "1px solid",
//                   borderColor: "divider",
//                   transition: "all 0.3s ease",
//                   "&:hover": {
//                     boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
//                     transform: "translateY(-2px)",
//                   },
//                 }}
//               >
//                 <Typography
//                   variant="caption"
//                   color="text.secondary"
//                   fontWeight={600}
//                 >
//                   ACTIVE USERS
//                 </Typography>
//                 <Typography
//                   variant="h4"
//                   fontWeight={700}
//                   color="#10b981"
//                   mt={0.5}
//                 >
//                   {users.filter((u) => u.is_active).length}
//                 </Typography>
//               </Paper>

//               <Paper
//                 elevation={0}
//                 sx={{
//                   p: 2.5,
//                   borderRadius: 2,
//                   bgcolor: "white",
//                   border: "1px solid",
//                   borderColor: "divider",
//                   transition: "all 0.3s ease",
//                   "&:hover": {
//                     boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
//                     transform: "translateY(-2px)",
//                   },
//                 }}
//               >
//                 <Typography
//                   variant="caption"
//                   color="text.secondary"
//                   fontWeight={600}
//                 >
//                   SHOWING
//                 </Typography>
//                 <Typography
//                   variant="h4"
//                   fontWeight={700}
//                   color="#1e293b"
//                   mt={0.5}
//                 >
//                   {currentUsers.length}
//                 </Typography>
//               </Paper>
//             </Stack> */}
//           </Stack>
//         </Box>
//       </Fade>
//     </Box>
//   );
// }

// export default BranchUsers;

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Button,
  TableContainer,
  Avatar,
  IconButton,
  TextField,
  InputAdornment,
  Stack,
  Pagination,
  Skeleton,
  Fade,
  Tooltip,
  alpha,
} from "@mui/material";
import {
  Add as AddIcon,
  ArrowBack as ArrowBackIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Visibility as VisibilityIcon,
  DeleteOutline as DeleteIcon,
  PersonOutline as PersonIcon,
  Business as BranchIcon,
  Email as EmailIcon,
  Circle as CircleIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import PeopleIcon from "@mui/icons-material/People";

function BranchUsers() {
  const location = useLocation();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true); // ✅ starts true
  const [hoveredRow, setHoveredRow] = useState(null);
  const usersPerPage = 8;

  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, [location.key]);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredUsers(users);
    } else {
      const q = searchQuery.toLowerCase();
      setFilteredUsers(
        users.filter(
          (u) =>
            u.name?.toLowerCase().includes(q) ||
            u.email?.toLowerCase().includes(q) ||
            u.role?.toLowerCase().includes(q) ||
            u.branch_name?.toLowerCase().includes(q),
        ),
      );
      setPage(1);
    }
  }, [searchQuery, users]);

  const fetchUsers = async () => {
    setLoading(true); // ✅ always reset to true on each fetch
    try {
      const res = await API.get("/users");
      const data = Array.isArray(res.data) ? res.data : res.data.users || [];
      const branchUsers = data.filter((u) => u.role === "branch_user");

      // ✅ delay so skeleton is visible for 2 seconds
      setTimeout(() => {
        setUsers(branchUsers);
        setFilteredUsers(branchUsers);
        setLoading(false);
      }, 2000);

    } catch (err) {
      console.error(err);
      setLoading(false); // ✅ hide skeleton on error
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user? This action cannot be undone."))
      return;
    try {
      await API.delete(`/users/${id}`);
      fetchUsers();
    } catch (err) {
      console.error("Failed to delete user:", err);
    }
  };

  const currentUsers = filteredUsers.slice(
    (page - 1) * usersPerPage,
    page * usersPerPage,
  );

  const getRoleColor = (role) => {
    const roleColors = {
      admin: "#8b5cf6",
      manager: "#3b82f6",
      staff: "#10b981",
      viewer: "#6b7280",
    };
    return roleColors[role?.toLowerCase()] || "#6b7280";
  };

  const getInitials = (name) => {
    if (!name) return "?";
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.charAt(0).toUpperCase();
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
        p: { xs: 2, sm: 3, md: 4 },
      }}
    >
      <Fade in timeout={600}>
        <Box maxWidth="1400px" mx="auto">
          <Stack spacing={4}>
            {/* Header */}
            <Stack direction="row" alignItems="center" spacing={2}>
              <IconButton
                onClick={() => navigate("/admin")}
                sx={{
                  bgcolor: "white",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    bgcolor: "white",
                    transform: "translateX(-2px)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                  },
                }}
              >
                <ArrowBackIcon />
              </IconButton>
              <PeopleIcon />

              <Box flex={1}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 500,
                    background: "linear-gradient(135deg, #1e293b 0%, #475569 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    letterSpacing: "-0.02em",
                    mb: 0.5,
                  }}
                >
                  User Management
                </Typography>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <PersonIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                  <Typography variant="body2" color="text.secondary">
                    {filteredUsers.length}{" "}
                    {filteredUsers.length === 1 ? "user" : "users"}
                    {searchQuery && ` matching "${searchQuery}"`}
                  </Typography>
                </Stack>
              </Box>

              <Button
                startIcon={<AddIcon />}
                variant="contained"
                onClick={() =>
                  navigate("/admin/branch-users/create", {
                    state: { role: "branch_user" },
                  })
                }
                sx={{
                  bgcolor: "#1e293b",
                  px: 3,
                  py: 1.2,
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  boxShadow: "0 4px 12px rgba(30, 41, 59, 0.2)",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    bgcolor: "#334155",
                    transform: "translateY(-2px)",
                    boxShadow: "0 6px 20px rgba(30, 41, 59, 0.3)",
                  },
                }}
              >
                Create User
              </Button>
            </Stack>

            {/* Search Bar */}
            <Paper
              elevation={0}
              sx={{
                p: 0.5,
                borderRadius: 2.5,
                bgcolor: "white",
                border: "1px solid",
                borderColor: "divider",
                transition: "all 0.3s ease",
                "&:focus-within": {
                  borderColor: "#1e293b",
                  boxShadow: "0 0 0 3px rgba(30, 41, 59, 0.08)",
                },
              }}
            >
              <TextField
                fullWidth
                placeholder="Search by name, email, role, or branch..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "text.secondary", ml: 1 }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    border: "none",
                    "& fieldset": { border: "none" },
                  },
                  "& input": {
                    py: 1.5,
                    fontSize: "0.95rem",
                  },
                }}
              />
            </Paper>

            {/* Table */}
            <Paper
              elevation={0}
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                border: "1px solid",
                borderColor: "divider",
                bgcolor: "white",
              }}
            >
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow
                      sx={{
                        bgcolor: "#f8fafc",
                        "& th": {
                          fontWeight: 700,
                          fontSize: "0.75rem",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          color: "#64748b",
                          py: 2,
                          borderBottom: "2px solid #e2e8f0",
                        },
                      }}
                    >
                      <TableCell>User</TableCell>
                      <TableCell>Contact</TableCell>
                      <TableCell>Role</TableCell>
                      <TableCell>Branch</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>

                    {/* ✅ SKELETON ROWS — shown while loading=true */}
                    {loading &&
                      Array.from({ length: 5 }).map((_, i) => (
                        <TableRow
                          key={i}
                          sx={{ "& td": { borderBottom: "1px solid #f1f5f9", py: 2 } }}
                        >
                          {/* User: avatar + name + id */}
                          <TableCell>
                            <Stack direction="row" spacing={2} alignItems="center">
                              <Skeleton variant="circular" width={44} height={44} />
                              <Box>
                                <Skeleton width={120} height={18} sx={{ mb: 0.5 }} />
                                <Skeleton width={60} height={14} />
                              </Box>
                            </Stack>
                          </TableCell>

                          {/* Contact: icon + email */}
                          <TableCell>
                            <Stack direction="row" alignItems="center" spacing={1}>
                              <Skeleton variant="circular" width={14} height={14} />
                              <Skeleton width={150} height={16} />
                            </Stack>
                          </TableCell>

                          {/* Role: chip shape */}
                          <TableCell>
                            <Skeleton
                              variant="rounded"
                              width={80}
                              height={24}
                              sx={{ borderRadius: "6px" }}
                            />
                          </TableCell>

                          {/* Branch: icon + text */}
                          <TableCell>
                            <Stack direction="row" alignItems="center" spacing={1}>
                              <Skeleton variant="circular" width={16} height={16} />
                              <Skeleton width={100} height={16} />
                            </Stack>
                          </TableCell>

                          {/* Status: dot + text */}
                          <TableCell>
                            <Stack direction="row" alignItems="center" spacing={1}>
                              <Skeleton variant="circular" width={8} height={8} />
                              <Skeleton width={55} height={16} />
                            </Stack>
                          </TableCell>

                          {/* Actions: 3 icon buttons */}
                          <TableCell align="right">
                            <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                              <Skeleton variant="circular" width={30} height={30} />
                              <Skeleton variant="circular" width={30} height={30} />
                              <Skeleton variant="circular" width={30} height={30} />
                            </Stack>
                          </TableCell>
                        </TableRow>
                      ))}

                    {/* EMPTY STATE */}
                    {!loading && currentUsers.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} align="center" sx={{ py: 8 }}>
                          <PersonIcon
                            sx={{ fontSize: 48, color: "text.disabled", mb: 2 }}
                          />
                          <Typography variant="h6" color="text.secondary">
                            No users found
                          </Typography>
                          <Typography variant="body2" color="text.disabled">
                            {searchQuery
                              ? "Try adjusting your search"
                              : "Get started by creating your first user"}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )}

                    {/* REAL ROWS */}
                    {!loading &&
                      currentUsers.map((u, i) => (
                        <TableRow
                          key={u.id || i}
                          onMouseEnter={() => setHoveredRow(u.id)}
                          onMouseLeave={() => setHoveredRow(null)}
                          sx={{
                            transition: "all 0.2s ease",
                            bgcolor:
                              hoveredRow === u.id
                                ? alpha("#1e293b", 0.02)
                                : "transparent",
                            "&:hover": {
                              "& .action-buttons": { opacity: 1 },
                            },
                            "& td": {
                              borderBottom: "1px solid #f1f5f9",
                              py: 2,
                            },
                          }}
                        >
                          <TableCell>
                            <Stack direction="row" spacing={2} alignItems="center">
                              <Avatar
                                sx={{
                                  bgcolor: getRoleColor(u.role),
                                  fontWeight: 600,
                                  fontSize: "0.9rem",
                                  width: 44,
                                  height: 44,
                                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                                }}
                              >
                                {getInitials(u.name)}
                              </Avatar>
                              <Box>
                                <Typography
                                  variant="body1"
                                  sx={{ fontWeight: 600, color: "#1e293b", mb: 0.25 }}
                                >
                                  {u.name || "Unknown User"}
                                </Typography>
                                <Typography
                                  variant="caption"
                                  sx={{
                                    color: "text.secondary",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 0.5,
                                  }}
                                >
                                  ID: {u.id}
                                </Typography>
                              </Box>
                            </Stack>
                          </TableCell>

                          <TableCell>
                            <Stack spacing={0.5}>
                              <Stack direction="row" alignItems="center" spacing={1}>
                                <EmailIcon sx={{ fontSize: 14, color: "text.secondary" }} />
                                <Typography variant="body2" color="text.primary">
                                  {u.email || "No email"}
                                </Typography>
                              </Stack>
                            </Stack>
                          </TableCell>

                          <TableCell>
                            <Chip
                              label={u.role || "N/A"}
                              size="small"
                              sx={{
                                bgcolor: alpha(getRoleColor(u.role), 0.1),
                                color: getRoleColor(u.role),
                                fontWeight: 600,
                                fontSize: "0.75rem",
                                borderRadius: 1.5,
                                textTransform: "capitalize",
                                border: `1px solid ${alpha(getRoleColor(u.role), 0.2)}`,
                              }}
                            />
                          </TableCell>

                          <TableCell>
                            <Stack direction="row" alignItems="center" spacing={1}>
                              <BranchIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                              <Typography variant="body2" color="text.secondary">
                                {u.branch_name || "No branch"}
                              </Typography>
                            </Stack>
                          </TableCell>

                          <TableCell>
                            <Stack direction="row" alignItems="center" spacing={1}>
                              <CircleIcon
                                sx={{
                                  fontSize: 8,
                                  color: u.is_active ? "#10b981" : "#ef4444",
                                }}
                              />
                              <Typography
                                variant="body2"
                                sx={{
                                  color: u.is_active ? "#10b981" : "#ef4444",
                                  fontWeight: 600,
                                }}
                              >
                                {u.is_active ? "Active" : "Inactive"}
                              </Typography>
                            </Stack>
                          </TableCell>

                          <TableCell align="right">
                            <Stack
                              direction="row"
                              spacing={0.5}
                              justifyContent="flex-end"
                              className="action-buttons"
                              sx={{
                                opacity: { xs: 1, md: hoveredRow === u.id ? 1 : 0.4 },
                                transition: "opacity 0.2s ease",
                              }}
                            >
                              <Tooltip title="View Details" arrow>
                                <IconButton
                                  size="small"
                                  onClick={() => navigate(`/admin/users/${u.id}`)}
                                  sx={{
                                    color: "#64748b",
                                    transition: "all 0.2s ease",
                                    "&:hover": {
                                      bgcolor: alpha("#3b82f6", 0.1),
                                      color: "#3b82f6",
                                    },
                                  }}
                                >
                                  <VisibilityIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>

                              <Tooltip title="Edit User" arrow>
                                <IconButton
                                  size="small"
                                  onClick={() => navigate(`/admin/users/edit/${u.id}`)}
                                  sx={{
                                    color: "#64748b",
                                    transition: "all 0.2s ease",
                                    "&:hover": {
                                      bgcolor: alpha("#8b5cf6", 0.1),
                                      color: "#8b5cf6",
                                    },
                                  }}
                                >
                                  <EditIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>

                              <Tooltip title="Delete User" arrow>
                                <IconButton
                                  size="small"
                                  onClick={() => handleDelete(u.id)}
                                  sx={{
                                    color: "#64748b",
                                    transition: "all 0.2s ease",
                                    "&:hover": {
                                      bgcolor: alpha("#ef4444", 0.1),
                                      color: "#ef4444",
                                    },
                                  }}
                                >
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </Stack>
                          </TableCell>
                        </TableRow>
                      ))}

                  </TableBody>
                </Table>
              </TableContainer>

              {/* Pagination */}
              {!loading && filteredUsers.length > usersPerPage && (
                <Box
                  sx={{
                    p: 3,
                    display: "flex",
                    justifyContent: "center",
                    borderTop: "1px solid #f1f5f9",
                    bgcolor: "#fafbfc",
                  }}
                >
                  <Pagination
                    count={Math.ceil(filteredUsers.length / usersPerPage)}
                    page={page}
                    onChange={(e, v) => setPage(v)}
                    color="primary"
                    size="large"
                    sx={{
                      "& .MuiPaginationItem-root": {
                        fontWeight: 600,
                        borderRadius: 2,
                        transition: "all 0.2s ease",
                        "&.Mui-selected": {
                          bgcolor: "#1e293b",
                          color: "white",
                          "&:hover": { bgcolor: "#334155" },
                        },
                        "&:hover": { bgcolor: alpha("#1e293b", 0.08) },
                      },
                    }}
                  />
                </Box>
              )}
            </Paper>
          </Stack>
        </Box>
      </Fade>
    </Box>
  );
}

export default BranchUsers;