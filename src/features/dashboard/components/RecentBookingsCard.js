import React from "react";
import { Box, Paper, Typography, Avatar, Chip, Skeleton, Button } from "@mui/material";
import {
  CalendarMonthOutlined,
  Refresh,
  ErrorOutlined,
  ChevronRight,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const RecentBookingsCard = ({
  bookings = [],
  loading = false,
  error = null,
  onRetry = null,
}) => {
  const navigate = useNavigate();

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
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2.5 }}>
        <Typography variant="h6" sx={{ fontWeight: 800, color: "#0F172A", fontSize: "16px" }}>
          Recent Bookings
        </Typography>

        {bookings.length > 0 && !loading && !error && (
          <Button
            size="small"
            endIcon={<ChevronRight />}
            onClick={() => navigate("/agent/bookings")}
            sx={{ textTransform: "none", color: "#017E53", fontWeight: 700, fontSize: "12px" }}
          >
            View all
          </Button>
        )}
      </Box>

      {/* 1. Loading State */}
      {loading ? (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {Array.from({ length: 3 }).map((_, idx) => (
            <Box key={idx} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.8, flex: 1 }}>
                <Skeleton variant="rounded" width={40} height={40} sx={{ borderRadius: "12px", flexShrink: 0 }} />
                <Box sx={{ width: "60%" }}>
                  <Skeleton variant="text" width="70%" height={18} />
                  <Skeleton variant="text" width="90%" height={14} />
                </Box>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end", width: 60 }}>
                <Skeleton variant="text" width={55} height={16} />
                <Skeleton variant="rounded" width={50} height={20} sx={{ borderRadius: "6px" }} />
              </Box>
            </Box>
          ))}
        </Box>
      ) : error ? (
        /* 2. Error State */
        <Box
          sx={{
            p: 2.5,
            borderRadius: "14px",
            bgcolor: "#FEF2F2",
            border: "1px solid #FEE2E2",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: 1.2,
          }}
        >
          <ErrorOutlined sx={{ color: "#EF4444", fontSize: 28 }} />
          <div>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#991B1B", fontSize: "13px" }}>
              Failed to load bookings
            </Typography>
            <Typography variant="caption" sx={{ color: "#B91C1C", fontSize: "11.5px" }}>
              {typeof error === "string" ? error : "Could not retrieve your reservations."}
            </Typography>
          </div>
          {onRetry && (
            <Button
              size="small"
              startIcon={<Refresh />}
              onClick={onRetry}
              variant="outlined"
              sx={{
                borderColor: "#FCA5A5",
                color: "#991B1B",
                textTransform: "none",
                fontWeight: 700,
                fontSize: "11.5px",
                borderRadius: "8px",
                py: 0.4,
                "&:hover": { borderColor: "#EF4444", bgcolor: "#FEE2E2" },
              }}
            >
              Retry
            </Button>
          )}
        </Box>
      ) : bookings.length === 0 ? (
        /* 3. Empty State */
        <Box
          sx={{
            py: 4,
            px: 2,
            borderRadius: "14px",
            bgcolor: "#F8FAFC",
            border: "1.5px dashed #E2E8F0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: 1,
          }}
        >
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              bgcolor: "#F1F5F9",
              color: "#94A3B8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CalendarMonthOutlined sx={{ fontSize: 22 }} />
          </Box>
          <div>
            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "#334155", fontSize: "13.5px" }}>
              No Recent Bookings
            </Typography>
            <Typography variant="caption" sx={{ color: "#94A3B8", fontSize: "11.5px", maxWidth: 240, display: "block", mt: 0.3 }}>
              When clients book inspections, dates, or stay units, they will show up here in real time.
            </Typography>
          </div>
        </Box>
      ) : (
        /* 4. Populated List */
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {bookings.map((b) => {
            const statusKey = (b.status || "").toLowerCase();
            const isCompleted = statusKey === "completed" || statusKey === "confirmed";
            const isCancelled = statusKey === "cancelled" || statusKey === "rejected";

            const badgeBg = isCompleted ? "#ECFDF5" : isCancelled ? "#FEF2F2" : "#FFFBEB";
            const badgeColor = isCompleted ? "#017E53" : isCancelled ? "#DC2626" : "#B45309";
            const badgeLabel = isCompleted ? "Confirmed" : isCancelled ? "Cancelled" : "Pending";

            const initials = b.clientName
              ? b.clientName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)
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
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.8, minWidth: 0 }}>
                  <Avatar
                    sx={{
                      bgcolor: "#ECFDF5",
                      color: "#017E53",
                      fontWeight: 700,
                      fontSize: "12px",
                      width: 40,
                      height: 40,
                      borderRadius: "12px",
                      flexShrink: 0,
                    }}
                  >
                    {initials}
                  </Avatar>

                  <div style={{ minWidth: 0, flex: 1 }}>
                    <Typography
                      variant="subtitle2"
                      noWrap
                      sx={{ fontWeight: 800, color: "#0F172A", fontSize: "13px" }}
                    >
                      {b.clientName}
                    </Typography>
                    <Typography
                      variant="caption"
                      noWrap
                      sx={{ color: "#94A3B8", fontSize: "11.5px", display: "block" }}
                    >
                      {b.startDate || b.date} • {b.propertyName}
                    </Typography>
                  </div>
                </Box>

                <Box sx={{ textAlign: "right", ml: 1.5, flexShrink: 0 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "#0F172A", fontSize: "13px", mb: 0.2 }}>
                    {b.formattedPropertyPrice || (b.propertyPrice ? `₦${Number(b.propertyPrice).toLocaleString()}` : "—")}
                  </Typography>
                  <Chip
                    label={badgeLabel}
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
      )}
    </Paper>
  );
};

export default RecentBookingsCard;