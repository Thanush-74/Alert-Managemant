
// import { NavLink } from "react-router-dom";
// import { Box, Typography, Button, Stack } from "@mui/material";

// function Home() {
//   return (
//     <Box
//       sx={{
//         display: "flex",
//         minHeight: "100vh",
//         flexDirection: { xs: "column", md: "row" },
//       }}
//     >
//       {/* LEFT SIDE */}
//       <Box
//         sx={{
//           flex: 1,
//           background: "linear-gradient(135deg, #0f2027, #203a43)",
//           color: "white",
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "center",
//           alignItems: "center",
//           textAlign: "center",
//           px: 6,
//           py: { xs: 8, md: 0 },
//         }}
//       >
//         <Typography variant="h3" fontWeight="bold">
//           Alert Management
//         </Typography>

//         <Typography variant="h6" sx={{ mt: 2, opacity: 0.85 }}>
//           Smart • Secure • Real-Time Monitoring
//         </Typography>
//       </Box>

//       {/* RIGHT SIDE */}
//       <Box
//         sx={{
//           flex: 1,
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           backgroundColor: "#f4f6f8",
//           px: 3,
//         }}
//       >
//         <Box
//           sx={{
//             width: "100%",
//             maxWidth: 380,
//             p: 5,
//             borderRadius: 4,
//             backgroundColor: "white",
//             boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
//           }}
//         >
//           <Typography
//             variant="h5"
//             fontWeight="bold"
//             textAlign="center"
//             mb={4}
//           >
//             Choose Login Type
//           </Typography>

//           <Stack spacing={3}>
//             {["/customer", "/branch-login", "/admin-login"].map(
//               (path, index) => {
//                 const labels = [
//                   "Customer",
//                   "Branch Login",
//                   "Admin Login",
//                 ];

//                 return (
//                   <Button
//                     key={index}
//                     variant="contained"
//                     color="primary"
//                     size="large"
//                     component={NavLink}
//                     to={path}
//                     fullWidth
//                     sx={{
//                       textTransform: "none",
//                       borderRadius: 2,
//                       fontWeight: "bold",
//                       transition: "0.3s",
//                       "&:hover": {
//                         backgroundColor: "primary.dark",
//                         transform: "translateY(-3px)",
//                       },
//                       "&:active": {
//                         backgroundColor: "primary.main",
//                         transform: "scale(0.98)",
//                       },
//                     }}
//                   >
//                     {labels[index]}
//                   </Button>
//                 );
//               }
//             )}
//           </Stack>
//         </Box>
//       </Box>
//     </Box>
//   );
// }

// export default Home;

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Box, Typography,Stack } from "@mui/material";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import BoltIcon from "@mui/icons-material/Bolt";
import ShieldIcon from "@mui/icons-material/Shield";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import StorefrontIcon from "@mui/icons-material/Storefront";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const loginOptions = [
  {
    path: "/login",
    label: "Customer",
    sub: "Track & receive alerts",
    icon: PersonOutlineIcon,
    accent: "#6366f1",
    bg: "#eef2ff",
    border: "#c7d2fe",
  },
  {
    path: "/branch-login",
    label: "Branch Login",
    sub: "Manage your branch",
    icon: StorefrontIcon,
    accent: "#0ea5e9",
    bg: "#f0f9ff",
    border: "#bae6fd",
  },
  {
    path: "/admin-login",
    label: "Admin Login",
    sub: "Full system control",
    icon: AdminPanelSettingsIcon,
    accent: "#f59e0b",
    bg: "#fffbeb",
    border: "#fde68a",
  },
];

const features = [
  { icon: BoltIcon, label: "Real-Time" },
  { icon: ShieldIcon, label: "Secure" },
  { icon: SignalCellularAltIcon, label: "Monitored" },
];

