// import React, { useEffect, useState } from "react";
// import API from "../services/api";
// import { useNavigate } from "react-router-dom";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import SearchIcon from "@mui/icons-material/Search";
// import RefreshIcon from "@mui/icons-material/Refresh";
// import AddIcon from "@mui/icons-material/Add";
// import EditIcon from "@mui/icons-material/Edit";
// import HistoryIcon from "@mui/icons-material/History";
// import { Tooltip } from "@mui/material";

// import {
//   Box,
//   Typography,
//   Paper,
//   Table,
//   TablePagination,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   Stack,
//   Button,
//   Chip,
//   Divider,
//   InputAdornment,
// } from "@mui/material";

// function AdminBranches() {
//   const [branches, setBranches] = useState([]);
//   const [total, setTotal] = useState(0);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [searchPincode, setSearchPincode] = useState("");



//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchBranches();
//   }, [page, rowsPerPage]);

//   const fetchBranches = async () => {
//     try {
//       const res = await API.get(
//         `/branches?page=${page + 1}&limit=${rowsPerPage}`
//       );
//       setBranches(res.data.data);
//       setTotal(res.data.total);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const toggleStatus = async (id) => {
//     try {
//       await API.put(`/branches/toggle/${id}`);
//       fetchBranches();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleSearch = async () => {
//     try {
//       const res = await API.get(
//         `/branches/search-by-pincode?pincode=${searchPincode}`
//       );
//       setBranches(res.data);
//       setTotal(res.data.length);
//       setPage(0);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleReset = () => {
//     setSearchPincode("");
//     fetchBranches();
//   };

//   return (
//     <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: "#f0f2f7", minHeight: "100vh" }}>

//       {/* ── HEADER ── */}
//       {/* <Stack
//         direction="row"
//         alignItems="center"
//         justifyContent="space-between"
//         flexWrap="wrap"
//         gap={2}
//         mb={4}
//       > */}
//       <Stack
//   direction="row"
//   alignItems="center"
//   justifyContent="space-between"
//   flexWrap="nowrap"
//   gap={2}
//   mb={4}
// >
//         {/* LEFT */}
//         {/* <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap" gap={1}> */}
//         <Stack direction="row" spacing={2} alignItems="center" flexWrap="nowrap" gap={2}>
//           <Button
//             variant="outlined"
//             startIcon={<ArrowBackIcon />}
//             onClick={() => navigate("/admin")}
//             sx={{
//               borderColor: "#d1d5db",
//               borderRadius: "8px",
//               "&:hover": { borderColor: "#2563eb", color: "#2563eb", bgcolor: "#eff4ff" },
//             }}
//           >
            
//           </Button>

//           <Box>
//             <Typography
//               variant="h5"
//               fontWeight={700}
//               sx={{ fontFamily: "'Space Grotesk', sans-serif",fontSize :18 ,fontWeight:700,  color: "#0f1735" }}
//             >
//               Branch Management
//             </Typography>
//             <Typography variant="caption" sx={{ color: "#6b7a9e" }}>
//               Manage branches, pincodes and incharges
//             </Typography>
//           </Box>

//           {/* SEARCH */}
//           <Stack direction="row" spacing={1} sx={{ ml: { md: 3 } }}>
//             <TextField
//               placeholder="Search by Pincode"
//               size="small"
//               value={searchPincode}
//               onChange={(e) => setSearchPincode(e.target.value)}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <SearchIcon sx={{ fontSize: 16, color: "#a0aec0" }} />
//                   </InputAdornment>
//                 ),
//               }}
//               sx={{
//                 width: 200,
//                 "& .MuiOutlinedInput-root": {
//                   borderRadius: "9px",
//                   bgcolor: "#fff",
//                   fontSize: "13.5px",
//                   "& fieldset": { borderColor: "#e4e8f0" },
//                   "&:hover fieldset": { borderColor: "#2563eb" },
//                   "&.Mui-focused fieldset": { borderColor: "#2563eb", borderWidth: "1.5px" },
//                 },
//               }}
//             />
//             <Button
//               variant="contained"
//               onClick={handleSearch}
//               sx={{
//                 bgcolor: "#2563eb",
//                 borderRadius: "8px",
//                 textTransform: "none",
//                 fontWeight: 700,
//                 fontSize: "13px",
//                 boxShadow: "0 2px 8px rgba(37,99,235,0.25)",
//                 "&:hover": { bgcolor: "#1d4ed8" },
//               }}
//             >
//               Search
//             </Button>
//             <Button
//               variant="outlined"
//               onClick={handleReset}
//               startIcon={<RefreshIcon sx={{ fontSize: 15 }} />}
//               sx={{
//                 borderColor: "#d1d5db",
//                 color: "#6b7a9e",
//                 borderRadius: "8px",
//                 textTransform: "none",
//                 fontWeight: 600,
//                 fontSize: "13px",
//                 "&:hover": { borderColor: "#6b7a9e", color: "#0f1735" },
//               }}
//             >
//               Reset
//             </Button>
//           </Stack>
//         </Stack>

