import React from "react";
import { Paper, Box, Typography } from "@mui/material";
import { LockOutlined, ChevronRight } from "@mui/icons-material";

const VerificationSecurityBanner = ({ security = {} }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        mb: 4,
        borderRadius: "12px",
        border: "1px solid #E2E8F0",
        bgcolor: "#F8FAFC",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <LockOutlined sx={{ color: "#64748B", fontSize: 20 }} />
        <div>
          <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "#0F172A", fontSize: "13px" }}>
            {security.title || "Your information is secure"}
          </Typography>
          <Typography variant="caption" sx={{ color: "#64748B", fontSize: "11.5px" }}>
            {security.description || "We use bank-level encryption to keep your documents and data safe."}
          </Typography>
        </div>
      </Box>

      <Typography
        component="a"
        href={security.linkUrl || "#"}
        sx={{
          color: "#017E53",
          fontWeight: 700,
          fontSize: "12px",
          display: "flex",
          alignItems: "center",
          gap: 0.3,
          textDecoration: "none",
        }}
      >
        {security.linkText || "Learn more about our security"} <ChevronRight sx={{ fontSize: 16 }} />
      </Typography>
    </Paper>
  );
};

export default VerificationSecurityBanner;