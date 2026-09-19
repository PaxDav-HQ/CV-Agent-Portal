import React from "react";
import { Paper, Typography, Box, Chip } from "@mui/material";

const ProfessionalSummaryCard = ({ summary }) => {
  if (!summary) return null;

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2.5, sm: 3.5 },
        borderRadius: "20px",
        border: "1px solid #E5E7EB",
        bgcolor: "#FFFFFF",
        mb: 3,
      }}
    >
      <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "#111827", fontSize: "16px", mb: 1.5 }}>
        {summary.title || "Professional Summary"}
      </Typography>

      <Typography
        variant="body2"
        sx={{
          color: "#4B5563",
          fontSize: "13.5px",
          lineHeight: 1.6,
          mb: 3,
        }}
      >
        {summary.bio}
      </Typography>

      {/* Skills Pill Cloud */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {(summary.skills || []).map((skill, index) => (
          <Chip
            key={index}
            label={skill}
            size="small"
            sx={{
              bgcolor: "#F3F4F6",
              color: "#374151",
              fontWeight: 600,
              fontSize: "11.5px",
              height: 28,
              borderRadius: "8px",
              border: "1px solid #E5E7EB",
            }}
          />
        ))}
      </Box>
    </Paper>
  );
};

export default ProfessionalSummaryCard;