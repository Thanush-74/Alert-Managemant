import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Box, Typography, Paper, Table, Button,TableBody, TableCell, TableContainer,TableHead,TableRow,Chip,} 
  from "@mui/material";

function InchargeHistory() {
    const navigate = useNavigate();
  const { id } = useParams();
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    if (!id) return;

    const fetchAlerts = async () => {
      try {
        const response = await API.get(`/alerts/branch/${id}`);

        console.log("Branch ID:", id);
        console.log("API Response:", response.data);

        setAlerts(response.data);
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    };

    fetchAlerts();
  }, [id]);

  return (
 <Box>
  <>
 

 
    <Button
      variant="outlined"
      startIcon={<ArrowBackIcon sx={{ fontSize: "1rem !important" }} />}
      onClick={() => navigate("/admin/branches")}
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
        mb: 2,
        "&:hover": {
          borderColor: "#6366f1",
          color: "#6366f1",
          backgroundColor: "#eef2ff",
        },
      }}
    >
      
    </Button>

    <Box>
      <Typography variant="h6" fontWeight="bold" mb={3}>
        Branch Alert History
      </Typography>

      <TableContainer component={Paper} >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Message</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Date</strong></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {alerts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No History Found
                </TableCell>
              </TableRow>
            ) : (
              alerts.map((alert) => (
                <TableRow key={alert.id}>
                  <TableCell>{alert.message}</TableCell>
                  <TableCell>
                    <Chip
                      label={alert.is_read ? "Read" : "New"}
                      color={alert.is_read ? "success" : "error"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    {new Date(alert.created_at).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  </>
  </Box>
);
}

export default InchargeHistory;