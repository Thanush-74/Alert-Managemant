// import { useEffect, useState } from "react";
// import socket from "../services/socket";
// import API from "../services/api";
// import { useNavigate } from "react-router-dom";

// const css = `
//   @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

//   *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

//   .ch-root {
//     min-height: 100vh;
//     background: #f5f0e8;
//     font-family: 'DM Sans', sans-serif;
//     color: #1a1612;
//     padding-bottom: 80px;
//   }

//   /* ── Top Nav ── */
//   .ch-nav {
//     background: #2c1e0f;
//     padding: 16px 24px;
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     position: sticky;
//     top: 0;
//     z-index: 100;
//     box-shadow: 0 2px 16px rgba(0,0,0,.25);
//   }
//   .ch-nav-left { display: flex; align-items: center; gap: 12px; }
//   .ch-nav-back {
//     width: 36px; height: 36px;
//     border: 1.5px solid rgba(196,154,60,.4);
//     background: transparent;
//     border-radius: 10px;
//     color: #c49a3c;
//     cursor: pointer;
//     display: flex; align-items: center; justify-content: center;
//     font-size: 16px;
//     transition: background .15s;
//   }
//   .ch-nav-back:hover { background: rgba(196,154,60,.15); }
//   .ch-nav-brand {
//     font-family: 'Cormorant Garamond', serif;
//     font-size: 22px;
//     font-weight: 700;
//     color: #f5f0e8;
//   }
//   .ch-nav-right { display: flex; align-items: center; gap: 10px; }

//   .ch-cart-btn {
//     position: relative;
//     background: #c49a3c;
//     border: none;
//     border-radius: 12px;
//     padding: 8px 14px;
//     display: flex; align-items: center; gap: 7px;
//     font-family: 'DM Sans', sans-serif;
//     font-size: 13px;
//     font-weight: 600;
//     color: #1a1612;
//     cursor: pointer;
//     transition: background .15s, transform .15s;
//   }
//   .ch-cart-btn:hover { background: #b8891e; transform: scale(1.03); }
//   .ch-cart-badge {
//     position: absolute;
//     top: -6px; right: -6px;
//     background: #e63946;
//     color: #fff;
//     border-radius: 50%;
//     width: 18px; height: 18px;
//     font-size: 10px;
//     font-weight: 700;
//     display: flex; align-items: center; justify-content: center;
//     border: 2px solid #2c1e0f;
//   }
//   .ch-logout-btn {
//     background: transparent;
//     border: 1.5px solid rgba(196,154,60,.35);
//     border-radius: 10px;
//     padding: 7px 14px;
//     color: #a0886a;
//     font-family: 'DM Sans', sans-serif;
//     font-size: 13px;
//     cursor: pointer;
//     transition: border-color .15s, color .15s;
//   }
//   .ch-logout-btn:hover { border-color: #c49a3c; color: #c49a3c; }

//   /* ── Page body ── */
//   .ch-body { max-width: 1080px; margin: 0 auto; padding: 32px 20px; }

//   /* ── Branch card ── */
//   .ch-branch-card {
//     background: #fffdf9;
//     border: 1.5px solid #ede5d4;
//     border-radius: 20px;
//     padding: 20px 24px;
//     display: flex;
//     align-items: center;
//     gap: 16px;
//     margin-bottom: 24px;
//     animation: slideUp .4s cubic-bezier(.22,1,.36,1) both;
//     box-shadow: 0 2px 12px rgba(60,40,10,.06);
//   }
//   .ch-branch-icon {
//     width: 48px; height: 48px;
//     background: #ede5d4;
//     border-radius: 14px;
//     display: flex; align-items: center; justify-content: center;
//     font-size: 22px;
//     flex-shrink: 0;
//   }
//   .ch-branch-name {
//     font-family: 'Cormorant Garamond', serif;
//     font-size: 20px;
//     font-weight: 700;
//     color: #1a1612;
//   }
//   .ch-branch-sub { font-size: 13px; color: #a0886a; margin-top: 2px; }

