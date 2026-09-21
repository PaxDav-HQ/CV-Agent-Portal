import React from "react";
import { Box, Paper, Typography, Rating } from "@mui/material";
import { StarBorderOutlined, RateReviewOutlined } from "@mui/icons-material";

const ClientReviewsSection = ({ reviewsData }) => {
  const reviews = Array.isArray(reviewsData?.reviews) ? reviewsData.reviews : [];
  const hasReviews = reviews.length > 0;

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2.5, sm: 3 },
        borderRadius: "16px",
        border: "1px solid #E2E8F0",
        bgcolor: "#FFFFFF",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <div>
          <Typography variant="h6" sx={{ fontWeight: 800, color: "#0F172A", fontSize: "16px" }}>
            Client Reviews & Ratings
          </Typography>
          <Typography variant="caption" sx={{ color: "#64748B" }}>
            Verified feedback from guests and property owners
          </Typography>
        </div>
      </Box>

      {!hasReviews ? (
        <Box
          sx={{
            py: 4,
            px: 2,
            borderRadius: "12px",
            bgcolor: "#F8FAFC",
            border: "1px dashed #CBD5E1",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              bgcolor: "#F1F5F9",
              color: "#64748B",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 1.2,
            }}
          >
            <RateReviewOutlined sx={{ fontSize: 22 }} />
          </Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#1E293B", mb: 0.3 }}>
            No reviews yet
          </Typography>
          <Typography variant="caption" sx={{ color: "#64748B", maxWidth: 300, lineHeight: 1.4 }}>
            As you fulfill client bookings and complete services, client ratings and testimonials will appear here automatically.
          </Typography>
        </Box>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {reviews.map((rev) => (
            <Box
              key={rev.id}
              sx={{
                p: 2,
                borderRadius: "10px",
                bgcolor: "#F8FAFC",
                border: "1px solid #E2E8F0",
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#0F172A" }}>
                  {rev.clientName}
                </Typography>
                <Rating value={rev.rating || 5} readOnly size="small" />
              </Box>
              <Typography variant="caption" sx={{ color: "#64748B", display: "block", mb: 1 }}>
                {rev.date}
              </Typography>
              <Typography variant="body2" sx={{ color: "#334155", fontSize: "13px" }}>
                {rev.comment}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Paper>
  );
};

export default ClientReviewsSection;