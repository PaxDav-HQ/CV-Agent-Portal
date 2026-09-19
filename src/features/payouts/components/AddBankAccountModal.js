import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  IconButton,
  Alert,
  CircularProgress,
  Autocomplete,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { extractErrorMessage } from "../../../utils/errorParser";

const AddBankAccountModal = ({
  open,
  onClose,
  supportedBanks = [],
  loadingBanks = false,
  onSubmit,
}) => {
  const [form, setForm] = useState({
    bank_name: "",
    bank_code: "",
    account_number: "",
    account_name: "",
  });
  const [selectedBank, setSelectedBank] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleBankChange = (event, newValue) => {
    setSelectedBank(newValue);
    setForm((prev) => ({
      ...prev,
      bank_code: newValue ? String(newValue.code) : "",
      bank_name: newValue ? String(newValue.name) : "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.bank_code || !form.bank_name || !form.account_number.trim() || !form.account_name.trim()) {
      setError("All fields are required.");
      return;
    }

    if (form.account_number.length !== 10) {
      setError("Account number must be 10 digits.");
      return;
    }

    try {
      setSubmitting(true);
      await onSubmit({
        bank_name: form.bank_name.trim(),
        bank_code: form.bank_code.trim(),
        account_number: form.account_number.trim(),
        account_name: form.account_name.trim(),
      });
      setForm({ bank_name: "", bank_code: "", account_number: "", account_name: "" });
      setSelectedBank(null);
      onClose();
    } catch (err) {
      setError(extractErrorMessage(err, "Failed to add bank account."));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{ sx: { borderRadius: "16px", p: 1 } }}
    >
      <DialogTitle
        sx={{
          fontWeight: 800,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span>Add Payout Bank Account</span>
        <IconButton size="small" onClick={onClose}>
          <Close fontSize="small" />
        </IconButton>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ pt: 1 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 2, borderRadius: "8px", fontSize: "12.5px" }}>
              {error}
            </Alert>
          )}

          {/* Searchable Bank Selector */}
          <Box sx={{ mb: 2 }}>
            <label
              style={{
                display: "block",
                fontSize: "12px",
                fontWeight: 700,
                color: "#475569",
                marginBottom: 4,
              }}
            >
              Select Bank *
            </label>
            <Autocomplete
              options={supportedBanks}
              loading={loadingBanks}
              value={selectedBank}
              onChange={handleBankChange}
              getOptionLabel={(option) => option?.name || ""}
              isOptionEqualToValue={(option, val) => option?.code === val?.code}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  placeholder="Search bank name..."
                  InputProps={{
                    ...(params.InputProps || {}),
                    endAdornment: (
                      <>
                        {loadingBanks ? <CircularProgress color="inherit" size={16} /> : null}
                        {params.InputProps?.endAdornment}
                      </>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px",
                      bgcolor: "#F8FAFC",
                    },
                  }}
                />
              )}
            />
          </Box>

          {/* Account Number */}
          <Box sx={{ mb: 2 }}>
            <label
              style={{
                display: "block",
                fontSize: "12px",
                fontWeight: 700,
                color: "#475569",
                marginBottom: 4,
              }}
            >
              Account Number (10 Digits) *
            </label>
            <TextField
              fullWidth
              size="small"
              type="text"
              inputProps={{ maxLength: 10 }}
              placeholder="0123456789"
              value={form.account_number}
              onChange={(e) =>
                setForm({ ...form, account_number: e.target.value.replace(/\D/g, "") })
              }
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                  bgcolor: "#F8FAFC",
                },
              }}
            />
          </Box>

          {/* Account Name */}
          <Box sx={{ mb: 2 }}>
            <label
              style={{
                display: "block",
                fontSize: "12px",
                fontWeight: 700,
                color: "#475569",
                marginBottom: 4,
              }}
            >
              Account Name *
            </label>
            <TextField
              fullWidth
              size="small"
              type="text"
              placeholder="Official name on account"
              value={form.account_name}
              onChange={(e) => setForm({ ...form, account_name: e.target.value })}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                  bgcolor: "#F8FAFC",
                },
              }}
            />
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={submitting}
            sx={{
              py: 1.2,
              borderRadius: "10px",
              bgcolor: "#017E53",
              fontWeight: 700,
              textTransform: "none",
              "&:hover": { bgcolor: "#016744" },
            }}
          >
            {submitting ? <CircularProgress size={20} color="inherit" /> : "Save Bank Account"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddBankAccountModal;