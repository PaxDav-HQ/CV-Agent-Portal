import React from "react";
import { Paper, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AgentPayoutCard = ({ earnings }) => {
  const navigate = useNavigate();

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: "24px",
        p: 3,
        bgcolor: "#064E3B",
        color: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: 200,
        width: "100%",
        minWidth: 0,
      }}
    >
      <div>
        <Typography
          variant="caption"
          sx={{ color: "#6EE7B7", fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase" }}
        >
          Available for Payout
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 900, color: "#FFFFFF", my: 0.5, fontSize: "26px" }}>
          {earnings?.formattedPendingPayout || "₦112,611"}
        </Typography>
        <Typography variant="body2" sx={{ color: "#A7F3D0", fontSize: "12px" }}>
          Processed directly to your registered settlement bank account.
        </Typography>
      </div>

      <Button
        fullWidth
        variant="contained"
        disabled={!earnings?.payoutEnabled}
        onClick={() => navigate("/agent/payouts")}
        sx={{
          bgcolor: "#10B981",
          color: "#FFFFFF",
          fontWeight: 800,
          fontSize: "12.5px",
          textTransform: "none",
          borderRadius: "12px",
          py: 1.1,
          mt: 2,
          boxShadow: "none",
          "&:hover": { bgcolor: "#059669" },
        }}
      >
        Request Withdrawal
      </Button>
    </Paper>
  );
};

export default AgentPayoutCard;