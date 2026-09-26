import React from "react";
import { Paper, Box, Typography, Button, IconButton } from "@mui/material";
import { AccountBalanceOutlined, AddOutlined, DeleteOutlined } from "@mui/icons-material";

const PayoutBankAccountsCard = ({ bankAccounts = [], onAddBankClick, onDeleteBank }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        borderRadius: "16px",
        border: "1px solid #E2E8F0",
        bgcolor: "#FFFFFF",
        flex: 1,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "#0F172A" }}>
          Payout Bank Accounts
        </Typography>
        <Button
          size="small"
          startIcon={<AddOutlined />}
          onClick={onAddBankClick}
          sx={{
            textTransform: "none",
            fontWeight: 700,
            fontSize: "12px",
            color: "#017E53",
          }}
        >
          Add Bank
        </Button>
      </Box>

      {bankAccounts.length === 0 ? (
        <Box
          sx={{
            p: 3,
            textAlign: "center",
            border: "1px dashed #CBD5E1",
            borderRadius: "12px",
            bgcolor: "#F8FAFC",
          }}
        >
          <AccountBalanceOutlined sx={{ fontSize: 32, color: "#94A3B8", mb: 1 }} />
          <Typography variant="body2" sx={{ color: "#64748B", fontSize: "13px", fontWeight: 600 }}>
            No payout account added yet
          </Typography>
          <Typography variant="caption" sx={{ color: "#94A3B8", display: "block", mb: 1.5 }}>
            Add a bank account to receive your funds
          </Typography>
          <Button
            variant="outlined"
            size="small"
            onClick={onAddBankClick}
            sx={{
              textTransform: "none",
              fontSize: "12px",
              fontWeight: 700,
              borderColor: "#017E53",
              color: "#017E53",
              borderRadius: "8px",
            }}
          >
            Connect Bank Account
          </Button>
        </Box>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          {bankAccounts.map((b) => (
            <Box
              key={b.id}
              sx={{
                p: 1.5,
                borderRadius: "12px",
                bgcolor: "#F8FAFC",
                border: "1px solid #E2E8F0",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <AccountBalanceOutlined sx={{ color: "#017E53", fontSize: 20 }} />
                <div>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "#0F172A", fontSize: "13px" }}>
                    {b?.bank_name}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#64748B", fontWeight: 600 }}>
                    {b.account_number} • {b.account_name}
                  </Typography>
                </div>
              </Box>
              <IconButton size="small" onClick={() => onDeleteBank(b.id)} sx={{ color: "#EF4444" }}>
                <DeleteOutlined sx={{ fontSize: 18 }} />
              </IconButton>
            </Box>
          ))}
        </Box>
      )}
    </Paper>
  );
};

export default PayoutBankAccountsCard;