//   .ch-no-branch {
//     background: #fff5f5;
//     border: 1.5px solid #f5c6c6;
//     border-radius: 20px;
//     padding: 18px 24px;
//     display: flex; align-items: center; gap: 12px;
//     color: #c0392b;
//     font-size: 14px;
//     margin-bottom: 24px;
//     animation: slideUp .4s ease both;
//   }

//   /* ── Delivery type ── */
//   .ch-delivery-wrap {
//     background: #fffdf9;
//     border: 1.5px solid #ede5d4;
//     border-radius: 20px;
//     padding: 20px 24px;
//     margin-bottom: 28px;
//     animation: slideUp .4s .07s cubic-bezier(.22,1,.36,1) both;
//     box-shadow: 0 2px 12px rgba(60,40,10,.06);
//   }
//   .ch-section-label {
//     font-size: 11px;
//     font-weight: 500;
//     letter-spacing: .14em;
//     text-transform: uppercase;
//     color: #a0886a;
//     margin-bottom: 14px;
//   }
//   .ch-delivery-options { display: flex; gap: 10px; flex-wrap: wrap; }
//   .ch-delivery-opt {
//     flex: 1;
//     min-width: 120px;
//     padding: 14px 16px;
//     border-radius: 14px;
//     border: 1.5px solid #ede5d4;
//     background: #faf7f2;
//     cursor: pointer;
//     font-family: 'DM Sans', sans-serif;
//     font-size: 14px;
//     font-weight: 500;
//     color: #6b5533;
//     transition: all .18s;
//     display: flex; align-items: center; gap: 8px;
//     justify-content: center;
//   }
//   .ch-delivery-opt:hover { border-color: #c49a3c; }
//   .ch-delivery-opt.active {
//     background: #2c1e0f;
//     border-color: #2c1e0f;
//     color: #f5f0e8;
//     box-shadow: 0 4px 14px rgba(44,30,15,.2);
//   }
//   .ch-delivery-opt.active .opt-badge {
//     background: #c49a3c;
//     color: #1a1612;
//   }
//   .opt-badge {
//     background: #ede5d4;
//     color: #6b5533;
//     border-radius: 50%;
//     width: 26px; height: 26px;
//     display: flex; align-items: center; justify-content: center;
//     font-size: 14px;
//     flex-shrink: 0;
//   }

//   /* ── Products ── */
//   .ch-products-header {
//     display: flex; align-items: baseline; gap: 10px;
//     margin-bottom: 18px;
//   }
//   .ch-products-title {
//     font-family: 'Cormorant Garamond', serif;
//     font-size: 30px;
//     font-weight: 700;
//     color: #1a1612;
//   }
//   .ch-products-count {
//     font-size: 13px;
//     color: #a0886a;
//   }

//   .ch-grid {
//     display: grid;
//     grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
//     gap: 16px;
//   }

//   .ch-product-card {
//     background: #fffdf9;
//     border: 1.5px solid #ede5d4;
//     border-radius: 20px;
//     overflow: hidden;
//     display: flex;
//     flex-direction: column;
//     transition: box-shadow .2s, border-color .2s, transform .2s;
//     animation: fadeIn .35s ease both;
//     box-shadow: 0 2px 8px rgba(60,40,10,.05);
//   }
//   .ch-product-card:hover {
//     border-color: #c49a3c;
//     box-shadow: 0 6px 24px rgba(60,40,10,.10);
//     transform: translateY(-2px);
//   }

//   @keyframes fadeIn {
//     from { opacity: 0; transform: translateY(10px); }
//     to   { opacity: 1; transform: translateY(0); }
//   }
//   @keyframes slideUp {
//     from { opacity: 0; transform: translateY(20px); }
//     to   { opacity: 1; transform: translateY(0); }
//   }

