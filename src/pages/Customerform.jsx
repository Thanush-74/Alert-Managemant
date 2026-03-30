// import { useState, useEffect } from "react";
// import API from "../services/api";
// import {
//   Box,
//   Typography,
//   TextField,
//   Button,
//   Stack,
//   InputAdornment,
//   IconButton,
//   Card,
//   CardContent,
// } from "@mui/material";

// import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
// import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
// import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
// import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
// import StorefrontIcon from "@mui/icons-material/Storefront";
// import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
// import MyLocationIcon from "@mui/icons-material/MyLocation";
// import PhoneIcon from "@mui/icons-material/Phone";

// import { Navigate, useNavigate } from "react-router-dom";

// function CustomerForm() {
//   const navigate = useNavigate();

//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [pincode, setPincode] = useState("");
//   const [message, setMessage] = useState("");
//   const [branch, setBranch] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [products, setProducts] = useState([]);

//   // ✅ Autofill from localStorage
//   useEffect(() => {
//     const savedCustomer = JSON.parse(localStorage.getItem("customer") || "null");

//     if (!savedCustomer || !savedCustomer.phone) {
//       // No phone - redirect to login
//       setMessage("Please login first");
//       setTimeout(() => navigate("/customer-login"), 1500);
//       return;
//     }

//     // Set data
//     setPhone(savedCustomer.phone);
//     setName(savedCustomer.name || "");
//     setPincode(savedCustomer.pincode || "");
//   }, [navigate]);

//   // ✅ Handle form submission - FIXED
//   const handleSubmit = async () => {
//     if (!phone) {
//       setMessage("Phone missing. Please login again.");
//       return;
//     }

//     if (!name || !/^\d{6}$/.test(pincode)) {
//       setMessage("Enter valid name and 6-digit pincode");
//       return;
//     }

//     setLoading(true);

//     try {
//       const res = await API.post("/customer/request", {
//         name,
//         pincode,
//         phone,
//       });

//       // ✅ SAVE CUSTOMER
//       localStorage.setItem(
//         "customer",
//         JSON.stringify({ name, phone, pincode })
//       );

//       if (res.data.branchAvailable) {
//         // ✅ BRANCH FOUND - SHOW IN SAME PAGE
//         setBranch(res.data.branch);
//         setMessage("");
//         setProducts([]);

//         localStorage.setItem("branch", JSON.stringify(res.data.branch));
//         localStorage.removeItem("noBranch");

//         // Navigate after showing success
//         setTimeout(() => {
//           navigate("/customer-home");
//         }, 2000);

//       } else {
//         // ❌ NO BRANCH
//         setBranch(null);
//         setMessage(res.data.message);

//         // ✅ IMPORTANT FLAG
//         localStorage.setItem("noBranch", "true");

//         // Navigate to home to show products
//         setTimeout(() => {
//           navigate("/customer-home");
//         }, 1500);
//       }
//     } catch (error) {
//       setBranch(null);
//       setProducts([]);
//       setMessage(error.response?.data?.message || "Something went wrong!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Input field styles
//   const inputSx = {
//     "& .MuiOutlinedInput-root": {
//       backgroundColor: "#f8fafc",
//       borderRadius: "12px",
//       fontFamily: "'DM Sans', sans-serif",
//       fontSize: "0.9rem",
//       "& fieldset": { borderColor: "#e2e8f0" },
//       "&:hover fieldset": { borderColor: "#94a3b8" },
//       "&.Mui-focused fieldset": { borderColor: "#059669", borderWidth: "1.5px" },
//       "&.Mui-disabled": {
//         backgroundColor: "rgba(241, 245, 249, 0.5)",
//       },
//     },
//     "& .MuiInputLabel-root": {
//       fontFamily: "'DM Sans', sans-serif",
//       fontSize: "0.875rem",
//       color: "#94a3b8",
//     },
//     "& .MuiInputLabel-root.Mui-focused": { color: "#059669" },
//   };

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

//         @keyframes fadeUp {
//           from { opacity: 0; transform: translateY(16px); }
//           to { opacity: 1; transform: translateY(0); }
//         }

//         @keyframes float {
//           0%, 100% { transform: translateY(0); }
//           50% { transform: translateY(-8px); }
//         }

//         @keyframes pulse-ring {
//           0% { transform: scale(0.95); opacity: 0.5; }
//           100% { transform: scale(1.6); opacity: 0; }
//         }

//         @keyframes resultSlide {
//           from { opacity: 0; transform: translateY(12px); }
//           to { opacity: 1; transform: translateY(0); }
//         }

//         @keyframes productSlide {
//           from { opacity: 0; transform: translateY(20px); }
//           to { opacity: 1; transform: translateY(0); }
//         }

//         .result-card { animation: resultSlide 0.3s ease forwards; }
//         .form-card { animation: fadeUp 0.4s ease forwards; }
//         .product-card { animation: productSlide 0.4s ease forwards; }
//       `}</style>

//       <Box sx={{
//         minHeight: "100vh",
//         display: "flex",
//         flexDirection: { xs: "column", md: "row" },
//         fontFamily: "'DM Sans', sans-serif",
//       }}>

//         {/* LEFT PANEL */}
//         <Box sx={{
//           flex: 1,
//           background: "linear-gradient(145deg, #022c22 0%, #064e3b 50%, #065f46 100%)",
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "center",
//           alignItems: "center",
//           textAlign: "center",
//           px: { xs: 4, md: 7 },
//           py: { xs: 8, md: 0 },
//           position: "relative",
//           overflow: "hidden",
//         }}>

//           {/* Grid */}
//           <Box sx={{
//             position: "absolute", inset: 0, pointerEvents: "none",
//             backgroundImage: "linear-gradient(rgba(16,185,129,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.07) 1px, transparent 1px)",
//             backgroundSize: "48px 48px",
//           }} />

//           {/* Glow */}
//           <Box sx={{
//             position: "absolute", width: 360, height: 360, borderRadius: "50%",
//             background: "radial-gradient(circle, rgba(16,185,129,0.18) 0%, transparent 70%)",
//             top: "20%", left: "50%", transform: "translateX(-50%)",
//             pointerEvents: "none",
//           }} />

//           {/* Icon */}
//           <Box sx={{ position: "relative", mb: 4, animation: "float 3.5s ease-in-out infinite" }}>
//             <Box sx={{
//               position: "absolute", inset: 0, borderRadius: "50%",
//               border: "2px solid rgba(16,185,129,0.4)",
//               animation: "pulse-ring 2.2s ease-out infinite",
//             }} />
//             <Box sx={{
//               width: 72, height: 72, borderRadius: "20px",
//               background: "linear-gradient(135deg, #059669, #10b981)",
//               display: "flex", alignItems: "center", justifyContent: "center",
//               boxShadow: "0 0 40px rgba(16,185,129,0.45)",
//             }}>
//               <MyLocationIcon sx={{ color: "#fff", fontSize: "2rem" }} />
//             </Box>
//           </Box>

//           <Typography sx={{
//             fontFamily: "'Syne', sans-serif",
//             fontWeight: 800,
//             fontSize: { xs: "2rem", md: "2.6rem" },
//             lineHeight: 1.15,
//             letterSpacing: "-0.02em",
//             background: "linear-gradient(135deg, #ffffff 30%, #6ee7b7)",
//             WebkitBackgroundClip: "text",
//             WebkitTextFillColor: "transparent",
//             mb: 1.5,
//           }}>
//             Find Your<br />Nearest Branch
//           </Typography>

//           <Typography sx={{
//             fontFamily: "'DM Mono', monospace",
//             fontSize: "0.72rem",
//             letterSpacing: "0.1em",
//             color: "#10b981",
//             textTransform: "uppercase",
//             mb: 3,
//           }}>
//             Instant Branch Locator
//           </Typography>

//           <Typography sx={{
//             fontFamily: "'DM Sans', sans-serif",
//             fontSize: "0.9rem",
//             color: "rgba(255,255,255,0.65)",
//             maxWidth: 300,
//             lineHeight: 1.7,
//           }}>
//             Discover our locations and explore our exclusive product catalog
//           </Typography>

//           {/* Stat pills */}
//           <Stack direction="row" spacing={1.5} mt={4} flexWrap="wrap" justifyContent="center">
//             {["Fast Lookup", "Real-Time", "Verified"].map((label) => (
//               <Box key={label} sx={{
//                 px: 1.8, py: 0.7,
//                 borderRadius: "999px",
//                 border: "1px solid rgba(16,185,129,0.3)",
//                 backgroundColor: "rgba(16,185,129,0.1)",
//               }}>
//                 <Typography sx={{
//                   fontFamily: "'DM Mono', monospace",
//                   fontSize: "0.65rem",
//                   color: "#a7f3d0",
//                   letterSpacing: "0.06em",
//                 }}>
//                   {label}
//                 </Typography>
//               </Box>
//             ))}
//           </Stack>
//         </Box>

//         {/* RIGHT FORM PANEL */}
//         <Box sx={{
//           flex: 1,
//           backgroundColor: "#f1f5f9",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           px: 3,
//           py: { xs: 6, md: 0 },
//           position: "relative",
//           overflowY: "auto",
//           maxHeight: "100vh",
//         }}>

//           {/* Back Button */}
//           <IconButton
//             onClick={() => navigate("/")}
//             sx={{
//               position: "absolute", top: 24, left: 24,
//               backgroundColor: "#ffffff",
//               border: "1px solid #e2e8f0",
//               borderRadius: "10px",
//               width: 38, height: 38,
//               "&:hover": { backgroundColor: "#f0fdf4", borderColor: "#bbf7d0" },
//             }}
//           >
//             <ArrowBackIcon sx={{ fontSize: "1.1rem", color: "#64748b" }} />
//           </IconButton>

