// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// // import API from "../services/api";
// import API from "../services/api";
// import BusinessIcon from "@mui/icons-material/Business";

// import {
//   Box,
//   Typography,
//   TextField,
//   MenuItem,
//   Button,
//   Paper,
//   Stack,
// } from "@mui/material";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// function CreateBranch() {
//   const navigate = useNavigate();

// const [formData, setFormData] = useState({
//   branch_name: "",
//   address: "",
//   city: "",
//   branch_incharge: "",
//   contact_number: "",
//   username: "",
//   password: "",
//   pincode: "",   // ✅ correct
//   is_active: true,
// });

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: name === "is_active" ? value === "true" : value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//           const payload = {
//       ...formData,
//       pincodes: [formData.pincode]   
//     };

//       // await API.post("/branches", formData);
//       await API.post("/branches", payload); 

//       alert("Branch Created Successfully");
//       navigate("/admin/branches");
//     } catch (err) {
//       console.error("Error creating branch:", err);
//       alert("Failed to create branch");
//     }
//   };

//   return (
//     <Box>
// <Button
//               variant="outlined"
//               startIcon={<ArrowBackIcon sx={{ fontSize: "1rem !important" }} />}
//               onClick={() => navigate(-1)}
//               sx={{
//                 borderColor: "#cbd5e1",
//                 color: "#64748b",
//                 fontFamily: "'DM Sans', sans-serif",
//                 fontWeight: 600,
//                 fontSize: "0.8rem",
//                 textTransform: "none",
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

//       <Typography variant="h4" fontWeight="bold" mb={3}>
//         Create Branch
//       </Typography>

//       <Paper sx={{ p: 4, maxWidth: 600 }}>
//         <form onSubmit={handleSubmit}>
//           <Stack spacing={3}>
//             <TextField
//               label="Branch Name"
//               name="branch_name"
//               value={formData.branch_name}
//               onChange={handleChange}
//               required
//             />

//             <TextField
//               label="Address"
//               name="address"
//               value={formData.address}
//               onChange={handleChange}
//               required
//             />

//             <TextField
//               label="City"
//               name="city"
//               value={formData.city}
//               onChange={handleChange}
//               required
//             />

//             <TextField
//               label="Incharge Name"
//               name="branch_incharge"
//               value={formData.branch_incharge}
//               onChange={handleChange}
//               required
//             />

//             <TextField
//               label="Contact Number"
//               name="contact_number"
//               value={formData.contact_number}
//               onChange={handleChange}
//               required
//             />

//             {/* <TextField
//               label="email"
//               name="email"
//               value={formData.username}           
//               onChange={handleChange}
//               autoComplete="off"
//               required
//             /> */}

//             <TextField
//   label="Email"
//   name="username"
//   value={formData.username}
//   onChange={handleChange}
//   autoComplete="off"
//   required
// />

//             <TextField
//               label="Password"
//               name="password"
//               type="password"
//               value={formData.password}
//               onChange={handleChange}
//               autoComplete="new-password"
//               required
//             />

//             {/* ✅ Correct Pincode Field */}
//             <TextField
//               label="Pincode"
//               name="pincode"
//               value={formData.pincode}
//               onChange={handleChange}
//               required
//             />

//             <TextField
//               select
//               label="Status"
//               name="is_active"
//               value={formData.is_active.toString()}
//               onChange={handleChange}
//             >
//               <MenuItem value="true">Active</MenuItem>
//               <MenuItem value="false">Inactive</MenuItem>
//             </TextField>

//             <Stack direction="row" spacing={2}>
//               <Button type="submit" variant="contained">
//                 Save Branch
//               </Button>

//               <Button
//                 variant="outlined"
//                 onClick={() => navigate("/admin/branches")}
//               >
//                 Cancel
//               </Button>
//             </Stack>
//           </Stack>
//         </form>
//       </Paper>
//     </Box>
//   );
// }

// export default CreateBranch;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Paper,
  Stack,
  Grid,
  Avatar,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BusinessIcon from "@mui/icons-material/Business";

function CreateBranch() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    branch_name: "",
    address: "",
    city: "",
    branch_incharge: "",
    contact_number: "",
    username: "",
    password: "",
    pincode: "",
    is_active: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "is_active" ? value === "true" : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        pincodes: [formData.pincode],
      };

      await API.post("/branches", payload);

      alert("Branch Created Successfully");
      navigate("/admin/branches");
    } catch (err) {
      console.error(err);
      alert("Failed to create branch");
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* 🔙 Back Button */}
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/admin/branches")}
        sx={{
          mb: 2,
          textTransform: "none",
          borderRadius: "10px",
          color: "#64748b",
        }}
      >
        
      </Button>

      {/* 🔷 Header */}
      <Stack direction="row" spacing={2} alignItems="center" mb={3}>
        <Avatar sx={{ bgcolor: "#0ea5e9" }}>
          <BusinessIcon />
        </Avatar>

        <Box>
          <Typography fontWeight={700} fontSize={20}>
            Create Branch
          </Typography>
          <Typography variant="caption" color="#6b7280">
            Add a new branch with login credentials
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
          maxWidth: 800,
        }}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Left Column */}
            <Grid item xs={12} md={6}>
              <Stack spacing={2}>
                <TextField
                  label="Branch Name"
                  name="branch_name"
                  value={formData.branch_name}
                  onChange={handleChange}
                  fullWidth
                  required
                />

                <TextField
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  fullWidth
                  required
                />

                <TextField
                  label="Incharge Name"
                  name="branch_incharge"
                  value={formData.branch_incharge}
                  onChange={handleChange}
                  fullWidth
                  required
                />

                <TextField
                  label="Contact Number"
                  name="contact_number"
                  value={formData.contact_number}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Stack>
            </Grid>

            {/* Right Column */}
            <Grid item xs={12} md={6}>
              <Stack spacing={2}>
                <TextField
                  label="Email"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  fullWidth
                  required
                />

                <TextField
                  label="Password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  fullWidth
                  required
                />

                <TextField
                  label="Pincode"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  fullWidth
                  required
                />

                <TextField
                  select
                  label="Status"
                  name="is_active"
                  value={formData.is_active.toString()}
                  onChange={handleChange}
                  fullWidth
                >
                  <MenuItem value="true">Active</MenuItem>
                  <MenuItem value="false">Inactive</MenuItem>
                </TextField>
              </Stack>
            </Grid>

            {/* Address Full Width */}
            <Grid item xs={12}>
              <TextField
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                fullWidth
                multiline
                rows={3}
                required
              />
            </Grid>

            {/* Buttons */}
            <Grid item xs={12}>
              <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button
                  variant="outlined"
                  onClick={() => navigate("/admin/branches")}
                  sx={{
                    borderRadius: "10px",
                    textTransform: "none",
                  }}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    borderRadius: "10px",
                    textTransform: "none",
                    bgcolor: "#0ea5e9",
                    "&:hover": { bgcolor: "#0284c7" },
                  }}
                >
                  Save Branch
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
}

export default CreateBranch;