import React from "react";
import { Box, Typography, Paper, Chip, Button, IconButton } from "@mui/material";
import { VisibilityOutlined, MoreVert, PaletteOutlined, CodeOutlined, CampaignOutlined, Campaign } from "@mui/icons-material";

const getServiceIcon = (title) => {
  if (title.includes("Graphic")) return <PaletteOutlined sx={{ fontSize: 28, color: "#10B981" }} />;
  if (title.includes("Web")) return <CodeOutlined sx={{ fontSize: 28, color: "#F97316" }} />;
  if (title.includes("Digital")) return <CampaignOutlined sx={{ fontSize: 28, color: "#8B5CF6" }} />;
  return <Campaign sx={{ fontSize: 28, color: "#3B82F6" }} />;
};

const ServiceCardItem = ({ service }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: "16px",
        border: "1px solid #E5E7EB",
        bgcolor: "#FFFFFF",
        mb: 2,
        p: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: { xs: "wrap", md: "nowrap" },
        gap: 2,
        transition: "box-shadow 0.2s",
        "&:hover": { boxShadow: "0 4px 15px rgba(0,0,0,0.05)" },
      }}
    >
      {/* LEFT: ICON & DETAILS */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Box
          sx={{
            width: 58,
            height: 58,
            borderRadius: "12px",
            bgcolor: service.iconBg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {getServiceIcon(service.title)}
        </Box>
        <div>
          <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "#111827", fontSize: "14px" }}>
            {service.title}
          </Typography>
          <Typography variant="caption" sx={{ color: "#6B7280", fontSize: "11.5px", display: "block", mb: 0.5 }}>
            {service.description}
          </Typography>
          <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "#111827", fontSize: "13px" }}>
            {service.price}{" "}
            {service.priceSub && (
              <Typography component="span" variant="caption" sx={{ color: "#6B7280", fontSize: "11px", fontWeight: 400 }}>
                {service.priceSub}
              </Typography>
            )}
          </Typography>
        </div>
      </Box>

      {/* RIGHT: STATUS, LISTED DATE & ACTIONS */}
      <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1.5, sm: 3 }, width: { xs: "100%", md: "auto" }, justifyContent: { xs: "space-between", md: "flex-end" } }}>
        <Chip
          label={service.status}
          size="small"
          sx={{
            bgcolor: service.statusBg,
            color: service.statusColor,
            fontSize: "10px",
            fontWeight: 700,
            height: "20px",
            borderRadius: "6px",
          }}
        />

        <div className="text-center text-nowrap">
          <Typography variant="caption" sx={{ color: "#9CA3AF", fontSize: "9px", fontWeight: 700, display: "block" }}>
            LISTED ON
          </Typography>
          <Typography variant="caption" sx={{ color: "#374151", fontSize: "11px", fontWeight: 700 }}>
            {service.listedDate}
          </Typography>
        </div>

        <Button
          variant="outlined"
          size="small"
          sx={{
            textTransform: "none",
            fontWeight: 700,
            fontSize: "11.5px",
            borderColor: "#E5E7EB",
            color: "#374151",
            borderRadius: "8px",
            px: 2,
            "&:hover": { bgcolor: "#F9FAFB", borderColor: "#D1D5DB" },
          }}
        >
          View Details
        </Button>

        <Typography variant="caption" sx={{ color: "#9CA3AF", fontSize: "11px", display: "flex", alignItems: "center", gap: 0.5 }}>
          <VisibilityOutlined sx={{ fontSize: 14 }} /> {service.views} views
        </Typography>

        <IconButton size="small">
          <MoreVert sx={{ fontSize: 16, color: "#9CA3AF" }} />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default ServiceCardItem;