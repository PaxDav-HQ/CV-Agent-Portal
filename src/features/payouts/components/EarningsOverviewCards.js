import React from "react";
import { Grid, Paper, Box, Typography } from "@mui/material";
import {
  TrendingUpOutlined,
  AccountBalanceWalletOutlined,
  ScheduleOutlined,
  CheckCircleOutlined,
} from "@mui/icons-material";

const EarningsOverviewCards = ({ overview = {}, accountBalance = {} }) => {
  return (
    <Grid container spacing={2.5} sx={{ mb: 3 }}>
      {/* Total Earnings */}
      <Grid item xs={12} sm={6} md={3}>
        <Paper elevation={0} sx={{ p: 2.5, borderRadius: "16px", border: "1px solid #E2E8F0", bgcolor: "#FFFFFF" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "10px",
                bgcolor: "#ECFDF5",
                color: "#017E53",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TrendingUpOutlined sx={{ fontSize: 20 }} />
            </Box>
            <div>
              <Typography variant="caption" sx={{ fontWeight: 800, color: "#64748B", fontSize: "11px", letterSpacing: "0.5px" }}>
                TOTAL EARNINGS
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 800, color: "#0F172A", lineHeight: 1.2 }}>
                {overview.totalEarnings?.formatted || `₦${Number(overview.totalEarnings?.value || 0).toLocaleString()}`}
              </Typography>
            </div>
          </Box>
          <Typography variant="caption" sx={{ color: "#94A3B8" }}>
            {overview.totalEarnings?.subtext || "All-time accumulated earnings"}
          </Typography>
        </Paper>
      </Grid>

      {/* Available Balance */}
      <Grid item xs={12} sm={6} md={3}>
        <Paper elevation={0} sx={{ p: 2.5, borderRadius: "16px", border: "1px solid #E2E8F0", bgcolor: "#FFFFFF" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "10px",
                bgcolor: "#EFF6FF",
                color: "#2563EB",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AccountBalanceWalletOutlined sx={{ fontSize: 20 }} />
            </Box>
            <div>
              <Typography variant="caption" sx={{ fontWeight: 800, color: "#64748B", fontSize: "11px", letterSpacing: "0.5px" }}>
                AVAILABLE BALANCE
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 800, color: "#0F172A", lineHeight: 1.2 }}>
                {accountBalance.formattedAvailable || `₦${Number(accountBalance.available || 0).toLocaleString()}`}
              </Typography>
            </div>
          </Box>
          <Typography variant="caption" sx={{ color: "#017E53", fontWeight: 700 }}>
            ● Ready to withdraw
          </Typography>
        </Paper>
      </Grid>

      {/* Pending Clearance */}
      <Grid item xs={12} sm={6} md={3}>
        <Paper elevation={0} sx={{ p: 2.5, borderRadius: "16px", border: "1px solid #E2E8F0", bgcolor: "#FFFFFF" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "10px",
                bgcolor: "#FFFBEB",
                color: "#D97706",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ScheduleOutlined sx={{ fontSize: 20 }} />
            </Box>
            <div>
              <Typography variant="caption" sx={{ fontWeight: 800, color: "#64748B", fontSize: "11px", letterSpacing: "0.5px" }}>
                PENDING CLEARANCE
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 800, color: "#0F172A", lineHeight: 1.2 }}>
                {accountBalance.formattedPending || `₦${Number(accountBalance.pending || 0).toLocaleString()}`}
              </Typography>
            </div>
          </Box>
          <Typography variant="caption" sx={{ color: "#94A3B8" }}>
            Clears upon inspection or escrow release
          </Typography>
        </Paper>
      </Grid>

      {/* Total Bookings */}
      <Grid item xs={12} sm={6} md={3}>
        <Paper elevation={0} sx={{ p: 2.5, borderRadius: "16px", border: "1px solid #E2E8F0", bgcolor: "#FFFFFF" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "10px",
                bgcolor: "#F3E8FF",
                color: "#7C3AED",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CheckCircleOutlined sx={{ fontSize: 20 }} />
            </Box>
            <div>
              <Typography variant="caption" sx={{ fontWeight: 800, color: "#64748B", fontSize: "11px", letterSpacing: "0.5px" }}>
                TOTAL BOOKINGS
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 800, color: "#0F172A", lineHeight: 1.2 }}>
                {overview.totalBookings?.formatted || overview.totalBookings?.value || 0}
              </Typography>
            </div>
          </Box>
          <Typography variant="caption" sx={{ color: "#94A3B8" }}>
            {overview.totalBookings?.subtext || "Completed client bookings"}
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default EarningsOverviewCards;