function Home() {
  const navigate = useNavigate();


  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&family=DM+Mono:wght@400;500&display=swap');

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes pulse-ring {
          0% { transform: scale(0.95); opacity: 0.7; }
          100% { transform: scale(1.4); opacity: 0; }
        }

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .login-card {
          animation: fadeSlideUp 0.35s ease forwards;
          opacity: 0;
        }
        .login-card:nth-child(1) { animation-delay: 0.1s; }
        .login-card:nth-child(2) { animation-delay: 0.2s; }
        .login-card:nth-child(3) { animation-delay: 0.3s; }

        .login-btn:hover .arrow-icon {
          transform: translateX(4px);
        }
        .arrow-icon {
          transition: transform 0.2s ease;
        } */}
      {/* `}</style>

      <Box sx={{
        display: "flex",
        minHeight: "100vh",
        flexDirection: { xs: "column", md: "row" },
        fontFamily: "'DM Sans', sans-serif",
      }}>

        {/* LEFT SIDE */}
        <Box sx={{
          flex: 1,
          background: "linear-gradient(145deg, #0a0f1e 0%, #0f1f3d 50%, #0d2137 100%)",
          color: "white",
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

          {/* Background grid lines */}
          <Box sx={{
            position: "absolute", inset: 0, pointerEvents: "none",
            backgroundImage: "linear-gradient(rgba(99,102,241,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.07) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }} />

          {/* Glow blob */}
          <Box sx={{
            position: "absolute",
            width: 340,
            height: 340,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)",
            top: "20%",
            left: "50%",
            transform: "translateX(-50%)",
            pointerEvents: "none",
          }} />

          {/* Icon with pulse */}
          <Box sx={{ position: "relative", mb: 4, animation: "float 3.5s ease-in-out infinite" }}>
            <Box sx={{
              position: "absolute", inset: 0, borderRadius: "50%",
              border: "2px solid rgba(99,102,241,0.4)",
              animation: "pulse-ring 2s ease-out infinite",
            }} />
            <Box sx={{
              width: 72, height: 72, borderRadius: "20px",
              background: "linear-gradient(135deg, #6366f1, #818cf8)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 40px rgba(99,102,241,0.45)",
            }}>
              <NotificationsActiveIcon sx={{ color: "#fff", fontSize: "2rem" }} />
            </Box>
          </Box>

          <Typography sx={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: { xs: "2rem", md: "2.6rem" },
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            mb: 1.5,
            background: "linear-gradient(135deg, #ffffff 30%, #a5b4fc)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            Alert Management
          </Typography>

          <Typography sx={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.78rem",
            letterSpacing: "0.12em",
            color: "#6366f1",
            textTransform: "uppercase",
            mb: 4,
          }}>
            Unified Monitoring Platform
          </Typography>

          {/* Feature pills */}
          <Stack direction="row" spacing={1.5} justifyContent="center">
            {features.map(({ icon: Icon, label }) => (
              <Box key={label} sx={{
                display: "flex", alignItems: "center", gap: 0.7,
                px: 1.8, py: 0.8,
                borderRadius: "999px",
                border: "1px solid rgba(99,102,241,0.3)",
                backgroundColor: "rgba(99,102,241,0.1)",
                backdropFilter: "blur(6px)",
              }}>
                <Icon sx={{ color: "#a5b4fc", fontSize: "0.9rem" }} />
                <Typography sx={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.68rem",
                  color: "#c7d2fe",
                  letterSpacing: "0.06em",
                }}>
                  {label}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>

        {/* RIGHT SIDE */}
        <Box sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f1f5f9",
          px: 3,
          py: { xs: 6, md: 0 },
        }}>
          <Box sx={{ width: "100%", maxWidth: 400 }}>

            <Box sx={{ mb: 4, textAlign: "center" }}>
              <Typography sx={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: "1.6rem",
                color: "#0f172a",
                letterSpacing: "-0.02em",
              }}>
                Welcome back
              </Typography>
              <Typography sx={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.875rem",
                color: "#94a3b8",
                mt: 0.5,
              }}>
                Select your login type to continue
              </Typography>
            </Box>

            <Stack spacing={2}>
              {loginOptions.map(({ path, label, sub, icon: Icon, accent, bg, border }) => (
                <Box
                  key={path}
                  className="login-card"
                  component={NavLink}
                  to={path}
                  sx={{ textDecoration: "none" }}
                >
                  <Box
                    className="login-btn"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      p: 2.2,
                      borderRadius: "14px",
                      border: `1px solid ${border}`,
                      backgroundColor: "#ffffff",
                      cursor: "pointer",
                      transition: "transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: `0 8px 24px ${accent}22`,
                        borderColor: accent,
                      },
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Box sx={{
                        width: 44, height: 44, borderRadius: "12px",
                        backgroundColor: bg,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        flexShrink: 0,
                      }}>
                        <Icon sx={{ color: accent, fontSize: "1.3rem" }} />
                      </Box>
                      <Box>
                        <Typography sx={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontWeight: 600,
                          fontSize: "0.95rem",
                          color: "#0f172a",
                          lineHeight: 1.2,
                        }}>
                          {label}
                        </Typography>
                        <Typography sx={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "0.75rem",
                          color: "#94a3b8",
                          mt: 0.2,
                        }}>
                          {sub}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{
                      width: 30, height: 30, borderRadius: "8px",
                      backgroundColor: bg,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                    }}>
                      <ArrowForwardIcon className="arrow-icon" sx={{ color: accent, fontSize: "1rem" }} />
                    </Box>
                  </Box>
                </Box>
              ))}
            </Stack>

            <Typography sx={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.65rem",
              color: "#cbd5e1",
              textAlign: "center",
              mt: 4,
              letterSpacing: "0.05em",
            }}>
              SECURED · ENCRYPTED · MONITORED
            </Typography>
          </Box>
        </Box>

      </Box>
    </>
  );
}

export default Home;