import React from "react";
import { Paper, Typography, Button, Box } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";

const AvailableBalanceCard = ({ accountBalance = {}, onWithdrawClick }) => {
  const availableAmount = Number(accountBalance.available || 0);

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: "16px",
        bgcolor: "#064E3B",
        color: "#FFFFFF",
        backgroundImage: "linear-gradient(135deg, #064E3B 0%, #013B27 100%)",
      }}
    >
      <Typography variant="caption" sx={{ color: "rgba(255, 255, 255, 0.7)", fontWeight: 700, letterSpacing: "0.5px" }}>
        AVAILABLE TO WITHDRAW
      </Typography>
      <Typography variant="h4" sx={{ fontWeight: 900, my: 1, letterSpacing: "-0.5px" }}>
        {accountBalance.formattedAvailable || `₦${availableAmount.toLocaleString()}`}
      </Typography>

      <Button
        fullWidth
        variant="contained"
        disabled={availableAmount <= 0}
        onClick={onWithdrawClick}
        endIcon={<ArrowForward sx={{ fontSize: 16 }} />}
        sx={{
          mt: 2,
          py: 1.3,
          bgcolor: "#D97706",
          color: "#FFFFFF",
          fontWeight: 800,
          fontSize: "13px",
          borderRadius: "10px",
          textTransform: "none",
          boxShadow: "none",
          "&:hover": { bgcolor: "#B45309" },
          "&.Mui-disabled": { bgcolor: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.4)" },
        }}
      >
        Request Withdrawal
      </Button>

      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2, mt: 2 }}>
        {(accountBalance.securityBadges || ["Secure", "Fast", "Reliable"]).map((badge) => (
          <Typography key={badge} variant="caption" sx={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "11px" }}>
            ✓ {badge}
          </Typography>
        ))}
      </Box>
    </Paper>
  );
};

export default AvailableBalanceCard;