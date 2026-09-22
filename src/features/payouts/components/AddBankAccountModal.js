import React, { useState, useEffect, useCallback } from "react";
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
  InputAdornment,
  Paper,
  Typography,
} from "@mui/material";
import { Close, CheckCircle } from "@mui/icons-material";
import { useSelector } from "react-redux";
import axios from "axios";
import { extractErrorMessage } from "../../../utils/errorParser";

const AddBankAccountModal = ({
  open,
  onClose,
  supportedBanks = [],
  loadingBanks = false,
  onSubmit,
}) => {
  const uri = useSelector((state) => state.UriReducer?.uri);
  const token = sessionStorage.getItem("userToken");

  const [form, setForm] = useState({
    bank_name: "",
    bank_code: "",
    account_number: "",
    account_name: "",
  });
  const [selectedBank, setSelectedBank] = useState(null);
  const [resolving, setResolving] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Resolves the account name using GET /api/payment/resolve-account
  const resolveAccount = useCallback(
    async (accNumber, bCode) => {
      if (!accNumber || accNumber.length !== 10 || !bCode) return;

      try {
        setResolving(true);
        setError("");        
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const res = await axios.get(`${uri}payment/resolve-account`, {
          params: {
            accountNumber: accNumber,
            bankCode: bCode,
          },
          headers,
        });

        const resData = res.data?.data || res.data;
        const resolvedName =
          resData?.account_name ||
          resData?.accountName ||
          resData?.name ||
          "";

        if (resolvedName) {
          setForm((prev) => ({ ...prev, account_name: resolvedName }));
        } else {
          setError("Could not resolve account name. Please verify the bank and number.");
        }
      } catch (err) {
        console.error("Failed to resolve bank account:", err);
        setForm((prev) => ({ ...prev, account_name: "" }));
        setError(
          extractErrorMessage(
            err,
            "Could not verify account details. Please check the number and bank."
          )
        );
      } finally {
        setResolving(false);
      }
    },
    [uri, token]
  );

  // Trigger auto-resolution when accountNumber has 10 digits and bank is chosen
  useEffect(() => {
    if (form.account_number.length === 10 && form.bank_code) {
      const timer = setTimeout(() => {
        resolveAccount(form.account_number, form.bank_code);
      }, 350);
      return () => clearTimeout(timer);
    } else {
      // Clear account name if the user changes the number back to less than 10 digits
      setForm((prev) => ({ ...prev, account_name: "" }));
    }
  }, [form.account_number, form.bank_code, resolveAccount]);

  const handleBankChange = (event, newValue) => {
    setSelectedBank(newValue);
    setError("");
    setForm((prev) => ({
      ...prev,
      bank_code: newValue ? String(newValue.code) : "",
      bank_name: newValue ? String(newValue.name) : "",
      account_name: "", // reset name on bank change
    }));
  };

  const handleAccountNumberChange = (e) => {
    const numericVal = e.target.value.replace(/\D/g, "").slice(0, 10);
    setError("");
    setForm((prev) => ({
      ...prev,
      account_number: numericVal,
    }));
  };

  const handleClose = () => {
    setForm({ bank_name: "", bank_code: "", account_number: "", account_name: "" });
    setSelectedBank(null);
    setError("");
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.bank_code || !form.bank_name || !form.account_number.trim() || !form.account_name.trim()) {
      setError("Please ensure all fields are filled and account name is resolved.");
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
      handleClose();
    } catch (err) {
      setError(extractErrorMessage(err, "Failed to add bank account."));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
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
        <IconButton size="small" onClick={handleClose}>
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
              disabled={resolving || submitting}
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
              onChange={handleAccountNumberChange}
              disabled={resolving || submitting}
              InputProps={{
                endAdornment: resolving ? (
                  <InputAdornment position="end">
                    <CircularProgress size={16} sx={{ color: "#017E53" }} />
                  </InputAdornment>
                ) : null,
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                  bgcolor: "#F8FAFC",
                },
              }}
            />
          </Box>

          {/* Account Name (Auto-populated upon resolution) */}
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
              placeholder={resolving ? "Resolving account..." : "Official name on account"}
              value={form.account_name}
              disabled={resolving || submitting}
              InputProps={{
                readOnly: true, // Read-only so user cannot manually alter verified NUBAN name
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                  bgcolor: "#F8FAFC",
                },
              }}
            />
          </Box>

          {/* Verified Account Holder Badge */}
          {form.account_name && !resolving && (
            <Paper
              elevation={0}
              sx={{
                p: 1.5,
                borderRadius: "10px",
                bgcolor: "#F0FDF4",
                border: "1px solid #BBF7D0",
                display: "flex",
                alignItems: "center",
                gap: 1.2,
                mb: 1,
              }}
            >
              <CheckCircle sx={{ color: "#017E53", fontSize: 20 }} />
              <div>
                <Typography variant="caption" sx={{ color: "#047857", fontWeight: 700, display: "block", fontSize: "10.5px" }}>
                  VERIFIED ACCOUNT
                </Typography>
                <Typography variant="subtitle2" sx={{ color: "#065F46", fontWeight: 800, fontSize: "12.5px" }}>
                  {form.account_name}
                </Typography>
              </div>
            </Paper>
          )}
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={submitting || resolving || !form.account_name}
            sx={{
              py: 1.2,
              borderRadius: "10px",
              bgcolor: "#017E53",
              fontWeight: 700,
              textTransform: "none",
              boxShadow: "none",
              "&:hover": { bgcolor: "#016744" },
              "&.Mui-disabled": {
                bgcolor: "#E2E8F0",
                color: "#94A3B8",
              },
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