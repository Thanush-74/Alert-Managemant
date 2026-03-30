import { useState } from "react";
import API from "../services/apiBranch";
import socket from "../services/socket";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  Stack,
  TextField,
  Button,
  Box,
  Typography,
  IconButton, 
  InputAdornment,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ShieldIcon from "@mui/icons-material/Shield";
import BoltIcon from "@mui/icons-material/Bolt";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import logo from "../assets/alert.png";

const features = [
  { icon: StorefrontIcon, label: "Branch Portal" },
  { icon: ShieldIcon, label: "Secured" },
  { icon: BoltIcon, label: "Real-Time" },
];

const inputSx = {
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#f8fafc",
    borderRadius: "12px",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.9rem",
    "& fieldset": { borderColor: "#e2e8f0" },
    "&:hover fieldset": { borderColor: "#94a3b8" },
    "&.Mui-focused fieldset": { borderColor: "#059669", borderWidth: "1.5px" },
  },
  "& .MuiInputLabel-root": {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.875rem",
    color: "#94a3b8",
  },
  "& .MuiInputLabel-root.Mui-focused": { color: "#059669" },
};

function Branchlogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

useEffect(() => {
  const token = localStorage.getItem("branchToken");

  if (token) {
    navigate("/branch/dashboard", { replace: true });
  }
}, [navigate]);
  
