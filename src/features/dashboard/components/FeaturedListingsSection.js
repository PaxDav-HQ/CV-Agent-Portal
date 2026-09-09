import React from "react";
import { Box, Typography, Button, Chip } from "@mui/material";
import { ChevronRight } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const FeaturedListingsSection = ({ listings = [] }) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ width: "100%", minWidth: 0 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 800, color: "#0F172A", fontSize: "16px" }}>
          Featured Listings
        </Typography>
        <Button
          size="small"
          endIcon={<ChevronRight />}
          onClick={() => navigate("/agent/listings")}
          sx={{ textTransform: "none", color: "#10B981", fontWeight: 700, fontSize: "12px" }}
        >
          View all
        </Button>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
          gap: 2,
        }}
      >
        {listings.slice(0, 3).map((item) => (
          <Box
            key={item.id}
            sx={{
              position: "relative",
              borderRadius: "18px",
              overflow: "hidden",
              height: 160,
              backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.15) 60%), url('${
                item.mainPhoto || item.image || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500"
              }')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              p: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Chip
              label={item.status === "draft" ? "Occupied" : "Available"}
              size="small"
              sx={{
                alignSelf: "flex-start",
                bgcolor: item.status === "draft" ? "#D97706" : "#10B981",
                color: "#FFFFFF",
                fontSize: "10px",
                fontWeight: 700,
                height: 22,
                borderRadius: "6px",
                px: 0.5,
              }}
            />

            <div>
              <Typography
                variant="subtitle2"
                sx={{
                  color: "#FFFFFF",
                  fontWeight: 700,
                  fontSize: "13px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {item.title || item.name}
              </Typography>
              <Typography variant="caption" sx={{ color: "#E2E8F0", fontWeight: 800, fontSize: "12px" }}>
                {item.formattedPrice || `₦${Number(item.price).toLocaleString()}`}
              </Typography>
            </div>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default FeaturedListingsSection;