import React from "react";
import { Box, Paper, Typography, Chip, LinearProgress } from "@mui/material";
import { FiberManualRecord } from "@mui/icons-material";

const EarningsSnapshotCard = ({ earnings }) => {
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
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
        <Typography
          variant="caption"
          sx={{
            color: "#94A3B8",
            fontWeight: 700,
            fontSize: "10.5px",
            letterSpacing: "0.5px",
            textTransform: "uppercase",
          }}
        >
          {earnings?.title || "EARNINGS SNAPSHOT"}
        </Typography>
        <Chip
          label="Payout"
          size="small"
          sx={{
            bgcolor: "#FFFFFF",
            border: "1px solid #E5E7EB",
            color: "#10B981",
            fontSize: "11px",
            fontWeight: 700,
            height: 22,
            borderRadius: "8px",
            cursor: "pointer",
          }}
        />
      </Box>

      <Typography
        variant="h4"
        sx={{ fontWeight: 900, color: "#0F172A", fontSize: "28px", mb: 0.5, letterSpacing: "-0.5px" }}
      >
        {earnings?.formattedEarnings || "₦942,000"}
      </Typography>

      <Typography
        variant="caption"
        sx={{
          color: "#10B981",
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          fontSize: "11px",
          mb: 3,
        }}
      >
        <FiberManualRecord sx={{ fontSize: 7 }} />{" "}
        {earnings?.pendingPayoutText || `${earnings?.formattedPendingPayout || "₦125,000"} pending payout`}
      </Typography>

      <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.8 }}>
          <Typography variant="caption" sx={{ color: "#94A3B8", fontSize: "11.5px", fontWeight: 500 }}>
            Monthly Goal
          </Typography>
          <Typography variant="caption" sx={{ fontWeight: 800, color: "#0F172A", fontSize: "11.5px" }}>
            {earnings?.formattedMonthlyGoal || "₦1.5M"}
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={Math.min(earnings?.progress || 65, 100)}
          sx={{
            height: 7,
            borderRadius: 4,
            bgcolor: "#F1F5F9",
            "& .MuiLinearProgress-bar": { bgcolor: "#10B981", borderRadius: 4 },
          }}
        />
      </Box>
    </Paper>
  );
};

export default EarningsSnapshotCard;