//         {/* RIGHT */}
//         <Button
//           variant="contained"
//           size="small"
//           startIcon={<AddIcon />}
//           onClick={() => navigate("/admin/branches/create")}
//           sx={{
//             background: "linear-gradient(135deg, #1e3a8a, #2563eb)",
//             borderRadius: "10px",
//             textTransform: "none",
//             fontWeight: 600,
//             fontSize: "12px",
//             px: 3,
//             boxShadow: "0 3px 12px rgba(37,99,235,0.35)",
//             "&:hover": {
//               background: "linear-gradient(135deg, #1e3a8a, #1d4ed8)",
//               boxShadow: "0 6px 20px rgba(37,99,235,0.4)",
//               transform: "translateY(-1px)",
//             },
//             transition: "all 0.18s",
//           }}
//         >
//           Create Branch
//         </Button>
//       </Stack>

//       {/* ── TABLE CARD ── */}
//       <Paper
//         elevation={0}
//         sx={{
//           borderRadius: "14px",
//           border: "1px solid #e4e8f0",
//           overflow: "hidden",
//           boxShadow: "0 2px 12px rgba(15,23,53,0.06)",
//         }}
//       >
//         {/* Toolbar */}
//         <Stack
//           direction="row"
//           alignItems="center"
//           px={3}
//           py={1.8}
//           sx={{ borderBottom: "1px solid #e4e8f0", bgcolor: "#fff" }}
//           gap={1.5}
//         >
//           <Typography sx={{ fontSize: "13.5px", fontWeight: 600, color: "#6b7a9e" }}>
//             All Branches
//           </Typography>
//           <Chip
//             label={`${total} total`}
//             size="small"
//             sx={{
//               bgcolor: "#eff4ff", color: "#2563eb",
//               fontWeight: 700, fontSize: "11px", height: "22px",
//             }}
//           />
//         </Stack>

//         <TableContainer>
//           <Table>
//             {/* HEAD */}
//             <TableHead>
//               <TableRow sx={{ bgcolor: "#f7f8fc" }}>
//                 {["#", "Branch Name", "City", "Incharge", "Pincodes", "Status", "Actions"].map((h) => (
//                   <TableCell
//                     key={h}
//                     sx={{
//                       fontSize: "11px",
//                       fontWeight: 700,
//                       textTransform: "uppercase",
//                       letterSpacing: "0.6px",
//                       color: "#a0aec0",
//                       py: 1.5,
//                       borderBottom: "1px solid #e4e8f0",
//                       ...(h === "Actions" && { textAlign: "right", pr: 3 }),
//                       ...(h === "#" && { pl: 3, width: 48 }),
//                     }}
//                   >
//                     {h}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>

//             {/* BODY */}
//             <TableBody>
//               {branches.length === 0 ? (
//                 <TableRow>
//                   <TableCell
//                     colSpan={7}
//                     align="center"
//                     sx={{ py: 8, color: "#a0aec0", fontSize: "14px" }}
//                   >
//                     No Branches Found
//                   </TableCell>
//                 </TableRow>
//               ) : (
//                 branches.map((branch, index) => {
//                   const isActive = branch.is_active;

//                   return (
//                     <TableRow
//                       key={branch.id}
//                       hover
//                       sx={{
//                         "&:hover": { bgcolor: "#f7f8fc" },
//                         "&:last-child td": { borderBottom: 0 },
//                       }}
//                     >
//                       {/* # */}
//                       <TableCell sx={{ color: "#a0aec0", fontSize: "13px", pl: 3 }}>
//                         {String(page * rowsPerPage + index + 1).padStart(2, "0")}
//                       </TableCell>

