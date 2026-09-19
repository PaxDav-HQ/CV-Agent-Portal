import React from "react";
import { Paper, Box, Typography, Chip } from "@mui/material";
import { HistoryOutlined } from "@mui/icons-material";

const WithdrawalHistoryTable = ({ withdrawalHistory = [] }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: "16px",
        border: "1px solid #E2E8F0",
        bgcolor: "#FFFFFF",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2.5 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <HistoryOutlined sx={{ color: "#017E53" }} />
          <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "#0F172A" }}>
            Recent Withdrawal Requests
          </Typography>
        </Box>
        <Typography variant="caption" sx={{ color: "#94A3B8" }}>
          Showing latest requests
        </Typography>
      </Box>

      {withdrawalHistory.length === 0 ? (
        <Typography variant="body2" sx={{ color: "#9CA3AF", py: 3, textAlign: "center" }}>
          No withdrawal requests made yet.
        </Typography>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          {withdrawalHistory.map((item) => {
            const isCompleted = item.status === "Completed" || item.rawStatus === "success";
            const isFailed = item.status === "Failed" || item.rawStatus === "reversed" || item.rawStatus === "failed";
            const statusColor = isCompleted ? "#017E53" : isFailed ? "#EF4444" : "#D97706";
            const statusBg = isCompleted ? "#ECFDF5" : isFailed ? "#FEF2F2" : "#FFFBEB";

            return (
              <Box
                key={item.id || item.reference}
                sx={{
                  p: 2,
                  borderRadius: "12px",
                  border: "1px solid #F1F5F9",
                  bgcolor: "#FAFBFC",
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  justifyContent: "space-between",
                  alignItems: { xs: "flex-start", sm: "center" },
                  gap: 1.5,
                }}
              >
                <div>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "#0F172A", fontSize: "14px" }}>
                    {item.formattedAmount || `₦${Number(item.amount).toLocaleString()}`}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#64748B", display: "block" }}>
                    {item.bankName} ({item.accountNumber}) • Ref: {item.reference}
                  </Typography>
                </div>

                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Typography variant="caption" sx={{ color: "#94A3B8", fontWeight: 600 }}>
                    {item.date}
                  </Typography>
                  <Chip
                    label={item.status}
                    size="small"
                    sx={{
                      bgcolor: statusBg,
                      color: statusColor,
                      fontWeight: 800,
                      fontSize: "11px",
                      height: "24px",
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

export default WithdrawalHistoryTable;