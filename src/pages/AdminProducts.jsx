
// // ✅ ONLY ADDED: Skeleton import
// import { Skeleton } from "@mui/material";

// import { useEffect, useState } from "react";
// import {
//   Box, Typography, Card, CardContent, Button, TextField, Grid, Stack,
//   IconButton, Dialog, DialogTitle, DialogContent, DialogActions,
//   InputAdornment, Fade, Backdrop,
// } from "@mui/material";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import AddIcon from "@mui/icons-material/Add";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import SearchIcon from "@mui/icons-material/Search";
// import ImageIcon from "@mui/icons-material/Image";
// import StorefrontIcon from "@mui/icons-material/Storefront";
// import CloseIcon from "@mui/icons-material/Close";
// import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

// import API from "../services/api";

// const fontLink = `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');`;

// const theme = createTheme({
//   palette: {
//     mode: "light",
//     primary: { main: "#2563EB" },
//     background: { default: "#F1F5F9", paper: "#FFFFFF" },
//     text: { primary: "#0F172A", secondary: "#64748B" },
//   },
//   typography: { fontFamily: "'Plus Jakarta Sans', sans-serif" },
//   shape: { borderRadius: 12 },
//   components: {
//     MuiCard: {
//       styleOverrides: {
//         root: {
//           background: "#FFFFFF",
//           border: "1px solid #E2E8F0",
//           boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
//           borderRadius: 16,
//           transition: "all 0.3s cubic-bezier(0.25,0.46,0.45,0.94)",
//           "&:hover": {
//             transform: "translateY(-5px)",
//             boxShadow: "0 20px 40px rgba(37,99,235,0.12)",
//             border: "1px solid #BFDBFE",
//           },
//         },
//       },
//     },
//     MuiTextField: {
//       styleOverrides: {
//         root: {
//           "& .MuiOutlinedInput-root": {
//             fontFamily: "'Plus Jakarta Sans', sans-serif",
//             fontSize: 13,
//             background: "#F8FAFC",
//             borderRadius: 10,
//             "& fieldset": { borderColor: "#E2E8F0" },
//             "&:hover fieldset": { borderColor: "#93C5FD" },
//             "&.Mui-focused fieldset": { borderColor: "#2563EB", borderWidth: 1.5 },
//           },
//           "& .MuiInputLabel-root.Mui-focused": { color: "#2563EB" },
//         },
//       },
//     },
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           textTransform: "none",
//           fontFamily: "'Plus Jakarta Sans', sans-serif",
//           fontWeight: 600,
//           fontSize: 13,
//           borderRadius: 10,
//           boxShadow: "none",
//           "&:hover": { boxShadow: "none" },
//         },
//         containedPrimary: {
//           background: "linear-gradient(135deg, #2563EB, #1D4ED8)",
//           color: "#fff",
//           "&:hover": {
//             background: "linear-gradient(135deg, #3B82F6, #2563EB)",
//             boxShadow: "0 8px 20px rgba(37,99,235,0.35) !important",
//           },
//           "&:disabled": { background: "#E2E8F0", color: "#94A3B8" },
//         },
//       },
//     },
//     MuiDialog: {
//       styleOverrides: {
//         paper: {
//           background: "#FFFFFF",
//           border: "1px solid #E2E8F0",
//           borderRadius: 20,
//           boxShadow: "0 25px 60px rgba(0,0,0,0.15)",
//         },
//       },
//     },
//   },
// });

// const FALLBACK = "https://dummyimage.com/400x280/EFF6FF/BFDBFE&text=No+Image";

// export default function AdminProducts() {
//   const [products, setProducts] = useState([]);
//   const [search, setSearch] = useState("");
//   const [open, setOpen] = useState(false);
//   const [deleteConfirm, setDeleteConfirm] = useState(null);
//   const [editItem, setEditItem] = useState(null);
//   const [imgError, setImgError] = useState({});
//   // inside component
// const [loading, setLoading] = useState(true); // ✅ added
//   const [form, setForm] = useState({ name: "", price: "", image: "" });

//   // const fetchProducts = async () => {
//   //   try {
//   //     const res = await API.get("/products");
//   //     setProducts(res.data || []);
//   //   } catch (err) { console.error(err); }
//   // };

//   const fetchProducts = async () => {
//   try {
//     setLoading(true); // ✅ added
//     const res = await API.get("/products");
//     setProducts(res.data || []);
//   } catch (err) {
//     console.error(err);
//   } finally {
//     setLoading(false); // ✅ added
//   }
// };
//   useEffect(() => { fetchProducts(); }, []);

