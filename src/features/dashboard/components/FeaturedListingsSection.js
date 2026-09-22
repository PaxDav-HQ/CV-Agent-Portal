import React from "react";
import { Box, Typography, Button, Chip, Skeleton } from "@mui/material";
import {
  ChevronRight,
  AddHomeWorkOutlined,
  Refresh,
  ErrorOutlined,
  HolidayVillageOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const FeaturedListingsSection = ({
  listings = [],
  loading = false,
  error = null,
  onRetry = null,
}) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ width: "100%", minWidth: 0 }}>
      {/* Header Row */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 800, color: "#0F172A", fontSize: "16px" }}>
          Featured Listings
        </Typography>

        {listings.length > 0 && (
          <Button
            size="small"
            endIcon={<ChevronRight />}
            onClick={() => navigate("/agent/all-listings")}
            sx={{ textTransform: "none", color: "#017E53", fontWeight: 700, fontSize: "12px" }}
          >
            View all
          </Button>
        )}
      </Box>

      {/* 1. Loading State */}
      {loading ? (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
            gap: 2,
          }}
        >
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton
              key={index}
              variant="rounded"
              height={160}
              sx={{ borderRadius: "18px" }}
            />
          ))}
        </Box>
      ) : error ? (
        /* 2. Error State */
        <Box
          sx={{
            p: 3,
            borderRadius: "18px",
            bgcolor: "#FEF2F2",
            border: "1px solid #FEE2E2",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: 1.5,
          }}
        >
          <ErrorOutlined sx={{ color: "#EF4444", fontSize: 32 }} />
          <div>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#991B1B", fontSize: "13.5px" }}>
              Unable to load featured listings
            </Typography>
            <Typography variant="caption" sx={{ color: "#B91C1C", fontSize: "12px", display: "block" }}>
              {typeof error === "string" ? error : "An error occurred while fetching your listings."}
            </Typography>
          </div>
          {onRetry && (
            <Button
              size="small"
              startIcon={<Refresh />}
              onClick={onRetry}
              variant="outlined"
              sx={{
                borderColor: "#FCA5A5",
                color: "#991B1B",
                textTransform: "none",
                fontWeight: 700,
                fontSize: "12px",
                borderRadius: "8px",
                "&:hover": { borderColor: "#EF4444", bgcolor: "#FEE2E2" },
              }}
            >
              Try Again
            </Button>
          )}
        </Box>
      ) : listings.length === 0 ? (
        /* 3. Empty State */
        <Box
          sx={{
            p: 3.5,
            borderRadius: "18px",
            border: "1.5px dashed #CBD5E1",
            bgcolor: "#F8FAFC",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            gap: 1.5,
          }}
        >
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              bgcolor: "#ECFDF5",
              color: "#017E53",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <HolidayVillageOutlined sx={{ fontSize: 24 }} />
          </Box>

          <div>
            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "#0F172A", fontSize: "14px" }}>
              No Featured Listings Yet
            </Typography>
            <Typography variant="body2" sx={{ color: "#64748B", fontSize: "12px", maxWidth: 360, mt: 0.3 }}>
              Showcase your top apartments, hostels, or event venues to get 3x more bookings and visibility.
            </Typography>
          </div>

          <Button
            size="small"
            startIcon={<AddHomeWorkOutlined />}
            onClick={() => navigate("/agent/property-types")}
            variant="contained"
            sx={{
              bgcolor: "#017E53",
              color: "#FFFFFF",
              textTransform: "none",
              fontWeight: 700,
              fontSize: "12.5px",
              borderRadius: "10px",
              px: 2,
              py: 0.8,
              boxShadow: "none",
              "&:hover": { bgcolor: "#016744" },
            }}
          >
            Create New Listing
          </Button>
        </Box>
      ) : (
        /* 4. Populated Grid */
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
              onClick={() => navigate(`/agent/listing/${item.id}`)}
              sx={{
                position: "relative",
                borderRadius: "18px",
                overflow: "hidden",
                height: 160,
                cursor: "pointer",
                backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.2) 65%), url('${
                  item.mainPhoto || item.image || item.main_photo || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500"
                }')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                p: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
                },
              }}
            >
              <Chip
                label={item.status === "draft" ? "Draft" : item.status === "occupied" ? "Occupied" : "Active"}
                size="small"
                sx={{
                  alignSelf: "flex-start",
                  bgcolor:
                    item.status === "draft"
                      ? "#D97706"
                      : item.status === "occupied"
                      ? "#64748B"
                      : "#017E53",
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
                  {item.formattedPrice || (item.price ? `₦${Number(item.price).toLocaleString()}` : "Price on request")}
                </Typography>
              </div>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default FeaturedListingsSection;