//   .ch-product-img {
//     width: 100%;
//     height: 150px;
//     object-fit: cover;
//     display: block;
//   }
//   .ch-product-img-placeholder {
//     width: 100%;
//     height: 150px;
//     background: #ede5d4;
//     display: flex; align-items: center; justify-content: center;
//     font-size: 42px;
//     color: #c4b49a;
//   }
//   .ch-product-body { padding: 14px 16px 16px; flex: 1; display: flex; flex-direction: column; }
//   .ch-product-name {
//     font-size: 15px;
//     font-weight: 600;
//     color: #1a1612;
//     margin-bottom: 4px;
//     white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
//   }
//   .ch-product-price {
//     font-family: 'Cormorant Garamond', serif;
//     font-size: 22px;
//     font-weight: 700;
//     color: #2c1e0f;
//     margin-bottom: 12px;
//   }
//   .ch-product-actions { display: flex; gap: 8px; margin-top: auto; }

//   .ch-btn-add {
//     flex: 1;
//     padding: 10px;
//     border-radius: 12px;
//     border: 1.5px solid #ede5d4;
//     background: #faf7f2;
//     color: #6b5533;
//     font-family: 'DM Sans', sans-serif;
//     font-size: 13px;
//     font-weight: 600;
//     cursor: pointer;
//     transition: all .15s;
//   }
//   .ch-btn-add:hover { border-color: #c49a3c; background: #f5f0e8; color: #2c1e0f; }

//   .ch-btn-buy {
//     flex: 1;
//     padding: 10px;
//     border-radius: 12px;
//     border: none;
//     background: #2c1e0f;
//     color: #f5f0e8;
//     font-family: 'DM Sans', sans-serif;
//     font-size: 13px;
//     font-weight: 600;
//     cursor: pointer;
//     transition: background .15s;
//   }
//   .ch-btn-buy:hover { background: #c49a3c; color: #1a1612; }

//   /* ── Added animation on badge ── */
//   @keyframes popIn {
//     0%   { transform: scale(0.5); }
//     70%  { transform: scale(1.2); }
//     100% { transform: scale(1); }
//   }
//   .ch-cart-badge { animation: popIn .25s ease both; }

//   /* ── Loading ── */
//   .ch-loading {
//     min-height: 100vh;
//     background: #f5f0e8;
//     display: flex; align-items: center; justify-content: center;
//     flex-direction: column; gap: 16px;
//   }
//   .ch-spinner {
//     width: 36px; height: 36px;
//     border: 3px solid #e0d5c0;
//     border-top-color: #c49a3c;
//     border-radius: 50%;
//     animation: spin .7s linear infinite;
//   }
//   @keyframes spin { to { transform: rotate(360deg); } }
//   .ch-loading-text {
//     font-family: 'Cormorant Garamond', serif;
//     font-size: 20px;
//     color: #a0886a;
//   }
// `;

// const pickEmoji = (name = "") => {
//   const n = name.toLowerCase();
//   if (n.includes("coffee") || n.includes("tea")) return "☕";
//   if (n.includes("pizza")) return "🍕";
//   if (n.includes("burger")) return "🍔";
//   if (n.includes("rice") || n.includes("biryani")) return "🍚";
//   if (n.includes("cake") || n.includes("dessert")) return "🍰";
//   if (n.includes("juice") || n.includes("drink")) return "🥤";
//   return "🍽️";
// };

// function CustomerHome() {
//   const navigate = useNavigate();
//   const [cart, setCart] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [branch, setBranch] = useState(null);
//   const [message, setMessage] = useState("");
//   const [products, setProducts] = useState([]);
//   const [deliveryType, setDeliveryType] = useState(
//     localStorage.getItem("deliveryType") || ""
//   );

//   useEffect(() => {
//     const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
//     setCart(savedCart);
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(cart));
//   }, [cart]);

//   const addToCart = (product) => {
//     setCart((prev) => {
//       const exist = prev.find((p) => p.id === product.id);
//       if (exist) return prev.map((p) => p.id === product.id ? { ...p, qty: p.qty + 1 } : p);
//       return [...prev, { ...product, qty: 1 }];
//     });
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     socket.off("customerAlert");
//     navigate("/login", { replace: true });
//   };

