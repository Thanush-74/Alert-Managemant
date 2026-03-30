// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../services/api";

// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
// import LockIcon from "@mui/icons-material/Lock";

// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   TextField,
//   Button,
//   Stack,
//   IconButton,
//   Fade,
//   Slide,
//   InputAdornment,
//   Alert,
// } from "@mui/material";

// function CustomerLogin() {
//   const [phone, setPhone] = useState("");
//   const [otp, setOtp] = useState("");
//   const [step, setStep] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [timer, setTimer] = useState(30);
//   const [canResend, setCanResend] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (step !== 2) return;
//     if (timer <= 0) {
//       setCanResend(true);
//       return;
//     }
//     const interval = setInterval(() => {
//       setTimer((prev) => prev - 1);
//     }, 1000);
//     return () => clearInterval(interval);
//   }, [timer, step]);

//   const handleBack = () => {
//     setError("");
//     if (step === 1) {
//       navigate("/");
//     } else {
//       setStep(1);
//       setOtp("");
//       setTimer(30);
//       setCanResend(false);
//     }
//   };

//   const sendOtp = async () => {
//     if (!phone || phone.length !== 10) {
//       setError("Please enter a valid 10-digit phone number");
//       return;
//     }
//     try {
//       setLoading(true);
//       setError("");
//       await API.post("/auth/send-otp", { phone });
//       setStep(2);
//       setTimer(30);
//       setCanResend(false);
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to send OTP");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const verifyOtp = async () => {
//   if (!otp || otp.length !== 6) {
//     setError("Please enter a valid 6-digit OTP");
//     return;
//   }

//   try {
//     setLoading(true);
//     setError("");

//     const res = await API.post("/auth/verify-otp", { phone, otp });

//     // ✅ clear old junk
//     localStorage.removeItem("customerToken");
//     localStorage.removeItem("customer");

//     // ✅ save correct token
//     localStorage.setItem("customerToken", res.data.token);

//     // ✅ save customer data
//     if (res.data.customer) {
//       localStorage.setItem("customer", JSON.stringify(res.data.customer));
//     } else {
//       localStorage.setItem("customer", JSON.stringify({ phone }));
//     }

//     console.log("CUSTOMER LOGIN SUCCESS");

//     navigate("/customer");

//   } catch (err) {
//     setError(err.response?.data?.message || "Invalid OTP. Please try again.");
//   } finally {
//     setLoading(false);
//   }
// };

// //   const verifyOtp = async () => {
// //     if (!otp || otp.length !== 6) {
// //       setError("Please enter a valid 6-digit OTP");
// //       return;
// //     }
// //     try {
// //       setLoading(true);
// //       setError("");
// //       const res = await API.post("/auth/verify-otp", { phone, otp });

// //       localStorage.removeItem("customer");
// //       localStorage.removeItem("branch");
// //       localStorage.removeItem("noBranch");
// //       // sessionStorage.setItem("token", res.data.token);
// //       // ✅ CORRECT
// // localStorage.setItem("customerToken", res.data.token);

// //       // ✅ CRITICAL FIX: Always save phone
// //       if (res.data.customer) {
// //         localStorage.setItem("customer", JSON.stringify(res.data.customer));
// //       } else {
// //         localStorage.setItem("customer", JSON.stringify({ phone }));
// //       }

// //       navigate("/customer");
// //     } catch (err) {
// //       setError(err.response?.data?.message || "Invalid OTP. Please try again.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       if (step === 1 && phone.length === 10) {
//         sendOtp();
//       } else if (step === 2 && otp.length === 6) {
//         verifyOtp();
//       }
//     }
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//         p: 2,
//       }}
//     >
//       <Fade in timeout={600}>
//         <Card sx={{ maxWidth: 440, width: "100%", borderRadius: 4 }}>
//           <CardContent sx={{ p: 4 }}>
//             <IconButton onClick={handleBack} sx={{ position: "absolute", top: 20, left: 20 }}>
//               <ArrowBackIcon />
//             </IconButton>

//             <Box sx={{ display: "flex", justifyContent: "center", mb: 3, mt: 2 }}>
//               <Slide direction="down" in timeout={500}>
//                 <Box sx={{ width: 80, height: 80, borderRadius: "50%", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
//                   {step === 1 ? <PhoneAndroidIcon sx={{ fontSize: 40, color: "white" }} /> : <LockIcon sx={{ fontSize: 40, color: "white" }} />}
//                 </Box>
//               </Slide>
//             </Box>

//             <Typography variant="h4" align="center" fontWeight="700" sx={{ mb: 1 }}>
//               {step === 1 ? "Welcome Back" : "Verify OTP"}
//             </Typography>

//             <Typography variant="body1" align="center" color="text.secondary" mb={4}>
//               {step === 1 ? "Enter your phone number to continue" : `We've sent a code to +91 ${phone}`}
//             </Typography>

//             {error && (
//               <Fade in>
//                 <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError("")}>
//                   {error}
//                 </Alert>
//               </Fade>
//             )}

