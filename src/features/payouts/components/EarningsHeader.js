import React from "react";
import { Box, Typography, FormControl, Select, MenuItem, TextField } from "@mui/material";

const PERIOD_OPTIONS = [
  { value: "this_month", label: "This Month" },
  { value: "1_month_ago", label: "Last Month" },
  { value: "2_months_ago", label: "2 Months Ago" },
  { value: "3_months_ago", label: "3 Months Ago" },
  { value: "custom", label: "Custom Period" },
];

const EarningsHeader = ({ period, onPeriodChange, startDate, onStartDateChange, endDate, onEndDateChange }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        justifyContent: "space-between",
        alignItems: { xs: "flex-start", sm: "center" },
        gap: 2,
        mb: 3,
      }}
    >
      <div>
        <Typography variant="h5" sx={{ fontWeight: 800, color: "#0F172A", letterSpacing: "-0.5px" }}>
          Earnings & Payouts
        </Typography>
        <Typography variant="body2" sx={{ color: "#64748B", fontSize: "13.5px" }}>
          Track your net revenues, manage payout bank accounts, and request instant withdrawals.
        </Typography>
      </div>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flexWrap: "wrap" }}>
        <FormControl size="small">
          <Select
            value={period}
            onChange={(e) => onPeriodChange(e.target.value)}
            sx={{
              bgcolor: "#FFFFFF",
              borderRadius: "10px",
              fontSize: "13px",
              fontWeight: 700,
              minWidth: 150,
              "& fieldset": { borderColor: "#E2E8F0" },
            }}
          >
            {PERIOD_OPTIONS.map((opt) => (
              <MenuItem key={opt.value} value={opt.value} sx={{ fontSize: "13px", fontWeight: 600 }}>
                {opt.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {period === "custom" && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <TextField
              type="date"
              size="small"
              value={startDate}
              onChange={(e) => onStartDateChange(e.target.value)}
              sx={{ bgcolor: "#fff", "& input": { fontSize: "12px", py: 0.8 } }}
            />
            <TextField
              type="date"
              size="small"
              value={endDate}
              onChange={(e) => onEndDateChange(e.target.value)}
              sx={{ bgcolor: "#fff", "& input": { fontSize: "12px", py: 0.8 } }}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default EarningsHeader;