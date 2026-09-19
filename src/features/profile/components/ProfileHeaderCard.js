import React from "react";
import { Box, Paper, Typography, Avatar, Chip, Divider, Button } from "@mui/material";
import { CheckCircle, PlaceOutlined, EditOutlined } from "@mui/icons-material";

const ProfileHeaderCard = ({ profile, kpiMetrics, onEditClick }) => {
  if (!profile) return null;

  const metricsList = [
    { label: kpiMetrics?.totalListings?.label || "TOTAL LISTINGS", value: kpiMetrics?.totalListings?.formatted || "0" },
    { label: kpiMetrics?.bookings?.label || "BOOKINGS", value: kpiMetrics?.bookings?.formatted || "0" },
    { label: kpiMetrics?.avgRating?.label || "AVG RATING", value: kpiMetrics?.avgRating?.display || "0.0" },
    { label: kpiMetrics?.responseTime?.label || "RESPONSE TIME", value: kpiMetrics?.responseTime?.formatted || "-" },
  ];

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: "20px",
        overflow: "hidden",
        border: "1px solid #E5E7EB",
        bgcolor: "#FFFFFF",
        mb: 3,
      }}
    >
      {/* Light Mint Gradient Banner */}
      <Box
        sx={{
          height: 110,
          background: "linear-gradient(180deg, #E6F7F0 0%, #D8F3E5 100%)",
          width: "100%",
        }}
      />

      {/* Profile Details Container */}
      <Box sx={{ px: { xs: 2.5, sm: 4 }, pb: 3, pt: 0, position: "relative" }}>
        {/* Avatar & Header Meta Row */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "flex-start", sm: "flex-end" },
            justifyContent: "space-between",
            gap: 2.5,
            mt: "-52px",
            mb: 3,
          }}
        >
          <Box sx={{ display: "flex", alignItems: { xs: "flex-start", sm: "flex-end" }, gap: 2.5, flexWrap: "wrap" }}>
            {/* Avatar with Floating Verified Badge */}
            <Box sx={{ position: "relative", width: 96, height: 96 }}>
              <Avatar
                src={profile.avatar}
                alt={profile.name}
                sx={{
                  width: 96,
                  height: 96,
                  border: "4px solid #FFFFFF",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                }}
              />
              {profile.isVerified && (
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 4,
                    right: 4,
                    bgcolor: "#FFFFFF",
                    borderRadius: "50%",
                    display: "flex",
                  }}
                >
                  <CheckCircle sx={{ color: "#10B981", fontSize: 22 }} />
                </Box>
              )}
            </Box>

            {/* Name, Tagline & Location */}
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flexWrap: "wrap" }}>
                <Typography variant="h5" sx={{ fontWeight: 800, color: "#111827", fontSize: { xs: "20px", sm: "24px" } }}>
                  {profile.name}
                </Typography>
                {profile.badge && (
                  <Chip
                    label={profile.badge.text}
                    size="small"
                    sx={{
                      bgcolor: profile.badge.bgColor || "#ECFDF5",
                      color: profile.badge.color || "#10B981",
                      fontWeight: 700,
                      fontSize: "11px",
                      height: 22,
                      borderRadius: "6px",
                    }}
                  />
                )}
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mt: 0.5, flexWrap: "wrap", color: "#6B7280" }}>
                <Typography variant="body2" sx={{ color: "#4B5563", fontSize: "13px", fontWeight: 500 }}>
                  {profile.tagline || profile.professionalType}
                </Typography>
                {profile.location && (
                  <>
                    <Typography variant="caption">•</Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.3 }}>
                      <PlaceOutlined sx={{ fontSize: 15 }} />
                      <Typography variant="caption" sx={{ fontSize: "12.5px" }}>
                        {profile.location}
                      </Typography>
                    </Box>
                  </>
                )}
              </Box>
            </Box>
          </Box>

          {/* EDIT PROFILE BUTTON */}
          <Button
            variant="outlined"
            startIcon={<EditOutlined sx={{ fontSize: 16 }} />}
            onClick={onEditClick}
            sx={{
              borderColor: "#E5E7EB",
              color: "#374151",
              textTransform: "none",
              fontWeight: 700,
              fontSize: "13px",
              borderRadius: "10px",
              px: 2.2,
              py: 0.9,
              bgcolor: "#FFFFFF",
              boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
              "&:hover": {
                borderColor: "#10B981",
                bgcolor: "#F0FDF4",
                color: "#065F46",
              },
            }}
          >
            Edit Profile
          </Button>
        </Box>

        <Divider sx={{ mb: 2.5 }} />

        {/* KPI Metrics Row */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(4, 1fr)" },
            gap: 2,
          }}
        >
          {metricsList.map((metric, idx) => (
            <Box key={idx}>
              <Typography
                variant="caption"
                sx={{
                  color: "#94A3B8",
                  fontWeight: 700,
                  fontSize: "10.5px",
                  letterSpacing: "0.5px",
                  display: "block",
                  mb: 0.3,
                }}
              >
                {metric.label}
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 800, color: "#111827", fontSize: { xs: "18px", sm: "22px" } }}>
                {metric.value}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Paper>
  );
};

export default ProfileHeaderCard;