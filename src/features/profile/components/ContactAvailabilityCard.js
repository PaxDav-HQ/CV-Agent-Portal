import React from "react";
import { Paper, Typography, Box } from "@mui/material";
import { ScheduleOutlined, AccessTimeOutlined, MailOutlined, PhoneOutlined } from "@mui/icons-material";

const ContactAvailabilityCard = ({ contactInfo }) => {
  if (!contactInfo) return null;

  const { primaryContact, timezone, upcomingAvailability } = contactInfo;

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
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, mb: 2 }}>
        <ScheduleOutlined sx={{ color: "#017E53", fontSize: 20 }} />
        <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "#111827", fontSize: "15px" }}>
          {contactInfo.title || "Contact & Availability"}
        </Typography>
      </Box>

      {/* Primary Contact Details */}
      <Box sx={{ mb: 2.5 }}>
        <Typography variant="caption" sx={{ fontWeight: 700, color: "#9CA3AF", fontSize: "10.5px", display: "block", mb: 0.5 }}>
          {primaryContact?.label || "PRIMARY CONTACT"}
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 700, color: "#111827", fontSize: "13px" }}>
          {primaryContact?.type}
        </Typography>
        <Typography variant="caption" sx={{ color: "#10B981", fontWeight: 600, display: "block", mb: 1 }}>
          {primaryContact?.avgResponseText}
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.6 }}>
          {primaryContact?.email && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: "#4B5563" }}>
              <MailOutlined sx={{ fontSize: 16, color: "#9CA3AF" }} />
              <Typography variant="caption" sx={{ fontSize: "12px" }}>{primaryContact.email}</Typography>
            </Box>
          )}
          {primaryContact?.phone && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: "#4B5563" }}>
              <PhoneOutlined sx={{ fontSize: 16, color: "#9CA3AF" }} />
              <Typography variant="caption" sx={{ fontSize: "12px" }}>{primaryContact.phone}</Typography>
            </Box>
          )}
        </Box>
      </Box>

      {/* Timezone */}
      <Box sx={{ mb: 2.5 }}>
        <Typography variant="caption" sx={{ fontWeight: 700, color: "#9CA3AF", fontSize: "10.5px", display: "block", mb: 0.5 }}>
          {timezone?.label || "TIMEZONE"}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, color: "#374151" }}>
          <AccessTimeOutlined sx={{ fontSize: 16, color: "#9CA3AF" }} />
          <Typography variant="body2" sx={{ fontSize: "12.5px", fontWeight: 600 }}>
            {timezone?.formatted || timezone?.value}
          </Typography>
        </Box>
      </Box>

      {/* Weekday Bubble Schedule */}
      {upcomingAvailability && (
        <Box>
          <Typography variant="caption" sx={{ fontWeight: 700, color: "#9CA3AF", fontSize: "10.5px", display: "block", mb: 1 }}>
            {upcomingAvailability.label || "UPCOMING AVAILABILITY"}
          </Typography>

          <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
            {(upcomingAvailability.schedule || []).map((slot, index) => (
              <Box
                key={index}
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "11px",
                  fontWeight: 700,
                  bgcolor: slot.available ? "#ECFDF5" : "#F3F4F6",
                  color: slot.available ? "#017E53" : "#9CA3AF",
                  border: slot.available ? "1px solid #A7F3D0" : "1px solid #E5E7EB",
                }}
              >
                {slot.day}
              </Box>
            ))}
          </Box>

          <Typography variant="caption" sx={{ color: "#6B7280", fontSize: "11px" }}>
            {upcomingAvailability.subtext}
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default ContactAvailabilityCard;