//   const handleAdd = () => { setForm({ name: "", price: "", image: "" }); setEditItem(null); setOpen(true); };
//   const handleEdit = (item) => { setForm({ name: item.name, price: item.price, image: item.image }); setEditItem(item); setOpen(true); };
//   const handleSave = async () => {
//     if (!form.name || !form.price) return;
//     try {
//       if (editItem) await API.put(`/products/${editItem.id}`, { ...form, price: Number(form.price) });
//       else await API.post("/products", { ...form, price: Number(form.price) });
//       setOpen(false); fetchProducts();
//     } catch (err) { console.error(err); }
//   };
//   const handleDelete = async (id) => {
//     try { await API.delete(`/products/${id}`); setDeleteConfirm(null); fetchProducts(); }
//     catch (err) { console.error(err); }
//   };

//   const filtered = products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

//   return (
//     <ThemeProvider theme={theme}>
//       <style>{`
//         ${fontLink}
//         @keyframes fadeUp {
//           from { opacity: 0; transform: translateY(14px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//         .product-card { animation: fadeUp 0.4s ease both; }
//         .product-card:nth-child(1) { animation-delay: 0.05s; }
//         .product-card:nth-child(2) { animation-delay: 0.10s; }
//         .product-card:nth-child(3) { animation-delay: 0.15s; }
//         .product-card:nth-child(4) { animation-delay: 0.20s; }
//         .product-card:nth-child(5) { animation-delay: 0.25s; }
//         .product-card:nth-child(6) { animation-delay: 0.30s; }
//         .product-card:nth-child(7) { animation-delay: 0.35s; }
//         .product-card:nth-child(8) { animation-delay: 0.40s; }
//         .img-zoom { transition: transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94); }
//         .card-wrap:hover .img-zoom { transform: scale(1.05); }
//         ::-webkit-scrollbar { width: 5px; }
//         ::-webkit-scrollbar-track { background: #F1F5F9; }
//         ::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 4px; }
//       `}</style>

//       <Box sx={{
//         minHeight: "100vh",
//         background: "#F1F5F9",
//         backgroundImage: "radial-gradient(ellipse 70% 40% at 60% -10%, rgba(37,99,235,0.07) 0%, transparent 60%)",
//         p: { xs: 2.5, md: 4.5 },
//       }}>

//         {/* ── Header ── */}
//         <Box sx={{ mb: 4.5 }}>
//           <Stack direction={{ xs: "column", sm: "row" }} alignItems={{ sm: "center" }} justifyContent="space-between" spacing={2}>

//             <Stack direction="row" alignItems="center" spacing={2}>
//               <Box sx={{
//                 width: 46, height: 46, borderRadius: "14px",
//                 background: "linear-gradient(135deg, #2563EB, #1D4ED8)",
//                 display: "flex", alignItems: "center", justifyContent: "center",
//                 boxShadow: "0 8px 20px rgba(37,99,235,0.3)",
//               }}>
//                 <StorefrontIcon sx={{ color: "#fff", fontSize: 22 }} />
//               </Box>
//               <Box>
//                 <Typography sx={{ fontSize: 20, fontWeight: 600, color: "#0F172A", lineHeight: 1.1 }}>
//                   Products
//                 </Typography>
//                 <Typography sx={{ fontSize: 12, color: "#94A3B8", mt: 0.3 }}>
//                   {products.length} items in catalog
//                 </Typography>
//               </Box>
//             </Stack>

//             <Stack direction="row" spacing={1.5} alignItems="center">
//               <TextField
//                 size="small"
//                 placeholder="Search products…"
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <SearchIcon sx={{ color: "#94A3B8", fontSize: 17 }} />
//                     </InputAdornment>
//                   ),
//                 }}
//                 sx={{ width: 210 }}
//               />
//               <Button
//                 variant="contained"
//                 startIcon={<AddIcon sx={{ fontSize: "16px !important" }} />}
//                 onClick={handleAdd}
//                 sx={{ px: 2.5, py: 1 }}
//               >
//                 Add Product
//               </Button>
//             </Stack>
//           </Stack>

//           {/* Divider */}
//           <Box sx={{ mt: 3, height: 1, background: "linear-gradient(90deg, #BFDBFE, #E2E8F0 60%)" }} />
//         </Box>

//         {/* ── Catalog label ── */}
//         <Stack direction="row" alignItems="center" spacing={1.5} mb={3}>
//           <Typography sx={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: "#94A3B8", textTransform: "uppercase" }}>
//             All Products
//           </Typography>
//           <Box sx={{ px: 1.5, py: 0.3, background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: "6px" }}>
//             <Typography sx={{ fontSize: 11, color: "#2563EB", fontWeight: 700 }}>
//               {filtered.length} total
//             </Typography>
//           </Box>
//         </Stack>

   