//                       {/* Branch Name */}
//                       <TableCell>
//                         <Stack direction="row" alignItems="center" gap={1}>
//                           <Box
//                             sx={{
//                               width: 8, height: 8, borderRadius: "50%",
//                               bgcolor: isActive ? "#10b981" : "#ef4444",
//                               flexShrink: 0,
//                             }}
//                           />
//                           <Typography sx={{ fontWeight: 600, fontSize: "14px" }}>
//                             {branch.branch_name}
//                           </Typography>
//                         </Stack>
//                       </TableCell>

//                       {/* City */}
//                       <TableCell sx={{ fontSize: "13.5px", color: "#6b7a9e" }}>
//                         {branch.city}
//                       </TableCell>

//                       {/* Incharge */}
//                       <TableCell sx={{ fontSize: "13.5px" }}>
                        
//                         {branch.branch_incharge}
//                       </TableCell>
                      

//                       {/* Pincodes */}
//                       {/* <TableCell>
//                         {branch.pincod/es ? (
//                           <Chip
//                             label={branch.pincodes}
//                             size="small"
//                             sx={{
//                               bgcolor: "#f7f8fc",
//                               border: "1px solid #e4e8f0",
//                               color: "#6b7a9e",
//                               fontWeight: 700,
//                               fontSize: "12px",
//                               height: "24px",
//                               borderRadius: "6px",
//                             }}
//                           />
//                         ) : (
//                           <Typography sx={{ color: "#c4cad9", fontSize: "14px" }}>—</Typography>
//                         )}
//                       </TableCell> */}
// <TableCell sx={{ maxWidth: 260 }}>
//   {branch.pincodes ? (
//     <Stack direction="row" spacing={0.6} alignItems="center" flexWrap="wrap">
//       {branch.pincodes
//         .split(",")
//         .slice(0, 3)
//         .map((pin, i) => (
//           <Chip
//             key={i}
//             label={pin.trim()}
//             size="small"
//             sx={{
//               bgcolor: "#f7f8fc",
//               border: "1px solid #e4e8f0",
//               color: "#6b7a9e",
//               fontWeight: 600,
//               fontSize: "11px",
//               height: "22px",
//               borderRadius: "6px",
//             }}
//           />
//         ))}

//       {branch.pincodes.split(",").length > 3 && (
//         <Tooltip title={branch.pincodes}>
//           <Typography
//             sx={{
//               fontSize: "11px",
//               fontWeight: 700,
//               color: "#2563eb",
//               cursor: "pointer",
//               ml: 0.5,
//             }}
//           >
//             +{branch.pincodes.split(",").length - 3} more
//           </Typography>
//         </Tooltip>
//       )}
//     </Stack>
//   ) : (
//     <Typography sx={{ color: "#c4cad9", fontSize: "14px" }}>—</Typography>
//   )}
// </TableCell>

//                       {/* Status */}
//                       <TableCell>
//                         <Chip
//                           label={isActive ? "Active" : "Inactive"}
//                           size="small"
//                           sx={{
//                             bgcolor: isActive ? "#ecfdf5" : "#fef2f2",
//                             color: isActive ? "#10b981" : "#ef4444",
//                             fontWeight: 700,
//                             fontSize: "11px",
//                             letterSpacing: "0.3px",
//                             height: "24px",
//                             borderRadius: "20px",
//                             textTransform: "uppercase",
//                           }}
//                         />
//                       </TableCell>

//                       {/* Actions */}
//                       <TableCell sx={{ pr: 3 }}>
//                         <Stack direction="row" spacing={0.8} justifyContent="flex-end">
//                           <Button
//                             size="small"
//                             variant="outlined"
//                             startIcon={<EditIcon sx={{ fontSize: "13px !important" }} />}
//                             onClick={() => navigate(`/admin/branches/edit/${branch.id}`)}
//                             sx={{
//                               borderColor: "#e4e8f0",
//                               color: "#6b7a9e",
//                               borderRadius: "7px",
//                               textTransform: "none",
//                               fontWeight: 700,
//                               fontSize: "12px",
//                               py: 0.5,
//                               "&:hover": { borderColor: "#2563eb", color: "#2563eb", bgcolor: "#eff4ff" },
//                             }}
//                           >
//                             Edit
//                           </Button>

