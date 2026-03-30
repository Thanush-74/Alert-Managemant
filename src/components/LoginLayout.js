import { Box, Paper, Typography } from "@mui/material";
import logo from "../assets/logo.png";

function LoginLayout({ title, children }) {
  return (
    <Box
      sx={{
        height: "100vh",
        background: "linear-gradient(135deg, #1e3c72, #2a5298)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={12}
        sx={{
          width: 400,
          p: 4,
          borderRadius: 4,
          textAlign: "center",
        }}
      >
        {/* Logo */}
        <Box mb={2}>
          <img src={logo} alt="logo" width="70" />
          <Typography variant="h5" fontWeight="bold" mt={1}>
            Alert Management System
          </Typography>
        </Box>

        {/* Page Title */}
        <Typography
          variant="h6"
          mb={3}
          color="text.secondary"
        >
          {title}
        </Typography>

        {/* Form Content */}
        {children}

        {/* Footer */}
        <Typography
          variant="body2"
          mt={4}
          color="text.secondary"
        >
          © 2026 Alert System
        </Typography>
      </Paper>
    </Box>
  );
}

export default LoginLayout;