//           <Box className="form-card" sx={{ width: "100%", maxWidth: 420, py: 8 }}>

//             {/* Heading */}
//             <Box sx={{ mb: 4 }}>
//               <Typography sx={{
//                 fontFamily: "'Syne', sans-serif",
//                 fontWeight: 700,
//                 fontSize: "1.75rem",
//                 color: "#0f172a",
//                 letterSpacing: "-0.02em",
//                 lineHeight: 1.1,
//               }}>
//                 Check Branch
//               </Typography>
//               <Typography sx={{
//                 fontFamily: "'DM Sans', sans-serif",
//                 fontSize: "0.875rem",
//                 color: "#94a3b8",
//                 mt: 0.6,
//               }}>
//                 Fill in your details to find the nearest branch
//               </Typography>
//             </Box>

//             {/* Form Card */}
//             <Box sx={{
//               backgroundColor: "#ffffff",
//               borderRadius: "20px",
//               border: "1px solid #e2e8f0",
//               p: 3.5,
//               boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
//             }}>
//               <Stack spacing={2.5}>
//                 <TextField
//                   label="Full Name"
//                   fullWidth
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   sx={inputSx}
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <PersonOutlineIcon sx={{ color: "#94a3b8", fontSize: "1.1rem" }} />
//                       </InputAdornment>
//                     ),
//                   }}
//                 />

//                 {/* ✅ PHONE FIELD - DISABLED */}
//                 <TextField
//                   label="Phone Number"
//                   fullWidth
//                   value={phone}
//                   disabled
//                   sx={inputSx}
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <PhoneOutlinedIcon sx={{ color: "#94a3b8", fontSize: "1.1rem" }} />
//                       </InputAdornment>
//                     ),
//                   }}
//                 />

//                 <TextField
//                   label="Pincode"
//                   fullWidth
//                   value={pincode}
//                   onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
//                   onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
//                   inputProps={{ maxLength: 6 }}
//                   sx={inputSx}
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <LocationOnOutlinedIcon sx={{ color: "#94a3b8", fontSize: "1.1rem" }} />
//                       </InputAdornment>
//                     ),
//                   }}
//                 />

//                 <Button
//                   variant="contained"
//                   size="large"
//                   onClick={handleSubmit}
//                   disabled={loading || !name || !pincode}
//                   endIcon={<ArrowForwardIcon />}
//                   fullWidth
//                   sx={{
//                     py: 1.5,
//                     borderRadius: "12px",
//                     fontFamily: "'DM Sans', sans-serif",
//                     fontWeight: 700,
//                     fontSize: "0.9rem",
//                     textTransform: "none",
//                     background: "linear-gradient(135deg, #059669, #10b981)",
//                     boxShadow: "0 4px 16px rgba(5,150,105,0.35)",
//                     transition: "transform 0.18s ease, box-shadow 0.18s ease",
//                     "&:hover": {
//                       background: "linear-gradient(135deg, #047857, #059669)",
//                       boxShadow: "0 6px 24px rgba(5,150,105,0.45)",
//                       transform: "translateY(-1px)",
//                     },
//                     "&:active": { transform: "scale(0.98)" },
//                     "&.Mui-disabled": { opacity: 0.6 },
//                   }}
//                 >
//                   {loading ? "Searching..." : "Find Branch"}
//                 </Button>
//               </Stack>
//             </Box>

//             {/* SUCCESS RESULT */}
//             {branch && (
//               <Box
//                 className="result-card"
//                 sx={{
//                   mt: 3,
//                   backgroundColor: "#ffffff",
//                   borderRadius: "16px",
//                   border: "1px solid #bbf7d0",
//                   overflow: "hidden",
//                 }}
//               >
//                 {/* Top stripe */}
//                 <Box sx={{
//                   height: 4,
//                   background: "linear-gradient(90deg, #059669, #10b981)",
//                 }} />

//                 <Box sx={{ p: 2.5 }}>
//                   <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
//                     <Box sx={{
//                       width: 36, height: 36, borderRadius: "10px",
//                       backgroundColor: "#f0fdf4",
//                       display: "flex", alignItems: "center", justifyContent: "center",
//                       flexShrink: 0,
//                     }}>
//                       <CheckCircleOutlineIcon sx={{ color: "#059669", fontSize: "1.2rem" }} />
//                     </Box>
//                     <Box>
//                       <Typography sx={{
//                         fontFamily: "'DM Sans', sans-serif",
//                         fontWeight: 700, fontSize: "0.9rem", color: "#065f46",
//                       }}>
//                         Branch Found!
//                       </Typography>
//                       <Typography sx={{
//                         fontFamily: "'DM Mono', monospace",
//                         fontSize: "0.65rem", color: "#10b981", letterSpacing: "0.05em",
//                       }}>
//                         NEAREST BRANCH
//                       </Typography>
//                     </Box>
//                   </Box>

//                   <Stack spacing={1.2}>
//                     {[
//                       { icon: StorefrontIcon, label: "Branch", value: branch.branch_name },
//                       { icon: LocationOnOutlinedIcon, label: "Address", value: branch.address || "N/A" },
//                       { icon: PhoneIcon, label: "Phone", value: branch.phone || "N/A" },
//                     ].map(({ icon: Icon, label, value }) => (
//                       <Box key={label} sx={{
//                         display: "flex", alignItems: "center", gap: 1.2,
//                         px: 1.5, py: 1,
//                         backgroundColor: "#f0fdf4",
//                         borderRadius: "10px",
//                       }}>
//                         <Icon sx={{ color: "#059669", fontSize: "1rem", flexShrink: 0 }} />
//                         <Box>
//                           <Typography sx={{
//                             fontFamily: "'DM Mono', monospace",
//                             fontSize: "0.62rem", color: "#6ee7b7", letterSpacing: "0.06em",
//                           }}>
//                             {label.toUpperCase()}
//                           </Typography>
//                           <Typography sx={{
//                             fontFamily: "'DM Sans', sans-serif",
//                             fontSize: "0.825rem", fontWeight: 600, color: "#065f46",
//                           }}>
//                             {value}
//                           </Typography>
//                         </Box>
//                       </Box>
//                     ))}
//                   </Stack>
//                 </Box>
//               </Box>
//             )}

//             {/* ERROR RESULT */}
//             {message && !branch && (
//               <Box
//                 className="result-card"
//                 sx={{
//                   mt: 3,
//                   backgroundColor: "#ffffff",
//                   borderRadius: "16px",
//                   border: "1px solid #fecaca",
//                   overflow: "hidden",
//                 }}
//               >
//                 <Box sx={{ height: 4, background: "linear-gradient(90deg, #dc2626, #ef4444)" }} />
//                 <Box sx={{ p: 2.5 }}>
//                   <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5, mb: 2 }}>
//                     <Box sx={{
//                       width: 36, height: 36, borderRadius: "10px",
//                       backgroundColor: "#fef2f2",
//                       display: "flex", alignItems: "center", justifyContent: "center",
//                       flexShrink: 0,
//                     }}>
//                       <ErrorOutlineIcon sx={{ color: "#dc2626", fontSize: "1.2rem" }} />
//                     </Box>
//                     <Box>
//                       <Typography sx={{
//                         fontFamily: "'DM Sans', sans-serif",
//                         fontWeight: 700, fontSize: "0.875rem", color: "#991b1b",
//                       }}>
//                         No Branch Available
//                       </Typography>
//                       <Typography sx={{
//                         fontFamily: "'DM Sans', sans-serif",
//                         fontSize: "0.8rem", color: "#dc2626", mt: 0.3,
//                       }}>
//                         {message}
//                       </Typography>
//                     </Box>
//                   </Box>
//                   <Button
//                     onClick={() => setPincode("")}
//                     sx={{
//                       width: "100%",
//                       py: 1.2,
//                       borderRadius: "10px",
//                       fontFamily: "'DM Sans', sans-serif",
//                       fontWeight: 600,
//                       fontSize: "0.85rem",
//                       textTransform: "none",
//                       backgroundColor: "#fef2f2",
//                       color: "#dc2626",
//                       border: "1px solid #fecaca",
//                       "&:hover": {
//                         backgroundColor: "#fee2e2",
//                         borderColor: "#fca5a5",
//                       },
//                     }}
//                   >
//                     Try Another Pincode
//                   </Button>
//                 </Box>
//               </Box>
//             )}

//           </Box>
//         </Box>

//       </Box>
//     </>
//   );
// }

// export default CustomerForm;

// import { useState, useEffect } from "react";
// import API from "../services/api";
// import {
//   Box,
//   Typography,
//   TextField,
//   Button,
//   Stack,
//   InputAdornment,
//   IconButton,
//   Card,
//   CardContent,
// } from "@mui/material";

// import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
// import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
// import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
// import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
// import StorefrontIcon from "@mui/icons-material/Storefront";
// import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
// import MyLocationIcon from "@mui/icons-material/MyLocation";
// import PhoneIcon from "@mui/icons-material/Phone";

// import { Navigate, useNavigate } from "react-router-dom";

// function CustomerForm() {
//   const navigate = useNavigate();

//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [pincode, setPincode] = useState("");
//   const [message, setMessage] = useState("");
//   const [branch, setBranch] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [products, setProducts] = useState([]);

//   // Autofill from localStorage
// useEffect(() => {
//   const savedCustomer = JSON.parse(localStorage.getItem("customer") || "null");
//   if (savedCustomer) {
//     setName(savedCustomer.name || "");
//     setPhone(savedCustomer.phone || "");
//     setPincode(savedCustomer.pincode || "");
//   }
// }, []);
// console.log("Sending:", { name, phone, pincode });

