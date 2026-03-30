// import React, { useEffect, useState } from "react";
// import API from "../services/api";
// import { useNavigate } from "react-router-dom";
// import {
//   Box,
//   Typography,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Button,
//   Stack,
//   Chip,
// } from "@mui/material";

// function AdminUsers() {
//   const [users, setUsers] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const res = await API.get("/users");
//       setUsers(res.data);
//     } catch (err) {
//       console.error("Error fetching users", err);
//     }
//   };

//   const deleteUser = async (id) => {
//     try {
//       await API.delete(`/users/${id}`);
//       fetchUsers();
//     } catch (err) {
//       console.error("Error deleting user", err);
//     }
//   };

//   return (
//     <Box>
//       <Stack
//         direction="row"
//         justifyContent="space-between"
//         alignItems="center"
//         mb={3}
//       >
//         <Typography variant="h4" fontWeight="bold">
//           Users Management
//         </Typography>

//         <Button
//           variant="contained"
//           onClick={() => navigate("/admin/users/create")}
//         >
//           + Create User
//         </Button>
//       </Stack>

//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
//               <TableCell><strong>Name</strong></TableCell>
//               <TableCell><strong>Email</strong></TableCell>
//               <TableCell><strong>Role</strong></TableCell>
//               <TableCell><strong>Branch</strong></TableCell>
//               <TableCell><strong>Status</strong></TableCell>
//               <TableCell><strong>Actions</strong></TableCell>
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {users.length === 0 ? (
//               <TableRow>
//                 <TableCell colSpan={6} align="center">
//                   No Users Found
//                 </TableCell>
//               </TableRow>
//             ) : (
//               users.map((user) => (
//                 <TableRow key={user.id}>
//                   <TableCell>{user.name}</TableCell>
//                   <TableCell>{user.email}</TableCell>

//                   <TableCell>
//                     <Chip
//                       label={user.role}
//                       color={user.role === "admin" ? "primary" : "secondary"}
//                       size="small"
//                     />
//                   </TableCell>

//                   <TableCell>
//                     {user.branch_name || "-"}
//                   </TableCell>

//                   <TableCell>
//                     <Chip
//                       label={user.is_active ? "Active" : "Inactive"}
//                       color={user.is_active ? "success" : "error"}
//                       size="small"
//                     />
//                   </TableCell>

//                   <TableCell>
//                     <Stack direction="row" spacing={1}>
//                       <Button
//                         variant="outlined"
//                         size="small"
//                         onClick={() =>
//                           navigate(`/admin/users/edit/${user.id}`)
//                         }
//                       >
//                         Edit
//                       </Button>

//                       <Button
//                         variant="contained"
//                         color="error"
//                         size="small"
//                         onClick={() => deleteUser(user.id)}
//                       >
//                         Delete
//                       </Button>
//                     </Stack>
//                   </TableCell>
//                 </TableRow>
//               ))
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Box>
//   );
// }

// export default AdminUsers;



import { Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
// import API from "../../services/api";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Alert,
  Stack,
  TextField,
  TablePagination,
  Button,
  Chip,
  InputAdornment,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

function AdminUsers() {
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");
  const [searchPincode, setSearchPincode] = useState("");
  const [searchDate, setSearchDate] = useState("");
  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => { fetchCustomers(); }, []);
  useEffect(() => { filterCustomers(); }, [searchPincode, searchDate, customers]);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const res = await API.get("/admin/customers");
         // ⏳ force skeleton visibility
    setTimeout(() => {
      setCustomers(res.data);
      setFilteredCustomers(res.data);
      setLoading(false);
    }, 800);
    } catch (err) {
      console.error("Error fetching customers", err);
      setError("Failed to load customers");
    } 
    // finally {
    //   setLoading(false);
    // }
  };

  const filterCustomers = () => {
    let data = [...customers];
    if (searchPincode) {
      data = data.filter(c => c.pincode.toString().includes(searchPincode));
    }
    if (searchDate) {
      data = data.filter(c =>
        new Date(c.created_at).toISOString().slice(0, 10) === searchDate
      );
    }
    setFilteredCustomers(data);
  };
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getStatusChip = (status) => {
    if (status === "Branch Found") return (
      <Chip
        label="Branch Found"
        size="small"
        sx={{
          backgroundColor: "#dcfce7",
          color: "#15803d",
          fontWeight: 700,
          fontSize: "0.7rem",
          letterSpacing: "0.04em",
          fontFamily: "'DM Mono', monospace",
          border: "1px solid #bbf7d0",
          borderRadius: "6px",
        }}
      />
    );
    if (status === "No Branch") return (
      <Chip
        label="No Branch"
        size="small"
        sx={{
          backgroundColor: "#fef2f2",
          color: "#b91c1c",
          fontWeight: 700,
          fontSize: "0.7rem",
          letterSpacing: "0.04em",
          fontFamily: "'DM Mono', monospace",
          border: "1px solid #fecaca",
          borderRadius: "6px",
        }}
      />
    );
    return (
      <Chip
        label="Pending"
        size="small"
        sx={{
          backgroundColor: "#fefce8",
          color: "#a16207",
          fontWeight: 700,
          fontSize: "0.7rem",
          letterSpacing: "0.04em",
          fontFamily: "'DM Mono', monospace",
          border: "1px solid #fde68a",
          borderRadius: "6px",
        }}
      />
    );
  };

  const inputSx = {
    "& .MuiOutlinedInput-root": {
      backgroundColor: "#f8fafc",
      borderRadius: "10px",
      fontFamily: "'DM Sans', sans-serif",
      fontSize: "0.875rem",
      "& fieldset": { borderColor: "#e2e8f0" },
      "&:hover fieldset": { borderColor: "#94a3b8" },
      "&.Mui-focused fieldset": { borderColor: "#6366f1", borderWidth: "1.5px" },
    },
    "& .MuiInputLabel-root": {
      fontFamily: "'DM Sans', sans-serif",
      fontSize: "0.875rem",
      color: "#94a3b8",
    },
    "& .MuiInputLabel-root.Mui-focused": { color: "#6366f1" },
  };
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
      `}</style>

      <Box sx={{
        minHeight: "100vh",
        backgroundColor: "#f1f5f9",
        p: { xs: 2, md: 4 },
        fontFamily: "'DM Sans', sans-serif",
      }}>

      
<Box
  sx={{
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    mb: 3,
    gap: 2,
  }}
>
  {/* LEFT SIDE */}
  <Stack direction="row" alignItems="center" spacing={2}>
    <Button
      variant="outlined"
      startIcon={<ArrowBackIcon />}
      onClick={() => navigate("/admin")}
      sx={{
        borderColor: "#cbd5e1",
        color: "#64748b",
        fontWeight: 600,
        textTransform: "none",
        borderRadius: "10px",
      }}
    >
      
    </Button>

    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: "12px",
          backgroundColor: "#6366f1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <PeopleAltIcon sx={{ color: "#fff", fontSize: "1.2rem" }} />
      </Box>

      <Box>
        <Typography fontWeight={700} fontSize="1.1rem">
          Customers
        </Typography>

        <Typography
          sx={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.7rem",
            color: "#94a3b8",
          }}
        >
          {filteredCustomers.length} RECORDS
        </Typography>
      </Box>
    </Box>
  </Stack>

  {/* RIGHT SIDE SEARCH */}
  <Stack direction="row" spacing={2}>
    <TextField
      label="Search by Pincode"
      value={searchPincode}
      onChange={(e) => setSearchPincode(e.target.value)}
      size="small"
      sx={{ ...inputSx, minWidth: 220 }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon sx={{ color: "#94a3b8", fontSize: "1rem" }} />
          </InputAdornment>
        ),
      }}
    />

    <TextField
      type="date"
      label="Filter by Date"
      InputLabelProps={{ shrink: true }}
      value={searchDate}
      onChange={(e) => setSearchDate(e.target.value)}
      size="small"
      sx={{ ...inputSx, minWidth: 200 }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <CalendarTodayIcon sx={{ color: "#94a3b8", fontSize: "0.9rem" }} />
          </InputAdornment>
        ),
      }}
    />

    {(searchPincode || searchDate) && (
      <Button
        variant="text"
        onClick={() => {
          setSearchPincode("");
          setSearchDate("");
        }}
        sx={{
          color: "#ef4444",
          fontWeight: 600,
          textTransform: "none",
        }}
      >
        Clear
      </Button>
    )}
  </Stack>
</Box>

        {error && (
          <Alert severity="error" sx={{
            mb: 2,
            borderRadius: "12px",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.875rem",
          }}>
            {error}
          </Alert>
        )}

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
                  {["Name", "Phone", "Pincode", "Date", "Status"].map((col) => (
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
                {/* {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 6 }}>
                      <CircularProgress size={28} sx={{ color: "#6366f1" }} />
                    </TableCell>
                  </TableRow>
                ) */}
{loading ? (
  [...Array(6)].map((_, idx) => (
    <TableRow
      key={idx}
      sx={{
        "&:last-child td": { borderBottom: 0 },
        backgroundColor: idx % 2 === 0 ? "#ffffff" : "#fdfeff",
      }}
    >
      <TableCell sx={{ py: 2, px: 3 }}>
        <Skeleton variant="text" width="70%" height={20} />
      </TableCell>

      <TableCell sx={{ py: 2, px: 3 }}>
        <Skeleton variant="text" width="60%" height={20} />
      </TableCell>

      <TableCell sx={{ py: 2, px: 3 }}>
        <Skeleton variant="text" width="40%" height={20} />
      </TableCell>

      <TableCell sx={{ py: 2, px: 3 }}>
        <Skeleton variant="text" width="80%" height={20} />
      </TableCell>

      <TableCell sx={{ py: 2, px: 3 }}>
        <Skeleton variant="rectangular" width={90} height={28} />
      </TableCell>
    </TableRow>
  ))
)
                 : filteredCustomers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{
                      py: 7,
                      fontFamily: "'DM Sans', sans-serif",
                      color: "#94a3b8",
                      fontSize: "0.9rem",
                    }}>
                      No customers found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCustomers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((customer, idx) => (
                      <TableRow
                        key={customer.id}
                        sx={{
                          "&:hover": { backgroundColor: "#f8fafc" },
                          "&:last-child td": { borderBottom: 0 },
                          transition: "background-color 0.15s ease",
                          backgroundColor: idx % 2 === 0 ? "#ffffff" : "#fdfeff",
                        }}
                      >
                        <TableCell sx={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontWeight: 600,
                          fontSize: "0.875rem",
                          color: "#0f172a",
                          borderBottom: "1px solid #f1f5f9",
                          py: 2,
                          px: 3,
                        }}>
                          {customer.name}
                        </TableCell>

                        <TableCell sx={{
                          fontFamily: "'DM Mono', monospace",
                          fontSize: "0.82rem",
                          color: "#475569",
                          borderBottom: "1px solid #f1f5f9",
                          py: 2,
                          px: 3,
                        }}>
                          {customer.phone}
                        </TableCell>

                        <TableCell sx={{
                          fontFamily: "'DM Mono', monospace",
                          fontSize: "0.82rem",
                          color: "#6366f1",
                          fontWeight: 500,
                          borderBottom: "1px solid #f1f5f9",
                          py: 2,
                          px: 3,
                        }}>
                          {customer.pincode}
                        </TableCell>

                        <TableCell sx={{
                          fontFamily: "'DM Mono', monospace",
                          fontSize: "0.78rem",
                          color: "#94a3b8",
                          borderBottom: "1px solid #f1f5f9",
                          py: 2,
                          px: 3,
                        }}>
                          {new Date(customer.created_at).toLocaleString()}
                        </TableCell>

                        <TableCell sx={{
                          borderBottom: "1px solid #f1f5f9",
                          py: 2,
                          px: 3,
                        }}>
                          {getStatusChip(customer.status)}
                        </TableCell>
                      </TableRow>
                    ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ borderTop: "1px solid #f1f5f9" }}>
            <TablePagination
              component="div"
              count={filteredCustomers.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10,20]}
              sx={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.8rem",
                color: "#64748b",
                "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.8rem",
                  color: "#64748b",
                },
                "& .MuiTablePagination-select": {
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.8rem",
                },
                "& .MuiIconButton-root": {
                  color: "#64748b",
                  "&:hover": { color: "#6366f1", backgroundColor: "#eef2ff" },
                  borderRadius: "8px",
                },
              }}
            />
          </Box>
        </Paper>
      </Box>
    </>
  );
}

export default AdminUsers;