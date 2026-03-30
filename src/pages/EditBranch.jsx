// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import API from "../services/api";
// import {
//   Box,
//   Typography,
//   TextField,
//   Button,
//   Paper,
//   Stack,
//   MenuItem,
// } from "@mui/material";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// function EditBranch() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     branch_name: "",
//     address: "",
//     city: "",
//     branch_incharge: "",
//     contact_number: "",
//     pincodes: "",        // ✅ Added
//     is_active: true,
//   });

//   useEffect(() => {
//     fetchBranch();
//   }, []);

//   const fetchBranch = async () => {
//     try {
//       const res = await API.get(`/branches/${id}`);

//       // ✅ Convert backend value to string
//       setFormData({
//         ...res.data,
//         pincodes: res.data.pincodes || "",
//       });
//     } catch (err) {
//       console.error(err);
//     }
//   };

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
//       // ✅ Convert comma string to array before sending
//       const formattedData = {
//         ...formData,
//         pincodes: formData.pincodes
//           .split(",")
//           .map((p) => p.trim())
//           .filter((p) => p !== ""),
//       };

//       await API.put(`/branches/${id}`, formattedData);

//       alert("Branch Updated Successfully");
//       navigate("/admin/branches");
//     } catch (err) {
//       console.error(err);
//       alert("Update Failed");
//     }
//   };

//   return (
//     <>
// {/* <Button
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
//               Back
//             </Button>

//       <Box>
//         <Typography variant="h4" fontWeight="bold" mb={3}>
//           Edit Branch
//         </Typography> */}


//         <Box sx={{ mb: 3 }}>
//   <Box
//     sx={{
//       display: "flex",
//       alignItems: "center",
//       gap: 2,
//       mb: 2,
//     }}
//   >
//     <Button
//       variant="outlined"
//       startIcon={<ArrowBackIcon sx={{ fontSize: "1rem !important" }} />}
//       onClick={() => navigate(-1)}
//       sx={{
//         borderColor: "#cbd5e1",
//         color: "#64748b",
//         fontFamily: "'DM Sans', sans-serif",
//         fontWeight: 600,
//         fontSize: "0.8rem",
//         textTransform: "none",
//         borderRadius: "10px",
//         px: 2,
//         py: 0.8,
//         "&:hover": {
//           borderColor: "#0ea5e9",
//           color: "#0ea5e9",
//           backgroundColor: "#f0f9ff",
//         },
//       }}
//     >
//       Back
//     </Button>

//     <Typography
//       variant="h4"
//       sx={{
//         fontWeight: 700,
//         fontFamily: "'DM Sans', sans-serif",
//         color: "#1e293b",
//       }}
//     >
//       Edit Branch
//     </Typography>
  
// </Box> 

//         <Paper sx={{ p: 4, maxWidth: 600 }}>
//           <form onSubmit={handleSubmit}>
//             <Stack spacing={3}>
//               <TextField
//                 label="Branch Name"
//                 name="branch_name"
//                 value={formData.branch_name}
//                 onChange={handleChange}
//                 required
//               />

//               <TextField
//                 label="Address"
//                 name="address"
//                 value={formData.address}
//                 onChange={handleChange}
//                 required
//               />

//               <TextField
//                 label="City"
//                 name="city"
//                 value={formData.city}
//                 onChange={handleChange}
//                 required
//               />

//               <TextField
//                 label="Branch Incharge"
//                 name="branch_incharge"
//                 value={formData.branch_incharge}
//                 onChange={handleChange}
//                 required
//               />

//               <TextField
//                 label="Contact Number"
//                 name="contact_number"
//                 value={formData.contact_number}
//                 onChange={handleChange}
//                 required
//               />

//               {/* ✅ NEW PINCODE FIELD */}
//               <TextField
//                 label="Pincodes (comma separated)"
//                 name="pincodes"
//                 value={formData.pincodes}
//                 onChange={handleChange}
//                 placeholder="600001, 600002"
//                 helperText="Enter multiple pincodes separated by comma"
//                 required
//               />

//               <TextField
//                 select
//                 label="Status"
//                 name="is_active"
//                 value={formData.is_active}
//                 onChange={handleChange}
//               >
//                 <MenuItem value="true">Active</MenuItem>
//                 <MenuItem value="false">Inactive</MenuItem>
//               </TextField>

//               <Stack direction="row" spacing={2}>
//                 <Button type="submit" variant="contained">
//                   Update Branch
//                 </Button>

//                 <Button
//                   variant="outlined"
//                   onClick={() => navigate("/admin/branches")}
//                 >
//                   Cancel
//                 </Button>
//               </Stack>
//             </Stack>
//           </form>
//         </Paper>
//       </Box>
//     </>
//   );
// }

// export default EditBranch;


import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Stack,
  MenuItem,
  Grid,
  Avatar,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BusinessIcon from "@mui/icons-material/Business";

function EditBranch() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    branch_name: "",
    address: "",
    city: "",
    branch_incharge: "",
    contact_number: "",
    pincodes: "",
    is_active: true,
  });

  useEffect(() => {
    fetchBranch();
  }, []);

  const fetchBranch = async () => {
    try {
      const res = await API.get(`/branches/${id}`);

      setFormData({
        ...res.data,
        pincodes: res.data.pincodes || "",
      });
    } catch (err) {
      console.error(err);
    }
  };

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
      const formattedData = {
        ...formData,
        pincodes: formData.pincodes
          .split(",")
          .map((p) => p.trim())
          .filter((p) => p !== ""),
      };

      await API.put(`/branches/${id}`, formattedData);

      alert("Branch Updated Successfully");
      navigate("/admin/branches");
    } catch (err) {
      console.error(err);
      alert("Update Failed");
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
            Edit Branch
          </Typography>
          <Typography variant="caption" color="#6b7280">
            Update branch details and pincodes
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
          maxWidth: 900,
        }}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Left */}
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
                  label="Branch Incharge"
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

            {/* Right */}
            <Grid item xs={12} md={6}>
              <Stack spacing={2}>
                <TextField
                  label="Pincodes"
                  name="pincodes"
                  value={formData.pincodes}
                  onChange={handleChange}
                  placeholder="600001, 600002"
                  helperText="Separate multiple pincodes with comma"
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

            {/* Address Full */}
            <Grid item xs={12}>
              <TextField
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                multiline
                rows={3}
                fullWidth
                required
              />
            </Grid>

            {/* Buttons */}
            <Grid item xs={12}>
              <Stack direction="row" justifyContent="flex-end" spacing={2}>
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
                  Update Branch
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
}

export default EditBranch;