//           {/* ── Grid ── */}

// {loading ? (
//   <Grid container spacing={2.5}>
//     {Array.from(new Array(8)).map((_, index) => (
//       <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
//         {/* <Card>
//           <Skeleton variant="rectangular" height={190} />
//           <CardContent>
//             <Skeleton height={20} width="80%" />
//             <Skeleton height={20} width="40%" />
//           </CardContent>
//         </Card> */}
//         <Card className="card-wrap">
//   <Box sx={{ position: "relative", overflow: "hidden" }}>
    
//     {/* Image skeleton */}
//     <Skeleton variant="rectangular" height={190} />

//     {/* Price badge skeleton */}
//     <Box
//       sx={{
//         position: "absolute",
//         top: 10,
//         right: 10,
//         px: 1.2,
//         py: 0.4,
//       }}
//     >
//       <Skeleton width={40} height={20} />
//     </Box>

//   </Box>

//   <CardContent sx={{ pt: 1.8, px: 2 }}>
    
//     {/* Title */}
//     <Skeleton height={20} width="70%" />

//     {/* Buttons */}
//     <Stack direction="row" justifyContent="flex-end" spacing={1} mt={1}>
//       <Skeleton variant="circular" width={30} height={30} />
//       <Skeleton variant="circular" width={30} height={30} />
//     </Stack>

//   </CardContent>
// </Card>
//       </Grid>
//     ))}
//   </Grid>

// ) : filtered.length === 0 ? (
//   <Box sx={{ textAlign: "center", py: 14 }}>
//     <Box sx={{
//       width: 72, height: 72, borderRadius: "20px",
//       background: "#EFF6FF", border: "1px solid #EFF6FF",
//       display: "flex", alignItems: "center", justifyContent: "center",
//       mx: "auto", mb: 2,
//     }}>
//       <StorefrontIcon sx={{ fontSize: 32, color: "#93C5FD" }} />
//     </Box>
//     <Typography sx={{ color: "#64748B", fontWeight: 600, fontSize: 15 }}>
//       No products found
//     </Typography>
//     <Typography sx={{ color: "#CBD5E1", fontSize: 13, mt: 0.5 }}>
//       Try adjusting your search
//     </Typography>
//   </Box>
// ) : (
  
//   <Grid container spacing={2.5}>
//     {filtered.map((item) => (
//       <Grid item xs={12} sm={6} md={4} lg={3} key={item.id} className="product-card">
//         <Card className="card-wrap">
//           <Box sx={{ position: "relative", overflow: "hidden", borderRadius: "16px 16px 0 0" }}>
//             <Box
//               component="img"
//               className="img-zoom"
//               src={imgError[item.id] ? FALLBACK : item.image || FALLBACK}
//               alt={item.name}
//               onError={() => setImgError((p) => ({ ...p, [item.id]: true }))}
//               sx={{ width: "100%", height: 190, objectFit: "cover", display: "block" }}
//             />
//             <Box sx={{
//               position: "absolute", top: 10, right: 10,
//               background: "rgba(255,255,255,0.92)",
//               backdropFilter: "blur(8px)",
//               border: "1px solid #BFDBFE",
//               borderRadius: "8px",
//               px: 1.2, py: 0.4,
//               display: "flex", alignItems: "center", gap: 0.3,
//             }}>
//               <CurrencyRupeeIcon sx={{ fontSize: 12, color: "#2563EB" }} />
//               <Typography sx={{ fontSize: 12, fontWeight: 700, color: "#2563EB" }}>
//                 {item.price.toLocaleString("en-IN")}
//               </Typography>
//             </Box>
//           </Box>