//   // Handle form submission
// //   const handleSubmit = async () => {
// // if (!name || !/^\d{6}$/.test(pincode) || !/^\d{10}$/.test(phone)) {
// //   setMessage("Enter valid name, phone and 6-digit pincode");
// //   return;
// // }

// //     setLoading(true);

// //     try {
// //       const res = await API.post("/customer/request", {
// //   name,
// //   pincode,
// //   phone
// // });

// //       const existing = JSON.parse(localStorage.getItem("customer") || "null");

// //       localStorage.setItem(
// //         "customer",
// //         JSON.stringify({
// //           name,
// //           phone: existing?.phone || phone,
// //           pincode,
// //         }),
// //       );

// //       if (res.data.branchAvailable) {
// //         setBranch(res.data.branch);
// //         setMessage("");
// //         setProducts([]);

// //         // SAVE BRANCH
// //         localStorage.setItem("branch", JSON.stringify(res.data.branch));

// //         // NAVIGATE TO HOME
// //         setTimeout(() => {
// //          navigate("/customer-home");
// //         }, 1000);
// //       } else {
// //         setBranch(null);
// //         setMessage(res.data.message);
// //         const prodRes = await API.get("/products");
// //         setProducts(prodRes.data);
// //       }
// //     } catch (error) {
// //       setBranch(null);
// //       setProducts([]);
// //       setMessage(error.response?.data?.message || "Something went wrong!");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };
// const handleSubmit = async () => {

//     if (!phone) {
//     setMessage("Phone missing. Please login again.");
//     return;
//   }
//   if (!name || !/^\d{6}$/.test(pincode) || !/^\d{10}$/.test(phone)) {
//     setMessage("Enter valid name, phone and 6-digit pincode");
//     return;
//   }

//   setLoading(true);

//   try {
//     const res = await API.post("/customer/request", {
//       name,
//       pincode,
//       phone,
//     });

//     // ✅ SAVE CUSTOMER
//     localStorage.setItem(
//       "customer",
//       JSON.stringify({ name, phone, pincode })
//     );

//     if (res.data.branchAvailable) {
//       // ✅ SHOW IN SAME PAGE
//       setBranch(res.data.branch);
//       setMessage("");
//       setProducts([]);

//       localStorage.setItem("branch", JSON.stringify(res.data.branch));

//       // ❗ CLEAR FLAG
//       localStorage.removeItem("noBranch");

//     } else {
//       // ❌ NO BRANCH
//       setBranch(null);
//       setMessage(res.data.message);

//       // ✅ IMPORTANT FLAG
//       localStorage.setItem("noBranch", "true");

//       navigate("/customer-home");
//     }
//   } catch (error) {
//     setBranch(null);
//     setProducts([]);
//     setMessage(error.response?.data?.message || "Something went wrong!");
//   } finally {
//     setLoading(false);
//   }
// };
// console.log("CLICKED", { name, phone, pincode });

//   // Input field styles
//   const inputSx = {
//     "& .MuiOutlinedInput-root": {
//       backgroundColor: "#f8fafc",
//       borderRadius: "12px",
//       fontFamily: "'DM Sans', sans-serif",
//       fontSize: "0.9rem",
//       "& fieldset": { borderColor: "#e2e8f0" },
//       "&:hover fieldset": { borderColor: "#94a3b8" },
//       "&.Mui-focused fieldset": { borderColor: "#059669", borderWidth: "1.5px" },
//       "&.Mui-disabled": {
//         backgroundColor: "rgba(241, 245, 249, 0.5)",
//       },
//     },
//     "& .MuiInputLabel-root": {
//       fontFamily: "'DM Sans', sans-serif",
//       fontSize: "0.875rem",
//       color: "#94a3b8",
//     },
//     "& .MuiInputLabel-root.Mui-focused": { color: "#059669" },
//   };

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

//         @keyframes fadeUp {
//           from { opacity: 0; transform: translateY(16px); }
//           to { opacity: 1; transform: translateY(0); }
//         }

//         @keyframes float {
//           0%, 100% { transform: translateY(0); }
//           50% { transform: translateY(-8px); }
//         }

//         @keyframes pulse-ring {
//           0% { transform: scale(0.95); opacity: 0.5; }
//           100% { transform: scale(1.6); opacity: 0; }
//         }

//         @keyframes resultSlide {
//           from { opacity: 0; transform: translateY(12px); }
//           to { opacity: 1; transform: translateY(0); }
//         }

//         @keyframes productSlide {
//           from { opacity: 0; transform: translateY(20px); }
//           to { opacity: 1; transform: translateY(0); }
//         }

//         .result-card { animation: resultSlide 0.3s ease forwards; }
//         .form-card { animation: fadeUp 0.4s ease forwards; }
//         .product-card { animation: productSlide 0.4s ease forwards; }
//       `}</style>

//       <Box sx={{
//         minHeight: "100vh",
//         display: "flex",
//         flexDirection: { xs: "column", md: "row" },
//         fontFamily: "'DM Sans', sans-serif",
//       }}>

//         {/* LEFT PANEL */}
//         <Box sx={{
//           flex: 1,
//           background: "linear-gradient(145deg, #022c22 0%, #064e3b 50%, #065f46 100%)",
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "center",
//           alignItems: "center",
//           textAlign: "center",
//           px: { xs: 4, md: 7 },
//           py: { xs: 8, md: 0 },
//           position: "relative",
//           overflow: "hidden",
//         }}>

//           {/* Grid */}
//           <Box sx={{
//             position: "absolute", inset: 0, pointerEvents: "none",
//             backgroundImage: "linear-gradient(rgba(16,185,129,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.07) 1px, transparent 1px)",
//             backgroundSize: "48px 48px",
//           }} />

//           {/* Glow */}
//           <Box sx={{
//             position: "absolute", width: 360, height: 360, borderRadius: "50%",
//             background: "radial-gradient(circle, rgba(16,185,129,0.18) 0%, transparent 70%)",
//             top: "20%", left: "50%", transform: "translateX(-50%)",
//             pointerEvents: "none",
//           }} />

//           {/* Icon */}
//           <Box sx={{ position: "relative", mb: 4, animation: "float 3.5s ease-in-out infinite" }}>
//             <Box sx={{
//               position: "absolute", inset: 0, borderRadius: "50%",
//               border: "2px solid rgba(16,185,129,0.4)",
//               animation: "pulse-ring 2.2s ease-out infinite",
//             }} />
//             <Box sx={{
//               width: 72, height: 72, borderRadius: "20px",
//               background: "linear-gradient(135deg, #059669, #10b981)",
//               display: "flex", alignItems: "center", justifyContent: "center",
//               boxShadow: "0 0 40px rgba(16,185,129,0.45)",
//             }}>
//               <MyLocationIcon sx={{ color: "#fff", fontSize: "2rem" }} />
//             </Box>
//           </Box>

//           <Typography sx={{
//             fontFamily: "'Syne', sans-serif",
//             fontWeight: 800,
//             fontSize: { xs: "2rem", md: "2.6rem" },
//             lineHeight: 1.15,
//             letterSpacing: "-0.02em",
//             background: "linear-gradient(135deg, #ffffff 30%, #6ee7b7)",
//             WebkitBackgroundClip: "text",
//             WebkitTextFillColor: "transparent",
//             mb: 1.5,
//           }}>
//             Find Your<br />Nearest Branch
//           </Typography>

//           <Typography sx={{
//             fontFamily: "'DM Mono', monospace",
//             fontSize: "0.72rem",
//             letterSpacing: "0.1em",
//             color: "#10b981",
//             textTransform: "uppercase",
//             mb: 3,
//           }}>
//             Instant Branch Locator
//           </Typography>

//           <Typography sx={{
//             fontFamily: "'DM Sans', sans-serif",
//             fontSize: "0.9rem",
//             color: "rgba(255,255,255,0.65)",
//             maxWidth: 300,
//             lineHeight: 1.7,
//           }}>
//             Discover our locations and explore our exclusive product catalog
//           </Typography>

//           {/* Stat pills */}
//           <Stack direction="row" spacing={1.5} mt={4} flexWrap="wrap" justifyContent="center">
//             {["Fast Lookup", "Real-Time", "Verified"].map((label) => (
//               <Box key={label} sx={{
//                 px: 1.8, py: 0.7,
//                 borderRadius: "999px",
//                 border: "1px solid rgba(16,185,129,0.3)",
//                 backgroundColor: "rgba(16,185,129,0.1)",
//               }}>
//                 <Typography sx={{
//                   fontFamily: "'DM Mono', monospace",
//                   fontSize: "0.65rem",
//                   color: "#a7f3d0",
//                   letterSpacing: "0.06em",
//                 }}>
//                   {label}
//                 </Typography>
//               </Box>
//             ))}
//           </Stack>
//         </Box>

//         {/* RIGHT FORM PANEL */}
//         <Box sx={{
//           flex: 1,
//           backgroundColor: "#f1f5f9",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           px: 3,
//           py: { xs: 6, md: 0 },
//           position: "relative",
//           overflowY: "auto",
//           maxHeight: "100vh",
//         }}>

//           {/* Back Button */}
//           <IconButton
//             onClick={() => navigate("/")}
//             sx={{
//               position: "absolute", top: 24, left: 24,
//               backgroundColor: "#ffffff",
//               border: "1px solid #e2e8f0",
//               borderRadius: "10px",
//               width: 38, height: 38,
//               "&:hover": { backgroundColor: "#f0fdf4", borderColor: "#bbf7d0" },
//             }}
//           >
//             <ArrowBackIcon sx={{ fontSize: "1.1rem", color: "#64748b" }} />
//           </IconButton>

