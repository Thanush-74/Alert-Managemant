import React, { useEffect, useState } from "react";
import socket from "../services/socket";
import API from "../../services/api";
import { Paper, Typography, Stack, Box, Snackbar, Alert } from "@mui/material";

function Alerts() {

const [alerts,setAlerts] = useState([]);
const [notification, setNotification] = useState({ open: false, message: "", severity: "info" });

const showNotification = (message, severity = "info") => {
  setNotification({ open: true, message, severity });
};

const handleCloseNotification = () => {
  setNotification({ ...notification, open: false });
};

useEffect(()=>{

const fetchAlerts = async()=>{
   const res = await API.get("/alerts/admin");
   setAlerts(res.data);
};

fetchAlerts();

},[]);

useEffect(()=>{

socket.on("newAlert",(alert)=>{
   setAlerts(prev=>[alert,...prev]);
   showNotification(`🔔 New Alert: ${alert.message}`, "warning");
});

return ()=> socket.off("newAlert");

},[]);

return(

<Box sx={{mt:4,pr:4}}>

<Typography variant="h5" mb={2}>
Alertswill be having
</Typography>

<Stack spacing={2} sx={{maxWidth:900}}>

{alerts.map((alert)=>(
<Paper key={alert.id} sx={{p:2}}>

<Typography fontWeight="bold">
📍 {alert.address}, {alert.city}
</Typography>

<Typography>
🔔 {alert.message}
</Typography>

</Paper>
))}

</Stack>

<Snackbar
  open={notification.open}
  autoHideDuration={4000}
  onClose={handleCloseNotification}
  anchorOrigin={{ vertical: "top", horizontal: "right" }}
>
  <Alert onClose={handleCloseNotification} severity={notification.severity} sx={{ width: "100%" }}>
    {notification.message}
  </Alert>
</Snackbar>

</Box>

)

}

export default Alerts;


// import { createSlice } from '@reduxjs/toolkit'

// const counterSlice = createSlice({
//   name: 'counter',
//   initialState: { value: 0 },
//   reducers: {
//     increment: (state) => {
//       state.value += 1
//     },
//     decrement: (state) => {
//       state.value -= 1
//     }
//   }
// })

// export const { increment, decrement } = counterSlice.actions
// export default counterSlice.reducer


// import { configureStore } from '@reduxjs/toolkit'
// import counterReducer from './counterSlice'

// export const store = configureStore({
//   reducer: {
//     counter: counterReducer
//   }
// })