//           <CardContent sx={{ pt: 1.8, pb: "14px !important", px: 2 }}>
//             <Typography sx={{ fontWeight: 700, fontSize: 14, color: "#0F172A", mb: 1.5 }} noWrap>
//               {item.name}
//             </Typography>
//             <Stack direction="row" justifyContent="flex-end" spacing={0.5}>
//               <IconButton size="small" onClick={() => handleEdit(item)} sx={{
//                 width: 30, height: 30, borderRadius: "8px",
//                 border: "1px solid #E2E8F0", color: "#94A3B8",
//                 "&:hover": { color: "#2563EB", borderColor: "#BFDBFE", background: "#EFF6FF" },
//               }}>
//                 <EditIcon sx={{ fontSize: 14 }} />
//               </IconButton>
//               <IconButton size="small" onClick={() => setDeleteConfirm(item)} sx={{
//                 width: 30, height: 30, borderRadius: "8px",
//                 border: "1px solid #E2E8F0", color: "#94A3B8",
//                 "&:hover": { color: "#EF4444", borderColor: "#FECACA", background: "#FEF2F2" },
//               }}>
//                 <DeleteIcon sx={{ fontSize: 14 }} />
//               </IconButton>
//             </Stack>
//           </CardContent>
//         </Card>
//       </Grid>
//     ))}
//   </Grid>
// )}
//         {/* ── Add / Edit Dialog ── */}
//         <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xs" fullWidth
//           TransitionComponent={Fade} BackdropComponent={Backdrop}
//           BackdropProps={{ sx: { backdropFilter: "blur(6px)", background: "rgba(15,23,42,0.4)" } }}>
//           <DialogTitle sx={{ pt: 3, px: 3, pb: 0, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
//             <Box>
//               <Typography sx={{ fontSize: 10, letterSpacing: "0.15em", color: "#2563EB", textTransform: "uppercase", fontWeight: 700, mb: 0.5 }}>
//                 {editItem ? "Edit Product" : "New Product"}
//               </Typography>
//               <Typography sx={{ fontSize: 22, fontWeight: 800, color: "#0F172A", lineHeight: 1.1 }}>
//                 {editItem ? "Update Details" : "Add to Catalog"}
//               </Typography>
//             </Box>
//             <IconButton size="small" onClick={() => setOpen(false)} sx={{
//               color: "#94A3B8", borderRadius: "8px", border: "1px solid #E2E8F0",
//               width: 30, height: 30, "&:hover": { color: "#0F172A", borderColor: "#CBD5E1" },
//             }}>
//               <CloseIcon sx={{ fontSize: 15 }} />
//             </IconButton>
//           </DialogTitle>

//           <DialogContent sx={{ px: 3, pt: 2.5 }}>
//             <Box sx={{ height: 1, background: "#EFF6FF", mb: 3 }} />
//             <Stack spacing={2}>
//               <TextField label="Product name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} fullWidth />
//               <TextField label="Price (₹)" type="number" value={form.price}
//                 onChange={(e) => setForm({ ...form, price: e.target.value })} fullWidth
//                 InputProps={{ startAdornment: <InputAdornment position="start"><CurrencyRupeeIcon sx={{ fontSize: 14, color: "#94A3B8" }} /></InputAdornment> }}
//               />
//               <TextField label="Image URL" value={form.image}
//                 onChange={(e) => setForm({ ...form, image: e.target.value })} fullWidth
//                 InputProps={{ startAdornment: <InputAdornment position="start"><ImageIcon sx={{ fontSize: 14, color: "#94A3B8" }} /></InputAdornment> }}
//               />
//               {form.image && (
//                 <Box sx={{ borderRadius: "10px", overflow: "hidden", border: "1px solid #E2E8F0", position: "relative" }}>
//                   <Box component="img" src={form.image} alt="preview"
//                     onError={(e) => { e.target.src = FALLBACK; }}
//                     sx={{ width: "100%", height: 130, objectFit: "cover", display: "block" }} />
//                   <Box sx={{
//                     position: "absolute", top: 8, left: 8,
//                     background: "rgba(255,255,255,0.9)", backdropFilter: "blur(4px)",
//                     px: 1, py: 0.3, borderRadius: "6px", border: "1px solid #BFDBFE",
//                   }}>
//                     <Typography sx={{ fontSize: 9, letterSpacing: "0.12em", color: "#2563EB", textTransform: "uppercase", fontWeight: 700 }}>Preview</Typography>
//                   </Box>
//                 </Box>
//               )}
//             </Stack>
//           </DialogContent>

//           <DialogActions sx={{ px: 3, pb: 3, pt: 2, gap: 1 }}>
//             <Button onClick={() => setOpen(false)} sx={{ color: "#94A3B8", "&:hover": { color: "#0F172A", background: "transparent" } }}>
//               Cancel
//             </Button>
//             <Button variant="contained" onClick={handleSave} disabled={!form.name || !form.price} sx={{ px: 3, py: 0.9 }}>
//               {editItem ? "Save Changes" : "Add Product"}
//             </Button>
//           </DialogActions>
//         </Dialog>

