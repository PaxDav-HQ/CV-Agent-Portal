import React from "react";
import { Paper, Typography, Box, Avatar, Button, Rating, Divider } from "@mui/material";
import { Star } from "@mui/icons-material";

const ClientReviewsSection = ({ reviewsData }) => {
  if (!reviewsData) return null;

  const { title, ratingSummary, reviews = [] } = reviewsData;

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2.5, sm: 3.5 },
        borderRadius: "20px",
        border: "1px solid #E5E7EB",
        bgcolor: "#FFFFFF",
      }}
    >
      {/* Reviews Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3, flexWrap: "wrap", gap: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "#111827", fontSize: "16px" }}>
            {title || "Recent Client Reviews"}
          </Typography>
          {ratingSummary && (
            <Typography variant="caption" sx={{ fontWeight: 700, color: "#017E53", fontSize: "13px" }}>
              {ratingSummary.formatted}
            </Typography>
          )}
        </Box>

        <Button
          size="small"
          variant="outlined"
          sx={{
            borderColor: "#E5E7EB",
            color: "#374151",
            textTransform: "none",
            borderRadius: "8px",
            fontSize: "12px",
            fontWeight: 600,
          }}
        >
          Filter by Rating
        </Button>
      </Box>

      {/* Reviews Stream */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {reviews.length === 0 ? (
          <Typography variant="body2" sx={{ color: "#9CA3AF" }}>
            No reviews yet.
          </Typography>
        ) : (
          reviews.map((rev, index) => (
            <Box key={rev.id || index}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Avatar src={rev.avatar} alt={rev.clientName} sx={{ width: 38, height: 38 }} />
                  <div>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#111827", fontSize: "13px" }}>
                      {rev.clientName}
                    </Typography>
                    <Rating
                      value={rev.rating || 5}
                      readOnly
                      size="small"
                      icon={<Star sx={{ color: "#FBBF24", fontSize: 14 }} />}
                      emptyIcon={<Star sx={{ color: "#E5E7EB", fontSize: 14 }} />}
                    />
                  </div>
                </Box>
                <Typography variant="caption" sx={{ color: "#9CA3AF", fontSize: "11px" }}>
                  {rev.timeAgo}
                </Typography>
              </Box>

              <Typography
                variant="body2"
                sx={{
                  color: "#4B5563",
                  fontSize: "13px",
                  lineHeight: 1.5,
                  fontStyle: "italic",
                  pl: { xs: 0, sm: 6.5 },
                }}
              >
                "{rev.comment}"
              </Typography>

              {index < reviews.length - 1 && <Divider sx={{ mt: 2.5 }} />}
            </Box>
          ))
        )}
      </Box>

      {reviews.length > 0 && (
        <Box sx={{ textAlign: "center", mt: 3, pt: 2, borderTop: "1px solid #F3F4F6" }}>
          <Button sx={{ textTransform: "none", color: "#6B7280", fontWeight: 700, fontSize: "12px" }}>
            Load more reviews
          </Button>
        </Box>
      )}
    </Paper>
  );
};

export default ClientReviewsSection;