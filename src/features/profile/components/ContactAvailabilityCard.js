import React from "react";
import { Paper, Typography, Box, Button } from "@mui/material";
import {
  ScheduleOutlined,
  AccessTimeOutlined,
  MailOutlined,
  PhoneOutlined,
  CalendarMonthOutlined,
  EditOutlined,
} from "@mui/icons-material";

const ContactAvailabilityCard = ({ contactInfo, onEditClick }) => {
  if (!contactInfo) return null;

  const { primaryContact, timezone, upcomingAvailability } = contactInfo;

  const hasPhone = Boolean(primaryContact?.phone);
  const hasEmail = Boolean(primaryContact?.email);
  const scheduleList = upcomingAvailability?.schedule || [];
  const hasSchedule = scheduleList.length > 0;
  const isCompletelyEmpty = !hasPhone && !hasEmail && !hasSchedule;

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
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
          <ScheduleOutlined sx={{ color: "#017E53", fontSize: 20 }} />
          <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "#111827", fontSize: "15px" }}>
            {contactInfo.title || "Contact & Availability"}
          </Typography>
        </Box>

        {onEditClick && !isCompletelyEmpty && (
          <Button
            size="small"
            onClick={onEditClick}
            startIcon={<EditOutlined sx={{ fontSize: 14 }} />}
            sx={{
              textTransform: "none",
              color: "#017E53",
              fontWeight: 700,
              fontSize: "12px",
              p: 0.5,
              minWidth: 0,
            }}
          >
            Edit
          </Button>
        )}
      </Box>

      {/* Completely Unset Full Fallback */}
      {isCompletelyEmpty ? (
        <Box
          sx={{
            py: 3,
            px: 2,
            borderRadius: "12px",
            border: "1.5px dashed #CBD5E1",
            bgcolor: "#F8FAFC",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              bgcolor: "#ECFDF5",
              color: "#017E53",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 1.2,
            }}
          >
            <CalendarMonthOutlined sx={{ fontSize: 20 }} />
          </Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#1E293B", mb: 0.5 }}>
            No Contact or Schedule Configured
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: "#64748B", maxWidth: 280, mb: 2, lineHeight: 1.4, display: "block" }}
          >
            Add direct contact details and working days so clients can reach you and book your services.
          </Typography>
          {onEditClick && (
            <Button
              variant="contained"
              size="small"
              onClick={onEditClick}
              sx={{
                bgcolor: "#017E53",
                color: "#FFFFFF",
                textTransform: "none",
                fontWeight: 700,
                fontSize: "12px",
                borderRadius: "8px",
                px: 2,
                boxShadow: "none",
                "&:hover": { bgcolor: "#016744" },
              }}
            >
              Set Up Details
            </Button>
          )}
        </Box>
      ) : (
        <>
          {/* Primary Contact Details */}
          <Box sx={{ mb: 2.5 }}>
            <Typography
              variant="caption"
              sx={{ fontWeight: 700, color: "#9CA3AF", fontSize: "10.5px", display: "block", mb: 0.5 }}
            >
              {primaryContact?.label || "PRIMARY CONTACT"}
            </Typography>

            {primaryContact?.type && (
              <Typography variant="body2" sx={{ fontWeight: 700, color: "#111827", fontSize: "13px" }}>
                {primaryContact.type}
              </Typography>
            )}

            {primaryContact?.avgResponseText && (
              <Typography variant="caption" sx={{ color: "#10B981", fontWeight: 600, display: "block", mb: 1 }}>
                {primaryContact.avgResponseText}
              </Typography>
            )}

            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.8, mt: 0.5 }}>
              {/* Email */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <MailOutlined sx={{ fontSize: 16, color: hasEmail ? "#64748B" : "#94A3B8" }} />
                {hasEmail ? (
                  <Typography variant="caption" sx={{ fontSize: "12px", color: "#374151" }}>
                    {primaryContact.email}
                  </Typography>
                ) : (
                  <Typography variant="caption" sx={{ fontSize: "12px", color: "#94A3B8", fontStyle: "italic" }}>
                    Email address not set
                  </Typography>
                )}
              </Box>

              {/* Phone */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <PhoneOutlined sx={{ fontSize: 16, color: hasPhone ? "#64748B" : "#94A3B8" }} />
                {hasPhone ? (
                  <Typography variant="caption" sx={{ fontSize: "12px", color: "#374151" }}>
                    {primaryContact.phone}
                  </Typography>
                ) : (
                  <Typography variant="caption" sx={{ fontSize: "12px", color: "#94A3B8", fontStyle: "italic" }}>
                    Phone number not set
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>

          {/* Timezone */}
          <Box sx={{ mb: 2.5 }}>
            <Typography
              variant="caption"
              sx={{ fontWeight: 700, color: "#9CA3AF", fontSize: "10.5px", display: "block", mb: 0.5 }}
            >
              {timezone?.label || "TIMEZONE"}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, color: "#374151" }}>
              <AccessTimeOutlined sx={{ fontSize: 16, color: "#9CA3AF" }} />
              <Typography variant="body2" sx={{ fontSize: "12.5px", fontWeight: 600 }}>
                {timezone?.formatted || timezone?.value || "West Africa Time (GMT+1)"}
              </Typography>
            </Box>
          </Box>

          {/* Weekday Bubble Schedule */}
          <Box>
            <Typography
              variant="caption"
              sx={{ fontWeight: 700, color: "#9CA3AF", fontSize: "10.5px", display: "block", mb: 1 }}
            >
              {upcomingAvailability?.label || "UPCOMING AVAILABILITY"}
            </Typography>

            {hasSchedule ? (
              <>
                <Box sx={{ display: "flex", gap: 1, mb: 1, flexWrap: "wrap" }}>
                  {scheduleList.map((slot, index) => (
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

                {upcomingAvailability?.subtext && (
                  <Typography variant="caption" sx={{ color: "#6B7280", fontSize: "11px" }}>
                    {upcomingAvailability.subtext}
                  </Typography>
                )}
              </>
            ) : (
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: "10px",
                  bgcolor: "#F8FAFC",
                  border: "1px dashed #CBD5E1",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: 0.8,
                }}
              >
                <Typography variant="caption" sx={{ color: "#64748B", fontSize: "11.5px" }}>
                  Working schedule not configured.
                </Typography>
                {onEditClick && (
                  <Button
                    size="small"
                    onClick={onEditClick}
                    sx={{
                      color: "#017E53",
                      textTransform: "none",
                      fontWeight: 700,
                      fontSize: "11px",
                      p: 0,
                      minWidth: 0,
                    }}
                  >
                    + Add Schedule
                  </Button>
                )}
              </Box>
            )}
          </Box>
        </>
      )}
    </Paper>
  );
};

export default ContactAvailabilityCard;