//           <Box className="form-card" sx={{ width: "100%", maxWidth: 420, py: 8 }}>

//             {/* Heading */}
//             <Box sx={{ mb: 4 }}>
//               <Typography sx={{
//                 fontFamily: "'Syne', sans-serif",
//                 fontWeight: 700,
//                 fontSize: "1.75rem",
//                 color: "#0f172a",
//                 letterSpacing: "-0.02em",
//                 lineHeight: 1.1,
//               }}>
//                 Check Branch
//               </Typography>
//               <Typography sx={{
//                 fontFamily: "'DM Sans', sans-serif",
//                 fontSize: "0.875rem",
//                 color: "#94a3b8",
//                 mt: 0.6,
//               }}>
//                 Fill in your details to find the nearest branch
//               </Typography>
//             </Box>

//             {/* Form Card */}
//             <Box sx={{
//               backgroundColor: "#ffffff",
//               borderRadius: "20px",
//               border: "1px solid #e2e8f0",
//               p: 3.5,
//               boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
//             }}>
//               <Stack spacing={2.5}>
//                 <TextField
//                   label="Full Name"
//                   fullWidth
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   sx={inputSx}
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <PersonOutlineIcon sx={{ color: "#94a3b8", fontSize: "1.1rem" }} />
//                       </InputAdornment>
//                     ),
//                   }}
//                 />

//                 <TextField
//                   label="Phone Number"
//                   fullWidth
//                   value={phone}
//                   // onChange={(e) => setPhone(e.target.  value)}
//                   disabled
//                   sx={inputSx}
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <PhoneOutlinedIcon sx={{ color: "#94a3b8", fontSize: "1.1rem" }} />
//                       </InputAdornment>
//                     ),
//                   }}
//                 />

//                 <TextField
//                   label="Pincode"
//                   fullWidth
//                   value={pincode}
//                   onChange={(e) => setPincode(e.target.value)}
//                   onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
//                   sx={inputSx}
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <LocationOnOutlinedIcon sx={{ color: "#94a3b8", fontSize: "1.1rem" }} />
//                       </InputAdornment>
//                     ),
//                   }}
//                 />

//                 <Button
//                   variant="contained"
//                   size="large"
//                   onClick={handleSubmit}
//                   disabled={loading || !name || !pincode}
//                   endIcon={<ArrowForwardIcon />}
//                   fullWidth
//                   sx={{
//                     py: 1.5,
//                     borderRadius: "12px",
//                     fontFamily: "'DM Sans', sans-serif",
//                     fontWeight: 700,
//                     fontSize: "0.9rem",
//                     textTransform: "none",
//                     background: "linear-gradient(135deg, #059669, #10b981)",
//                     boxShadow: "0 4px 16px rgba(5,150,105,0.35)",
//                     transition: "transform 0.18s ease, box-shadow 0.18s ease",
//                     "&:hover": {
//                       background: "linear-gradient(135deg, #047857, #059669)",
//                       boxShadow: "0 6px 24px rgba(5,150,105,0.45)",
//                       transform: "translateY(-1px)",
//                     },
//                     "&:active": { transform: "scale(0.98)" },
//                     "&.Mui-disabled": { opacity: 0.6 },
//                   }}
//                 >
//                   {loading ? "Searching..." : "Find Branch"}
//                 </Button>
//               </Stack>
//             </Box>

//             {/* SUCCESS RESULT */}
//             {branch && (
//               <Box
//                 className="result-card"
//                 sx={{
//                   mt: 3,
//                   backgroundColor: "#ffffff",
//                   borderRadius: "16px",
//                   border: "1px solid #bbf7d0",
//                   overflow: "hidden",
//                 }}
//               >
//                 {/* Top stripe */}
//                 <Box sx={{
//                   height: 4,
//                   background: "linear-gradient(90deg, #059669, #10b981)",
//                 }} />

//                 <Box sx={{ p: 2.5 }}>
//                   <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
//                     <Box sx={{
//                       width: 36, height: 36, borderRadius: "10px",
//                       backgroundColor: "#f0fdf4",
//                       display: "flex", alignItems: "center", justifyContent: "center",
//                       flexShrink: 0,
//                     }}>
//                       <CheckCircleOutlineIcon sx={{ color: "#059669", fontSize: "1.2rem" }} />
//                     </Box>
//                     <Box>
//                       <Typography sx={{
//                         fontFamily: "'DM Sans', sans-serif",
//                         fontWeight: 700, fontSize: "0.9rem", color: "#065f46",
//                       }}>
//                         Branch Found!
//                       </Typography>
//                       <Typography sx={{
//                         fontFamily: "'DM Mono', monospace",
//                         fontSize: "0.65rem", color: "#10b981", letterSpacing: "0.05em",
//                       }}>
//                         NEAREST BRANCH
//                       </Typography>
//                     </Box>
//                   </Box>

//                   <Stack spacing={1.2}>
//                     {[
//                       { icon: StorefrontIcon, label: "Branch", value: branch.branch_name },
//                       { icon: LocationOnOutlinedIcon, label: "Address", value: branch.address || "N/A" },
//                       { icon: PhoneIcon, label: "Phone", value: branch.phone || "N/A" },
//                     ].map(({ icon: Icon, label, value }) => (
//                       <Box key={label} sx={{
//                         display: "flex", alignItems: "center", gap: 1.2,
//                         px: 1.5, py: 1,
//                         backgroundColor: "#f0fdf4",
//                         borderRadius: "10px",
//                       }}>
//                         <Icon sx={{ color: "#059669", fontSize: "1rem", flexShrink: 0 }} />
//                         <Box>
//                           <Typography sx={{
//                             fontFamily: "'DM Mono', monospace",
//                             fontSize: "0.62rem", color: "#6ee7b7", letterSpacing: "0.06em",
//                           }}>
//                             {label.toUpperCase()}
//                           </Typography>
//                           <Typography sx={{
//                             fontFamily: "'DM Sans', sans-serif",
//                             fontSize: "0.825rem", fontWeight: 600, color: "#065f46",
//                           }}>
//                             {value}
//                           </Typography>
//                         </Box>
//                       </Box>
//                     ))}
//                   </Stack>
//                 </Box>
//               </Box>
//             )}

//             {/* ERROR RESULT */}
//             {message && !branch && (
//               <Box
//                 className="result-card"
//                 sx={{
//                   mt: 3,
//                   backgroundColor: "#ffffff",
//                   borderRadius: "16px",
//                   border: "1px solid #fecaca",
//                   overflow: "hidden",
//                 }}
//               >
//                 <Box sx={{ height: 4, background: "linear-gradient(90deg, #dc2626, #ef4444)" }} />
//                 <Box sx={{ p: 2.5 }}>
//                   <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5, mb: 2 }}>
//                     <Box sx={{
//                       width: 36, height: 36, borderRadius: "10px",
//                       backgroundColor: "#fef2f2",
//                       display: "flex", alignItems: "center", justifyContent: "center",
//                       flexShrink: 0,
//                     }}>
//                       <ErrorOutlineIcon sx={{ color: "#dc2626", fontSize: "1.2rem" }} />
//                     </Box>
//                     <Box>
//                       <Typography sx={{
//                         fontFamily: "'DM Sans', sans-serif",
//                         fontWeight: 700, fontSize: "0.875rem", color: "#991b1b",
//                       }}>
//                         No Branch Available
//                       </Typography>
//                       <Typography sx={{
//                         fontFamily: "'DM Sans', sans-serif",
//                         fontSize: "0.8rem", color: "#dc2626", mt: 0.3,
//                       }}>
//                         {message}
//                       </Typography>
//                     </Box>
//                   </Box>
//                   <Button
//                     onClick={() => setPincode("")}
//                     sx={{
//                       width: "100%",
//                       py: 1.2,
//                       borderRadius: "10px",
//                       fontFamily: "'DM Sans', sans-serif",
//                       fontWeight: 600,
//                       fontSize: "0.85rem",
//                       textTransform: "none",
//                       backgroundColor: "#fef2f2",
//                       color: "#dc2626",
//                       border: "1px solid #fecaca",
//                       "&:hover": {
//                         backgroundColor: "#fee2e2",
//                         borderColor: "#fca5a5",
//                       },
//                     }}
//                   >
//                     Try Another Pincode
//                   </Button>
//                 </Box>
//               </Box>
//             )}

//             {/* PRODUCTS SECTION */}
//             {products.length > 0 && (
//               <Box sx={{ mt: 4 }}>
//                 <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
//                   <Box sx={{
//                     width: 40, height: 40, borderRadius: "12px",
//                     background: "linear-gradient(135deg, #059669, #10b981)",
//                     display: "flex", alignItems: "center", justifyContent: "center",
//                     boxShadow: "0 4px 12px rgba(5,150,105,0.25)",
//                   }}>
//                     <ShoppingBagOutlinedIcon sx={{ color: "#fff", fontSize: "1.2rem" }} />
//                   </Box>
//                   <Box>
//                     <Typography sx={{
//                       fontFamily: "'Syne', sans-serif",
//                       fontWeight: 700,
//                       fontSize: "1.25rem",
//                       color: "#0f172a",
//                       letterSpacing: "-0.01em",
//                       lineHeight: 1,
//                     }}>
//                       Available Products
//                     </Typography>
//                     <Typography sx={{
//                       fontFamily: "'DM Mono', monospace",
//                       fontSize: "0.65rem",
//                       color: "#10b981",
//                       letterSpacing: "0.06em",
//                       mt: 0.3,
//                     }}>
//                       EXPLORE OUR CATALOG
//                     </Typography>
//                   </Box>
//                 </Box>

