import React from "react";
import { Box, Typography, IconButton, Badge, Paper } from "@mui/material";
import { NotificationsNoneOutlined, SettingsOutlined, VolunteerActivismOutlined } from "@mui/icons-material";

const PropertiesServicesHeader = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 2, mb: 3 }}>
      <div>
        <Typography variant="h5" sx={{ fontWeight: 800, color: "#111827", fontSize: { xs: "20px", md: "24px" } }}>
          My Properties & Services
        </Typography>
        <Typography variant="body2" sx={{ color: "#6B7280", mt: 0.3, fontSize: "13px" }}>
          View and manage all the properties and services you've listed on the platform.
        </Typography>
      </div>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <IconButton size="small" sx={{ color: "#4B5563" }}>
          <Badge badgeContent={3} color="error" sx={{ "& .MuiBadge-badge": { fontSize: "10px", height: 16, minWidth: 16 } }}>
            <NotificationsNoneOutlined sx={{ fontSize: 20 }} />
          </Badge>
        </IconButton>
        <IconButton size="small" sx={{ color: "#4B5563" }}>
          <SettingsOutlined sx={{ fontSize: 20 }} />
        </IconButton>

        {/* TOP QUOTE BADGE */}
        <Paper
          elevation={0}
          sx={{
            display: { xs: "none", sm: "flex" },
            alignItems: "center",
            gap: 1.2,
            bgcolor: "#F9FAFB",
            border: "1px solid #E5E7EB",
            borderRadius: "12px",
            px: 2,
            py: 0.8,
          }}
        >
          <VolunteerActivismOutlined sx={{ color: "#10B981", fontSize: 18 }} />
          <Typography variant="caption" sx={{ color: "#4B5563", fontWeight: 600, fontSize: "11px", maxWidth: "210px", lineHeight: 1.2 }}>
            Making an impact through quality services and spaces.
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default PropertiesServicesHeader;