//                           <Button
//                             size="small"
//                             variant="contained"
//                             startIcon={<HistoryIcon sx={{ fontSize: "13px !important" }} />}
//                             onClick={() => navigate(`/admin/branches/history/${branch.id}`)}
//                             sx={{
//                               bgcolor: "#fff7ed",
//                               color: "#c2410c",
//                               border: "1.5px solid #fed7aa",
//                               borderRadius: "7px",
//                               textTransform: "none",
//                               fontWeight: 700,
//                               fontSize: "12px",
//                               py: 0.5,
//                               boxShadow: "none",
//                               "&:hover": { bgcolor: "#ffedd5", boxShadow: "none" },
//                             }}
//                           >
//                             History
//                           </Button>

//                           <Button
//                             size="small"
//                             variant="contained"
//                             onClick={() => toggleStatus(branch.id)}
//                             sx={{
//                               bgcolor: isActive ? "#fef2f2" : "#ecfdf5",
//                               color: isActive ? "#ef4444" : "#10b981",
//                               border: `1.5px solid ${isActive ? "#fecaca" : "#a7f3d0"}`,
//                               borderRadius: "7px",
//                               textTransform: "none",
//                               fontWeight: 700,
//                               fontSize: "12px",
//                               py: 0.5,
//                               boxShadow: "none",
//                               "&:hover": {
//                                 bgcolor: isActive ? "#fee2e2" : "#d1fae5",
//                                 boxShadow: "none",
//                               },
//                             }}
//                           >
//                             {isActive ? "Disable" : "Enable"}
//                           </Button>
//                         </Stack>
//                       </TableCell>
//                     </TableRow>
//                   );
//                 })
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         <Divider sx={{ borderColor: "#e4e8f0" }} />

//         <TablePagination
//           component="div"
//           count={total}
//           page={page}
//           rowsPerPage={rowsPerPage}
//           onPageChange={(e, newPage) => setPage(newPage)}
//           onRowsPerPageChange={(e) => {
//             setRowsPerPage(parseInt(e.target.value, 10));
//             setPage(0);
//           }}
//           rowsPerPageOptions={[5, 10, 20]}
//           sx={{
//             fontSize: "13px",
//             color: "#6b7a9e",
//             "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
//               fontSize: "13px",
//             },
//           }}
//         />
//       </Paper>
//     </Box>
//   );
// }

// export default AdminBranches;



import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import HistoryIcon from "@mui/icons-material/History";
import { Tooltip, Skeleton } from "@mui/material";

import {
  Box,
  Typography,
  Paper,
  Table,
  TablePagination,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Stack,
  Button,
  Chip,
  Divider,
  InputAdornment,
} from "@mui/material";