//             {step === 1 ? (
//               <Stack spacing={3}>
//                 <TextField
//                   label="Phone Number"
//                   value={phone}
//                   onChange={(e) => {
//                     setPhone(e.target.value.replace(/\D/g, ""));
//                     setError("");
//                   }}
//                   onKeyPress={handleKeyPress}
//                   inputProps={{ maxLength: 10 }}
//                   fullWidth
//                   autoFocus
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <Typography fontWeight="500" color="text.secondary">+91</Typography>
//                       </InputAdornment>
//                     ),
//                   }}
//                 />
//                 <Button
//                   variant="contained"
//                   onClick={sendOtp}
//                   disabled={loading || phone.length !== 10}
//                   size="large"
//                   fullWidth
//                 >
//                   {loading ? "Sending..." : "Send OTP"}
//                 </Button>
//               </Stack>
//             ) : (
//               <Stack spacing={3}>
//                 <TextField
//                   label="Enter OTP"
//                   value={otp}
//                   onChange={(e) => {
//                     setOtp(e.target.value.replace(/\D/g, ""));
//                     setError("");
//                   }}
//                   onKeyPress={handleKeyPress}
//                   inputProps={{ maxLength: 6 }}
//                   fullWidth
//                   autoFocus
//                 />
//                 <Button
//                   variant="contained"
//                   onClick={verifyOtp}
//                   disabled={loading || otp.length !== 6}
//                   size="large"
//                   fullWidth
//                 >
//                   {loading ? "Verifying..." : "Verify & Continue"}
//                 </Button>
//                 <Box sx={{ textAlign: "center" }}>
//                   {canResend ? (
//                     <Button onClick={sendOtp} disabled={loading}>Resend OTP</Button>
//                   ) : (
//                     <Typography variant="body2" color="text.secondary">
//                       Resend in {timer}s
//                     </Typography>
//                   )}
//                 </Box>
//               </Stack>
//             )}
//           </CardContent>
//         </Card>
//       </Fade>
//     </Box>
//   );
// }

// export default CustomerLogin;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Stack,
  Fade,
  Slide,
  InputAdornment,
  Alert,
  IconButton,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import LockIcon from "@mui/icons-material/Lock";

function CustomerLogin() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  const navigate = useNavigate();

  // ⏱ OTP TIMER
  useEffect(() => {
    if (step !== 2) return;

    if (timer <= 0) {
      setCanResend(true);
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, step]);

  // 🔙 BACK
  const handleBack = () => {
    setError("");

    if (step === 1) {
      navigate("/");
    } else {
      setStep(1);
      setOtp("");
      setTimer(30);
      setCanResend(false);
    }
  };

  // 📤 SEND OTP
  const sendOtp = async () => {
    if (!phone || phone.length !== 10) {
      setError("Enter valid 10-digit phone number");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await API.post("/auth/send-otp", { phone });

      setStep(2);
      setTimer(30);
      setCanResend(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // ✅ VERIFY OTP (FINAL FIXED)
  const verifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      setError("Enter valid 6-digit OTP");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await API.post("/auth/verify-otp", { phone, otp });

      console.log("OTP RESPONSE:", res.data);

      // 🔥 CLEAR OLD
      localStorage.removeItem("customerToken");
      localStorage.removeItem("customer");
      localStorage.removeItem("noBranch");
      localStorage.removeItem("branch");



      // 🔥 SAVE TOKEN
      localStorage.setItem("customerToken", res.data.token);

      // 🔥 SAVE USER
      if (res.data.customer) {
        localStorage.setItem("customer", JSON.stringify(res.data.customer));
      } else {
        localStorage.setItem("customer", JSON.stringify({ phone }));
      }

      console.log("TOKEN SAVED:", localStorage.getItem("customerToken"));

      // 🔥 IMPORTANT DELAY FIX
      setTimeout(() => {
        navigate("/customer", { replace: true });
      }, 300);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        p: 2,
      }}
    >
      <Fade in>
        <Card sx={{ maxWidth: 440, width: "100%", borderRadius: 4 }}>
          <CardContent sx={{ p: 4 }}>
            <IconButton onClick={handleBack}>
              <ArrowBackIcon />
            </IconButton>

            <Box sx={{ textAlign: "center", mb: 3 }}>
              <Slide direction="down" in>
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg,#667eea,#764ba2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "auto",
                  }}
                >
                  {step === 1 ? (
                    <PhoneAndroidIcon sx={{ fontSize: 40, color: "#fff" }} />
                  ) : (
                    <LockIcon sx={{ fontSize: 40, color: "#fff" }} />
                  )}
                </Box>
              </Slide>
            </Box>

            <Typography variant="h5" align="center" mb={2}>
              {step === 1 ? "Enter Phone" : "Enter OTP"}
            </Typography>

            {error && <Alert severity="error">{error}</Alert>}

            {step === 1 ? (
              <Stack spacing={2}>
                <TextField
                  label="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                  inputProps={{ maxLength: 10 }}
                  fullWidth
                />

                <Button onClick={sendOtp} disabled={loading}>
                  Send OTP
                </Button>
              </Stack>
            ) : (
              <Stack spacing={2}>
                <TextField
                  label="OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  inputProps={{ maxLength: 6 }}
                  fullWidth
                />

                <Button onClick={verifyOtp} disabled={loading}>
                  Verify
                </Button>

                <Typography
                  align="center"
                  sx={{
                    cursor: canResend ? "pointer" : "not-allowed",
                    color: canResend ? "blue" : "gray",
                    fontWeight: "bold",
                  }}
                  onClick={() => {
                    if (canResend) {
                      sendOtp(); // 🔥 resend API call
                    }
                  }}
                >
                  {canResend ? "Resend OTP" : `Resend in ${timer}s`}
                </Typography>
              </Stack>
            )}
          </CardContent>
        </Card>
      </Fade>
    </Box>
  );
}

export default CustomerLogin;
