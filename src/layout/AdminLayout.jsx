



import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import DashboardIcon from "@mui/icons-material/Dashboard";
import BusinessIcon from "@mui/icons-material/Business";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PeopleIcon from "@mui/icons-material/People";
import LogoutIcon from "@mui/icons-material/Logout";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import InventoryIcon from "@mui/icons-material/Inventory";

import logo from "../assets/alert.png";
import socket from "../services/socket";

import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Badge,
  IconButton,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";

const drawerWidth = 240;

const navItems = [
  { label: "Dashboard", icon: DashboardIcon, path: "/admin", exact: true },
  { label: "Alerts", icon: NotificationsIcon, path: "/admin/alerts", badge: true },
  { label: "Branches", icon: BusinessIcon, path: "/admin/branches" },
  { label: "Customers", icon: PeopleIcon, path: "/admin/customers" },
 { label: "Users", icon: PeopleIcon, path: "/admin/branch-users" },
  { label: "Products", icon: InventoryIcon, path: "/admin/products" },
   { label: "Products-Details", icon: InventoryIcon, path: "/admin/product-details" }


];



function AdminLayout() {

function Dhanush (state,action){
console.log(state);
console.log(action);
}
Dhanush(100,200)


  const navigate = useNavigate();
  const location = useLocation();
  const admin = JSON.parse(localStorage.getItem("admin"));

  const [notifications, setNotifications] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [alertCount, setAlertCount] = useState(0);
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);

  const open = Boolean(anchorEl);

  const handleNavigation = (path) => {
    if (location.pathname !== path) navigate(path, { replace: true });
  };

  const handleOpenMenu = (e) => setAnchorEl(e.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);
  const handleLogout = () => setOpenLogoutDialog(true);
  const confirmLogout = () => {

  localStorage.removeItem("token");
  // ✅ CORRECT
localStorage.removeItem("adminToken");
localStorage.removeItem("admin");

  navigate("/admin-login", { replace: true });

};
  const cancelLogout = () => setOpenLogoutDialog(false);

  const isActive = (item) =>
    item.exact
      ? location.pathname === item.path
      : location.pathname.startsWith(item.path);

  useEffect(() => {
    const handleConnect = () => { socket.emit("joinAdmin"); };
    const handleNewAlert = (alert) => {
      setAlertCount((prev) => prev + 1);
      setNotifications((prev) => [alert, ...prev]);
    };
    socket.on("connect", handleConnect);
    socket.on("newAlert", handleNewAlert);
    return () => {
      socket.off("connect", handleConnect);
      socket.off("newAlert", handleNewAlert);
    };
  }, []);


  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
      `}</style>

      <Box sx={{ display: "flex", fontFamily: "'DM Sans', sans-serif" }}>

        {/* TOPBAR */}
        <AppBar position="fixed" elevation={0} sx={{
          zIndex: 1201,
          backgroundColor: "#ffffff",
          borderBottom: "1px solid #e2e8f0",
        }}>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between", minHeight: "64px !important" }}>

            {/* Left: Logo */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Box sx={{
                width: 36, height: 36, borderRadius: "10px",
                backgroundColor: "#1e1b4b",
                display: "flex", alignItems: "center", justifyContent: "center",
                overflow: "hidden",
              }}>
                <img src={logo} alt="logo" style={{ width: 22, filter: "brightness(0) invert(1)" }} />
              </Box>
              <Box>
                <Typography sx={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 700, fontSize: "1rem", color: "#0f172a", lineHeight: 1.1,
                }}>
                  Alert System
                </Typography>
                <Typography sx={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.6rem", color: "#94a3b8", letterSpacing: "0.07em",
                }}>
                  ADMIN PANEL
                </Typography>
              </Box>
            </Box>

            {/* Right */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>

              {/* Notification Bell */}
              <IconButton
                onClick={handleOpenMenu}
                sx={{
                  width: 38, height: 38, borderRadius: "10px",
                  border: "1px solid #e2e8f0",
                  backgroundColor: alertCount > 0 ? "#fef2f2" : "#f8fafc",
                  "&:hover": { backgroundColor: "#f1f5f9", borderColor: "#94a3b8" },
                }}
              >
                <Badge badgeContent={alertCount} color="error"
                  sx={{ "& .MuiBadge-badge": { fontSize: "0.6rem", minWidth: 16, height: 16 } }}>
                  <NotificationsIcon sx={{
                    fontSize: "1.15rem",
                    color: alertCount > 0 ? "#dc2626" : "#64748b",
                  }} />
                </Badge>
              </IconButton>

              {/* Notification Dropdown */}
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleCloseMenu}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    mt: 1, width: 340, borderRadius: "14px",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 12px 40px rgba(0,0,0,0.1)",
                    overflow: "visible",
                  },
                }}
              >
                <Box sx={{ px: 2.5, py: 1.8, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <Typography sx={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 700, fontSize: "0.9rem", color: "#0f172a",
                  }}>
                    Notifications
                  </Typography>
                  {alertCount > 0 && (
                    <Box sx={{
                      px: 1, py: 0.1,
                      backgroundColor: "#fef2f2", border: "1px solid #fecaca",
                      borderRadius: "999px",
                    }}>
                      <Typography sx={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: "0.62rem", color: "#dc2626",
                      }}>
                        {alertCount} NEW
                      </Typography>
                    </Box>
                  )}
                </Box>
                <Divider sx={{ borderColor: "#f1f5f9" }} />

                {notifications.length === 0 ? (
                  <Box sx={{ px: 2.5, py: 3, textAlign: "center" }}>
                    <NotificationsIcon sx={{ color: "#cbd5e1", fontSize: "1.8rem", mb: 0.5 }} />
                    <Typography sx={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.825rem", color: "#94a3b8",
                    }}>
                      No new alerts
                    </Typography>
                  </Box>
                ) : (
                  notifications.slice(0, 5).map((alert, index) => (
                    <MenuItem key={index} sx={{
                      px: 2.5, py: 1.2,
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.825rem", color: "#334155",
                      borderBottom: index < Math.min(notifications.length, 5) - 1 ? "1px solid #f8fafc" : "none",
                      "&:hover": { backgroundColor: "#f8fafc" },
                      whiteSpace: "normal",
                    }}>
                      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                        <Box sx={{
                          width: 6, height: 6, borderRadius: "50%",
                          backgroundColor: "#ef4444", flexShrink: 0, mt: "5px",
                        }} />
                        {alert.message || "New alert received"}
                      </Box>
                    </MenuItem>
                  ))
                )}

                <Divider sx={{ borderColor: "#f1f5f9" }} />
                <MenuItem
                  onClick={() => {
                    navigate("/admin/alerts");
                    handleCloseMenu();
                    setAlertCount(0);
                  }}
                  sx={{
                    px: 2.5, py: 1.2,
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.825rem", fontWeight: 600, color: "#6366f1",
                    "&:hover": { backgroundColor: "#eef2ff" },
                    justifyContent: "center",
                  }}
                >
                  View All Alerts →
                </MenuItem>
              </Menu>

              {/* Admin info + logout */}
              <Box sx={{
                display: "flex", alignItems: "center", gap: 1,
                pl: 1.5, pr: 1, py: 0.5,
                border: "1px solid #e2e8f0",
                borderRadius: "10px",
                backgroundColor: "#f8fafc",
              }}>
                <Box sx={{
                  width: 28, height: 28, borderRadius: "8px",
                  backgroundColor: "#1e1b4b",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <AdminPanelSettingsIcon sx={{ color: "#fff", fontSize: "0.9rem" }} />
                </Box>
                <Typography sx={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600, fontSize: "0.825rem", color: "#0f172a",
                  display: { xs: "none", sm: "block" },
                }}>
                  {admin?.username || admin?.email || "Admin"}
                </Typography>
                <IconButton
                  onClick={handleLogout}
                  size="small"
                  sx={{
                    color: "#94a3b8", ml: 0.5,
                    "&:hover": { color: "#dc2626", backgroundColor: "#fef2f2" },
                    borderRadius: "6px",
                  }}
                >
                  <LogoutIcon sx={{ fontSize: "1rem" }} />
                </IconButton>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>

        {/* SIDEBAR */}
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              marginTop: "64px",
              backgroundColor: "#f8fafc",
              borderRight: "1px solid #e2e8f0",
              display: "flex",
              flexDirection: "column",
            },
          }}
        >
          <Box sx={{ p: 2, pt: 3, flexGrow: 1 }}>
            <Typography sx={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.62rem", color: "#94a3b8",
              letterSpacing: "0.1em", px: 1.5, mb: 1,
            }}>
              NAVIGATION
            </Typography>

            <List disablePadding>
              {navItems.map(({ label, icon: Icon, path, badge }) => {
                const active = badge
                  ? location.pathname.startsWith(path)
                  : path === "/admin"
                  ? location.pathname === "/admin"
                  : location.pathname.startsWith(path);

                return (
                  <ListItem disablePadding key={path} sx={{ mb: 0.5 }}>
                    <ListItemButton
                      onClick={() => {
                        if (badge) setAlertCount(0);
                        handleNavigation(path);
                      }}
                      sx={{
                        borderRadius: "10px",
                        px: 1.5, py: 1,
                        gap: 1.5,
                        color: active ? "#ffffff" : "#64748b",
                        backgroundColor: active ? "#1e1b4b" : "transparent",
                        fontFamily: "'DM Sans', sans-serif",
                        "&:hover": {
                          backgroundColor: active ? "#1e1b4b" : "#f1f5f9",
                          color: active ? "#ffffff" : "#0f172a",
                        },
                        transition: "all 0.15s ease",
                      }}
                    >
                      {badge && alertCount > 0 ? (
                        <Badge
                          badgeContent={alertCount}
                          color="error"
                          sx={{ "& .MuiBadge-badge": { fontSize: "0.6rem", minWidth: 16, height: 16 } }}
                        >
                          <Icon sx={{ fontSize: "1.15rem", color: active ? "#fff" : "#64748b" }} />
                        </Badge>
                      ) : (
                        <Icon sx={{ fontSize: "1.15rem", color: active ? "#fff" : "#64748b" }} />
                      )}
                      <Typography sx={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.875rem",
                        fontWeight: active ? 600 : 500,
                        flexGrow: 1,
                        color: "inherit",
                      }}>
                        {label}
                      </Typography>
                      {badge && alertCount > 0 && (
                        <Box sx={{
                          px: 1, py: 0.1,
                          backgroundColor: active ? "rgba(255,255,255,0.2)" : "#fef2f2",
                          color: active ? "#fff" : "#dc2626",
                          border: `1px solid ${active ? "rgba(255,255,255,0.3)" : "#fecaca"}`,
                          borderRadius: "999px",
                          fontFamily: "'DM Mono', monospace",
                          fontSize: "0.62rem", fontWeight: 600,
                          lineHeight: 1.6,
                        }}>
                          {alertCount}
                        </Box>
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>

          {/* Sidebar footer */}
          <Box sx={{ p: 2, borderTop: "1px solid #e2e8f0" }}>
            <Box sx={{
              px: 1.5, py: 1.2,
              backgroundColor: "#eef2ff",
              border: "1px solid #c7d2fe",
              borderRadius: "10px",
              display: "flex", alignItems: "center", gap: 1,
            }}>
              <Box sx={{
                width: 28, height: 28, borderRadius: "8px",
                backgroundColor: "#1e1b4b",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <AdminPanelSettingsIcon sx={{ color: "#fff", fontSize: "0.9rem" }} />
              </Box>
              <Box sx={{ overflow: "hidden" }}>
                <Typography sx={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600, fontSize: "0.78rem", color: "#0f172a",
                  whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                }}>
                  {admin?.username || admin?.email || "Admin"}
                </Typography>
                <Typography sx={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.62rem", color: "#6366f1", letterSpacing: "0.03em",
                }}>
                  Administrator
                </Typography>
              </Box>
            </Box>
          </Box>
        </Drawer>

        {/* MAIN CONTENT */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 0,
            mt: "64px",
            backgroundColor: "#f1f5f9",
            minHeight: "calc(100vh - 64px)",
          }}
        >
          <Outlet />
        </Box>

        {/* LOGOUT DIALOG */}
        <Dialog
          open={openLogoutDialog}
          onClose={cancelLogout}
          PaperProps={{
            elevation: 0,
            sx: {
              borderRadius: "16px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
              p: 0.5,
              minWidth: 340,
            },
          }}
        >
          <DialogTitle sx={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 700, fontSize: "1rem", color: "#0f172a", pb: 0.5,
          }}>
            Confirm Logout
          </DialogTitle>
          <DialogContent>
            <DialogContentText sx={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.875rem", color: "#64748b",
            }}>
              Are you sure you want to logout from the admin panel?
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ px: 2.5, pb: 2, gap: 1 }}>
            <Button
              onClick={cancelLogout}
              sx={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600, fontSize: "0.825rem",
                textTransform: "none", borderRadius: "10px",
                color: "#64748b", border: "1px solid #e2e8f0", px: 2.5,
                "&:hover": { backgroundColor: "#f8fafc", borderColor: "#94a3b8" },
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={confirmLogout}
              sx={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 700, fontSize: "0.825rem",
                textTransform: "none", borderRadius: "10px",
                backgroundColor: "#dc2626", color: "#fff", px: 2.5,
                boxShadow: "0 4px 12px rgba(220,38,38,0.3)",
                "&:hover": { backgroundColor: "#b91c1c" },
              }}
            >
              Logout
            </Button>
          </DialogActions>
        </Dialog>

      </Box>
    </>
  );
}

export default AdminLayout;




