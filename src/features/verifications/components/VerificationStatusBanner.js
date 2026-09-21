import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import {
  ScheduleOutlined,
  CheckCircle,
  HourglassEmpty,
  VerifiedUserOutlined,
  CancelOutlined,
  Check,
} from "@mui/icons-material";

const VerificationStatusBanner = ({ data = {} }) => {
  const stepper = data.stepper || [
    { id: "1", name: "Submitted", isCompleted: true, isInProgress: false, date: "Aug 21, 2026" },
    { id: "2", name: "Under Review", isCompleted: false, isInProgress: true, subtitle: "In Progress" },
    { id: "3", name: "Decision", isCompleted: false, isInProgress: false, subtitle: "Pending" },
  ];

  const whatHappensNext = data.whatHappensNext || [
    { id: 1, description: "Our team will review your documents and information." },
    { id: 2, description: "You'll get notified once your verification is complete." },
    { id: 3, description: "Make sure your documents are clear and valid." },
  ];

  const isPending = data.status === "pending";
  const isApproved = data.isVerified || data.status === "approved";

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: "16px",
        border: "1px solid #E2E8F0",
        bgcolor: "#FFFFFF",
        p: { xs: 2.5, md: 3.5 },
        mb: 4,
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1fr 360px" },
        gap: { xs: 3, md: 4 },
        alignItems: "stretch",
      }}
    >
      {/* Left Column: Status & Stepper */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          borderRight: { md: "1px solid #F1F5F9" },
          pr: { md: 4 },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2, mb: 3.5 }}>
          <Box
            sx={{
              width: 52,
              height: 52,
              borderRadius: "50%",
              bgcolor: isApproved ? "#ECFDF5" : "#FFFBEB",
              color: isApproved ? "#017E53" : "#D97706",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {isApproved ? (
              <VerifiedUserOutlined sx={{ fontSize: 28 }} />
            ) : isPending ? (
              <ScheduleOutlined sx={{ fontSize: 28 }} />
            ) : (
              <CancelOutlined sx={{ fontSize: 28 }} />
            )}
          </Box>
          <div>
            <Typography variant="h6" sx={{ fontWeight: 800, color: "#0F172A", lineHeight: 1.2 }}>
              {data.title || "Verification Pending"}
            </Typography>
            <Typography variant="body2" sx={{ color: "#64748B", fontSize: "13px", mt: 0.5 }}>
              {data.subtitle || "We're reviewing your information. This usually takes 1-3 business days."}
            </Typography>
          </div>
        </Box>

        {/* Stepper Timeline */}
        <Box sx={{ display: "flex", alignItems: "center", position: "relative", px: { xs: 1, sm: 2 } }}>
          {stepper.map((step, idx) => {
            const isLast = idx === stepper.length - 1;
            return (
              <React.Fragment key={step.id || idx}>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", zIndex: 2, minWidth: 70 }}>
                  <Box
                    sx={{
                      width: 34,
                      height: 34,
                      borderRadius: "50%",
                      bgcolor: step.isCompleted
                        ? "#017E53"
                        : step.isInProgress
                        ? "#FFFFFF"
                        : "#F1F5F9",
                      border: step.isInProgress ? "2px solid #017E53" : "none",
                      color: step.isCompleted ? "#FFFFFF" : step.isInProgress ? "#017E53" : "#94A3B8",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "12px",
                      fontWeight: 800,
                    }}
                  >
                    {step.isCompleted ? (
                      <Check sx={{ fontSize: 18 }} />
                    ) : step.isInProgress ? (
                      <HourglassEmpty sx={{ fontSize: 16 }} />
                    ) : (
                      idx + 1
                    )}
                  </Box>
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 700,
                      color: step.isCompleted || step.isInProgress ? "#0F172A" : "#94A3B8",
                      mt: 1,
                      fontSize: "12px",
                      textAlign: "center",
                    }}
                  >
                    {step.name}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#94A3B8", fontSize: "10.5px", textAlign: "center" }}>
                    {step.date || step.subtitle || ""}
                  </Typography>
                </Box>

                {!isLast && (
                  <Box
                    sx={{
                      flex: 1,
                      height: "2px",
                      bgcolor: step.isCompleted ? "#017E53" : "#E2E8F0",
                      mb: 3.5,
                      mx: 1,
                    }}
                  />
                )}
              </React.Fragment>
            );
          })}
        </Box>
      </Box>

      {/* Right Column: What happens next? */}
      <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "#0F172A", mb: 2 }}>
          What happens next?
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.8 }}>
          {whatHappensNext.map((item, index) => (
            <Box key={item.id || index} sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
              <CheckCircle sx={{ fontSize: 17, color: "#017E53", mt: 0.2, flexShrink: 0 }} />
              <Typography variant="body2" sx={{ color: "#475569", fontSize: "12.5px", lineHeight: 1.4 }}>
                {item.description || item.title}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Paper>
  );
};

export default VerificationStatusBanner;