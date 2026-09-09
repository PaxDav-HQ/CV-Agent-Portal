import React from "react";
import { Box, Paper, Typography, Button } from "@mui/material";

const RecentActivityCard = ({ activities = [] }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: "20px",
        border: "1px solid #F1F5F9",
        bgcolor: "#FFFFFF",
        p: 3,
        width: "100%",
        minWidth: 0,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2.5 }}>
        <Typography variant="h6" sx={{ fontWeight: 800, color: "#0F172A", fontSize: "16px" }}>
          Recent Activity
        </Typography>
        <Button size="small" sx={{ textTransform: "none", color: "#94A3B8", fontWeight: 600, fontSize: "12px" }}>
          Clear
        </Button>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {activities.map((act, idx) => (
          <Box key={idx} sx={{ display: "flex", alignItems: "flex-start", gap: 1.8 }}>
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                bgcolor: act.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                mt: 0.2,
              }}
            >
              {act.icon}
            </Box>
            <div>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#1F2937", fontSize: "12px", lineHeight: 1.3 }}>
                {act.title}
              </Typography>
              <Typography variant="caption" sx={{ color: "#94A3B8", fontSize: "11px" }}>
                {act.time}
              </Typography>
            </div>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default RecentActivityCard;