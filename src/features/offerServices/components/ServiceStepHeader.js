import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { ArrowBack, Check } from "@mui/icons-material";

const ServiceStepHeader = ({ step = 1, totalSteps = 3, onBack, isEdit = false }) => {
  return (
    <Box sx={{ width: "100%", mb: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <IconButton onClick={onBack} size="small" sx={{ color: "#0F172A", mr: 1.5 }}>
          <ArrowBack sx={{ fontSize: 20 }} />
        </IconButton>
        <Typography
          variant="h6"
          sx={{ fontWeight: 800, color: "#0F172A", fontSize: "17px", flex: 1, textAlign: "center", pr: 4 }}
        >
          {isEdit ? "Edit Service" : "Offer a Service"}
        </Typography>
      </Box>

      {/* Stepper Progress Bar */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", maxWidth: 260, mx: "auto", position: "relative" }}>
        <Box sx={{ position: "absolute", top: "50%", left: 24, right: 24, height: 2, bgcolor: "#E2E8F0", zIndex: 0, transform: "translateY(-50%)" }} />
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: 24,
            width: step === 1 ? "0%" : step === 2 ? "50%" : "calc(100% - 48px)",
            height: 2,
            bgcolor: "#10B981",
            zIndex: 1,
            transform: "translateY(-50%)",
            transition: "width 0.3s ease",
          }}
        />

        {[1, 2, 3].map((s) => {
          const isCompleted = s < step;
          const isCurrent = s === step;

          return (
            <Box key={s} sx={{ flex: 1, display: "flex", justifyContent: s === 1 ? "flex-start" : s === 2 ? "center" : "flex-end", zIndex: 2 }}>
              <Box
                sx={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  bgcolor: isCompleted || isCurrent ? "#10B981" : "#F1F5F9",
                  color: isCompleted || isCurrent ? "#FFFFFF" : "#94A3B8",
                  border: isCurrent ? "2px solid #FFFFFF" : "none",
                  boxShadow: isCurrent ? "0 0 0 2px #10B981" : "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  fontWeight: 700,
                  transition: "all 0.2s ease",
                }}
              >
                {isCompleted ? <Check sx={{ fontSize: 16 }} /> : s}
              </Box>
            </Box>
          );
        })}
      </Box>

      <Typography variant="caption" sx={{ display: "block", textAlign: "center", color: "#10B981", fontWeight: 700, fontSize: "11px", mt: 1.5 }}>
        Step {step} of {totalSteps}
      </Typography>
    </Box>
  );
};

export default ServiceStepHeader;