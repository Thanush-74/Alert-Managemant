
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import API from "../services/api";
// import {
//   Box,
//   TextField,
//   Button,
//   Stack,
//   Typography,
//   Paper,
//   Divider,
//   MenuItem,
//   Switch,
//   FormControlLabel
// } from "@mui/material";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// function EditUser() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     role: "",
//     is_active: true,
//     branch_id: "",
//   });

//   useEffect(() => {
//     fetchUser();
//   }, []);

//   const fetchUser = async () => {
//     try {
//       const res = await API.get(`/users/${id}`);
//       setForm(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setForm({
//       ...form,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const handleSubmit = async () => {
//     try {
//       await API.put(`/users/${id}`, form);
//       navigate("/admin/users");
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <Box p={4} display="flex" justifyContent="center">
//       <Paper
//         elevation={3}
//         sx={{
//           width: "100%",
//           maxWidth: 600,
//           borderRadius: 3,
//           p: 4,
//         }}
//       >
//         {/* 🔙 Header */}
//         <Stack direction="row" alignItems="center" spacing={2} mb={3}>
//           <Button
//             variant="outlined"
//             startIcon={<ArrowBackIcon />}
//             onClick={() => navigate(-1)}
//           >
          
//           </Button>

//           <Typography variant="h5" fontWeight="bold">
//             Edit User
//           </Typography>
//         </Stack>

//         <Divider sx={{ mb: 3 }} />

//         {/* 🧾 Form */}
//         <Stack spacing={3}>
//           <TextField
//             label="Full Name"
//             name="name"
//             fullWidth
//             value={form.name}
//             onChange={handleChange}
//           />

//           <TextField
//             label="Email Address"
//             name="email"
//             fullWidth
//             value={form.email}
//             onChange={handleChange}
//           />

//           {/* 🎯 Role Dropdown */}
//           <TextField
//             select
//             label="Role"
//             name="role"
//             value={form.role}
//             onChange={handleChange}
//             fullWidth
//           >
//             <MenuItem value="admin">Admin</MenuItem>
//             <MenuItem value="branch_user">Branch User</MenuItem>
//           </TextField>

//           {/* 🟢 Active Switch */}
//           <FormControlLabel
//             control={
//               <Switch
//                 checked={form.is_active}
//                 onChange={handleChange}
//                 name="is_active"
//               />
//             }
//             label={form.is_active ? "Active User" : "Inactive User"}
//           />

//           {/* 🚀 Actions */}
//           <Stack direction="row" spacing={2} justifyContent="flex-end">
//             <Button
//               variant="outlined"
//               color="secondary"
//               onClick={() => navigate(-1)}
//             >
//               Cancel
//             </Button>

//             <Button
//               variant="contained"
//               onClick={handleSubmit}
//               sx={{
//                 px: 4,
//                 fontWeight: "bold",
//               }}
//             >
//               Update User
//             </Button>
//           </Stack>
//         </Stack>
//       </Paper>
//     </Box>
//   );
// }

// export default EditUser;


import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import {
  Box,
  TextField,
  Button,
  Stack,
  Typography,
  Paper,
  Divider,
  MenuItem,
  Switch,
  FormControlLabel
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    is_active: true,
    branch_id: "",
  });

  useEffect(() => {
    if (id) fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
      const res = await API.get(`/users/${id}`);
      setForm(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async () => {
    try {
      await API.put(`/users/${id}`, form);
      navigate("/admin/branch-users"); // ✅ FIXED
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box p={4} display="flex" justifyContent="center">
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: 600,
          borderRadius: 3,
          p: 4,
        }}
      >
        {/* Header */}
        <Stack direction="row" alignItems="center" spacing={2} mb={3}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/admin/branch-users")}
          >
            
          </Button>

          <Typography variant="h5" fontWeight="bold">
            Edit User
          </Typography>
        </Stack>

        <Divider sx={{ mb: 3 }} />

        <Stack spacing={3}>
          <TextField
            label="Full Name"
            name="name"
            fullWidth
            value={form.name}
            onChange={handleChange}
          />

          <TextField
            label="Email Address"
            name="email"
            fullWidth
            value={form.email}
            onChange={handleChange}
          />

          <TextField
            select
            label="Role"
            name="role"
            value={form.role}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="branch_user">Branch User</MenuItem>
          </TextField>

          <FormControlLabel
            control={
              <Switch
                checked={form.is_active}
                onChange={handleChange}
                name="is_active"
              />
            }
            label={form.is_active ? "Active User" : "Inactive User"}
          />

          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => navigate("/admin/branch-users")}
            >
              Cancel
            </Button>

            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{ px: 4, fontWeight: "bold" }}
            >
              Update User
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
}

export default EditUser;