//         {/* ── Delete Confirm Dialog ── */}
//         <Dialog open={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} maxWidth="xs" fullWidth
//           TransitionComponent={Fade} BackdropComponent={Backdrop}
//           BackdropProps={{ sx: { backdropFilter: "blur(6px)", background: "rgba(15,23,42,0.4)" } }}>
//           <DialogTitle sx={{ pt: 3, px: 3, pb: 0 }}>
//             <Typography sx={{ fontSize: 10, letterSpacing: "0.15em", color: "#EF4444", textTransform: "uppercase", fontWeight: 700, mb: 0.5 }}>
//               Confirm Delete
//             </Typography>
//             <Typography sx={{ fontSize: 22, fontWeight: 800, color: "#0F172A", lineHeight: 1.1 }}>
//               Remove Product?
//             </Typography>
//           </DialogTitle>
//           <DialogContent sx={{ px: 3, pt: 2 }}>
//             <Box sx={{ height: 1, background: "#FEF2F2", mb: 2.5 }} />
//             <Typography sx={{ color: "#64748B", fontSize: 13, lineHeight: 1.7 }}>
//               <Box component="span" sx={{ color: "#2563EB", fontWeight: 700 }}>{deleteConfirm?.name}</Box> will be permanently removed from the catalog. This action cannot be undone.
//             </Typography>
//           </DialogContent>
//           <DialogActions sx={{ px: 3, pb: 3, pt: 1, gap: 1 }}>
//             <Button onClick={() => setDeleteConfirm(null)} sx={{ color: "#94A3B8", "&:hover": { color: "#0F172A", background: "transparent" } }}>
//               Cancel
//             </Button>
//             <Button variant="contained" onClick={() => handleDelete(deleteConfirm.id)} sx={{
//               px: 3, py: 0.9,
//               background: "linear-gradient(135deg, #EF4444, #DC2626)",
//               "&:hover": { background: "linear-gradient(135deg, #F87171, #EF4444)", boxShadow: "0 8px 20px rgba(239,68,68,0.3) !important" },
//             }}>
//               Delete
//             </Button>
//           </DialogActions>
//         </Dialog>

//       </Box>
//     </ThemeProvider>
//   );
// }


// ✅ ONLY ADDED: Skeleton import
// import { Skeleton } from "@mui/material";
import ProductSkeleton from "../components/SkeletonLoader";
import { useEffect, useState } from "react";
import {
  Box, Typography, Card, CardContent, Button, TextField, Grid, Stack,
  IconButton, Dialog, DialogTitle, DialogContent, DialogActions,
  InputAdornment, Fade, Backdrop,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import ImageIcon from "@mui/icons-material/Image";
import StorefrontIcon from "@mui/icons-material/Storefront";
import CloseIcon from "@mui/icons-material/Close";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

import API from "../services/api";

const fontLink = `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');`;

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#2563EB" },
    background: { default: "#F1F5F9", paper: "#FFFFFF" },
    text: { primary: "#0F172A", secondary: "#64748B" },
  },
  typography: { fontFamily: "'Plus Jakarta Sans', sans-serif" },
  shape: { borderRadius: 12 },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          background: "#FFFFFF",
          border: "1px solid #E2E8F0",
          boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
          borderRadius: 16,
          transition: "all 0.3s cubic-bezier(0.25,0.46,0.45,0.94)",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: "0 20px 40px rgba(37,99,235,0.12)",
            border: "1px solid #BFDBFE",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 13,
            background: "#F8FAFC",
            borderRadius: 10,
            "& fieldset": { borderColor: "#E2E8F0" },
            "&:hover fieldset": { borderColor: "#93C5FD" },
            "&.Mui-focused fieldset": { borderColor: "#2563EB", borderWidth: 1.5 },
          },
          "& .MuiInputLabel-root.Mui-focused": { color: "#2563EB" },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 600,
          fontSize: 13,
          borderRadius: 10,
          boxShadow: "none",
          "&:hover": { boxShadow: "none" },
        },
        containedPrimary: {
          background: "linear-gradient(135deg, #2563EB, #1D4ED8)",
          color: "#fff",
          "&:hover": {
            background: "linear-gradient(135deg, #3B82F6, #2563EB)",
            boxShadow: "0 8px 20px rgba(37,99,235,0.35) !important",
          },
          "&:disabled": { background: "#E2E8F0", color: "#94A3B8" },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          background: "#FFFFFF",
          border: "1px solid #E2E8F0",
          borderRadius: 20,
          boxShadow: "0 25px 60px rgba(0,0,0,0.15)",
        },
      },
    },
  },
});

