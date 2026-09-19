import React from "react";
import {
  Box,
  Paper,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import {
  CheckCircleOutlined,
  HelpOutlined,
  ExpandMore,
} from "@mui/icons-material";

const TIPS = [
  "Ensure all documents are clear and not blurred.",
  "Use original documents; screenshots are not accepted.",
  "Make sure your ID is not expired.",
  "Business name should match across all documents.",
  "You will be notified once your verification is complete.",
];

const FAQS = [
  {
    q: "How long does verification take?",
    a: "Standard document verification usually takes between 1 to 3 business days after full submission.",
  },
  {
    q: "Why was my verification rejected?",
    a: "Common reasons include blurry captures, mismatched names, expired documents, or uncertified CAC papers.",
  },
  {
    q: "Can I update my documents?",
    a: "Yes, you can click 'Replace Document' on any document slot and re-upload before final review.",
  },
  {
    q: "Is my information secure?",
    a: "All uploaded identity files are encrypted at rest using AES-256 and transmitted via secure TLS channels.",
  },
];

const VerificationTipsFaq = () => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, // Full-width on mobile, exact 50/50 side-by-side on desktop
        gap: 3,
        alignItems: "stretch",
        width: "100%",
        mb: 4,
      }}
    >
      {/* LEFT: Verification Tips */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: "16px",
          border: "1px solid #E2E8F0",
          bgcolor: "#FFFFFF",
          height: "100%",
          boxSizing: "border-box",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2.5 }}>
          <CheckCircleOutlined sx={{ color: "#017E53", fontSize: 20 }} />
          <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "#0F172A" }}>
            Verification Tips
          </Typography>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.8 }}>
          {TIPS.map((tip, idx) => (
            <Box key={idx} sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  bgcolor: "#017E53",
                  mt: 0.9,
                  flexShrink: 0,
                }}
              />
              <Typography
                variant="body2"
                sx={{ color: "#475569", fontSize: "13px", lineHeight: 1.5 }}
              >
                {tip}
              </Typography>
            </Box>
          ))}
        </Box>
      </Paper>

      {/* RIGHT: Frequently Asked Questions */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: "16px",
          border: "1px solid #E2E8F0",
          bgcolor: "#FFFFFF",
          height: "100%",
          boxSizing: "border-box",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <HelpOutlined sx={{ color: "#017E53", fontSize: 20 }} />
          <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "#0F172A" }}>
            Frequently Asked Questions
          </Typography>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {FAQS.map((faq, i) => (
            <Accordion
              key={i}
              elevation={0}
              disableGutters
              sx={{
                border: "1px solid #F1F5F9",
                borderRadius: "10px !important",
                "&:before": { display: "none" },
              }}
            >
              <AccordionSummary expandIcon={<ExpandMore sx={{ fontSize: 18 }} />}>
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 700, fontSize: "13px", color: "#1E293B" }}
                >
                  {faq.q}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ pt: 0 }}>
                <Typography
                  variant="caption"
                  sx={{ color: "#64748B", fontSize: "12px", lineHeight: 1.5 }}
                >
                  {faq.a}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

export default VerificationTipsFaq;