//   const selectDelivery = (type) => {
//     setDeliveryType(type);
//     localStorage.setItem("deliveryType", type);
//   };

//   useEffect(() => {
//     const savedCustomer = JSON.parse(localStorage.getItem("customer") || "null");
//     if (!savedCustomer) { navigate("/login", { replace: true }); return; }

//     socket.emit("joinCustomer", savedCustomer.phone);

//     socket.on("customerAlert", (data) => {
//       if (data.branch) {
//         setBranch(data.branch);
//         localStorage.setItem("branch", JSON.stringify(data.branch));
//         setMessage("");
//       } else {
//         setBranch(null);
//         setMessage(data.message || "No branch found");
//       }
//       setDeliveryType("");
//       localStorage.removeItem("deliveryType");
//     });

//     const fetchData = async () => {
//       try {
//         const res = await API.get(`/customer/branch?phone=${savedCustomer.phone}`);
//         if (res.data.branch) {
//           setBranch(res.data.branch);
//           localStorage.setItem("branch", JSON.stringify(res.data.branch));
//         } else {
//           setBranch(null);
//           setMessage("No branch found");
//         }
//         const prodRes = await API.get("/products");
//         setProducts(prodRes.data || []);
//       } catch (err) {
//         console.error(err);
//         setMessage("Error loading data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//     return () => { socket.off("customerAlert"); socket.disconnect(); };
//   }, [navigate]);

//   const cartCount = cart.reduce((s, i) => s + i.qty, 0);

//   if (loading) {
//     return (
//       <>
//         <style>{css}</style>
//         <div className="ch-loading">
//           <div className="ch-spinner" />
//           <p className="ch-loading-text">Setting up your experience…</p>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <style>{css}</style>
//       <div className="ch-root">

//         {/* ── Nav ── */}
//         <nav className="ch-nav">
//           <div className="ch-nav-left">
//             <button className="ch-nav-back" onClick={() => navigate("/customer")}>←</button>
//             <span className="ch-nav-brand">Shop</span>
//           </div>
//           <div className="ch-nav-right">
//             <button className="ch-cart-btn" onClick={() => navigate("/cart")}>
//               🛒 Cart
//               {cartCount > 0 && (
//                 <span className="ch-cart-badge" key={cartCount}>{cartCount}</span>
//               )}
//             </button>
//             <button className="ch-logout-btn" onClick={handleLogout}>Logout</button>
//           </div>
//         </nav>

//         {/* ── Body ── */}
//         <div className="ch-body">

//           {/* Branch */}
//           {branch ? (
//             <div className="ch-branch-card">
//               <div className="ch-branch-icon">🏪</div>
//               <div>
//                 <div className="ch-branch-name">{branch.branch_name}</div>
//                 <div className="ch-branch-sub">
//                   {[branch.address, branch.phone].filter(Boolean).join(" · ")}
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div className="ch-no-branch">
//               <span style={{ fontSize: 20 }}>⚠️</span>
//               {message || "No branch assigned"}
//             </div>
//           )}

//           {/* Delivery type */}
//           <div className="ch-delivery-wrap">
//             <p className="ch-section-label">Choose Delivery Type</p>
//             <div className="ch-delivery-options">
//               {branch ? (
//                 <>
//                   <button
//                     className={`ch-delivery-opt ${deliveryType === "delivery" ? "active" : ""}`}
//                     onClick={() => selectDelivery("delivery")}
//                   >
//                     <span className="opt-badge">🚚</span>
//                     Delivery
//                   </button>
//                   <button
//                     className={`ch-delivery-opt ${deliveryType === "pickup" ? "active" : ""}`}
//                     onClick={() => selectDelivery("pickup")}
//                   >
//                     <span className="opt-badge">🚶</span>
//                     Pickup
//                   </button>
//                 </>
//               ) : (
//                 <button
//                   className={`ch-delivery-opt ${deliveryType === "central" ? "active" : ""}`}
//                   onClick={() => selectDelivery("central")}
//                 >
//                   <span className="opt-badge">🚚</span>
//                   Central Delivery
//                 </button>
//               )}
//             </div>
//           </div>