//                 <Stack spacing={2}>
//                   {products.map((item, index) => (
//                     <Box
//                       key={item.id}
//                       className="product-card"
//                       sx={{
//                         animationDelay: `${index * 0.1}s`,
//                         backgroundColor: "#ffffff",
//                         borderRadius: "16px",
//                         border: "1px solid #e2e8f0",
//                         overflow: "hidden",
//                         transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
//                         "&:hover": {
//                           transform: "translateY(-4px)",
//                           boxShadow: "0 12px 32px rgba(5,150,105,0.15)",
//                           borderColor: "#10b981",
//                         },
//                       }}
//                     >
//                       <Box sx={{ display: "flex", alignItems: "center", gap: 2, p: 2 }}>
//                         {/* Product Image */}
//                         <Box sx={{
//                           borderRadius: "12px",
//                           overflow: "hidden",
//                           backgroundColor: "#f8fafc",
//                           border: "1px solid #e2e8f0",
//                           flexShrink: 0,
//                         }}>
//                           <img
//                             src={item.image}
//                             alt={item.name}
//                             width={70}
//                             height={70}
//                             style={{
//                               display: "block",
//                               objectFit: "cover",
//                             }}
//                           />
//                         </Box>

//                         {/* Product Info */}
//                         <Box sx={{ flex: 1 }}>
//                           <Typography sx={{
//                             fontFamily: "'DM Sans', sans-serif",
//                             fontWeight: 600,
//                             color: "#0f172a",
//                             fontSize: "0.9rem",
//                             mb: 0.3,
//                           }}>
//                             {item.name}
//                           </Typography>
//                           <Typography sx={{
//                             fontFamily: "'DM Sans', sans-serif",
//                             fontWeight: 700,
//                             color: "#10b981",
//                             fontSize: "1.1rem",
//                           }}>
//                             ₹{item.price}
//                           </Typography>
//                         </Box>

//                         {/* Buy Button */}
//                         <Button
//                           variant="contained"
//                           size="small"
//                           sx={{
//                             borderRadius: "10px",
//                             px: 2.5,
//                             py: 0.9,
//                             textTransform: "none",
//                             fontFamily: "'DM Sans', sans-serif",
//                             fontWeight: 600,
//                             fontSize: "0.8rem",
//                             background: "linear-gradient(135deg, #059669, #10b981)",
//                             boxShadow: "0 4px 12px rgba(5,150,105,0.25)",
//                             transition: "all 0.2s ease",
//                             "&:hover": {
//                               transform: "scale(1.05)",
//                               boxShadow: "0 6px 16px rgba(5,150,105,0.35)",
//                               background: "linear-gradient(135deg, #047857, #059669)",
//                             },
//                           }}
//                         >
//                           Buy Now
//                         </Button>
//                       </Box>
//                     </Box>
//                   ))}
//                 </Stack>
//               </Box>
//             )}

//           </Box>
//         </Box>

//       </Box>
//     </>
//   );
// }

// export default CustomerForm;

// import { useState, useEffect } from "react";
// import API from "../services/api";
// import {
//   Box,
//   Typography,
//   TextField,
//   Button,
//   Stack,
//   InputAdornment,
//   IconButton,
//   Card,
//   CardContent,
//   Fade,
//   Slide,
//   Chip,
// } from "@mui/material";

// import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
// import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
// import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
// import StorefrontIcon from "@mui/icons-material/Storefront";
// import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";

// import { useNavigate } from "react-router-dom";

// function CustomerForm() {
//   const navigate = useNavigate();

//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [pincode, setPincode] = useState("");
//   const [message, setMessage] = useState("");
//   const [branch, setBranch] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [products, setProducts] = useState([]);

//   // Autofill from localStorage
//   useEffect(() => {
//     const savedCustomer = JSON.parse(
//       localStorage.getItem("customer") || "null",
//     );
//     if (savedCustomer) {
//       setName(savedCustomer.name || "");
//       setPhone(savedCustomer.phone || "");
//       setPincode(savedCustomer.pincode || "");
//     }
//   }, []);

//   // Handle form submission
//   const handleSubmit = async () => {
//     if (!name || !pincode) {
//       setMessage("Please enter all fields");
//       return;
//     }

//     setLoading(true);

//     try {
//       const res = await API.post("/customer/request", {
//         name,
//         pincode,
//       });

//       const existing = JSON.parse(localStorage.getItem("customer") || "null");

//       localStorage.setItem(
//         "customer",
//         JSON.stringify({
//           name,
//           phone: existing?.phone || phone, // ✅ keep phone safe
//           pincode,
//         }),
//       );

//       if (res.data.branchAvailable) {
//         setBranch(res.data.branch);
//         setMessage("");
//         setProducts([]);

//         // ✅ SAVE BRANCH
//         localStorage.setItem("branch", JSON.stringify(res.data.branch));

//         // ✅ NAVIGATE TO HOME
//       setTimeout(() => {
//   navigate("/customer-home");
// }, 1000); // 1 sec delay
//       } else {
//         setBranch(null);
//         setMessage(res.data.message);
//         const prodRes = await API.get("/products");
//         setProducts(prodRes.data);
//       }
//     } catch (error) {
//       setBranch(null);
//       setProducts([]);
//       setMessage(error.response?.data?.message || "Something went wrong!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Input field styles
//   const inputSx = {
//     "& .MuiOutlinedInput-root": {
//       backgroundColor: "rgba(255, 255, 255, 0.9)",
//       borderRadius: "16px",
//       fontSize: "15px",
//       transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
//       backdropFilter: "blur(10px)",
//       "& fieldset": {
//         borderColor: "rgba(16, 185, 129, 0.2)",
//         borderWidth: "1.5px",
//       },
//       "&:hover": {
//         backgroundColor: "rgba(255, 255, 255, 1)",
//         transform: "translateY(-2px)",
//         boxShadow: "0 8px 24px rgba(16, 185, 129, 0.1)",
//         "& fieldset": {
//           borderColor: "rgba(16, 185, 129, 0.4)",
//         },
//       },
//       "&.Mui-focused": {
//         backgroundColor: "#ffffff",
//         transform: "translateY(-2px)",
//         boxShadow: "0 12px 32px rgba(16, 185, 129, 0.15)",
//         "& fieldset": {
//           borderColor: "#10b981",
//           borderWidth: "2px",
//         },
//       },
//     },
//     "& .MuiInputLabel-root": {
//       color: "#64748b",
//       fontWeight: 500,
//       "&.Mui-focused": {
//         color: "#10b981",
//       },
//     },
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         display: "flex",
//         position: "relative",
//         overflow: "hidden",
//         "@media (max-width: 900px)": {
//           flexDirection: "column",
//         },
//       }}
//     >
//       {/* Floating Background Orb 1 */}
//       <Box
//         sx={{
//           position: "absolute",
//           top: "-10%",
//           right: "-5%",
//           width: "600px",
//           height: "600px",
//           borderRadius: "50%",
//           background:
//             "radial-gradient(circle, rgba(16, 185, 129, 0.15), transparent)",
//           filter: "blur(60px)",
//           animation: "float 8s ease-in-out infinite",
//           "@keyframes float": {
//             "0%, 100%": { transform: "translate(0, 0)" },
//             "50%": { transform: "translate(-30px, -30px)" },
//           },
//           zIndex: 0,
//         }}
//       />

//       {/* Floating Background Orb 2 */}
//       <Box
//         sx={{
//           position: "absolute",
//           bottom: "-10%",
//           left: "-5%",
//           width: "500px",
//           height: "500px",
//           borderRadius: "50%",
//           background:
//             "radial-gradient(circle, rgba(5, 150, 105, 0.1), transparent)",
//           filter: "blur(60px)",
//           animation: "floatReverse 10s ease-in-out infinite",
//           "@keyframes floatReverse": {
//             "0%, 100%": { transform: "translate(0, 0)" },
//             "50%": { transform: "translate(30px, 30px)" },
//           },
//           zIndex: 0,
//         }}
//       />

//       {/* LEFT PANEL - Hero Section */}
//       <Box
//         sx={{
//           flex: 1,
//           background: "linear-gradient(135deg, #064e3b 0%, #10b981 100%)",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "center",
//           color: "#fff",
//           position: "relative",
//           padding: 4,
//           zIndex: 1,
//           "&::before": {
//             content: '""',
//             position: "absolute",
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             background: `
//               radial-gradient(circle at 20% 30%, rgba(255,255,255,0.1) 0%, transparent 50%),
//               radial-gradient(circle at 80% 70%, rgba(255,255,255,0.08) 0%, transparent 50%)
//             `,
//             pointerEvents: "none",
//           },
//           "@media (max-width: 900px)": {
//             minHeight: "300px",
//           },
//         }}
//       >
//         <Fade in timeout={800}>
//           <Box sx={{ textAlign: "center", zIndex: 1 }}>
//             <StorefrontIcon
//               sx={{
//                 fontSize: 80,
//                 mb: 3,
//                 opacity: 0.9,
//                 filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.2))",
//               }}
//             />
//             <Typography
//               variant="h3"
//               fontWeight="700"
//               letterSpacing="-0.02em"
//               sx={{
//                 background: "linear-gradient(to right, #ffffff, #d1fae5)",
//                 WebkitBackgroundClip: "text",
//                 WebkitTextFillColor: "transparent",
//                 backgroundClip: "text",
//                 mb: 2,
//                 textShadow: "0 2px 20px rgba(0,0,0,0.1)",
//               }}
//             >
//               Find Your Nearest Branch
//             </Typography>
//             <Typography
//               variant="body1"
//               sx={{
//                 opacity: 0.9,
//                 maxWidth: 420,
//                 mx: "auto",
//                 lineHeight: 1.7,
//                 fontSize: "16px",
//               }}
//             >
//               Discover our locations and explore our exclusive product catalog
//             </Typography>
//           </Box>
//         </Fade>
//       </Box>

