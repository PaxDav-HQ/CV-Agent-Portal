import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  TextField,
  Button,
  Box,
  IconButton,
  Alert,
  CircularProgress,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { Close } from "@mui/icons-material";

const RequestWithdrawalModal = ({ open, onClose, availableBalance = 0, bankAccounts = [], onSubmit }) => {
  const [amount, setAmount] = useState("");
  const [bankAccountId, setBankAccountId] = useState(bankAccounts[0]?.id || "");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const withdrawAmt = Number(amount);
    if (!withdrawAmt || withdrawAmt <= 0) {
      setError("Please enter a valid withdrawal amount.");
      return;
    }

    if (withdrawAmt > availableBalance) {
      setError(`Amount exceeds your available balance of ₦${availableBalance.toLocaleString()}`);
      return;
    }

    const selectedBankId = bankAccountId || bankAccounts[0]?.id;
    if (!selectedBankId) {
      setError("Please select or add a bank account first.");
      return;
    }

    try {
      setSubmitting(true);
      await onSubmit({ amount: withdrawAmt, bankAccountId: Number(selectedBankId) });
      setSuccess("Withdrawal request submitted successfully!");
      setAmount("");
      setTimeout(() => {
        setSuccess("");
        onClose();
      }, 1200);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit withdrawal request.");
    } finally {
      setSubmitting(false);
    }
  };

  // 1. Helper to format for display
  const formatDisplayAmount = (val) => {
    if (!val) return "";
    const parts = val.toString().split(".");
    parts[0] = Number(parts[0]).toLocaleString("en-US");
    return parts.join(".")
  };

  // 2. Change handler to clean the raw value before saving to state
  const handleAmountChange = (e) => {
    // Strip out commas and non-numeric characters (allows single decimal point if needed)
    const rawValue = e.target.value.replace(/[^0-9.]/g, "");

    // Prevent multiple decimals
    if ((rawValue.match(/\./g) || []).length > 1) return;

    setAmount(rawValue); // State stores raw number/string (e.g. "50000")
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{ sx: { borderRadius: "16px", p: 1 } }}
    >
      <DialogTitle sx={{ fontWeight: 800, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span>Request Withdrawal</span>
        <IconButton size="small" onClick={onClose}>
          <Close fontSize="small" />
        </IconButton>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ pt: 1 }}>
          {error && <Alert severity="error" sx={{ mb: 2, borderRadius: "8px", fontSize: "12.5px" }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2, borderRadius: "8px", fontSize: "12.5px" }}>{success}</Alert>}

          <Box sx={{ mb: 2 }}>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#475569", marginBottom: 4 }}>
              Available Balance
            </label>
            <Typography variant="h6" sx={{ fontWeight: 900, color: "#017E53" }}>
              ₦{Number(availableBalance).toLocaleString()}
            </Typography>
          </Box>

          <Box sx={{ mb: 2.5 }}>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#475569", marginBottom: 4 }}>
              Withdrawal Amount (₦) *
            </label>
            <TextField
              fullWidth
              size="small"
              type="text"
              placeholder="e.g. 50000"
              value={formatDisplayAmount(amount)}
              onChange={(e) => handleAmountChange(e)}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px", bgcolor: "#F8FAFC" } }}
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#475569", marginBottom: 4 }}>
              Destination Bank Account *
            </label>
            {bankAccounts.length === 0 ? (
              <Alert severity="warning" sx={{ fontSize: "12px", borderRadius: "8px" }}>
                You must connect a bank account before making a withdrawal.
              </Alert>
            ) : (
              <FormControl fullWidth size="small">
                <Select
                  value={bankAccountId || bankAccounts[0]?.id || ""}
                  onChange={(e) => setBankAccountId(e.target.value)}
                  sx={{ borderRadius: "10px", bgcolor: "#F8FAFC", fontSize: "13px" }}
                >
                  {bankAccounts.map((b) => (
                    <MenuItem key={b.id} value={b.id}>
                      {b.bank_name} — {b.account_number} ({b.account_name})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={submitting || bankAccounts.length === 0}
            sx={{
              py: 1.2,
              borderRadius: "10px",
              bgcolor: "#017E53",
              fontWeight: 700,
              textTransform: "none",
              "&:hover": { bgcolor: "#016744" },
            }}
          >
            {submitting ? <CircularProgress size={20} color="inherit" /> : "Confirm Withdrawal"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default RequestWithdrawalModal;