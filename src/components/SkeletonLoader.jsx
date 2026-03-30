import { Box, Skeleton } from "@mui/material";

function SkeletonLoader({ type = "card" }) {
  if (type === "card") {
    return (
      <Box sx={{ p: 2 }}>
        <Skeleton variant="rectangular" height={120} sx={{ borderRadius: "16px" }} />
      </Box>
    );
  }

  if (type === "chart") {
    return (
      <Box sx={{ p: 2 }}>
        <Skeleton variant="rectangular" height={250} sx={{ borderRadius: "16px" }} />
      </Box>
    );
  }

  if (type === "text") {
    return (
      <Box sx={{ p: 2 }}>
        <Skeleton width="60%" />
        <Skeleton width="40%" />
      </Box>
    );
  }

  return null;
}

export default SkeletonLoader;