//       {/* RIGHT PANEL - Form Section */}
//       <Box
//         sx={{
//           flex: 1,
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           position: "relative",
//           background: "linear-gradient(to bottom, #f8fafc 0%, #ffffff 100%)",
//           padding: 4,
//           zIndex: 1,
//         }}
//       >
//         {/* Back Button */}
//         <IconButton
//           onClick={() => navigate("/")}
//           sx={{
//             position: "absolute",
//             top: 24,
//             left: 24,
//             backgroundColor: "white",
//             boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
//             transition: "all 0.3s ease",
//             "&:hover": {
//               backgroundColor: "#f1f5f9",
//               transform: "translateX(-4px)",
//               boxShadow: "0 6px 16px rgba(0,0,0,0.12)",
//             },
//           }}
//         >
//           <ArrowBackIcon sx={{ color: "#64748b" }} />
//         </IconButton>

//         <Slide direction="up" in timeout={600}>
//           <Box sx={{ width: "100%", maxWidth: 480, px: 2 }}>
//             {/* Form Header */}
//             <Typography
//               variant="h4"
//               mb={1}
//               fontWeight="700"
//               sx={{
//                 color: "#0f172a",
//                 letterSpacing: "-0.02em",
//               }}
//             >
//               Check Branch Availability
//             </Typography>
//             <Typography
//               variant="body2"
//               mb={4}
//               sx={{
//                 color: "#64748b",
//                 fontSize: "15px",
//               }}
//             >
//               Enter your details to find the nearest branch
//             </Typography>

//             {/* Form Inputs */}
//             <Stack spacing={3}>
//               {/* Name Input */}
//               <TextField
//                 label="Full Name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 fullWidth
//                 sx={inputSx}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <PersonOutlineIcon sx={{ color: "#10b981" }} />
//                     </InputAdornment>
//                   ),
//                 }}
//               />

//               {/* Phone Input (Disabled) */}
//               <TextField
//                 label="Phone Number"
//                 value={phone}
//                 disabled
//                 fullWidth
//                 sx={{
//                   ...inputSx,
//                   "& .MuiOutlinedInput-root.Mui-disabled": {
//                     backgroundColor: "rgba(241, 245, 249, 0.5)",
//                   },
//                 }}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <PhoneOutlinedIcon sx={{ color: "#94a3b8" }} />
//                     </InputAdornment>
//                   ),
//                 }}
//               />

//               {/* Pincode Input */}
//               <TextField
//                 label="Pincode"
//                 value={pincode}
//                 onChange={(e) => setPincode(e.target.value)}
//                 fullWidth
//                 sx={inputSx}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <LocationOnOutlinedIcon sx={{ color: "#10b981" }} />
//                     </InputAdornment>
//                   ),
//                 }}
//               />

//               {/* Submit Button */}
//               <Button
//                 variant="contained"
//                 onClick={handleSubmit}
//                 disabled={loading || !name || !pincode}
//                 endIcon={<ArrowForwardIcon />}
//                 fullWidth
//                 sx={{
//                   py: 1.8,
//                   borderRadius: "16px",
//                   textTransform: "none",
//                   fontSize: "16px",
//                   fontWeight: 600,
//                   background:
//                     "linear-gradient(135deg, #10b981 0%, #059669 100%)",
//                   boxShadow: "0 8px 24px rgba(16, 185, 129, 0.25)",
//                   transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
//                   "&:hover": {
//                     transform: "translateY(-2px)",
//                     boxShadow: "0 12px 32px rgba(16, 185, 129, 0.35)",
//                     background:
//                       "linear-gradient(135deg, #059669 0%, #047857 100%)",
//                   },
//                   "&:disabled": {
//                     background: "#e2e8f0",
//                     color: "#94a3b8",
//                     boxShadow: "none",
//                   },
//                 }}
//               >
//                 {loading ? "Searching..." : "Find Branch"}
//               </Button>
//             </Stack>

//             {/* SUCCESS - Branch Found */}
//             {branch && (
//               <Fade in timeout={600}>
//                 <Card
//                   sx={{
//                     mt: 4,
//                     borderRadius: "20px",
//                     background:
//                       "linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)",
//                     border: "2px solid #10b981",
//                     boxShadow: "0 8px 24px rgba(16, 185, 129, 0.15)",
//                     overflow: "hidden",
//                   }}
//                 >
//                   <CardContent sx={{ p: 3 }}>
//                     <Box display="flex" alignItems="center" gap={1.5} mb={2}>
//                       <CheckCircleOutlineIcon
//                         sx={{ color: "#10b981", fontSize: 28 }}
//                       />
//                       <Typography
//                         variant="h6"
//                         fontWeight="700"
//                         sx={{ color: "#065f46" }}
//                       >
//                         Branch Found!
//                       </Typography>
//                     </Box>

//                     <Box sx={{ pl: 5 }}>
//                       <Typography
//                         variant="body1"
//                         fontWeight="600"
//                         sx={{
//                           color: "#047857",
//                           mb: 1,
//                           fontSize: "17px",
//                         }}
//                       >
//                         {branch.branch_name}
//                       </Typography>
//                       <Typography
//                         variant="body2"
//                         sx={{
//                           color: "#065f46",
//                           mb: 0.5,
//                           lineHeight: 1.6,
//                         }}
//                       >
//                         {branch.address}
//                       </Typography>
//                       <Chip
//                         icon={<PhoneOutlinedIcon />}
//                         label={branch.phone}
//                         size="small"
//                         sx={{
//                           mt: 1,
//                           backgroundColor: "white",
//                           color: "#047857",
//                           fontWeight: 600,
//                         }}
//                       />
//                     </Box>
//                   </CardContent>
//                 </Card>
//               </Fade>
//             )}

//             {/* ERROR - No Branch Available */}
//             {message && !branch && (
//               <Fade in timeout={600}>
//                 <Card
//                   sx={{
//                     mt: 4,
//                     borderRadius: "20px",
//                     background:
//                       "linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)",
//                     border: "2px solid #fca5a5",
//                     boxShadow: "0 8px 24px rgba(239, 68, 68, 0.1)",
//                   }}
//                 >
//                   <CardContent sx={{ p: 3 }}>
//                     <Typography
//                       variant="h6"
//                       fontWeight="700"
//                       sx={{ color: "#991b1b", mb: 1 }}
//                     >
//                       No Branch Available
//                     </Typography>
//                     <Typography
//                       variant="body2"
//                       sx={{ color: "#7f1d1d", lineHeight: 1.6 }}
//                     >
//                       {message}
//                     </Typography>
//                      <Button onClick={() => setPincode("")} sx={{ mt: 2 }}>
//                     Try Another Pincode
//                   </Button>
//                   </CardContent>

//                 </Card>
//               </Fade>
//             )}

//             {/* PRODUCTS SECTION */}
//             {products.length > 0 && (
//               <Fade in timeout={800}>
//                 <Box mt={5}>
//                   <Box display="flex" alignItems="center" gap={1.5} mb={3}>
//                     <ShoppingBagOutlinedIcon
//                       sx={{ color: "#10b981", fontSize: 28 }}
//                     />
//                     <Typography
//                       variant="h5"
//                       fontWeight="700"
//                       sx={{
//                         color: "#0f172a",
//                         letterSpacing: "-0.01em",
//                       }}
//                     >
//                       Available Products
//                     </Typography>
//                   </Box>

//                   <Stack spacing={2.5}>
//                     {products.map((item, index) => (
//                       <Slide
//                         key={item.id}
//                         direction="up"
//                         in
//                         timeout={400 + index * 100}
//                       >
//                         <Card
//                           sx={{
//                             borderRadius: "18px",
//                             border: "1.5px solid #e2e8f0",
//                             boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
//                             transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
//                             overflow: "hidden",
//                             backgroundColor: "#ffffff",
//                             "&:hover": {
//                               transform: "translateY(-4px)",
//                               boxShadow: "0 12px 32px rgba(16, 185, 129, 0.15)",
//                               borderColor: "#10b981",
//                             },
//                           }}
//                         >
//                           <CardContent sx={{ p: 0 }}>
//                             <Box
//                               display="flex"
//                               alignItems="center"
//                               gap={2.5}
//                               p={2.5}
//                             >
//                               {/* Product Image */}
//                               <Box
//                                 sx={{
//                                   borderRadius: "14px",
//                                   overflow: "hidden",
//                                   backgroundColor: "#f8fafc",
//                                   border: "1px solid #e2e8f0",
//                                   flexShrink: 0,
//                                 }}
//                               >
//                                 <img
//                                   src={item.image}
//                                   alt={item.name}
//                                   width={70}
//                                   height={70}
//                                   style={{
//                                     display: "block",
//                                     objectFit: "cover",
//                                   }}
//                                 />
//                               </Box>