//           {/* Products */}
//           <div className="ch-products-header">
//             <h2 className="ch-products-title">Products</h2>
//             {products.length > 0 && (
//               <span className="ch-products-count">{products.length} items</span>
//             )}
//           </div>

//           <div className="ch-grid">
//             {products.map((item, i) => (
//               <div
//                 className="ch-product-card"
//                 key={item.id}
//                 style={{ animationDelay: `${i * 45}ms` }}
//               >
//                 {item.image ? (
//                   <img className="ch-product-img" src={item.image} alt={item.name} />
//                 ) : (
//                   <div className="ch-product-img-placeholder">
//                     {pickEmoji(item.name)}
//                   </div>
//                 )}
//                 <div className="ch-product-body">
//                   <div className="ch-product-name">{item.name}</div>
//                   <div className="ch-product-price">₹{item.price}</div>
//                   <div className="ch-product-actions">
//                     <button className="ch-btn-add" onClick={() => addToCart(item)}>
//                       + Cart
//                     </button>
//                     <button
//                       className="ch-btn-buy"
//                       onClick={() => {
//                         const type = localStorage.getItem("deliveryType");
//                         if (!type) { alert("Please select delivery type ❌"); return; }
//                         navigate("/checkout", { state: { product: item, deliveryType: type, branch } });
//                       }}
//                     >
//                       Buy Now
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//         </div>
//       </div>
//     </>
//   );
// }

// export default CustomerHome;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../services/socket";
import API from "../services/api";

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
  CircularProgress,
  Alert,
  ToggleButton,
  ToggleButtonGroup,
  Badge,
  Container,
  Paper,
   Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";
import StorefrontIcon from "@mui/icons-material/Storefront";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

// ── Emoji helper (fallback for products without images) ──
const pickEmoji = (name = "") => {
  const n = name.toLowerCase();
  if (n.includes("coffee") || n.includes("tea")) return "☕";
  if (n.includes("pizza")) return "🍕";
  if (n.includes("burger")) return "🍔";
  if (n.includes("rice") || n.includes("biryani")) return "🍚";
  if (n.includes("cake") || n.includes("dessert")) return "🍰";
  if (n.includes("juice") || n.includes("drink")) return "🥤";
  return "🍽️";
};

function CustomerHome() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [branch, setBranch] = useState(null);
  const [message, setMessage] = useState("");
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);//
  const [deliveryType, setDeliveryType] = useState(
    localStorage.getItem("deliveryType") || ""
  );
    useEffect(() => {
    // 🔥 prevent back navigation
    window.history.pushState(null, "", window.location.href);
  
    const handleBack = () => {
      window.history.pushState(null, "", window.location.href);
    };
  
    window.addEventListener("popstate", handleBack);
  
    return () => {
      window.removeEventListener("popstate", handleBack);
    };
  }, []);

  const handleClickOpen = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
};

