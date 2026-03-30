

// import { Outlet, useNavigate, NavLink } from "react-router-dom";
// import { useEffect, useState } from "react";
// import API from "../services/api";
// import logo from "../assets/alert.png";
// import socket from "../services/socket";

// import NotificationsIcon from "@mui/icons-material/Notifications";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import LogoutIcon from "@mui/icons-material/Logout";
// import StorefrontIcon from "@mui/icons-material/Storefront";
// import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Box,
//   Drawer,
//   List,
//   ListItem,
//   ListItemButton,
//   Avatar,
//   IconButton,
//   Menu,
//   MenuItem,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogContentText,
//   DialogActions,
//   Button,
//   Badge,
//   Snackbar,
//   Alert,
//   Fade,
//   Slide,
//   ListItemIcon,
//   ListItemText,
//   Chip,
// } from "@mui/material";

// const drawerWidth = 250;

// function BranchLayout() {
//   const [alerts, setAlerts] = useState([]);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [logoutOpen, setLogoutOpen] = useState(false);
//   const [toastOpen, setToastOpen] = useState(false);
//   const [latestAlert, setLatestAlert] = useState(null);

//   const open = Boolean(anchorEl);
//   const navigate = useNavigate();

//   const branchData = localStorage.getItem("branch");
//   const branch = branchData ? JSON.parse(branchData) : null;

//   const unreadCount = alerts.filter((a) => !a.is_read).length;

// useEffect(() => {
//   const branchData = localStorage.getItem("branch");

//   if (!branchData) {
//     navigate("/branch-login", { replace: true });
//   }
// }, [navigate]);

// const branch = JSON.parse(localStorage.getItem("branch") || "null");

//   useEffect(() => {
//     if (!branch?.id) return;

//     const fetchAlerts = async () => {
//       try {
//         const res = await API.get(`/alerts/branch/${branch.id}`);
//         setAlerts(res.data);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchAlerts();
//   }, [branch?.id]);

//   useEffect(() => {
//     if (!branch?.id) return;

//     socket.emit("joinBranch", branch.id);

//     socket.on("newAlert", (alert) => {
//       setAlerts((prev) => [alert, ...prev]);
//       setLatestAlert(alert);
//       setToastOpen(true);
//     });

//     return () => socket.off("newAlert");
//   }, [branch?.id]);

//   const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
//   const handleMenuClose = () => setAnchorEl(null);

//   const openLogoutDialog = () => {
//     setAnchorEl(null);
//     setLogoutOpen(true);
//   };

//   const closeLogoutDialog = () => setLogoutOpen(false);

//   const confirmLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("branch");
//     localStorage.removeItem("branchUser");
//     navigate("/branch-login", { replace: true });
//   };

//   return (
//     <Box sx={{ display: "flex", bgcolor: "#f8fafc", minHeight: "100vh" }}>
      
//       {/* ================= APPBAR ================= */}
//       <AppBar
//         position="fixed"
//         elevation={0}
//         sx={{
//           zIndex: 1201,
//           backgroundColor: "#ffffff",
//           borderBottom: "1px solid #e2e8f0",
//         }}
//       >
//         <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          
//           {/* LOGO */}
//           <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//             <Box
//               sx={{
//                 width: 44,
//                 height: 44,
//                 borderRadius: "12px",
//                 background:
//                   "linear-gradient(135deg, #064e3b 0%, #059669 100%)",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <img
//                 src={logo}
//                 alt="logo"
//                 style={{ width: 26, filter: "brightness(0) invert(1)" }}
//               />
//             </Box>

//             <Box>
//               <Typography fontWeight={700} fontSize="18px">
//                 Alert System 
//               </Typography>

//               <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//                 <FiberManualRecordIcon
//                   sx={{ fontSize: 8, color: "#10b981" }}
//                 />
//                 <Typography fontSize="11px" color="#64748b">
//                   Branch Portal
//                 </Typography>
//               </Box>
//             </Box>
//           </Box>

//           {/* USER */}
//           <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//             <Chip
//               icon={<StorefrontIcon sx={{ fontSize: 16 }} />}
//               label={branch?.branch_name}
//               size="small"
//               sx={{
//                 bgcolor: "#ecfdf5",
//                 border: "1px solid #a7f3d0",
//                 color: "#065f46",
//                 fontWeight: 600,
//               }}
//             />