//                               {/* Product Info */}
//                               <Box flex={1}>
//                                 <Typography
//                                   fontWeight="600"
//                                   sx={{
//                                     color: "#0f172a",
//                                     fontSize: "16px",
//                                     mb: 0.5,
//                                   }}
//                                 >
//                                   {item.name}
//                                 </Typography>
//                                 <Typography
//                                   fontWeight="700"
//                                   sx={{
//                                     color: "#10b981",
//                                     fontSize: "18px",
//                                   }}
//                                 >
//                                   ₹{item.price}
//                                 </Typography>
//                               </Box>

//                               {/* Buy Button */}
//                               <Button
//                                 variant="contained"
//                                 size="medium"
//                                 sx={{
//                                   borderRadius: "12px",
//                                   px: 3,
//                                   py: 1,
//                                   textTransform: "none",
//                                   fontWeight: 600,
//                                   fontSize: "14px",
//                                   background:
//                                     "linear-gradient(135deg, #10b981 0%, #059669 100%)",
//                                   boxShadow:
//                                     "0 4px 12px rgba(16, 185, 129, 0.2)",
//                                   transition: "all 0.3s ease",
//                                   "&:hover": {
//                                     transform: "scale(1.05)",
//                                     boxShadow:
//                                       "0 6px 16px rgba(16, 185, 129, 0.3)",
//                                   },
//                                 }}
//                               >
//                                 Buy Now
//                               </Button>
//                             </Box>
//                           </CardContent>
//                         </Card>
//                       </Slide>
//                     ))}
//                   </Stack>
//                 </Box>
//               </Fade>
//             )}
//           </Box>
//         </Slide>
//       </Box>
//     </Box>
//   );
// }

// export default CustomerForm;

// import { useState } from "react";
// import API from "../services/api";
// import {
//   Box,
// Paper,Typography, TextField,Button,Stack,Alert,
// } from "@mui/material";

// function CustomerForm() {
//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [pincode, setPincode] = useState("");
//   const [message, setMessage] = useState("");
//   const [branch, setBranch] = useState(null);

//   const handleSubmit = async () => {
//     try {
//       const res = await API.post("/customer/request", { name, phone, pincode });
//       // if (res.data.branches && res.data.branches.length > 0) {
//       //   setBranch(res.data.branches[0]);
//         // setMessage("");}
//         if (res.data.branch) {
//   setBranch(res.data.branch);
//     } else {
//         setBranch(null);
//         setMessage(res.data.message || "No branch available");
//       }
//       setName(""); setPhone(""); setPincode("");
//     } catch (error) {
//       setBranch(null);
//       setMessage(error.response?.data?.message || "Something went wrong!");
//     }
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
//         p: 3,
//       }}
//     >
//       <Paper sx={{ width: "100%", maxWidth: 900, display: "flex", borderRadius: 3, overflow: "hidden" }}>

//         {/* LEFT */}
//         <Box
//           sx={{
//             flex: 1,
//             background: "linear-gradient(135deg, #11998e, #38ef7d)",
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             justifyContent: "center",
//             p: 5,
//             textAlign: "center",
//             color: "white",
//           }}
//         >
//           <Typography variant="h4" fontWeight="bold" gutterBottom>Welcome 👋</Typography>
//           <Typography variant="body1" sx={{ opacity: 0.9 }}>
//             Find your nearest branch instantly and submit your request easily.
//           </Typography>
//         </Box>

//         {/* RIGHT */}
//         <Box sx={{ flex: 1, p: 5, display: "flex", alignItems: "center", justifyContent: "center" }}>
//           <Box width="100%" maxWidth={360}>
//             <Typography variant="h5" fontWeight="bold" gutterBottom color="text.primary">
//               Customer Form
//             </Typography>
//             <Typography variant="body2" color="text.secondary" mb={3}>
//               Enter your details to check branch
//             </Typography>

//             <Stack spacing={2.5}>
//               <TextField label="Name" fullWidth value={name} onChange={(e) => setName(e.target.value)} />
//               <TextField label="Phone" fullWidth value={phone} onChange={(e) => setPhone(e.target.value)} />
//               <TextField label="Pincode" fullWidth value={pincode} onChange={(e) => setPincode(e.target.value)} />

//               <Button
//                 variant="contained"
//                 size="large"
//                 onClick={handleSubmit}
//                 sx={{
//                   py: 1.5,
//                   fontWeight: "bold",
//                   background: "linear-gradient(to right, #11998e, #38ef7d)",
//                   "&:hover": { opacity: 0.9 },
//                 }}
//               >
//                 CHECK BRANCH →
//               </Button>

//               {branch && (
//                 <Alert severity="success">
//                   <Typography fontWeight="bold">Branch Available</Typography>
//                   <Typography variant="body2">Name: {branch.branch_name}</Typography>
//                   <Typography variant="body2">Address: {branch.address || "N/A"}</Typography>
//                   <Typography variant="body2">Phone: {branch.phone || "N/A"}</Typography>
//                 </Alert>
//               )}

//               {message && !branch && (
//                 <Alert severity="error">{message}</Alert>
//               )}
//             </Stack>
//           </Box>
//         </Box>

//       </Paper>
//     </Box>
//   );
// }

// export default CustomerForm;

import { useState, useEffect } from "react";
import API from "../services/api";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  InputAdornment,
  IconButton,
  Card,
  CardContent,
} from "@mui/material";

import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import PhoneIcon from "@mui/icons-material/Phone";

import { Navigate, useNavigate } from "react-router-dom";

