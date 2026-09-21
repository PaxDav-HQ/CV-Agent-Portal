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
  TerrainOutlined,
  ApartmentOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

// Helper to convert date strings to words (e.g. "Sep 03, 2026" or "3rd Sep, 2026")
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
  }); // Output: "Sep 3, 2026"
};

const PropertyCardItem = ({ property }) => {
  const navigate = useNavigate();

  // Normalize image
  const thumbnail =
    property.mainPhoto ||
    property.main_photo ||
    property.image ||
    "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&auto=format&fit=crop&q=80";

  // Normalize photos count
  const photosCount = property.photosCount ?? property.photos_count ?? 1;

  // Normalize status & badge colors
  const statusLabel =
    property.statusBadge?.text ||
    property.statusBadge?.label ||
    property.status ||
    "Draft";
  const statusColor = property.statusBadge?.color || "#475569";
  const statusBg = property.statusBadge?.bgColor || "#F1F5F9";

  // Date in words
  const displayListedDate = formatListedDateInWords(
    property.listedDate,
    property.created_at || property.createdAt
  );

  // Property type detection
  const propType = (property.propertyType || property.type || "").toLowerCase();
  const isResidential =
    propType.includes("apartment") ||
    propType.includes("flat") ||
    propType.includes("house") ||
    propType.includes("duplex") ||
    propType.includes("mansion");

  const hasBeds = property.bedrooms !== null && property.bedrooms !== undefined;
  const hasBaths = property.bathrooms !== null && property.bathrooms !== undefined;

  // Price formatting
  const displayPrice =
    property.price?.displayPrice ||
    property.price?.formatted ||
    (property.price?.amount
      ? `₦${Number(property.price.amount).toLocaleString()}`
      : "₦0");

  const viewsCount = property.views ?? 0;

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
        transition: "box-shadow 0.2s ease, border-color 0.2s ease",
        "&:hover": {
          boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
          borderColor: "#CBD5E1",
        },
      }}
    >
      {/* THUMBNAIL / BADGES */}
      <Box
        sx={{
          position: "relative",
          width: { xs: "100%", sm: "240px", md: "270px" },
          minHeight: { xs: "190px", sm: "auto" },
          backgroundImage: `url('${thumbnail}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          p: 1.5,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          flexShrink: 0,
        }}
      >
        <Chip
          label={statusLabel.toUpperCase()}
          size="small"
          sx={{
            alignSelf: "flex-start",
            bgcolor: statusBg,
            color: statusColor,
            fontSize: "10px",
            fontWeight: 800,
            height: "22px",
            borderRadius: "6px",
            backdropFilter: "blur(4px)",
            border: "1px solid rgba(0,0,0,0.06)",
          }}
        />

        <Box
          sx={{
            alignSelf: "flex-start",
            display: "flex",
            alignItems: "center",
            gap: 0.6,
            bgcolor: "rgba(15, 23, 42, 0.65)",
            color: "#FFFFFF",
            px: 1,
            py: 0.4,
            borderRadius: "6px",
            fontSize: "11px",
            fontWeight: 700,
            backdropFilter: "blur(6px)",
          }}
        >
          <CameraAltOutlined sx={{ fontSize: 13 }} />
          {photosCount}
        </Box>
      </Box>

      {/* BODY CONTENT */}
      <Box
        sx={{
          p: { xs: 2, sm: 2.5 },
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          {/* TITLE & LISTED DATE IN WORDS */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: 2,
              mb: 0.8,
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 800,
                color: "#0F172A",
                fontSize: { xs: "15px", sm: "16px" },
                lineHeight: 1.3,
              }}
            >
              {property.title || property.name}
            </Typography>

            <Box sx={{ textAlign: "right", flexShrink: 0 }}>
              <Typography
                variant="caption"
                sx={{
                  color: "#94A3B8",
                  fontSize: "9.5px",
                  fontWeight: 800,
                  letterSpacing: "0.5px",
                  display: "block",
                  textTransform: "uppercase",
                }}
              >
                LISTED ON
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: "#334155",
                  fontSize: "11.5px",
                  fontWeight: 700,
                }}
              >
                {displayListedDate}
              </Typography>
            </Box>
          </Box>

          {/* LOCATION */}
          <Typography
            variant="caption"
            sx={{
              color: "#64748B",
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              mb: 2,
              fontSize: "12.5px",
            }}
          >
            <LocationOnOutlined sx={{ fontSize: 15, color: "#94A3B8" }} />
            {property.location || property.address}
          </Typography>

          {/* SPECIFICATION BADGES */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 2,
              mb: 2,
            }}
          >
            {/* Show Beds ONLY if residential / apartment AND bedrooms is present */}
            {isResidential && hasBeds && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.6,
                  color: "#475569",
                  fontSize: "12px",
                  fontWeight: 600,
                }}
              >
                <BedOutlined sx={{ fontSize: 16, color: "#94A3B8" }} />
                <span>
                  {property.bedrooms} {property.bedrooms === 1 ? "Bed" : "Beds"}
                </span>
              </Box>
            )}

            {/* Show Baths ONLY if residential / apartment AND bathrooms is present */}
            {isResidential && hasBaths && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.6,
                  color: "#475569",
                  fontSize: "12px",
                  fontWeight: 600,
                }}
              >
                <BathtubOutlined sx={{ fontSize: 16, color: "#94A3B8" }} />
                <span>
                  {property.bathrooms} {property.bathrooms === 1 ? "Bath" : "Baths"}
                </span>
              </Box>
            )}

            {/* Property Type Icon & Text */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.6,
                color: "#475569",
                fontSize: "12px",
                fontWeight: 600,
                textTransform: "capitalize",
              }}
            >
              {propType === "land" ? (
                <TerrainOutlined sx={{ fontSize: 16, color: "#94A3B8" }} />
              ) : isResidential ? (
                <HomeOutlined sx={{ fontSize: 16, color: "#94A3B8" }} />
              ) : (
                <ApartmentOutlined sx={{ fontSize: 16, color: "#94A3B8" }} />
              )}
              <span>{property.propertyType || "Property"}</span>
            </Box>

            {/* Size / Area */}
            {property.size && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.6,
                  color: "#475569",
                  fontSize: "12px",
                  fontWeight: 600,
                }}
              >
                <CropFreeOutlined sx={{ fontSize: 15, color: "#94A3B8" }} />
                <span>{property.size}</span>
              </Box>
            )}
          </Box>
        </div>

        {/* BOTTOM PRICE & ACTION FOOTER */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 1.5,
            pt: 2,
            borderTop: "1px solid #F1F5F9",
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 900,
              color: "#0F172A",
              fontSize: "16px",
              letterSpacing: "-0.2px",
            }}
          >
            {displayPrice}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Button
              variant="outlined"
              size="small"              
              sx={{
                textTransform: "none",
                fontWeight: 700,
                fontSize: "12px",
                borderColor: "#E2E8F0",
                color: "#334155",
                borderRadius: "8px",
                px: 2,
                py: 0.6,
                "&:hover": {
                  bgcolor: "#F8FAFC",
                  borderColor: "#CBD5E1",
                },
              }}
            >
              View Details
            </Button>

            <Typography
              variant="caption"
              sx={{
                color: "#94A3B8",
                fontSize: "11px",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: 0.5,
              }}
            >
              <VisibilityOutlined sx={{ fontSize: 14 }} /> {viewsCount} views
            </Typography>

            <IconButton size="small" sx={{ color: "#94A3B8" }}>
              <MoreVert sx={{ fontSize: 16 }} />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default PropertyCardItem;