//             <IconButton onClick={handleMenuOpen}>
//               <Avatar sx={{ bgcolor: "#059669" }}>
//                 {branch?.username?.charAt(0).toUpperCase()}
//               </Avatar>
//             </IconButton>

//             <Menu
//               anchorEl={anchorEl}
//               open={open}
//               onClose={handleMenuClose}
//               TransitionComponent={Fade}
//             >
//               <MenuItem onClick={openLogoutDialog}>
//                 <LogoutIcon sx={{ mr: 1 }} />
//                 Logout
//               </MenuItem>
//             </Menu>
//           </Box>
//         </Toolbar>
//       </AppBar>

//       {/* ================= SIDEBAR ================= */}
//       <Drawer
//         variant="permanent"
//         sx={{
//           width: "24px",
//           flexShrink: 0,

//           "& .MuiDrawer-paper": {
//             width: drawerWidth,
//             mt: "64px",
//             boxSizing: "border-box",
//             backgroundColor: "#ffffff",
//             borderRight: "1px solid #e2e8f0",
//           },
//         }}
//       >
//         <Box sx={{ p: 3 }}>
//           <Typography
//             fontSize="11px"
//             fontWeight={700}
//             color="#94a3b8"
//             letterSpacing="0.5px"
//             mb={2}
//           >
//             NAVIGATION
//           </Typography>

//           <List sx={{ p: 0 }}>
            
//             {/* Dashboard */}
//             <ListItem disablePadding>
//               <ListItemButton component={NavLink} to="/branch/dashboard">
//                 <ListItemIcon>
//                   <DashboardIcon />
//                 </ListItemIcon>
//                 <ListItemText primary="Dashboard" />
//               </ListItemButton>
//             </ListItem>

//             {/* Alerts */}
//             <ListItem disablePadding>
//               <ListItemButton component={NavLink} to="/branch/alerts">
//                 <ListItemIcon>
//                   <Badge badgeContent={unreadCount} color="error">
//                     <NotificationsIcon />
//                   </Badge>
//                 </ListItemIcon>
//                 <ListItemText primary="Alerts" />
//               </ListItemButton>
//             </ListItem>

//           </List>
//         </Box>
//       </Drawer>

//       {/* ================= MAIN CONTENT ================= */}
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           mt: "74px",
//           ml: `${drawerWidth}px`,
//           p: 3,
//           backgroundColor: "#f8fafc",
//         }}
//       >
//         <Outlet context={{ alerts, setAlerts }} />
//       </Box>

//       {/* ================= LOGOUT DIALOG ================= */}
//       <Dialog open={logoutOpen} onClose={closeLogoutDialog}>
//         <DialogTitle>Confirm Logout</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             Are you sure you want to logout from your branch account?
//           </DialogContentText>
//         </DialogContent>

//         <DialogActions>
//           <Button onClick={closeLogoutDialog}>Cancel</Button>
//           <Button onClick={confirmLogout} color="error">
//             Logout
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* ================= ALERT TOAST ================= */}
//       <Snackbar
//         open={toastOpen}
//         autoHideDuration={5000}
//         onClose={() => setToastOpen(false)}
//         anchorOrigin={{ vertical: "top", horizontal: "right" }}
//       >
//         <Alert severity="warning" variant="filled">
//           🔔 New Alert: {latestAlert?.message}
//         </Alert>
//       </Snackbar>

//     </Box>
//   );
// }

// export default BranchLayout;

import { Outlet, useNavigate, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
// import API from "../services/apiBranch";
import API_BRANCH from "../services/apiBranch";
import logo from "../assets/alert.png";
import socket from "../services/socket";

import NotificationsIcon from "@mui/icons-material/Notifications";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import StorefrontIcon from "@mui/icons-material/Storefront";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Badge,
  Snackbar,
  Alert,
  Fade,
  ListItemIcon,
  ListItemText,
  Chip,
} from "@mui/material";

const drawerWidth = 250;

