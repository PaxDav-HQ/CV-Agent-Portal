import React from "react";
import { Box, Typography, Paper, Chip, Button, IconButton } from "@mui/material";
import {
  VisibilityOutlined,
  MoreVert,
  PaletteOutlined,
  CodeOutlined,
  CampaignOutlined,
  Campaign,
} from "@mui/icons-material";

// Helper to convert date strings to words (e.g., "Sep 3, 2026")
const formatListedDateInWords = (listedDate, fallbackDate) => {
  if (listedDate && typeof listedDate === "object") {
    if (listedDate.formatted) return listedDate.formatted;
    if (listedDate.date) return formatDateToWords(listedDate.date);
  }
  if (typeof listedDate === "string") {
    return formatDateToWords(listedDate);
  }
  if (fallbackDate) {
    return formatDateToWords(fallbackDate);
  }
  return "Recently";
};

const formatDateToWords = (dateString) => {
  if (!dateString) return "";
  const dateObj = new Date(dateString);
  if (isNaN(dateObj.getTime())) return dateString;

  return dateObj.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

// Normalize and style status badges (Active, Inactive, Pending, etc.)
const getStatusBadgeConfig = (statusRaw = "") => {
  const s = String(statusRaw).trim().toLowerCase();

  switch (s) {
    case "active":
    case "published":
    case "live":
      return {
        label: "Active",
        color: "#059669",
        bg: "#ECFDF5",
        dotColor: "#10B981",
        border: "#A7F3D0",
      };
    case "pending":
    case "in_review":
    case "review":
      return {
        label: "Pending",
        color: "#D97706",
        bg: "#FFFBEB",
        dotColor: "#F59E0B",
        border: "#FDE68A",
      };
    case "inactive":
    case "draft":
    case "disabled":
    case "paused":
      return {
        label: "Inactive",
        color: "#64748B",
        bg: "#F1F5F9",
        dotColor: "#94A3B8",
        border: "#E2E8F0",
      };
    case "rejected":
    case "suspended":
      return {
        label: "Suspended",
        color: "#DC2626",
        bg: "#FEF2F2",
        dotColor: "#EF4444",
        border: "#FECACA",
      };
    default:
      return {
        label: statusRaw || "Inactive",
        color: "#475569",
        bg: "#F8FAFC",
        dotColor: "#94A3B8",
        border: "#E2E8F0",
      };
  }
};

const getServiceIcon = (title = "") => {
  if (title.includes("Graphic")) return <PaletteOutlined sx={{ fontSize: 28, color: "#10B981" }} />;
  if (title.includes("Web")) return <CodeOutlined sx={{ fontSize: 28, color: "#F97316" }} />;
  if (title.includes("Digital")) return <CampaignOutlined sx={{ fontSize: 28, color: "#8B5CF6" }} />;
  return <Campaign sx={{ fontSize: 28, color: "#3B82F6" }} />;
};

const ServiceCardItem = ({ service }) => {
  const displayListedDate = formatListedDateInWords(
    service?.listedDate,
    service?.created_at || service?.createdAt
  );

  const statusConfig = getStatusBadgeConfig(service?.status);

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
            bgcolor: service?.iconBg || "#F1F5F9",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {getServiceIcon(service?.title || "")}
        </Box>
        <div>
          <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "#111827", fontSize: "14px" }}>
            {service?.title}
          </Typography>
          <Typography variant="caption" sx={{ color: "#6B7280", fontSize: "11.5px", display: "block", mb: 0.5 }}>
            {service?.description}
          </Typography>
          <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "#111827", fontSize: "13px" }}>
            {service?.price?.displayPrice || service?.price?.formatted || "Free"}{" "}
            {service?.priceSub && (
              <Typography component="span" variant="caption" sx={{ color: "#6B7280", fontSize: "11px", fontWeight: 400 }}>
                {service.priceSub}
              </Typography>
            )}
          </Typography>
        </div>
      </Box>

      {/* RIGHT: STATUS, LISTED DATE & ACTIONS */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: { xs: 1.5, sm: 3 },
          width: { xs: "100%", md: "auto" },
          justifyContent: { xs: "space-between", md: "flex-end" },
        }}
      >
        {/* Status Badge with colored pulse indicator */}
        <Chip
          icon={
            <Box
              component="span"
              sx={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                bgcolor: statusConfig.dotColor,
                ml: 1,
              }}
            />
          }
          label={statusConfig.label}
          size="small"
          sx={{
            bgcolor: statusConfig.bg,
            color: statusConfig.color,
            border: `1px solid ${statusConfig.border}`,
            fontSize: "11px",
            fontWeight: 800,
            height: "22px",
            borderRadius: "6px",
            "& .MuiChip-icon": {
              mr: -0.2,
            },
          }}
        />

        <div className="text-center text-nowrap">
          <Typography
            variant="caption"
            sx={{
              color: "#94A3B8",
              fontSize: "9px",
              fontWeight: 800,
              letterSpacing: "0.5px",
              display: "block",
            }}
          >
            LISTED ON
          </Typography>
          <Typography variant="caption" sx={{ color: "#374151", fontSize: "11.5px", fontWeight: 700 }}>
            {displayListedDate}
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

        <Typography variant="caption" sx={{ color: "#94A3B8", fontSize: "11px", display: "flex", alignItems: "center", gap: 0.5 }}>
          <VisibilityOutlined sx={{ fontSize: 14 }} /> {service?.views ?? 0} views
        </Typography>

        <IconButton size="small">
          <MoreVert sx={{ fontSize: 16, color: "#94A3B8" }} />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default ServiceCardItem;