const FALLBACK = "https://dummyimage.com/400x280/EFF6FF/BFDBFE&text=No+Image";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [imgError, setImgError] = useState({});
  const [loading, setLoading] = useState(true); // ✅ starts true
  const [form, setForm] = useState({ name: "", price: "", image: "" });

  const fetchProducts = async () => {
    setLoading(true); // ✅ always reset on each fetch
    try {
      const res = await API.get("/products");

      // ✅ delay so skeleton is visible for 2 seconds
      setTimeout(() => {
        setProducts(res.data || []);
        setLoading(false);
      }, 2000);

    } catch (err) {
      console.error(err);
      setLoading(false); // ✅ hide skeleton on error
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleAdd = () => { setForm({ name: "", price: "", image: "" }); setEditItem(null); setOpen(true); };
  const handleEdit = (item) => { setForm({ name: item.name, price: item.price, image: item.image }); setEditItem(item); setOpen(true); };
  const handleSave = async () => {
    if (!form.name || !form.price) return;
    try {
      if (editItem) await API.put(`/products/${editItem.id}`, { ...form, price: Number(form.price) });
      else await API.post("/products", { ...form, price: Number(form.price) });
      setOpen(false); fetchProducts();
    } catch (err) { console.error(err); }
  };
  const handleDelete = async (id) => {
    try { await API.delete(`/products/${id}`); setDeleteConfirm(null); fetchProducts(); }
    catch (err) { console.error(err); }
  };

  const filtered = products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <ThemeProvider theme={theme}>
      <style>{`
        ${fontLink}
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .product-card { animation: fadeUp 0.4s ease both; }
        .product-card:nth-child(1) { animation-delay: 0.05s; }
        .product-card:nth-child(2) { animation-delay: 0.10s; }
        .product-card:nth-child(3) { animation-delay: 0.15s; }
        .product-card:nth-child(4) { animation-delay: 0.20s; }
        .product-card:nth-child(5) { animation-delay: 0.25s; }
        .product-card:nth-child(6) { animation-delay: 0.30s; }
        .product-card:nth-child(7) { animation-delay: 0.35s; }
        .product-card:nth-child(8) { animation-delay: 0.40s; }
        .img-zoom { transition: transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94); }
        .card-wrap:hover .img-zoom { transform: scale(1.05); }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #F1F5F9; }
        ::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 4px; }
      `}</style>

      <Box sx={{
        minHeight: "100vh",
        background: "#F1F5F9",
        backgroundImage: "radial-gradient(ellipse 70% 40% at 60% -10%, rgba(37,99,235,0.07) 0%, transparent 60%)",
        p: { xs: 2.5, md: 4.5 },
      }}>

        {/* ── Header ── */}
        <Box sx={{ mb: 4.5 }}>
          <Stack direction={{ xs: "column", sm: "row" }} alignItems={{ sm: "center" }} justifyContent="space-between" spacing={2}>

            <Stack direction="row" alignItems="center" spacing={2}>
              <Box sx={{
                width: 46, height: 46, borderRadius: "14px",
                background: "linear-gradient(135deg, #2563EB, #1D4ED8)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 8px 20px rgba(37,99,235,0.3)",
              }}>
                <StorefrontIcon sx={{ color: "#fff", fontSize: 22 }} />
              </Box>
              <Box>
                <Typography sx={{ fontSize: 20, fontWeight: 600, color: "#0F172A", lineHeight: 1.1 }}>
                  Products
                </Typography>
                <Typography sx={{ fontSize: 12, color: "#94A3B8", mt: 0.3 }}>
                  {products.length} items in catalog
                </Typography>
              </Box>
            </Stack>

            <Stack direction="row" spacing={1.5} alignItems="center">
              <TextField
                size="small"
                placeholder="Search products…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "#94A3B8", fontSize: 17 }} />
                    </InputAdornment>
                  ),
                }}
                sx={{ width: 210 }}
              />
              <Button
                variant="contained"
                startIcon={<AddIcon sx={{ fontSize: "16px !important" }} />}
                onClick={handleAdd}
                sx={{ px: 2.5, py: 1 }}
              >
                Add Product
              </Button>
            </Stack>
          </Stack>

          {/* Divider */}
          <Box sx={{ mt: 3, height: 1, background: "linear-gradient(90deg, #BFDBFE, #E2E8F0 60%)" }} />
        </Box>

        {/* ── Catalog label ── */}
        <Stack direction="row" alignItems="center" spacing={1.5} mb={3}>
          <Typography sx={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: "#94A3B8", textTransform: "uppercase" }}>
            All Products
          </Typography>
          <Box sx={{ px: 1.5, py: 0.3, background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: "6px" }}>
            <Typography sx={{ fontSize: 11, color: "#2563EB", fontWeight: 700 }}>
              {filtered.length} total
            </Typography>
          </Box>
        </Stack>

        {/* ── Grid ── */}

        {/* ✅ SKELETON CARDS — shown while loading=true */}
        {/* {loading && (
          <Grid container spacing={2.5}>
            {Array.from(new Array(8)).map((_, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Card className="card-wrap">
                  <Box sx={{ position: "relative", overflow: "hidden" }}>
                    <Skeleton variant="rectangular" height={190} />
                    <Box sx={{ position: "absolute", top: 10, right: 10 }}>
                      <Skeleton variant="rounded" width={60} height={24} sx={{ borderRadius: "8px" }} />
                    </Box>
                  </Box>

                  <CardContent sx={{ pt: 1.8, px: 2 }}>
                    <Skeleton height={20} width="70%" sx={{ mb: 1.5 }} />
                    <Stack direction="row" justifyContent="flex-end" spacing={0.5}>
                      <Skeleton variant="rounded" width={30} height={30} sx={{ borderRadius: "8px" }} />
                      <Skeleton variant="rounded" width={30} height={30} sx={{ borderRadius: "8px" }} />
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )
        } */}
        {loading && <ProductSkeleton />}

        {/* EMPTY STATE */}
        {!loading && filtered.length === 0 && (
          <Box sx={{ textAlign: "center", py: 14 }}>
            <Box sx={{
              width: 72, height: 72, borderRadius: "20px",
              background: "#EFF6FF", border: "1px solid #EFF6FF",
              display: "flex", alignItems: "center", justifyContent: "center",
              mx: "auto", mb: 2,
            }}>
              <StorefrontIcon sx={{ fontSize: 32, color: "#93C5FD" }} />
            </Box>
            <Typography sx={{ color: "#64748B", fontWeight: 600, fontSize: 15 }}>
              No products found
            </Typography>
            <Typography sx={{ color: "#CBD5E1", fontSize: 13, mt: 0.5 }}>
              Try adjusting your search
            </Typography>
          </Box>
        )}

        {/* REAL CARDS */}
        {!loading && filtered.length > 0 && (
          <Grid container spacing={2.5}>
            {filtered.map((item) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item.id} className="product-card">
                <Card className="card-wrap">
                  <Box sx={{ position: "relative", overflow: "hidden", borderRadius: "16px 16px 0 0" }}>
                    <Box
                      component="img"
                      className="img-zoom"
                      src={imgError[item.id] ? FALLBACK : item.image || FALLBACK}
                      alt={item.name}
                      onError={() => setImgError((p) => ({ ...p, [item.id]: true }))}
                      sx={{ width: "100%", height: 190, objectFit: "cover", display: "block" }}
                    />
                    <Box sx={{
                      position: "absolute", top: 10, right: 10,
                      background: "rgba(255,255,255,0.92)",
                      backdropFilter: "blur(8px)",
                      border: "1px solid #BFDBFE",
                      borderRadius: "8px",
                      px: 1.2, py: 0.4,
                      display: "flex", alignItems: "center", gap: 0.3,
                    }}>
                      <CurrencyRupeeIcon sx={{ fontSize: 12, color: "#2563EB" }} />
                      <Typography sx={{ fontSize: 12, fontWeight: 700, color: "#2563EB" }}>
                        {item.price.toLocaleString("en-IN")}
                      </Typography>
                    </Box>
                  </Box>

                  <CardContent sx={{ pt: 1.8, pb: "14px !important", px: 2 }}>
                    <Typography sx={{ fontWeight: 700, fontSize: 14, color: "#0F172A", mb: 1.5 }} noWrap>
                      {item.name}
                    </Typography>
                    <Stack direction="row" justifyContent="flex-end" spacing={0.5}>
                      <IconButton size="small" onClick={() => handleEdit(item)} sx={{
                        width: 30, height: 30, borderRadius: "8px",
                        border: "1px solid #E2E8F0", color: "#94A3B8",
                        "&:hover": { color: "#2563EB", borderColor: "#BFDBFE", background: "#EFF6FF" },
                      }}>
                        <EditIcon sx={{ fontSize: 14 }} />
                      </IconButton>
                      <IconButton size="small" onClick={() => setDeleteConfirm(item)} sx={{
                        width: 30, height: 30, borderRadius: "8px",
                        border: "1px solid #E2E8F0", color: "#94A3B8",
                        "&:hover": { color: "#EF4444", borderColor: "#FECACA", background: "#FEF2F2" },
                      }}>
                        <DeleteIcon sx={{ fontSize: 14 }} />
                      </IconButton>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* ── Add / Edit Dialog ── */}
        <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xs" fullWidth
          TransitionComponent={Fade} BackdropComponent={Backdrop}
          BackdropProps={{ sx: { backdropFilter: "blur(6px)", background: "rgba(15,23,42,0.4)" } }}>
          <DialogTitle sx={{ pt: 3, px: 3, pb: 0, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <Box>
              <Typography sx={{ fontSize: 10, letterSpacing: "0.15em", color: "#2563EB", textTransform: "uppercase", fontWeight: 700, mb: 0.5 }}>
                {editItem ? "Edit Product" : "New Product"}
              </Typography>
              <Typography sx={{ fontSize: 22, fontWeight: 800, color: "#0F172A", lineHeight: 1.1 }}>
                {editItem ? "Update Details" : "Add to Catalog"}
              </Typography>
            </Box>
            <IconButton size="small" onClick={() => setOpen(false)} sx={{
              color: "#94A3B8", borderRadius: "8px", border: "1px solid #E2E8F0",
              width: 30, height: 30, "&:hover": { color: "#0F172A", borderColor: "#CBD5E1" },
            }}>
              <CloseIcon sx={{ fontSize: 15 }} />
            </IconButton>
          </DialogTitle>

          <DialogContent sx={{ px: 3, pt: 2.5 }}>
            <Box sx={{ height: 1, background: "#EFF6FF", mb: 3 }} />
            <Stack spacing={2}>
              <TextField label="Product name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} fullWidth />
              <TextField label="Price (₹)" type="number" value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })} fullWidth
                InputProps={{ startAdornment: <InputAdornment position="start"><CurrencyRupeeIcon sx={{ fontSize: 14, color: "#94A3B8" }} /></InputAdornment> }}
              />
              <TextField label="Image URL" value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })} fullWidth
                InputProps={{ startAdornment: <InputAdornment position="start"><ImageIcon sx={{ fontSize: 14, color: "#94A3B8" }} /></InputAdornment> }}
              />
              {form.image && (
                <Box sx={{ borderRadius: "10px", overflow: "hidden", border: "1px solid #E2E8F0", position: "relative" }}>
                  <Box component="img" src={form.image} alt="preview"
                    onError={(e) => { e.target.src = FALLBACK; }}
                    sx={{ width: "100%", height: 130, objectFit: "cover", display: "block" }} />
                  <Box sx={{
                    position: "absolute", top: 8, left: 8,
                    background: "rgba(255,255,255,0.9)", backdropFilter: "blur(4px)",
                    px: 1, py: 0.3, borderRadius: "6px", border: "1px solid #BFDBFE",
                  }}>
                    <Typography sx={{ fontSize: 9, letterSpacing: "0.12em", color: "#2563EB", textTransform: "uppercase", fontWeight: 700 }}>Preview</Typography>
                  </Box>
                </Box>
              )}
            </Stack>
          </DialogContent>

          <DialogActions sx={{ px: 3, pb: 3, pt: 2, gap: 1 }}>
            <Button onClick={() => setOpen(false)} sx={{ color: "#94A3B8", "&:hover": { color: "#0F172A", background: "transparent" } }}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSave} disabled={!form.name || !form.price} sx={{ px: 3, py: 0.9 }}>
              {editItem ? "Save Changes" : "Add Product"}
            </Button>
          </DialogActions>
        </Dialog>

        {/* ── Delete Confirm Dialog ── */}
        <Dialog open={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} maxWidth="xs" fullWidth
          TransitionComponent={Fade} BackdropComponent={Backdrop}
          BackdropProps={{ sx: { backdropFilter: "blur(6px)", background: "rgba(15,23,42,0.4)" } }}>
          <DialogTitle sx={{ pt: 3, px: 3, pb: 0 }}>
            <Typography sx={{ fontSize: 10, letterSpacing: "0.15em", color: "#EF4444", textTransform: "uppercase", fontWeight: 700, mb: 0.5 }}>
              Confirm Delete
            </Typography>
            <Typography sx={{ fontSize: 22, fontWeight: 800, color: "#0F172A", lineHeight: 1.1 }}>
              Remove Product?
            </Typography>
          </DialogTitle>
          <DialogContent sx={{ px: 3, pt: 2 }}>
            <Box sx={{ height: 1, background: "#FEF2F2", mb: 2.5 }} />
            <Typography sx={{ color: "#64748B", fontSize: 13, lineHeight: 1.7 }}>
              <Box component="span" sx={{ color: "#2563EB", fontWeight: 700 }}>{deleteConfirm?.name}</Box> will be permanently removed from the catalog. This action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3, pt: 1, gap: 1 }}>
            <Button onClick={() => setDeleteConfirm(null)} sx={{ color: "#94A3B8", "&:hover": { color: "#0F172A", background: "transparent" } }}>
              Cancel
            </Button>
            <Button variant="contained" onClick={() => handleDelete(deleteConfirm.id)} sx={{
              px: 3, py: 0.9,
              background: "linear-gradient(135deg, #EF4444, #DC2626)",
              "&:hover": { background: "linear-gradient(135deg, #F87171, #EF4444)", boxShadow: "0 8px 20px rgba(239,68,68,0.3) !important" },
            }}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>

      </Box>
    </ThemeProvider>
  );
}