function BranchLayout() {
  const [alerts, setAlerts] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [latestAlert, setLatestAlert] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
  window.history.pushState(null, "", window.location.href);

  const handleBack = () => {
    window.history.pushState(null, "", window.location.href);
  };

  window.addEventListener("popstate", handleBack);

  return () => {
    window.removeEventListener("popstate", handleBack);
  };
}, []);
  const open = Boolean(anchorEl);

  // ✅ SINGLE SOURCE OF TRUTH
  const branch = JSON.parse(localStorage.getItem("branch") || "null");

  const unreadCount = alerts.filter((a) => !a.is_read).length;

  // ✅ AUTH CHECK (SAFE)
  useEffect(() => {
    if (!localStorage.getItem("branchToken")){
      navigate("/branch-login", { replace: true });
    }
  }, [navigate]);

  // ✅ FETCH ALERTS
  useEffect(() => {
    if (!branch?.id) return;

    const fetchAlerts = async () => {
      try {
        const res = await API_BRANCH.get(`/alerts/branch/${branch.id}`);
        setAlerts(res.data);
      } catch (err) {
        console.error(err);
      }
    };


    
    fetchAlerts();
  }, [branch?.id]);

  // ✅ SOCKET
  useEffect(() => {
    if (!branch?.id) return;

    socket.emit("joinBranch", branch.id);

    socket.on("newAlert", (alert) => {
      setAlerts((prev) => [alert, ...prev]);
      setLatestAlert(alert);
      setToastOpen(true);
    });

    return () => socket.off("newAlert");
  }, [branch?.id]);

  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const openLogoutDialog = () => {
    setAnchorEl(null);
    setLogoutOpen(true);
  };

  const closeLogoutDialog = () => setLogoutOpen(false);

  const confirmLogout = () => {
    localStorage.removeItem("branchToken");
    localStorage.removeItem("branch");
    localStorage.removeItem("branchUser");
    navigate("/branch-login", { replace: true });
  };

  return (
    <Box sx={{ display: "flex", bgcolor: "#f8fafc", minHeight: "100vh" }}>
      
      {/* APPBAR */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          zIndex: 1201,
          backgroundColor: "#ffffff",
          borderBottom: "1px solid #e2e8f0",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          
          {/* LOGO */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: "12px",
                background:
                  "linear-gradient(135deg, #1E1B4B 0%, #1E1B4B 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={logo}
                alt="logo"
                style={{ width: 26, filter: "brightness(0) invert(1)" }}
              />
            </Box>

            <Box>
              <Typography fontWeight={700} fontSize="18px">
                Alert System
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <FiberManualRecordIcon
                  sx={{ fontSize: 8, color: "#1E1B4B" }}
                />
                <Typography fontSize="11px" color="#64748b">
                  Branch Portal
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* USER */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Chip
              icon={<StorefrontIcon sx={{ fontSize: 16 }} />}
              label={branch?.branch_name}
              size="small"
              sx={{
                bgcolor: "#ecfdf5",
                border: "1px solid #a7f3d0",
                color: "#1E1B4B",
                fontWeight: 600,
              }}
            />

            <IconButton onClick={handleMenuOpen}>
              <Avatar sx={{ bgcolor: "#1E1B4B" }}>
                {branch?.branch_name?.charAt(0)?.toUpperCase()}
              </Avatar>
            </IconButton>

            <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose} TransitionComponent={Fade}>
              <MenuItem onClick={openLogoutDialog}>
                <LogoutIcon sx={{ mr: 1 }} />
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* SIDEBAR */}
      <Drawer
        variant="permanent"
        sx={{
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            mt: "64px",
            backgroundColor: "#ffffff",
            borderRight: "1px solid #e2e8f0",
          },
        }}
      >
        <Box sx={{ p: 3 }}>
          <Typography fontSize="11px" fontWeight={700} color="#94a3b8" mb={2}>
            NAVIGATION
          </Typography>

          <List>
            <ListItem disablePadding>
              <ListItemButton component={NavLink} to="/branch/dashboard">
                <ListItemIcon><DashboardIcon /></ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton component={NavLink} to="/branch/alerts">
                <ListItemIcon>
                  <Badge badgeContent={unreadCount} color="error">
                    <NotificationsIcon />
                  </Badge>
                </ListItemIcon>
                <ListItemText primary="Alerts" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* MAIN */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          mt: "74px",
          ml: `${drawerWidth}px`,
          p: 3,
        }}
      >
        <Outlet context={{ alerts, setAlerts }} />
      </Box>

      {/* LOGOUT */}
      <Dialog open={logoutOpen} onClose={closeLogoutDialog}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeLogoutDialog}>Cancel</Button>
          <Button onClick={confirmLogout} color="error">Logout</Button>
        </DialogActions>
      </Dialog>

      {/* TOAST */}
      <Snackbar
        open={toastOpen}
        autoHideDuration={5000}
        onClose={() => setToastOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity="warning" variant="filled">
          🔔 New Alert: {latestAlert?.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default BranchLayout;