function AdminBranches() {
  const [branches, setBranches] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchPincode, setSearchPincode] = useState("");
  const [loading, setLoading] = useState(true); // ✅ ADDED

  const navigate = useNavigate();

  useEffect(() => {
    fetchBranches();
  }, [page, rowsPerPage]);

  const fetchBranches = async () => {
    setLoading(true); // ✅ always reset on each fetch
    try {
      const res = await API.get(
        `/branches?page=${page + 1}&limit=${rowsPerPage}`
      );

      // ✅ delay so skeleton is visible
      setTimeout(() => {
        setBranches(res.data.data);
        setTotal(res.data.total);
        setLoading(false);
      }, 2000);

    } catch (err) {
      console.error(err);
      setLoading(false); // ✅ hide skeleton on error
    }
  };

  const toggleStatus = async (id) => {
    try {
      await API.put(`/branches/toggle/${id}`);
      fetchBranches();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = async () => {
    try {
      const res = await API.get(
        `/branches/search-by-pincode?pincode=${searchPincode}`
      );
      setBranches(res.data);
      setTotal(res.data.length);
      setPage(0);
    } catch (err) {
      console.error(err);
    }
  };

  const handleReset = () => {
    setSearchPincode("");
    fetchBranches();
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: "#f0f2f7", minHeight: "100vh" }}>

      {/* ── HEADER ── */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        flexWrap="nowrap"
        gap={2}
        mb={4}
      >
        {/* LEFT */}
        <Stack direction="row" spacing={2} alignItems="center" flexWrap="nowrap" gap={2}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/admin")}
            sx={{
              borderColor: "#d1d5db",
              borderRadius: "8px",
              "&:hover": { borderColor: "#2563eb", color: "#2563eb", bgcolor: "#eff4ff" },
            }}
          >
          </Button>

          <Box>
            <Typography
              variant="h5"
              fontWeight={700}
              sx={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 700, color: "#0f1735" }}
            >
              Branch Management
            </Typography>
            <Typography variant="caption" sx={{ color: "#6b7a9e" }}>
              Manage branches, pincodes and incharges
            </Typography>
          </Box>

          {/* SEARCH */}
          <Stack direction="row" spacing={1} sx={{ ml: { md: 3 } }}>
            <TextField
              placeholder="Search by Pincode"
              size="small"
              value={searchPincode}
              onChange={(e) => setSearchPincode(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ fontSize: 16, color: "#a0aec0" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                width: 200,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "9px",
                  bgcolor: "#fff",
                  fontSize: "13.5px",
                  "& fieldset": { borderColor: "#e4e8f0" },
                  "&:hover fieldset": { borderColor: "#2563eb" },
                  "&.Mui-focused fieldset": { borderColor: "#2563eb", borderWidth: "1.5px" },
                },
              }}
            />
            <Button
              variant="contained"
              onClick={handleSearch}
              sx={{
                bgcolor: "#2563eb",
                borderRadius: "8px",
                textTransform: "none",
                fontWeight: 700,
                fontSize: "13px",
                boxShadow: "0 2px 8px rgba(37,99,235,0.25)",
                "&:hover": { bgcolor: "#1d4ed8" },
              }}
            >
              Search
            </Button>
            <Button
              variant="outlined"
              onClick={handleReset}
              startIcon={<RefreshIcon sx={{ fontSize: 15 }} />}
              sx={{
                borderColor: "#d1d5db",
                color: "#6b7a9e",
                borderRadius: "8px",
                textTransform: "none",
                fontWeight: 600,
                fontSize: "13px",
                "&:hover": { borderColor: "#6b7a9e", color: "#0f1735" },
              }}
            >
              Reset
            </Button>
          </Stack>
        </Stack>

        {/* RIGHT */}
        <Button
          variant="contained"
          size="small"
          startIcon={<AddIcon />}
          onClick={() => navigate("/admin/branches/create")}
          sx={{
            background: "linear-gradient(135deg, #1e3a8a, #2563eb)",
            borderRadius: "10px",
            textTransform: "none",
            fontWeight: 600,
            fontSize: "12px",
            px: 3,
            boxShadow: "0 3px 12px rgba(37,99,235,0.35)",
            "&:hover": {
              background: "linear-gradient(135deg, #1e3a8a, #1d4ed8)",
              boxShadow: "0 6px 20px rgba(37,99,235,0.4)",
              transform: "translateY(-1px)",
            },
            transition: "all 0.18s",
          }}
        >
          Create Branch
        </Button>
      </Stack>

      {/* ── TABLE CARD ── */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: "14px",
          border: "1px solid #e4e8f0",
          overflow: "hidden",
          boxShadow: "0 2px 12px rgba(15,23,53,0.06)",
        }}
      >
        {/* Toolbar */}
        <Stack
          direction="row"
          alignItems="center"
          px={3}
          py={1.8}
          sx={{ borderBottom: "1px solid #e4e8f0", bgcolor: "#fff" }}
          gap={1.5}
        >
          <Typography sx={{ fontSize: "13.5px", fontWeight: 600, color: "#6b7a9e" }}>
            All Branches
          </Typography>
          <Chip
            label={`${total} total`}
            size="small"
            sx={{
              bgcolor: "#eff4ff", color: "#2563eb",
              fontWeight: 700, fontSize: "11px", height: "22px",
            }}
          />
        </Stack>

        <TableContainer>
          <Table>
            {/* HEAD */}
            <TableHead>
              <TableRow sx={{ bgcolor: "#f7f8fc" }}>
                {["#", "Branch Name", "City", "Incharge", "Pincodes", "Status", "Actions"].map((h) => (
                  <TableCell
                    key={h}
                    sx={{
                      fontSize: "11px",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.6px",
                      color: "#a0aec0",
                      py: 1.5,
                      borderBottom: "1px solid #e4e8f0",
                      ...(h === "Actions" && { textAlign: "right", pr: 3 }),
                      ...(h === "#" && { pl: 3, width: 48 }),
                    }}
                  >
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            {/* BODY */}
            <TableBody>

              {/* ✅ SKELETON ROWS */}
              {loading &&
                Array.from({ length: rowsPerPage }).map((_, i) => (
                  <TableRow key={i} sx={{ "&:last-child td": { borderBottom: 0 } }}>

                    {/* # */}
                    <TableCell sx={{ pl: 3 }}>
                      <Skeleton width={24} height={18} />
                    </TableCell>

                    {/* Branch Name: dot + name */}
                    <TableCell>
                      <Stack direction="row" alignItems="center" gap={1}>
                        <Skeleton variant="circular" width={8} height={8} />
                        <Skeleton width={120} height={18} />
                      </Stack>
                    </TableCell>

                    {/* City */}
                    <TableCell>
                      <Skeleton width={80} height={18} />
                    </TableCell>

                    {/* Incharge */}
                    <TableCell>
                      <Skeleton width={100} height={18} />
                    </TableCell>

                    {/* Pincodes: 3 chip shapes */}
                    <TableCell>
                      <Stack direction="row" spacing={0.6} alignItems="center">
                        <Skeleton variant="rounded" width={52} height={22} sx={{ borderRadius: "6px" }} />
                        <Skeleton variant="rounded" width={52} height={22} sx={{ borderRadius: "6px" }} />
                        <Skeleton variant="rounded" width={52} height={22} sx={{ borderRadius: "6px" }} />
                      </Stack>
                    </TableCell>

                    {/* Status: chip */}
                    <TableCell>
                      <Skeleton variant="rounded" width={64} height={24} sx={{ borderRadius: "20px" }} />
                    </TableCell>

                    {/* Actions: 3 buttons */}
                    <TableCell sx={{ pr: 3 }}>
                      <Stack direction="row" spacing={0.8} justifyContent="flex-end">
                        <Skeleton variant="rounded" width={58} height={30} sx={{ borderRadius: "7px" }} />
                        <Skeleton variant="rounded" width={72} height={30} sx={{ borderRadius: "7px" }} />
                        <Skeleton variant="rounded" width={68} height={30} sx={{ borderRadius: "7px" }} />
                      </Stack>
                    </TableCell>

                  </TableRow>
                ))}

              {/* EMPTY STATE */}
              {!loading && branches.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    align="center"
                    sx={{ py: 8, color: "#a0aec0", fontSize: "14px" }}
                  >
                    No Branches Found
                  </TableCell>
                </TableRow>
              )}

              {/* REAL ROWS */}
              {!loading &&
                branches.map((branch, index) => {
                  const isActive = branch.is_active;

                  return (
                    <TableRow
                      key={branch.id}
                      hover
                      sx={{
                        "&:hover": { bgcolor: "#f7f8fc" },
                        "&:last-child td": { borderBottom: 0 },
                      }}
                    >
                      {/* # */}
                      <TableCell sx={{ color: "#a0aec0", fontSize: "13px", pl: 3 }}>
                        {String(page * rowsPerPage + index + 1).padStart(2, "0")}
                      </TableCell>

                      {/* Branch Name */}
                      <TableCell>
                        <Stack direction="row" alignItems="center" gap={1}>
                          <Box
                            sx={{
                              width: 8, height: 8, borderRadius: "50%",
                              bgcolor: isActive ? "#10b981" : "#ef4444",
                              flexShrink: 0,
                            }}
                          />
                          <Typography sx={{ fontWeight: 600, fontSize: "14px" }}>
                            {branch.branch_name}
                          </Typography>
                        </Stack>
                      </TableCell>

                      {/* City */}
                      <TableCell sx={{ fontSize: "13.5px", color: "#6b7a9e" }}>
                        {branch.city}
                      </TableCell>

                      {/* Incharge */}
                      <TableCell sx={{ fontSize: "13.5px" }}>
                        {branch.branch_incharge}
                      </TableCell>

                      {/* Pincodes */}
                      <TableCell sx={{ maxWidth: 260 }}>
                        {branch.pincodes ? (
                          <Stack direction="row" spacing={0.6} alignItems="center" flexWrap="wrap">
                            {branch.pincodes
                              .split(",")
                              .slice(0, 3)
                              .map((pin, i) => (
                                <Chip
                                  key={i}
                                  label={pin.trim()}
                                  size="small"
                                  sx={{
                                    bgcolor: "#f7f8fc",
                                    border: "1px solid #e4e8f0",
                                    color: "#6b7a9e",
                                    fontWeight: 600,
                                    fontSize: "11px",
                                    height: "22px",
                                    borderRadius: "6px",
                                  }}
                                />
                              ))}
                            {branch.pincodes.split(",").length > 3 && (
                              <Tooltip title={branch.pincodes}>
                                <Typography
                                  sx={{
                                    fontSize: "11px",
                                    fontWeight: 700,
                                    color: "#2563eb",
                                    cursor: "pointer",
                                    ml: 0.5,
                                  }}
                                >
                                  +{branch.pincodes.split(",").length - 3} more
                                </Typography>
                              </Tooltip>
                            )}
                          </Stack>
                        ) : (
                          <Typography sx={{ color: "#c4cad9", fontSize: "14px" }}>—</Typography>
                        )}
                      </TableCell>

                      {/* Status */}
                      <TableCell>
                        <Chip
                          label={isActive ? "Active" : "Inactive"}
                          size="small"
                          sx={{
                            bgcolor: isActive ? "#ecfdf5" : "#fef2f2",
                            color: isActive ? "#10b981" : "#ef4444",
                            fontWeight: 700,
                            fontSize: "11px",
                            letterSpacing: "0.3px",
                            height: "24px",
                            borderRadius: "20px",
                            textTransform: "uppercase",
                          }}
                        />
                      </TableCell>

                      {/* Actions */}
                      <TableCell sx={{ pr: 3 }}>
                        <Stack direction="row" spacing={0.8} justifyContent="flex-end">
                          <Button
                            size="small"
                            variant="outlined"
                            startIcon={<EditIcon sx={{ fontSize: "13px !important" }} />}
                            onClick={() => navigate(`/admin/branches/edit/${branch.id}`)}
                            sx={{
                              borderColor: "#e4e8f0",
                              color: "#6b7a9e",
                              borderRadius: "7px",
                              textTransform: "none",
                              fontWeight: 700,
                              fontSize: "12px",
                              py: 0.5,
                              "&:hover": { borderColor: "#2563eb", color: "#2563eb", bgcolor: "#eff4ff" },
                            }}
                          >
                            Edit
                          </Button>

                          <Button
                            size="small"
                            variant="contained"
                            startIcon={<HistoryIcon sx={{ fontSize: "13px !important" }} />}
                            onClick={() => navigate(`/admin/branches/history/${branch.id}`)}
                            sx={{
                              bgcolor: "#fff7ed",
                              color: "#c2410c",
                              border: "1.5px solid #fed7aa",
                              borderRadius: "7px",
                              textTransform: "none",
                              fontWeight: 700,
                              fontSize: "12px",
                              py: 0.5,
                              boxShadow: "none",
                              "&:hover": { bgcolor: "#ffedd5", boxShadow: "none" },
                            }}
                          >
                            History
                          </Button>

                          <Button
                            size="small"
                            variant="contained"
                            onClick={() => toggleStatus(branch.id)}
                            sx={{
                              bgcolor: isActive ? "#fef2f2" : "#ecfdf5",
                              color: isActive ? "#ef4444" : "#10b981",
                              border: `1.5px solid ${isActive ? "#fecaca" : "#a7f3d0"}`,
                              borderRadius: "7px",
                              textTransform: "none",
                              fontWeight: 700,
                              fontSize: "12px",
                              py: 0.5,
                              boxShadow: "none",
                              "&:hover": {
                                bgcolor: isActive ? "#fee2e2" : "#d1fae5",
                                boxShadow: "none",
                              },
                            }}
                          >
                            {isActive ? "Disable" : "Enable"}
                          </Button>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  );
                })}

            </TableBody>
          </Table>
        </TableContainer>

        <Divider sx={{ borderColor: "#e4e8f0" }} />

        <TablePagination
          component="div"
          count={total}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={(e, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
          rowsPerPageOptions={[5, 10, 20]}
          sx={{
            fontSize: "13px",
            color: "#6b7a9e",
            "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
              fontSize: "13px",
            },
          }}
        />
      </Paper>
    </Box>
  );
}

export default AdminBranches;