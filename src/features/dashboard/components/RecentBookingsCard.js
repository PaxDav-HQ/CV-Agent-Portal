import React from "react";
import { Box, Paper, Typography, Avatar, Chip } from "@mui/material";

const RecentBookingsCard = ({ bookings = [] }) => {
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
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2.5 }}>
        <Typography variant="h6" sx={{ fontWeight: 800, color: "#0F172A", fontSize: "16px" }}>
          Recent Bookings
        </Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {bookings.map((b) => {
          const isCompleted = b.status?.toLowerCase() === "completed";
          const badgeBg = isCompleted ? "#ECFDF5" : "#FFFBEB";
          const badgeColor = isCompleted ? "#017E53" : "#B45309";
          const initials = b.clientName
            ? b.clientName.split(" ").map((n) => n[0]).join("").slice(0, 2)
            : "U";

          return (
            <Box
              key={b.id || b.bookingId}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                py: 0.5,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.8 }}>
                <Avatar
                  sx={{
                    bgcolor: "#ECFDF5",
                    color: "#10B981",
                    fontWeight: 700,
                    fontSize: "12px",
                    width: 40,
                    height: 40,
                    borderRadius: "12px",
                  }}
                >
                  {initials}
                </Avatar>

                <div>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "#0F172A", fontSize: "13px" }}>
                    {b.clientName}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#94A3B8", fontSize: "11.5px" }}>
                    {b.startDate || b.date} • {b.propertyName}
                  </Typography>
                </div>
              </Box>

              <Box sx={{ textAlign: "right" }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "#0F172A", fontSize: "13px", mb: 0.2 }}>
                  {b.formattedPropertyPrice || `₦${Number(b.propertyPrice).toLocaleString()}`}
                </Typography>
                <Chip
                  label={isCompleted ? "Confirmed" : "Pending"}
                  size="small"
                  sx={{
                    bgcolor: badgeBg,
                    color: badgeColor,
                    fontWeight: 700,
                    fontSize: "10px",
                    height: 20,
                    borderRadius: "6px",
                    textTransform: "capitalize",
                  }}
                />
              </Box>
            </Box>
          );
        })}
      </Box>
    </Paper>
  );
};

export default RecentBookingsCard;