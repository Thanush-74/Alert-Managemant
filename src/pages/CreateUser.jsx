import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate, useLocation } from "react-router-dom";

import {
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
  Stack,
  Paper,
  Avatar,
  Grid,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonIcon from "@mui/icons-material/Person";

function CreateUser() {
  const navigate = useNavigate();
  const location = useLocation();

  const [branches, setBranches] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: location.state?.role || "branch_user",
    branch_id: "",
  });

  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    try {
      const res = await API.get("/branches");

      const data = Array.isArray(res.data)
        ? res.data
        : res.data.branches || res.data.data || [];

      setBranches(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await API.post("/users", {
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
        branch_id: form.role === "branch_user" ? form.branch_id : null,
      });

      navigate("/admin/branch-users", { state: { refresh: true } });
    } catch (err) {
      console.error(err);
      alert("Failed to create user");
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* 🔙 Back Button */}
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/admin/branch-users/")}
        sx={{
          mb: 2,
          textTransform: "none",
          color: "#64748b",
        }}
      >
        
        
      </Button>

      {/* 🔷 Header */}
      <Stack direction="row" spacing={2} alignItems="center" mb={3}>
        <Avatar sx={{ bgcolor: "#6366f1" }}>
          <PersonIcon />
        </Avatar>

        <Box>
          <Typography fontWeight={700} fontSize={20}>
            Create User
          </Typography>
          <Typography variant="caption" color="#6b7280">
            Add a new user and assign role
          </Typography>
        </Box>
      </Stack>

      {/* 📄 Form Card */}
      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: "16px",
          border: "1px solid #e2e8f0",
          maxWidth: 700,
        }}
      >
        <Grid container spacing={3}>
          {/* Name */}
          <Grid item xs={12}>
            <TextField
              label="Full Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          {/* Email */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Email Address"
              name="email"
              value={form.email}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          {/* Password */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          {/* Role */}
          <Grid item xs={12} md={6}>
            <TextField
              select
              label="Role"
              name="role"
              value={form.role}
              onChange={handleChange}
              fullWidth
              disabled={location.state?.role === "branch_user"}
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="branch_user">Branch User</MenuItem>
            </TextField>
          </Grid>

          {/* Branch (Conditional) */}
          {form.role === "branch_user" && (
            <Grid item xs={12} md={6}>
              <TextField
                select
                label="Select Branch"
                name="branch_id"
                value={form.branch_id}
                onChange={handleChange}
                fullWidth
                required
              >
                {branches.map((b) => (
                  <MenuItem key={b.id} value={b.id}>
                    {b.branch_name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          )}

          {/* Buttons */}
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="flex-end" spacing={2}>
              <Button
                variant="outlined"
                onClick={() => navigate("/branch-users")}
                sx={{
                  borderRadius: "10px",
                  textTransform: "none",
                }}
              >
                Cancel
              </Button>

              <Button
                variant="contained"
                onClick={handleSubmit}
                sx={{
                  borderRadius: "10px",
                  textTransform: "none",
                  bgcolor: "#6366f1",
                  "&:hover": { bgcolor: "#4f46e5" },
                }}
              >
                Create User
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default CreateUser;


// import React, { useEffect, useState } from "react";
// import API from "../services/api";
// import { useNavigate, useLocation } from "react-router-dom";
// import {
//   Box,
//   TextField,
//   Button,
//   MenuItem,
//   Typography,
//   Stack,
//   Paper,
// } from "@mui/material";

// function CreateUser() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [branches, setBranches] = useState([]);

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: location.state?.role || "branch_user",
//     branch_id: "",
//   });

//   useEffect(() => {
//     fetchBranches();
//   }, []);

//   const fetchBranches = async () => {
//     try {
//       const res = await API.get("/branches");

//       const data = Array.isArray(res.data)
//         ? res.data
//         : res.data.branches || res.data.data || [];

//       setBranches(data);
//     } catch (err) {
//       console.error("Error fetching branches:", err);
//     }
//   };

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async () => {
//     try {
//       await API.post("/users", {
//         name: form.name,
//         email: form.email,
//         password: form.password,
//         role: form.role,
//         branch_id: form.role === "branch_user" ? form.branch_id : null,
//       });

//       // navigate("/admin/users");
//       navigate("/admin/branch-users", { state: { refresh: true } });
//     } catch (err) {
//       console.error(err);
//       alert("Failed to create user");
//     }
//   };

//   return (
//     <Box p={3}>
//       <Typography variant="h5" mb={3}>
//         Create User
//       </Typography>

//       <Paper sx={{ p: 4, maxWidth: 500 }}>
//         <Stack spacing={3}>
//           <TextField
//             label="Name"
//             name="name"
//             value={form.name}
//             onChange={handleChange}
//             fullWidth
//           />

//           <TextField
//             label="Email"
//             name="email"
//             value={form.email}
//             onChange={handleChange}
//             fullWidth
//           />

//           <TextField
//             label="Password"
//             type="password"
//             name="password"
//             value={form.password}
//             onChange={handleChange}
//             fullWidth
//           />

//           <TextField
//             select
//             label="Role"
//             name="role"
//             value={form.role}
//             onChange={handleChange}
//             fullWidth
//             disabled={location.state?.role === "branch_user"}
//           >
//             <MenuItem value="admin">Admin</MenuItem>
//             <MenuItem value="branch_user">Branch User</MenuItem>
//           </TextField>

//           {form.role === "branch_user" && (
//             <TextField
//               select
//               label="Select Branch"
//               name="branch_id"
//               value={form.branch_id}
//               onChange={handleChange}
//               fullWidth
//             >
//               {Array.isArray(branches) &&
//                 branches.map((b) => (
//                   <MenuItem key={b.id} value={b.id}>
//                     {b.branch_name}
//                   </MenuItem>
//                 ))}
//             </TextField>
//           )}

//           <Button variant="contained" onClick={handleSubmit}>
//             Create User
//           </Button>
//         </Stack>
//       </Paper>
//     </Box>
//   );
// }

// export default CreateUser;