const handleLogin = async () => {
    setError("");
    try {
      const res = await API.post("/auth/login", { email: username, password });
      // const { user, branch } = res.data;

      // if (user.role !== "branch_user") {
      //   setError("Not authorized as branch user.");
      //   return;
      // }
      // navigate("/branch");
      const { token, user, branch } = res.data;
      localStorage.setItem("branchToken", token);
      localStorage.setItem("branchUser", JSON.stringify(user));
      localStorage.setItem("branch", JSON.stringify(branch));
      socket.emit("joinBranch", branch.id);
      // navigate("/branch/dashboard");
      navigate("/branch/dashboard", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&family=DM+Mono:wght@400;500&display=swap');

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        @keyframes pulse-ring {
          0% { transform: scale(0.95); opacity: 0.6; }
          100% { transform: scale(1.5); opacity: 0; }
        }

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .form-animate { animation: fadeSlideUp 0.4s ease forwards; }
      `}</style>

      <Box sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        fontFamily: "'DM Sans', sans-serif",
      }}>

        {/* LEFT BRAND PANEL */}
        <Box sx={{
          flex: 1,
          background: "linear-gradient(145deg, #022c22 0%, #064e3b 50%, #065f46 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          px: { xs: 4, md: 7 },
          py: { xs: 8, md: 0 },
          position: "relative",
          overflow: "hidden",
        }}>

          {/* Grid overlay */}
          <Box sx={{
            position: "absolute", inset: 0, pointerEvents: "none",
            backgroundImage: "linear-gradient(rgba(16,185,129,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.07) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }} />

          {/* Glow blob */}
          <Box sx={{
            position: "absolute", width: 360, height: 360, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(16,185,129,0.18) 0%, transparent 70%)",
            top: "20%", left: "50%", transform: "translateX(-50%)",
            pointerEvents: "none",
          }} />

          {/* Floating icon */}
          <Box sx={{ position: "relative", mb: 4, animation: "float 3.5s ease-in-out infinite" }}>
            <Box sx={{
              position: "absolute", inset: 0, borderRadius: "50%",
              border: "2px solid rgba(16,185,129,0.4)",
              animation: "pulse-ring 2s ease-out infinite",
            }} />
            <Box sx={{
              width: 72, height: 72, borderRadius: "20px",
              background: "linear-gradient(135deg, #059669, #10b981)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 40px rgba(16,185,129,0.45)",
            }}>
              <StorefrontIcon sx={{ color: "#fff", fontSize: "2rem" }} />
            </Box>
          </Box>

          <img
            src={logo}
            alt="logo"
            style={{ width: 52, marginBottom: 16, filter: "brightness(0) invert(1)", opacity: 0.9 }}
          />

          <Typography sx={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: { xs: "2rem", md: "2.4rem" },
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            background: "linear-gradient(135deg, #ffffff 30%, #6ee7b7)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 1,
          }}>
            WORKFLOW
          </Typography>

          <Typography sx={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.72rem",
            letterSpacing: "0.12em",
            color: "#10b981",
            textTransform: "uppercase",
            mb: 4,
          }}>
            Branch Management System
          </Typography>

          {/* Feature pills */}
          <Stack direction="row" spacing={1.5} flexWrap="wrap" justifyContent="center">
            {features.map(({ icon: Icon, label }) => (
              <Box key={label} sx={{
                display: "flex", alignItems: "center", gap: 0.7,
                px: 1.8, py: 0.8, borderRadius: "999px",
                border: "1px solid rgba(16,185,129,0.3)",
                backgroundColor: "rgba(16,185,129,0.1)",
              }}>
                <Icon sx={{ color: "#6ee7b7", fontSize: "0.85rem" }} />
                <Typography sx={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.65rem",
                  color: "#a7f3d0",
                  letterSpacing: "0.06em",
                }}>
                  {label}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>

        {/* RIGHT FORM PANEL */}
        <Box sx={{
          flex: 1,
          backgroundColor: "#f1f5f9",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: 3,
          py: { xs: 6, md: 0 },
          position: "relative",
        }}>

          {/* Back button */}
          <IconButton
            onClick={() => navigate("/")}
            sx={{
              position: "absolute", top: 24, left: 24,
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "10px",
              width: 38, height: 38,
              "&:hover": { backgroundColor: "#f0fdf4", borderColor: "#bbf7d0" },
            }}
          >
            <ArrowBackIcon sx={{ fontSize: "1.1rem", color: "#64748b" }} />
          </IconButton>

          <Box className="form-animate" sx={{ width: "100%", maxWidth: 400 }}>

            {/* Heading */}
            <Box sx={{ mb: 4 }}>
              <Typography sx={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: "1.75rem",
                color: "#0f172a",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}>
                Branch Login
              </Typography>
              <Typography sx={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.875rem",
                color: "#94a3b8",
                mt: 0.6,
              }}>
                Sign in to access your branch portal
              </Typography>
            </Box>

            {/* Form Card */}
            <Box sx={{
              backgroundColor: "#ffffff",
              borderRadius: "20px",
              border: "1px solid #e2e8f0",
              p: 3.5,
              boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
            }}>
              <Stack spacing={2.5}>
                <TextField
                  label="Email"
                  fullWidth
                  autoComplete="off"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  sx={inputSx}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailOutlinedIcon sx={{ color: "#94a3b8", fontSize: "1.1rem" }} />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  sx={inputSx}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlinedIcon sx={{ color: "#94a3b8", fontSize: "1.1rem" }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          size="small"
                          sx={{ color: "#94a3b8" }}
                        >
                          {showPassword
                            ? <VisibilityOffOutlinedIcon sx={{ fontSize: "1.1rem" }} />
                            : <VisibilityOutlinedIcon sx={{ fontSize: "1.1rem" }} />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                {error && (
                  <Box sx={{
                    px: 2, py: 1.2,
                    backgroundColor: "#fef2f2",
                    border: "1px solid #fecaca",
                    borderRadius: "10px",
                  }}>
                    <Typography sx={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.8rem",
                      color: "#dc2626",
                    }}>
                      {error}
                    </Typography>
                  </Box>
                )}

                <Button
                  variant="contained"
                  size="large"
                  onClick={handleLogin}
                  fullWidth
                  sx={{
                    py: 1.5,
                    borderRadius: "12px",
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    textTransform: "none",
                    letterSpacing: "0.02em",
                    background: "linear-gradient(135deg, #059669, #10b981)",
                    boxShadow: "0 4px 16px rgba(5,150,105,0.35)",
                    transition: "transform 0.18s ease, box-shadow 0.18s ease",
                    "&:hover": {
                      background: "linear-gradient(135deg, #047857, #059669)",
                      boxShadow: "0 6px 24px rgba(5,150,105,0.45)",
                      transform: "translateY(-2px)",
                    },
                    "&:active": { transform: "scale(0.98)" },
                  }}
                >
                  Sign In
                </Button>
              </Stack>
            </Box>

            <Typography sx={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.62rem",
              color: "#cbd5e1",
              textAlign: "center",
              mt: 3,
              letterSpacing: "0.05em",
            }}>
              BRANCH PERSONNEL ONLY
            </Typography>
          </Box>
        </Box>

      </Box>
    </>
  );
}

export default Branchlogin;


// import { useState } from "react";
// import API from "../services/api";
// import socket from "../services/socket";
// import { useNavigate } from "react-router-dom";
// import {
//   Stack,
//   TextField,
//   Button,
//   Box,
//   Typography,
//   Paper,
//   IconButton
// } from "@mui/material";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import logo from "../assets/logo.png";

// function Branchlogin() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     try {
//       const res = await API.post("/auth/login", {
//         email: username,
//         password,
//       });

//       const { user, branch } = res.data;

//       if (user.role !== "branch_user") {
//         alert("Not authorized as branch user");
//         return;
//       }

//       localStorage.setItem("branchUser", JSON.stringify(user));
//       localStorage.setItem("branch", JSON.stringify(branch));

//       socket.emit("joinBranch", branch.id);

//       navigate("/branch");

//     } catch (err) {
//       alert(err.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <Box
//       sx={{
//         height: "100vh",
//         background: "linear-gradient(135deg,#eef2f7,#d9e4f5)",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         position: "relative"
//       }}
//     >

//       {/* BACK BUTTON */}
//       <IconButton
//         onClick={() => navigate("/")}
//         sx={{
//           position: "absolute",
//           top: 30,
//           left: 30,
//           background: "#fff",
//           boxShadow: 2
//         }}
//       >
//         <ArrowBackIcon />
//       </IconButton>

//       <Paper
//         elevation={10}
//         sx={{
//           width: 820,
//           height: 420,
//           display: "flex",
//           borderRadius: 4,
//           overflow: "hidden"
//         }}
//       >

//         {/* LEFT LOGIN FORM */}
//         <Box
//           sx={{
//             width: "50%",
//             p: 5,
//             background: "#ffffff",
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center"
//           }}
//         >
//           <Typography
//             variant="h4"
//             fontWeight="bold"
//             mb={1}
//           >
//             Branch Login
//           </Typography>

//           <Typography
//             variant="body2"
//             color="text.secondary"
//             mb={4}
//           >
//             Sign in to continue
//           </Typography>

//           <Stack spacing={3}>
//             <TextField
//               label="Email"
//               fullWidth
//               autoComplete="off"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//             />

//             <TextField
//               label="Password"
//               type="password"
//               fullWidth
//               autoComplete="new-password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />

//             <Button
//               variant="contained"
//               size="large"
//               onClick={handleLogin}
//               sx={{
//                 py: 1.5,
//                 borderRadius: 2,
//                 fontWeight: "bold",
//                 background: "linear-gradient(90deg,#11998e,#38ef7d)",
//                 boxShadow: 3
//               }}
//             >
//               LOGIN
//             </Button>
//           </Stack>
//         </Box>

//         {/* RIGHT BRAND PANEL */}
//         <Box
//           sx={{
//             width: "50%",
//             backgroundImage:
//               "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c')",
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             position: "relative"
//           }}
//         >
//           <Box
//             sx={{
//               position: "absolute",
//               inset: 0,
//               background: "rgba(0,0,0,0.75)",
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               justifyContent: "center",
//               color: "#fff",
//               textAlign: "center"
//             }}
//           >
//             <img
//               src={logo}
//               alt="logo"
//               style={{
//                 width: 80,
//                 marginBottom: 20
//               }}
//             />

//             <Typography variant="h4" fontWeight="bold">
//               WORKFLOW
//             </Typography>

//             <Typography variant="body2" sx={{ opacity: 0.8 }}>
//               Branch Management System
//             </Typography>
//           </Box>
//         </Box>

//       </Paper>
//     </Box>
//   );
// }

// export default Branchlogin;