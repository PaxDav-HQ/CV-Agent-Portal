import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import { ShieldOutlined } from "@mui/icons-material";

const CommunityTrustBanner = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        position: "relative",
        borderRadius: "18px",
        p: { xs: 2.5, md: 3.5 },
        mt: 4,
        bgcolor: "#F0FDF4",
        border: "1px solid #DCFCE7",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        overflow: "hidden",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2.5, zIndex: 2 }}>
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: "12px",
            bgcolor: "#017E53",
            color: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <ShieldOutlined sx={{ fontSize: 26 }} />
        </Box>
        <div>
          <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "#065F46", fontSize: "15px" }}>
            Your trust builds our community
          </Typography>
          <Typography variant="caption" sx={{ color: "#047857", fontSize: "12px", maxWidth: "450px", display: "block" }}>
            Thank you for providing quality services and spaces that create a positive impact.
          </Typography>
        </div>
      </Box>

      {/* LIGHT EMBEDDED WATERMARK */}
      <Typography
        variant="h3"
        sx={{
          position: "absolute",
          right: 20,
          fontWeight: 900,
          fontStyle: "italic",
          color: "rgba(16, 185, 129, 0.12)",
          userSelect: "none",
          zIndex: 1,
          display: { xs: "none", sm: "block" },
        }}
      >
        Thank you!
      </Typography>
    </Paper>
  );
};

export default CommunityTrustBanner;