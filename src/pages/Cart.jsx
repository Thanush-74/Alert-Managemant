import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import {
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  Button,
  Stack,
  Divider,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

const pickEmoji = (name = "") => {
  const n = name.toLowerCase();
  if (n.includes("pizza")) return "🍕";
  if (n.includes("burger")) return "🍔";
  if (n.includes("coffee")) return "☕";
  return "🍽️";
};

function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(savedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
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

  const increaseQty = (id) =>
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );

  const decreaseQty = (id) =>
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0)
    );

  const removeItem = (id) =>
    setCart((prev) => prev.filter((item) => item.id !== id));

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const totalItems = cart.reduce((s, i) => s + i.qty, 0);

  const goToCheckout = () => {
    const deliveryType = localStorage.getItem("deliveryType");
    const branch = JSON.parse(localStorage.getItem("branch") || "null");

    if (!deliveryType) return alert("Select delivery type ❌");
    if (cart.length === 0) return alert("Cart is empty ❌");

    navigate("/checkout", { state: { deliveryType, branch } });
  };


  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5", p: 2 }}>
      <Box maxWidth={600} mx="auto">
        
        {/* Header */}
        <Box mb={2} display={"flex"}>
           <IconButton onClick={() => navigate("/customer-home")}>
        <ArrowBackIcon />
      </IconButton>
          <Typography variant="h5" fontWeight={600}>
            Your Cart
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {totalItems} items
          </Typography>
        </Box>

        {/* Empty */}
        {cart.length === 0 ? (
          <Card sx={{ textAlign: "center", p: 4 }}>
            <ShoppingCartOutlinedIcon sx={{ fontSize: 50, opacity: 0.5 }} />
            <Typography mt={2}>Your cart is empty</Typography>
          </Card>
        ) : (
          <>
            {/* Items */}
            <Stack spacing={2}>
              {cart.map((item) => (
                <Card key={item.id} sx={{ borderRadius: 3 }}>
                  <CardContent>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      
                      {/* Emoji */}
                      <Box fontSize={28}>{pickEmoji(item.name)}</Box>

                      {/* Info */}
                      <Box flex={1}>
                        <Typography fontWeight={600}>
                          {item.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          ₹{item.price} each
                        </Typography>
                      </Box>

                      {/* Qty */}
                      <Stack direction="row" alignItems="center">
                        <IconButton onClick={() => decreaseQty(item.id)}>
                          <RemoveIcon />
                        </IconButton>

                        <Typography>{item.qty}</Typography>

                        <IconButton onClick={() => increaseQty(item.id)}>
                          <AddIcon />
                        </IconButton>
                      </Stack>

                      {/* Price */}
                      <Typography fontWeight={600}>
                        ₹{item.price * item.qty}
                      </Typography>

                      {/* Delete */}
                      <IconButton onClick={() => removeItem(item.id)}>
                        <DeleteOutlineIcon />
                      </IconButton>
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Stack>

            <Divider sx={{ my: 3 }} />

            {/* Total */}
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography variant="h6">Total</Typography>
              <Typography variant="h6">₹{total}</Typography>
            </Box>

            {/* Checkout Button */}
            <Button
              variant="contained"
              fullWidth
              size="large"
              sx={{
                bgcolor: "#c49a3c",
                "&:hover": { bgcolor: "#b8891e" },
                borderRadius: 3,
                py: 1.5,
              }}
              onClick={goToCheckout}
            >
              Proceed to Checkout →
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
}

export default Cart;

