import React from "react";
import { Paper, Box, Typography, Chip } from "@mui/material";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip as ChartTooltip,
  CartesianGrid,
} from "recharts";

const EarningsAnalyticsChart = ({ chartData = [], changeText = "0% vs last month" }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: "16px",
        border: "1px solid #E2E8F0",
        bgcolor: "#FFFFFF",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <div>
          <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "#0F172A" }}>
            Earnings Analytics
          </Typography>
          <Typography variant="caption" sx={{ color: "#64748B" }}>
            Periodic breakdown of income generated from listings and services
          </Typography>
        </div>
        <Chip
          label={changeText}
          size="small"
          sx={{
            bgcolor: "#ECFDF5",
            color: "#017E53",
            fontWeight: 700,
            fontSize: "11px",
          }}
        />
      </Box>

      <Box sx={{ width: "100%", height: 280, mt: 2 }}>
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="earningsColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#017E53" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#017E53" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <YAxis
                tick={{ fontSize: 11, fill: "#94A3B8" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(val) => `₦${(val / 1000).toFixed(0)}k`}
              />
              <ChartTooltip
                formatter={(val) => [`₦${Number(val).toLocaleString()}`, "Earnings"]}
                contentStyle={{
                  backgroundColor: "#0F172A",
                  border: "none",
                  borderRadius: "8px",
                  color: "#FFFFFF",
                  fontSize: "12px",
                }}
              />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="#017E53"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#earningsColor)"
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <Box sx={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Typography variant="body2" sx={{ color: "#94A3B8" }}>
              No earnings recorded for this period.
            </Typography>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default EarningsAnalyticsChart;