function CustomerForm() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [pincode, setPincode] = useState("");
  const [message, setMessage] = useState("");
  const [branch, setBranch] = useState(null);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  // ✅ Autofill from localStorage
  useEffect(() => {
    const savedCustomer = JSON.parse(
      localStorage.getItem("customer") || "null",
    );
    console.log("Loaded:", savedCustomer);
    if (!savedCustomer || !savedCustomer.phone) {
      // No phone - redirect to login
      setMessage("Please login first");
      // setTimeout(() => navigate("/customer-home"), 1500);
      setTimeout(() => navigate("/customer"), 1500);
      return;
    }

    // Set data
    setPhone(savedCustomer.phone);
    setName(savedCustomer.name || "");
    setPincode(savedCustomer.pincode || "");
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ✅ Handle form submission - FIXED
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    console.log("🚀 Find Branch clicked!");
    console.log("Phone:", phone);
    console.log("Name:", name);
    console.log("Pincode:", pincode);

    if (!phone) {
      setMessage("Phone missing. Please login again.");
      return;
    }

    if (!name || !/^\d{6}$/.test(pincode)) {
      setMessage("Enter valid name and 6-digit pincode");
      return;
    }

    setLoading(true);

    try {
      const res = await API.post("/customer/request", {
        name,
        pincode,
        phone,
      });
console.log(res,"ressssss");

      // ✅ SAVE CUSTOMER
      localStorage.setItem(
  "customer",
  JSON.stringify({
    id: res.data.customer?.id || res.data.user?.id, // 🔥 IMPORTANT
    name,
    phone,
    pincode,
  })
);
console.log("FULL RESPONSE:", res.data);
      if (res.data.branchAvailable) {
        console.log("clicked1");

        // ✅ BRANCH FOUND - SHOW IN SAME PAGE
        setBranch(res.data.branch);
        setMessage("");
        setProducts([]);
        console.log("clicked2");

        localStorage.setItem("branch", JSON.stringify(res.data.branch));
        localStorage.removeItem("noBranch");
        console.log("clicked3");

        // Navigate after showing success

        navigate("/customer-home");

        console.log("clicked5");
      } else {
        console.log("clicked6");

        // ❌ NO BRANCH
        setBranch(null);
        setMessage(res.data.message);
        console.log("clicked7");

        // ✅ IMPORTANT FLAG
        localStorage.setItem("noBranch", "true");
        console.log("clicked8");

        navigate("/customer-home");
        console.log("clicked9");

        console.log("clicked10");
      }
    } catch (error) {
      setBranch(null);
      setProducts([]);
      setMessage(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // Input field styles
  const inputSx = {
    "& .MuiOutlinedInput-root": {
      backgroundColor: "#f8fafc",
      borderRadius: "12px",
      fontFamily: "'DM Sans', sans-serif",
      fontSize: "0.9rem",
      "& fieldset": { borderColor: "#e2e8f0" },
      "&:hover fieldset": { borderColor: "#94a3b8" },
      "&.Mui-focused fieldset": {
        borderColor: "#059669",
        borderWidth: "1.5px",
      },
      "&.Mui-disabled": {
        backgroundColor: "rgba(241, 245, 249, 0.5)",
      },
    },
    "& .MuiInputLabel-root": {
      fontFamily: "'DM Sans', sans-serif",
      fontSize: "0.875rem",
      color: "#94a3b8",
    },
    "& .MuiInputLabel-root.Mui-focused": { color: "#059669" },
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        @keyframes pulse-ring {
          0% { transform: scale(0.95); opacity: 0.5; }
          100% { transform: scale(1.6); opacity: 0; }
        }

        @keyframes resultSlide {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes productSlide {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .result-card { animation: resultSlide 0.3s ease forwards; }
        .form-card { animation: fadeUp 0.4s ease forwards; }
        .product-card { animation: productSlide 0.4s ease forwards; }
      `}</style>

      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {/* LEFT PANEL */}
        <Box
          sx={{
            flex: 1,
            background:
              "linear-gradient(145deg, #022c22 0%, #064e3b 50%, #065f46 100%)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            px: { xs: 4, md: 7 },
            py: { xs: 8, md: 0 },
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Grid */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              backgroundImage:
                "linear-gradient(rgba(16,185,129,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.07) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          {/* Glow */}
          <Box
            sx={{
              position: "absolute",
              width: 360,
              height: 360,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(16,185,129,0.18) 0%, transparent 70%)",
              top: "20%",
              left: "50%",
              transform: "translateX(-50%)",
              pointerEvents: "none",
            }}
          />

          {/* Icon */}
          <Box
            sx={{
              position: "relative",
              mb: 4,
              animation: "float 3.5s ease-in-out infinite",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                border: "2px solid rgba(16,185,129,0.4)",
                animation: "pulse-ring 2.2s ease-out infinite",
              }}
            />
            <Box
              sx={{
                width: 72,
                height: 72,
                borderRadius: "20px",
                background: "linear-gradient(135deg, #059669, #10b981)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 40px rgba(16,185,129,0.45)",
              }}
            >
              <MyLocationIcon sx={{ color: "#fff", fontSize: "2rem" }} />
            </Box>
          </Box>

          <Typography
            sx={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: { xs: "2rem", md: "2.6rem" },
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              background: "linear-gradient(135deg, #ffffff 30%, #6ee7b7)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 1.5,
            }}
          >
            Find Your
            <br />
            Nearest Branch
          </Typography>

          <Typography
            sx={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.72rem",
              letterSpacing: "0.1em",
              color: "#10b981",
              textTransform: "uppercase",
              mb: 3,
            }}
          >
            Instant Branch Locator
          </Typography>

          <Typography
            sx={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.9rem",
              color: "rgba(255,255,255,0.65)",
              maxWidth: 300,
              lineHeight: 1.7,
            }}
          >
            Discover our locations and explore our exclusive product catalog
          </Typography>

          {/* Stat pills */}
          <Stack
            direction="row"
            spacing={1.5}
            mt={4}
            flexWrap="wrap"
            justifyContent="center"
          >
            {["Fast Lookup", "Real-Time", "Verified"].map((label) => (
              <Box
                key={label}
                sx={{
                  px: 1.8,
                  py: 0.7,
                  borderRadius: "999px",
                  border: "1px solid rgba(16,185,129,0.3)",
                  backgroundColor: "rgba(16,185,129,0.1)",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.65rem",
                    color: "#a7f3d0",
                    letterSpacing: "0.06em",
                  }}
                >
                  {label}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>

        {/* RIGHT FORM PANEL */}
        <Box
          sx={{
            flex: 1,
            backgroundColor: "#f1f5f9",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            px: 3,
            py: { xs: 6, md: 0 },
            position: "relative",
            overflowY: "auto",
            maxHeight: "100vh",
          }}
        >
          {/* Back Button */}
          <IconButton
            onClick={() => navigate("/customer")}
            sx={{
              position: "absolute",
              top: 24,
              left: 24,
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "10px",
              width: 38,
              height: 38,
              "&:hover": { backgroundColor: "#f0fdf4", borderColor: "#bbf7d0" },
            }}
          >
            <ArrowBackIcon sx={{ fontSize: "1.1rem", color: "#64748b" }} />
          </IconButton>

          <Box
            className="form-card"
            sx={{ width: "100%", maxWidth: 420, py: 8 }}
          >
            {/* Heading */}
            <Box sx={{ mb: 4 }}>
              <Typography
                sx={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: "1.75rem",
                  color: "#0f172a",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                }}
              >
                Check Branch
              </Typography>
              <Typography
                sx={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.875rem",
                  color: "#94a3b8",
                  mt: 0.6,
                }}
              >
                Fill in your details to find the nearest branch
              </Typography>
            </Box>

            {/* Form Card */}
            <Box
              sx={{
                backgroundColor: "#ffffff",
                borderRadius: "20px",
                border: "1px solid #e2e8f0",
                p: 3.5,
                boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
              }}
            >
              <Stack spacing={2.5}>
                <TextField
                  label="Full Name"
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  sx={inputSx}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutlineIcon
                          sx={{ color: "#94a3b8", fontSize: "1.1rem" }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />

                {/* ✅ PHONE FIELD - DISABLED */}
                <TextField
                  label="Phone Number"
                  fullWidth
                  value={phone}
                  disabled
                  sx={inputSx}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneOutlinedIcon
                          sx={{ color: "#94a3b8", fontSize: "1.1rem" }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  label="Pincode"
                  fullWidth
                  value={pincode}
                  onChange={(e) =>
                    setPincode(e.target.value.replace(/\D/g, ""))
                  }
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  inputProps={{ maxLength: 6 }}
                  sx={inputSx}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOnOutlinedIcon
                          sx={{ color: "#94a3b8", fontSize: "1.1rem" }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />

                <Button
                  variant="contained"
                  size="large"
                   type="button"
                  onClick={handleSubmit}
                  disabled={loading || !name || !pincode}
                  endIcon={<ArrowForwardIcon />}
                  fullWidth
                  sx={{
                    py: 1.5,
                    borderRadius: "12px",
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    textTransform: "none",
                    background: "linear-gradient(135deg, #059669, #10b981)",
                    boxShadow: "0 4px 16px rgba(5,150,105,0.35)",
                    transition: "transform 0.18s ease, box-shadow 0.18s ease",
                    "&:hover": {
                      background: "linear-gradient(135deg, #047857, #059669)",
                      boxShadow: "0 6px 24px rgba(5,150,105,0.45)",
                      transform: "translateY(-1px)",
                    },
                    "&:active": { transform: "scale(0.98)" },
                    "&.Mui-disabled": { opacity: 0.6 },
                  }}
                >
                  {loading ? "Searching..." : "Find Branch"}
                </Button>
              </Stack>
            </Box>

            {/* SUCCESS RESULT */}
            {branch && (
              <Box
                className="result-card"
                sx={{
                  mt: 3,
                  backgroundColor: "#ffffff",
                  borderRadius: "16px",
                  border: "1px solid #bbf7d0",
                  overflow: "hidden",
                }}
              >
                {/* Top stripe */}
                <Box
                  sx={{
                    height: 4,
                    background: "linear-gradient(90deg, #059669, #10b981)",
                  }}
                />

                <Box sx={{ p: 2.5 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      mb: 2,
                    }}
                  >
                    <Box
                      sx={{
                        width: 36,
                        height: 36,
                        borderRadius: "10px",
                        backgroundColor: "#f0fdf4",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <CheckCircleOutlineIcon
                        sx={{ color: "#059669", fontSize: "1.2rem" }}
                      />
                    </Box>
                    <Box>
                      <Typography
                        sx={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontWeight: 700,
                          fontSize: "0.9rem",
                          color: "#065f46",
                        }}
                      >
                        Branch Found!
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "'DM Mono', monospace",
                          fontSize: "0.65rem",
                          color: "#10b981",
                          letterSpacing: "0.05em",
                        }}
                      >
                        NEAREST BRANCH
                      </Typography>
                    </Box>
                  </Box>

                  <Stack spacing={1.2}>
                    {[
                      {
                        icon: StorefrontIcon,
                        label: "Branch",
                        value: branch.branch_name,
                      },
                      {
                        icon: LocationOnOutlinedIcon,
                        label: "Address",
                        value: branch.address || "N/A",
                      },
                      {
                        icon: PhoneIcon,
                        label: "Phone",
                        value: branch.phone || "N/A",
                      },
                    ].map(({ icon: Icon, label, value }) => (
                      <Box
                        key={label}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1.2,
                          px: 1.5,
                          py: 1,
                          backgroundColor: "#f0fdf4",
                          borderRadius: "10px",
                        }}
                      >
                        <Icon
                          sx={{
                            color: "#059669",
                            fontSize: "1rem",
                            flexShrink: 0,
                          }}
                        />
                        <Box>
                          <Typography
                            sx={{
                              fontFamily: "'DM Mono', monospace",
                              fontSize: "0.62rem",
                              color: "#6ee7b7",
                              letterSpacing: "0.06em",
                            }}
                          >
                            {label.toUpperCase()}
                          </Typography>
                          <Typography
                            sx={{
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: "0.825rem",
                              fontWeight: 600,
                              color: "#065f46",
                            }}
                          >
                            {value}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Stack>
                </Box>
              </Box>
            )}

            {/* ERROR RESULT */}
            {message && !branch && (
              <Box
                className="result-card"
                sx={{
                  mt: 3,
                  backgroundColor: "#ffffff",
                  borderRadius: "16px",
                  border: "1px solid #fecaca",
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    height: 4,
                    background: "linear-gradient(90deg, #dc2626, #ef4444)",
                  }}
                />
                <Box sx={{ p: 2.5 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 1.5,
                      mb: 2,
                    }}
                  >
                    <Box
                      sx={{
                        width: 36,
                        height: 36,
                        borderRadius: "10px",
                        backgroundColor: "#fef2f2",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <ErrorOutlineIcon
                        sx={{ color: "#dc2626", fontSize: "1.2rem" }}
                      />
                    </Box>
                    <Box>
                      <Typography
                        sx={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontWeight: 700,
                          fontSize: "0.875rem",
                          color: "#991b1b",
                        }}
                      >
                        No Branch Available
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "0.8rem",
                          color: "#dc2626",
                          mt: 0.3,
                        }}
                      >
                        {message}
                      </Typography>
                    </Box>
                  </Box>
                  <Button
                    onClick={() => setPincode("")}
                    sx={{
                      width: "100%",
                      py: 1.2,
                      borderRadius: "10px",
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 600,
                      fontSize: "0.85rem",
                      textTransform: "none",
                      backgroundColor: "#fef2f2",
                      color: "#dc2626",
                      border: "1px solid #fecaca",
                      "&:hover": {
                        backgroundColor: "#fee2e2",
                        borderColor: "#fca5a5",
                      },
                    }}
                  >
                    Try Another Pincode
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default CustomerForm;
