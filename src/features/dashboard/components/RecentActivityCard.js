import React from "react";
import { Box, Paper, Typography, Button, Avatar, Skeleton } from "@mui/material";
import {
  NotificationsNoneOutlined,
  Refresh,
  ErrorOutlined,
} from "@mui/icons-material";

const RecentActivityCard = ({
  activities = [],
  loading = false,
  error = null,
  onRetry = null,
  onClear = null,
}) => {
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
          Recent Activity
        </Typography>

        {activities.length > 0 && !loading && !error && (
          <Button
            size="small"
            onClick={onClear}
            sx={{ textTransform: "none", color: "#94A3B8", fontWeight: 600, fontSize: "12px" }}
          >
            Clear
          </Button>
        )}
      </Box>

      {/* 1. Loading State */}
      {loading ? (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {Array.from({ length: 4 }).map((_, idx) => (
            <Box key={idx} sx={{ display: "flex", alignItems: "flex-start", gap: 1.8 }}>
              <Skeleton variant="circular" width={32} height={32} sx={{ flexShrink: 0 }} />
              <Box sx={{ flex: 1 }}>
                <Skeleton variant="text" width="85%" height={16} />
                <Skeleton variant="text" width="35%" height={14} />
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
              Failed to load activity
            </Typography>
            <Typography variant="caption" sx={{ color: "#B91C1C", fontSize: "11.5px" }}>
              {typeof error === "string" ? error : "Could not retrieve your recent logs."}
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
      ) : activities.length === 0 ? (
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
            <NotificationsNoneOutlined sx={{ fontSize: 22 }} />
          </Box>
          <div>
            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "#334155", fontSize: "13.5px" }}>
              No Recent Activity
            </Typography>
            <Typography variant="caption" sx={{ color: "#94A3B8", fontSize: "11.5px", maxWidth: 220, display: "block", mt: 0.3 }}>
              Actions such as new inquiries, bookings, or profile updates will appear here.
            </Typography>
          </div>
        </Box>
      ) : (
        /* 4. Populated List */
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {activities.map((act, idx) => (
            <Box key={act.id || idx} sx={{ display: "flex", alignItems: "flex-start", gap: 1.8 }}>
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  bgcolor: act.bg || "#E2E8F0",
                  color: act.color || "#0F172A",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  mt: 0.2,
                  fontSize: "13px",
                  fontWeight: 700,
                }}
              >
                {act.avatar}
              </Avatar>
              <div style={{ minWidth: 0, flex: 1 }}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 700,
                    color: "#1F2937",
                    fontSize: "12px",
                    lineHeight: 1.3,
                    wordBreak: "break-word",
                  }}
                >
                  {act.title}
                </Typography>
                <Typography variant="caption" sx={{ color: "#94A3B8", fontSize: "11px" }}>
                  {act.timeAgo}
                </Typography>
              </div>
            </Box>
          ))}
        </Box>
      )}
    </Paper>
  );
};

export default RecentActivityCard;