const confirmLogout = () => {
  handleClose();
  handleLogout(); // your existing logout function
};
  // Persist cart
  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart") || "[]"));
  }, []);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const exist = prev.find((p) => p.id === product.id);
      if (exist)
        return prev.map((p) =>
          p.id === product.id ? { ...p, qty: p.qty + 1 } : p
        );
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const handleLogout = () => {
    localStorage.clear();
    socket.off("customerAlert");
    navigate("/login", { replace: true });
  };

  const handleDeliveryType = (_, value) => {
    if (!value) return;
    setDeliveryType(value);
    localStorage.setItem("deliveryType", value);
  };

  // Fetch branch + products
  useEffect(() => {
    const savedCustomer = JSON.parse(
      localStorage.getItem("customer") || "null"
    );
    if (!savedCustomer) {
      navigate("/login", { replace: true });
      return;
    }

    socket.emit("joinCustomer", savedCustomer.phone);
    socket.on("customerAlert", (data) => {
      if (data.branch) {
        setBranch(data.branch);
        localStorage.setItem("branch", JSON.stringify(data.branch));
        setMessage("");
      } else {
        setBranch(null);
        setMessage(data.message || "No branch found");
      }
      setDeliveryType("");
      localStorage.removeItem("deliveryType");
    });

    const fetchData = async () => {
      try {
        const res = await API.get(
          `/customer/branch?phone=${savedCustomer.phone}`
        );
        if (res.data.branch) {
          setBranch(res.data.branch);
          localStorage.setItem("branch", JSON.stringify(res.data.branch));
        } else {
          setBranch(null);
          setMessage("No branch found");
        }
        const prodRes = await API.get("/products");
        setProducts(prodRes.data || []);
      } catch (err) {
        console.error(err);
        setMessage("Error loading data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => {
      socket.off("customerAlert");
      socket.disconnect();
    };
  }, [navigate]);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  // ── Loading state ──
  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          bgcolor: "#f5f0e8",
        }}
      >
        <CircularProgress sx={{ color: "#c49a3c" }} size={40} thickness={4} />
        <Typography
          variant="h6"
          sx={{ color: "#a0886a", fontFamily: "'Cormorant Garamond', serif" }}
        >
          Setting up your experience…
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f0e8", pb: 10 }}>

      {/* ── AppBar / Nav ── */}
      <AppBar
        position="sticky"
        elevation={4}
        sx={{ bgcolor: "#2c1e0f" }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Left */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <IconButton
              onClick={() => navigate("/customer")}
              sx={{
                border: "1.5px solid rgba(196,154,60,.4)",
                borderRadius: "10px",
                color: "#c49a3c",
                "&:hover": { bgcolor: "rgba(196,154,60,.15)" },
              }}
              size="small"
            >
              <ArrowBackIcon fontSize="small" />
            </IconButton>
            <Typography
              variant="h6"
              sx={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 700,
                color: "#f5f0e8",
                fontSize: "22px",
              }}
            >
              Shop
            </Typography>
          </Box>

          {/* Right */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
            <Badge
              badgeContent={cartCount}
              color="error"
              overlap="circular"
              sx={{
                "& .MuiBadge-badge": {
                  border: "2px solid #2c1e0f",               
                  fontWeight: 700,
                },
              }}
            >
              <Button
                onClick={() => navigate("/cart")}
                startIcon={<ShoppingCartIcon />}
                sx={{
                  bgcolor: "#c49a3c",
                  color: "#1a1612",
                  fontWeight: 600,
                  borderRadius: "12px",
                  px: 2,
                  textTransform: "none",
                  fontSize: 13,
                  "&:hover": { bgcolor: "#b8891e" },
                }}
              >
                Cart
              </Button>
            </Badge>
            <Button
            
              // onClick={handleLogout}
              onClick={handleClickOpen}
              startIcon={<LogoutIcon />}
              sx={{
                border: "1.5px solid rgba(196,154,60,.35)",
                borderRadius: "10px",
                color: "#a0886a",
                textTransform: "none",
                fontSize: 13,
                "&:hover": { borderColor: "#c49a3c", color: "#c49a3c" },
              }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Dialog open={open} onClose={handleClose}>
  <DialogTitle>Confirm Logout</DialogTitle>

  <DialogContent>
    <DialogContentText>
      Are you sure you want to logout?
    </DialogContentText>
  </DialogContent>

  <DialogActions>
    <Button onClick={handleClose} color="primary">
      Cancel
    </Button>
    <Button onClick={confirmLogout} color="error">
      Logout
    </Button>
  </DialogActions>
</Dialog>

      {/* ── Page Body ── */}
      <Container maxWidth="lg" sx={{ pt: 4, px: { xs: 2, sm: 3 } }}>

        {/* Branch Card */}
        {branch ? (
          <Paper
            elevation={0}
            sx={{
              border: "1.5px solid #ede5d4",
              borderRadius: "20px",
              p: "20px 24px",
              display: "flex",
              alignItems: "center",
              gap: 2,
              mb: 3,
              bgcolor: "#fffdf9",
              boxShadow: "0 2px 12px rgba(60,40,10,.06)",
            }}
          >
            <Box
              sx={{
                width: 48,
                height: 48,
                bgcolor: "#ede5d4",
                borderRadius: "14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <StorefrontIcon sx={{ color: "#6b5533", fontSize: 24 }} />
            </Box>
            <Box>
              <Typography
                sx={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 20,
                  fontWeight: 700,
                  color: "#1a1612",
                }}
              >
                {branch.branch_name}
              </Typography>
              <Typography sx={{ fontSize: 13, color: "#a0886a", mt: 0.25 }}>
                {[branch.address, branch.phone].filter(Boolean).join(" · ")}
              </Typography>
            </Box>
          </Paper>
        ) : (
          <Alert
            severity="warning"
            icon={<WarningAmberIcon />}
            sx={{
              borderRadius: "20px",
              mb: 3,
              border: "1.5px solid #f5c6c6",
              bgcolor: "#fff5f5",
              color: "#c0392b",
            }}
          >
            {message || "No branch assigned"}
          </Alert>
        )}

        {/* Delivery Type */}
        <Paper
          elevation={0}
          sx={{
            border: "1.5px solid #ede5d4",
            borderRadius: "20px",
            p: "20px 24px",
            mb: 3.5,
            bgcolor: "#fffdf9",
            boxShadow: "0 2px 12px rgba(60,40,10,.06)",
          }}
        >
          <Typography
            sx={{
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: ".14em",
              textTransform: "uppercase",
              color: "#a0886a",
              mb: 1.75,
            }}
          >
            Choose Delivery Type
          </Typography>

          <ToggleButtonGroup
            value={deliveryType}
            exclusive
            onChange={handleDeliveryType}
            sx={{ display: "flex", gap: 1.25, flexWrap: "wrap" }}
          >
            {branch ? (
              <>
                <ToggleButton
                  value="delivery"
                  sx={{
                    flex: 1,
                    minWidth: 120,
                    borderRadius: "14px !important",
                    border: "1.5px solid #ede5d4 !important",
                    bgcolor: "#faf7f2",
                    color: "#6b5533",
                    fontWeight: 600,
                    textTransform: "none",
                    fontSize: 14,
                    gap: 1,
                    "&:hover": { borderColor: "#c49a3c !important" },
                    "&.Mui-selected": {
                      bgcolor: "#2c1e0f !important",
                      borderColor: "#2c1e0f !important",
                      color: "#f5f0e8",
                      boxShadow: "0 4px 14px rgba(44,30,15,.2)",
                    },
                  }}
                >
                  <LocalShippingIcon fontSize="small" />
                  Delivery
                </ToggleButton>
                <ToggleButton
                  value="pickup"
                  sx={{
                    flex: 1,
                    minWidth: 120,
                    borderRadius: "14px !important",
                    border: "1.5px solid #ede5d4 !important",
                    bgcolor: "#faf7f2",
                    color: "#6b5533",
                    fontWeight: 600,
                    textTransform: "none",
                    fontSize: 14,
                    gap: 1,
                    "&:hover": { borderColor: "#c49a3c !important" },
                    "&.Mui-selected": {
                      bgcolor: "#2c1e0f !important",
                      borderColor: "#2c1e0f !important",
                      color: "#f5f0e8",
                      boxShadow: "0 4px 14px rgba(44,30,15,.2)",
                    },
                  }}
                >
                  <DirectionsWalkIcon fontSize="small" />
                  Pickup
                </ToggleButton>
              </>
            ) : (
              <ToggleButton
                value="central"
                sx={{
                  flex: 1,
                  minWidth: 120,
                  borderRadius: "14px !important",
                  border: "1.5px solid #ede5d4 !important",
                  bgcolor: "#faf7f2",
                  color: "#6b5533",
                  fontWeight: 600,
                  textTransform: "none",
                  fontSize: 14,
                  gap: 1,
                  "&:hover": { borderColor: "#c49a3c !important" },
                  "&.Mui-selected": {
                    bgcolor: "#2c1e0f !important",
                    borderColor: "#2c1e0f !important",
                    color: "#f5f0e8",
                  },
                }}
              >
                <LocalShippingIcon fontSize="small" />
                Central Delivery
              </ToggleButton>
            )}
          </ToggleButtonGroup>
        </Paper>

        {/* Products Header */}
        <Box sx={{ display: "flex", alignItems: "baseline", gap: 1.25, mb: 2.25 }}>
          <Typography
            variant="h4"
            sx={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 700,
              color: "#1a1612",
            }}
          >
            Products
          </Typography>
          {products.length > 0 && (
            <Chip
              label={`${products.length} items`}
              size="small"
              sx={{
                bgcolor: "#ede5d4",
                color: "#a0886a",
                fontSize: 12,
                height: 22,
              }}
            />
          )}
        </Box>

        {/* Products Grid */}
        <Grid container spacing={2}>
          {products.map((item) => (
            <Grid item xs={6} sm={4} md={3} key={item.id}>
              <Card
                elevation={0}
                sx={{
                  border: "1.5px solid #ede5d4",
                  borderRadius: "20px",
                  overflow: "hidden",
                  bgcolor: "#fffdf9",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  transition: "box-shadow .2s, border-color .2s, transform .2s",
                  "&:hover": {
                    borderColor: "#c49a3c",
                    boxShadow: "0 6px 24px rgba(60,40,10,.10)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                {/* Image or Placeholder */}
                {item.image ? (
                  <CardMedia
                    component="img"
                    height="150"
                    image={item.image}
                    alt={item.name}
                    sx={{ objectFit: "cover" }}
                  />
                ) : (
                  <Box
                    sx={{
                      height: 150,
                      bgcolor: "#ede5d4",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 42,
                      color: "#c4b49a",
                    }}
                  >
                    {pickEmoji(item.name)}
                  </Box>
                )}

                <CardContent sx={{ pb: 0, px: 2, pt: 1.75, flexGrow: 1 }}>
                  <Typography
                    sx={{
                      fontSize: 15,
                      fontWeight: 600,
                      color: "#1a1612",
                      mb: 0.5,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {item.name}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 22,
                      fontWeight: 700,
                      color: "#2c1e0f",
                    }}
                  >
                    ₹{item.price}
                  </Typography>
                </CardContent>

                <CardActions sx={{ px: 2, pb: 2, pt: 1.25, gap: 1 }}>
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => addToCart(item)}
                    sx={{
                      borderRadius: "12px",
                      border: "1.5px solid #ede5d4",
                      bgcolor: "#faf7f2",
                      color: "#6b5533",
                      textTransform: "none",
                      fontWeight: 600,
                      fontSize: 13,
                      "&:hover": {
                        borderColor: "#c49a3c",
                        bgcolor: "#f5f0e8",
                        color: "#2c1e0f",
                      },
                    }}
                  >
                    + Cart
                  </Button>
                  <Button
                    fullWidth
                    variant="contained"
                    disableElevation
                    onClick={() => {
                      const type = localStorage.getItem("deliveryType");
                      if (!type) {
                        alert("Please select delivery type ❌");
                        return;
                      }
                      navigate("/checkout", {
                        state: { product: item, deliveryType: type, branch },
                      });
                    }}
                    sx={{
                      borderRadius: "12px",
                      bgcolor: "#2c1e0f",
                      color: "#f5f0e8",
                      textTransform: "none",
                      fontWeight: 600,
                      fontSize: 13,
                      "&:hover": { bgcolor: "#c49a3c", color: "#1a1612" },
                    }}
                  >
                    Buy Now
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

      </Container>
    </Box>
  );
}

export default CustomerHome;