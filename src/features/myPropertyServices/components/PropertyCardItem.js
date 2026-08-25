import React from "react";
import { Box, Typography, Paper, Chip, Button, IconButton } from "@mui/material";
import {
  LocationOnOutlined,
  BedOutlined,
  BathtubOutlined,
  HomeOutlined,
  CropFreeOutlined,
  VisibilityOutlined,
  MoreVert,
  CameraAltOutlined,
  CelebrationOutlined,
  DomainOutlined,
  DirectionsCarOutlined,
} from "@mui/icons-material";

const PropertyCardItem = ({ property }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: "16px",
        border: "1px solid #E5E7EB",
        bgcolor: "#FFFFFF",
        mb: 2.5,
        overflow: "hidden",
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        transition: "box-shadow 0.2s",
        "&:hover": { boxShadow: "0 4px 15px rgba(0,0,0,0.05)" },
      }}
    >
      {/* THUMBNAIL / BADGES */}
      <Box
        sx={{
          position: "relative",
          width: { xs: "100%", sm: "240px", md: "270px" },
          minHeight: { xs: "180px", sm: "auto" },
          backgroundImage: `url('${property.image}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          p: 1.5,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Chip
          label={property.status}
          size="small"
          sx={{
            alignSelf: "flex-start",
            bgcolor: property.statusBg,
            color: "#FFFFFF",
            fontSize: "10px",
            fontWeight: 700,
            height: "20px",
            backdropFilter: "blur(4px)",
          }}
        />
        <Box
          sx={{
            alignSelf: "flex-start",
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            bgcolor: "rgba(0,0,0,0.5)",
            color: "#fff",
            px: 1,
            py: 0.3,
            borderRadius: "6px",
            fontSize: "10px",
            fontWeight: 700,
          }}
        >
          <CameraAltOutlined sx={{ fontSize: 12 }} />
          {property.photosCount}
        </Box>
      </Box>

      {/* BODY CONTENT */}
      <Box sx={{ p: { xs: 2, sm: 2.5 }, flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div>
          {/* TITLE & LISTED DATE */}
          <div className="d-flex justify-content-between align-items-start gap-2 mb-1">
            <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "#111827", fontSize: "15px" }}>
              {property.title}
            </Typography>
            <div className="text-end text-nowrap">
              <Typography variant="caption" sx={{ color: "#9CA3AF", fontSize: "9.5px", fontWeight: 700, display: "block" }}>
                LISTED ON
              </Typography>
              <Typography variant="caption" sx={{ color: "#374151", fontSize: "11px", fontWeight: 700 }}>
                {property.listedDate}
              </Typography>
            </div>
          </div>

          {/* LOCATION */}
          <Typography variant="caption" sx={{ color: "#6B7280", display: "flex", alignItems: "center", gap: 0.5, mb: 1.5 }}>
            <LocationOnOutlined sx={{ fontSize: 14, color: "#9CA3AF" }} />
            {property.location}
          </Typography>

          {/* ATTRIBUTES BADGES */}
          <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 2, mb: 2 }}>
            {property.isEventCenter ? (
              <>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.6, color: "#4B5563", fontSize: "12px", fontWeight: 600 }}>
                  <CelebrationOutlined sx={{ fontSize: 15, color: "#9CA3AF" }} /> {property.beds}
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.6, color: "#4B5563", fontSize: "12px", fontWeight: 600 }}>
                  <DomainOutlined sx={{ fontSize: 15, color: "#9CA3AF" }} /> {property.baths}
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.6, color: "#4B5563", fontSize: "12px", fontWeight: 600 }}>
                  <HomeOutlined sx={{ fontSize: 15, color: "#9CA3AF" }} /> {property.type}
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.6, color: "#4B5563", fontSize: "12px", fontWeight: 600 }}>
                  <DirectionsCarOutlined sx={{ fontSize: 15, color: "#9CA3AF" }} /> {property.size}
                </Box>
              </>
            ) : (
              <>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.6, color: "#4B5563", fontSize: "12px", fontWeight: 600 }}>
                  <BedOutlined sx={{ fontSize: 15, color: "#9CA3AF" }} /> {property.beds}
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.6, color: "#4B5563", fontSize: "12px", fontWeight: 600 }}>
                  <BathtubOutlined sx={{ fontSize: 15, color: "#9CA3AF" }} /> {property.baths}
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.6, color: "#4B5563", fontSize: "12px", fontWeight: 600 }}>
                  <HomeOutlined sx={{ fontSize: 15, color: "#9CA3AF" }} /> {property.type}
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.6, color: "#4B5563", fontSize: "12px", fontWeight: 600 }}>
                  <CropFreeOutlined sx={{ fontSize: 15, color: "#9CA3AF" }} /> {property.size}
                </Box>
              </>
            )}
          </Box>
        </div>

        {/* BOTTOM PRICE & ACTION FOOTER */}
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 pt-2 border-top">
          <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "#111827", fontSize: "16px" }}>
            {property.price}{" "}
            <Typography component="span" variant="caption" sx={{ color: "#6B7280", fontWeight: 500, fontSize: "12px" }}>
              {property.pricePeriod}
            </Typography>
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
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
              <VisibilityOutlined sx={{ fontSize: 14 }} /> {property.views} views
            </Typography>
            <IconButton size="small">
              <MoreVert sx={{ fontSize: 16, color: "#9CA3AF" }} />
            </IconButton>
          </Box>
        </div>
      </Box>
    </Paper>
  );
};

export default PropertyCardItem;