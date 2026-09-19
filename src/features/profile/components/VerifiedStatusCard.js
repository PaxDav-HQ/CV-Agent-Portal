import React from "react";
import { Paper, Typography, Box } from "@mui/material";
import { CheckCircleOutlined, VerifiedUserOutlined } from "@mui/icons-material";

const VerifiedStatusCard = ({ verifiedAccount }) => {
  if (!verifiedAccount) return null;

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2.5, sm: 3 },
        borderRadius: "20px",
        border: "1px solid #E5E7EB",
        bgcolor: "#FFFFFF",
        mb: 3,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, mb: 0.5 }}>
        <VerifiedUserOutlined sx={{ color: "#10B981", fontSize: 20 }} />
        <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "#111827", fontSize: "15px" }}>
          {verifiedAccount.title || "Verified Account"}
        </Typography>
      </Box>

      <Typography variant="caption" sx={{ color: "#6B7280", display: "block", mb: 2 }}>
        {verifiedAccount.subtitle || "Identity & Professional checks passed"}
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        {(verifiedAccount.checks || []).map((check) => (
          <Box
            key={check.key}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              p: 1.2,
              borderRadius: "10px",
              bgcolor: "#F9FAFB",
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 600, color: "#374151", fontSize: "13px" }}>
              {check.name}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.6, color: "#10B981" }}>
              <CheckCircleOutlined sx={{ fontSize: 16 }} />
              <Typography variant="caption" sx={{ fontWeight: 700, fontSize: "11px" }}>
                {check.status}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default VerifiedStatusCard;