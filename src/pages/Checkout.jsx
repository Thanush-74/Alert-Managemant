import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../services/api";

import {
  Box,
  Card,
  Typography,
  Chip,
  Divider,
  TextField,
  Button,
  CircularProgress,
  Paper,
  Stack,
} from "@mui/material";

import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// ─── Emoji helper ─────────────────────────────────────────────────────────────
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

// ─── Component ────────────────────────────────────────────────────────────────
function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();

  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const savedBranch = JSON.parse(localStorage.getItem("branch") || "null");
  const savedDelivery = localStorage.getItem("deliveryType");

  const { deliveryType, branch, product } = location.state || {
    deliveryType: savedDelivery,
    branch: savedBranch,
  };

  useEffect(() => {
    if (product) {
      setCart([{ ...product, qty: 1 }]);
    } else {
      setCart(JSON.parse(localStorage.getItem("cart") || "[]"));
    }
  }, [product]);

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const isDelivery = deliveryType !== "pickup";

  const placeOrder = async () => {
    if (!deliveryType) { alert("Delivery type missing ❌"); return; }
    if (cart.length === 0) { alert("Cart is empty ❌"); return; }
    if (isDelivery && !address) { alert("Please enter address"); return; }

    try {
      setLoading(true);
      const customer = JSON.parse(localStorage.getItem("customer") || "{}");
      const customerId = customer.id || customer.phone;
      const cleanItems = cart.map(({ id, qty, price }) => ({ id, qty, price }));

      await API.post("/orders", {
        customerId,
        items: cleanItems,
        total,
        address: isDelivery ? address : null,
        deliveryType,
        branchId: branch ? branch.id : null,
      });

      localStorage.removeItem("cart");
      alert("Order placed successfully 🎉");
      navigate("/customer-home");
    } catch (err) {
      console.error(err);
      alert("Order failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f5f0e8",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        py: 6,
        px: 2,
      }}
    >
      <Card
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 520,
          borderRadius: "24px",
          overflow: "hidden",
          boxShadow:
            "0 8px 40px rgba(60,40,10,0.10), 0 1.5px 4px rgba(60,40,10,0.06)",
          bgcolor: "#fffdf9",
          animation: "slideUp .45s cubic-bezier(.22,1,.36,1) both",
          "@keyframes slideUp": {
            from: { opacity: 0, transform: "translateY(28px)" },
            to: { opacity: 1, transform: "translateY(0)" },
          },
        }}
      >
        {/* ── Header ── */}
        <Box
          sx={{
            bgcolor: "#2c1e0f",
            px: "36px",
            pt: "32px",
            pb: "28px",
            position: "relative",
            overflow: "hidden",
            "&::after": {
              content: '""',
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse at 80% -20%, rgba(210,160,60,.25) 0%, transparent 65%)",
              pointerEvents: "none",
            },
          }}
        >
          <Typography
            sx={{
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: ".18em",
              textTransform: "uppercase",
              color: "#c49a3c",
              mb: 0.75,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Review &amp; Confirm
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 700,
              color: "#f5f0e8",
              lineHeight: 1.1,
              fontSize: 38,
            }}
          >
            Checkout
          </Typography>
        </Box>

        {/* ── Body ── */}
        <Box sx={{ px: "36px", py: "32px" }}>

          {/* Info Pills */}
          <Stack direction="row" spacing={1.25} flexWrap="wrap" sx={{ mb: 3.5 }}>
            {deliveryType && (
              <Chip
                icon={
                  isDelivery ? (
                    <LocalShippingIcon sx={{ fontSize: 15, color: "#c49a3c !important" }} />
                  ) : (
                    <StorefrontIcon sx={{ fontSize: 15, color: "#c49a3c !important" }} />
                  )
                }
                label={isDelivery ? "Delivery" : "Pickup"}
                sx={{
                  bgcolor: "#f5f0e8",
                  border: "1.5px solid #e0d5c0",
                  borderRadius: "100px",
                  color: "#6b5533",
                  fontWeight: 500,
                  fontSize: 13,
                  height: 32,
                  "& .MuiChip-icon": { ml: "10px" },
                }}
              />
            )}
            {branch && (
              <Chip
                icon={<StorefrontIcon sx={{ fontSize: 15, color: "#c49a3c !important" }} />}
                label={branch.branch_name}
                sx={{
                  bgcolor: "#f5f0e8",
                  border: "1.5px solid #e0d5c0",
                  borderRadius: "100px",
                  color: "#6b5533",
                  fontWeight: 500,
                  fontSize: 13,
                  height: 32,
                  "& .MuiChip-icon": { ml: "10px" },
                }}
              />
            )}
          </Stack>

          {/* Section Label */}
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
            Your Order
          </Typography>

          {/* Items List */}
          <Stack spacing={1} sx={{ mb: 3 }}>
            {cart.length === 0 ? (
              <Typography
                sx={{
                  textAlign: "center",
                  py: 4,
                  color: "#a0886a",
                  fontSize: 14,
                }}
              >
                No items in cart
              </Typography>
            ) : (
              cart.map((item, i) => (
                <Paper
                  key={item.id}
                  elevation={0}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    bgcolor: "#faf7f2",
                    border: "1.5px solid #ede5d4",
                    borderRadius: "14px",
                    px: 2.25,
                    py: 1.75,
                    animation: "fadeIn .3s ease both",
                    animationDelay: `${i * 60}ms`,
                    "@keyframes fadeIn": {
                      from: { opacity: 0, transform: "translateX(-8px)" },
                      to: { opacity: 1, transform: "translateX(0)" },
                    },
                  }}
                >
                  {/* Icon */}
                  <Box
                    sx={{
                      width: 38,
                      height: 38,
                      borderRadius: "10px",
                      bgcolor: "#ede5d4",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 18,
                      flexShrink: 0,
                    }}
                  >
                    {pickEmoji(item.name)}
                  </Box>

                  {/* Name + Qty */}
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      sx={{ fontSize: 14, fontWeight: 500, color: "#1a1612" }}
                    >
                      {item.name}
                    </Typography>
                    <Typography sx={{ fontSize: 12, color: "#a0886a", mt: 0.25 }}>
                      Qty {item.qty}
                    </Typography>
                  </Box>

                  {/* Price */}
                  <Typography
                    sx={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 20,
                      fontWeight: 700,
                      color: "#2c1e0f",
                    }}
                  >
                    ₹{(item.price * item.qty).toLocaleString()}
                  </Typography>
                </Paper>
              ))
            )}
          </Stack>

          <Divider sx={{ borderStyle: "dashed", borderColor: "#e0d5c0", my: 2 }} />

          {/* Total Row */}
          <Box
            sx={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              bgcolor: "#2c1e0f",
              borderRadius: "16px",
              px: 2.5,
              py: 2,
              mb: 3.5,
            }}
          >
            <Typography
              sx={{
                fontSize: 13,
                fontWeight: 500,
                letterSpacing: ".06em",
                color: "#c49a3c",
                textTransform: "uppercase",
              }}
            >
              Total Amount
            </Typography>
            <Typography
              sx={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 34,
                fontWeight: 700,
                color: "#f5f0e8",
              }}
            >
              ₹{total.toLocaleString()}
            </Typography>
          </Box>

          {/* Address */}
          {isDelivery && (
            <Box sx={{ mb: 3.5 }}>
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
                Delivery Address
              </Typography>
              <TextField
                multiline
                rows={3}
                fullWidth
                placeholder="Enter your full delivery address…"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "14px",
                    bgcolor: "#faf7f2",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 14,
                    color: "#1a1612",
                    "& fieldset": { borderColor: "#e0d5c0", borderWidth: "1.5px" },
                    "&:hover fieldset": { borderColor: "#c49a3c" },
                    "&.Mui-focused fieldset": {
                      borderColor: "#c49a3c",
                      borderWidth: "1.5px",
                    },
                  },
                  "& .MuiOutlinedInput-input::placeholder": { color: "#c4b49a" },
                }}
              />
            </Box>
          )}

          {/* CTA Button */}
          <Button
            fullWidth
            disableElevation
            onClick={placeOrder}
            disabled={loading}
            endIcon={
              loading ? null : <ArrowForwardIcon sx={{ fontSize: 18 }} />
            }
            sx={{
              py: 2.25,
              bgcolor: "#c49a3c",
              color: "#1a1612",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 15,
              fontWeight: 700,
              letterSpacing: ".05em",
              borderRadius: "16px",
              textTransform: "none",
              boxShadow: "0 4px 18px rgba(196,154,60,.30)",
              transition: "background .2s, transform .15s, box-shadow .2s",
              "&:hover:not(:disabled)": {
                bgcolor: "#b8891e",
                transform: "translateY(-1px)",
                boxShadow: "0 6px 24px rgba(196,154,60,.40)",
              },
              "&:active:not(:disabled)": { transform: "translateY(0)" },
              "&.Mui-disabled": {
                bgcolor: "#d4c5a4",
                color: "#9e8e70",
                boxShadow: "none",
              },
            }}
          >
            {loading ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
                <CircularProgress size={18} thickness={3} sx={{ color: "#1a1612" }} />
                Placing Order…
              </Box>
            ) : (
              "Confirm Order"
            )}
          </Button>

        </Box>
      </Card>
    </Box>
  );
}

export default Checkout;