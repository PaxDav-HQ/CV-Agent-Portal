import React from "react";
import {
  Box,
  Paper,
  Typography,
  Chip,
  LinearProgress,
  Skeleton,
  Button,
} from "@mui/material";
import {
  FiberManualRecord,
  AccountBalanceWalletOutlined,
  Refresh,
  ErrorOutlined,
  TrendingUpOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const EarningsSnapshotCard = ({
  earnings,
  loading = false,
  error = null,
  onRetry = null,
}) => {
  const navigate = useNavigate();

  // 1. Loading State
  if (loading) {
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
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Skeleton variant="text" width={110} height={18} />
          <Skeleton variant="rounded" width={56} height={22} sx={{ borderRadius: "8px" }} />
        </Box>
        <Skeleton variant="text" width="60%" height={38} sx={{ mb: 1 }} />
        <Skeleton variant="text" width="45%" height={18} sx={{ mb: 3 }} />
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Skeleton variant="text" width={80} height={16} />
          <Skeleton variant="text" width={50} height={16} />
        </Box>
        <Skeleton variant="rounded" width="100%" height={8} sx={{ borderRadius: 4 }} />
      </Paper>
    );
  }

  // 2. Error State
  if (error) {
    return (
      <Paper
        elevation={0}
        sx={{
          borderRadius: "20px",
          border: "1px solid #FEE2E2",
          bgcolor: "#FEF2F2",
          p: 3,
          width: "100%",
          minWidth: 0,
          textAlign: "center",
        }}
      >
        <ErrorOutlined sx={{ color: "#EF4444", fontSize: 28, mb: 1 }} />
        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#991B1B", fontSize: "13px" }}>
          Unable to load earnings
        </Typography>
        <Typography variant="caption" sx={{ color: "#B91C1C", fontSize: "11px", display: "block", mb: 1.5 }}>
          {typeof error === "string" ? error : "Could not fetch earnings snapshot."}
        </Typography>
        {onRetry && (
          <Button
            size="small"
            startIcon={<Refresh />}
            onClick={onRetry}
            sx={{
              borderColor: "#FCA5A5",
              color: "#991B1B",
              textTransform: "none",
              fontWeight: 700,
              fontSize: "11px",
              borderRadius: "8px",
            }}
          >
            Retry
          </Button>
        )}
      </Paper>
    );
  }

  // 3. Dynamic Values (Strictly fallback to 0/empty, never dummy estimates)
  const totalEarnings =
    earnings?.formattedEarnings ??
    (earnings?.earnings != null ? `₦${Number(earnings.earnings).toLocaleString()}` : "₦0.00");

  const pendingAmount = Number(earnings?.pendingPayout || 0);
  const formattedPending =
    earnings?.formattedPendingPayout ?? (pendingAmount > 0 ? `₦${pendingAmount.toLocaleString()}` : null);

  const monthlyGoalRaw = Number(earnings?.monthlyGoal || 0);
  const formattedGoal =
    earnings?.formattedMonthlyGoal ?? (monthlyGoalRaw > 0 ? `₦${monthlyGoalRaw.toLocaleString()}` : null);

  // Compute percentage progress safely
  const progressPercent =
    earnings?.progress != null
      ? Math.min(Math.max(Number(earnings.progress), 0), 100)
      : monthlyGoalRaw > 0
      ? Math.min(Math.round(((Number(earnings?.earnings) || 0) / monthlyGoalRaw) * 100), 100)
      : null;

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
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
        <Typography
          variant="caption"
          sx={{
            color: "#94A3B8",
            fontWeight: 700,
            fontSize: "10.5px",
            letterSpacing: "0.5px",
            textTransform: "uppercase",
          }}
        >
          {earnings?.title || "Earnings Snapshot"}
        </Typography>

        <Chip
          label="Payouts"
          size="small"
          onClick={() => navigate("/agent/payouts")}
          sx={{
            bgcolor: "#F8FAFC",
            border: "1px solid #E2E8F0",
            color: "#017E53",
            fontSize: "11px",
            fontWeight: 700,
            height: 22,
            borderRadius: "8px",
            cursor: "pointer",
            "&:hover": { bgcolor: "#ECFDF5", borderColor: "#A7F3D0" },
          }}
        />
      </Box>

      {/* Primary Value */}
      <Typography
        variant="h4"
        sx={{ fontWeight: 900, color: "#0F172A", fontSize: "28px", mb: 0.5, letterSpacing: "-0.5px" }}
      >
        {totalEarnings}
      </Typography>

      {/* Pending status / In-clearing indicator */}
      {formattedPending ? (
        <Typography
          variant="caption"
          sx={{
            color: "#D97706",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: 0.6,
            fontSize: "11.5px",
            mb: 2.5,
          }}
        >
          <FiberManualRecord sx={{ fontSize: 7, color: "#F59E0B" }} />
          {earnings?.pendingPayoutText || `${formattedPending} pending clearance`}
        </Typography>
      ) : (
        <Typography
          variant="caption"
          sx={{
            color: "#64748B",
            display: "flex",
            alignItems: "center",
            gap: 0.6,
            fontSize: "11.5px",
            mb: 2.5,
          }}
        >
          <AccountBalanceWalletOutlined sx={{ fontSize: 13, color: "#94A3B8" }} />
          All earnings settled to account
        </Typography>
      )}

      {/* Goal Progress Section */}
      <Box sx={{ pt: 1, borderTop: "1px solid #F8FAFC" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.8 }}>
          <Typography variant="caption" sx={{ color: "#94A3B8", fontSize: "11.5px", fontWeight: 600 }}>
            Monthly Target
          </Typography>
          <Typography variant="caption" sx={{ fontWeight: 800, color: "#0F172A", fontSize: "11.5px" }}>
            {formattedGoal ? `${formattedGoal} (${progressPercent || 0}%)` : "Not set"}
          </Typography>
        </Box>

        {progressPercent !== null ? (
          <LinearProgress
            variant="determinate"
            value={progressPercent}
            sx={{
              height: 7,
              borderRadius: 4,
              bgcolor: "#F1F5F9",
              "& .MuiLinearProgress-bar": {
                bgcolor: progressPercent >= 100 ? "#017E53" : "#10B981",
                borderRadius: 4,
              },
            }}
          />
        ) : (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.8,
              py: 0.5,
              color: "#94A3B8",
            }}
          >
            <TrendingUpOutlined sx={{ fontSize: 14 }} />
            <Typography variant="caption" sx={{ fontSize: "11px", fontStyle: "italic" }}>
              Set a monthly sales goal in settings to track progress.
            </Typography>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default EarningsSnapshotCard;