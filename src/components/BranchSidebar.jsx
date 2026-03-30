import React from "react";
import { Drawer, List, ListItem, ListItemButton, ListItemText, Toolbar } from "@mui/material";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

function BranchSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/branch/dashboard")}>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/branch/users")}>
            <ListItemText primary="Users" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}

export default BranchSidebar;