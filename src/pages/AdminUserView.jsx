


import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import {
  Box,
  Typography,
  Button,
  Stack,
  Paper,
  Avatar,
  Divider
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import BusinessIcon from "@mui/icons-material/Business";
import BadgeIcon from "@mui/icons-material/Badge";

function AdminUserView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await API.get(`/users/${id}`);
      setUser(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) return <Typography p={3}>Loading...</Typography>;

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
        {/* 🔙 Header */}
        <Stack direction="row" alignItems="center" spacing={2} mb={3}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/admin/branch-users")}
          >
            
          </Button>

          <Typography variant="h5" fontWeight="bold">
            User Details
          </Typography>
        </Stack>

        <Divider sx={{ mb: 3 }} />

        {/* 👤 Avatar + Name */}
        <Stack alignItems="center" mb={3}>
          <Avatar sx={{ width: 70, height: 70, bgcolor: "#3b82f6" }}>
            {user.name?.charAt(0)}
          </Avatar>
          <Typography mt={1} fontWeight="bold">
            {user.name}
          </Typography>
        </Stack>

        {/* 📄 Details */}
        <Stack spacing={2}>
          <Stack direction="row" spacing={2} alignItems="center">
            <EmailIcon color="primary" />
            <Typography>Email: {user.email}</Typography>
          </Stack>

          <Stack direction="row" spacing={2} alignItems="center">
            <BadgeIcon color="primary" />
            <Typography>Role: {user.role}</Typography>
          </Stack>

          <Stack direction="row" spacing={2} alignItems="center">
            <BusinessIcon color="primary" />
            <Typography>Branch: {user.branch_name}</Typography>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
}

export default AdminUserView;