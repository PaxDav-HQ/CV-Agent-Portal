import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Typography,
  Paper,
  Button,
  Checkbox,
  CircularProgress,
} from "@mui/material";
import {
  EditOutlined,
  SendOutlined,
  LocationOnOutlined,
  ShieldOutlined,
  VerifiedUserOutlined,
  LockOutlined,
} from "@mui/icons-material";

const Step3ReviewSubmit = ({ formik, onEditSection, loading, isEdit }) => {
  const [agreed, setAgreed] = useState(false);
  const { values, handleSubmit } = formik;
  const user = useSelector((state) => state.UserReducer?.userInfo);
  const basePrice = Number(values.base_price || 0);
  const securityDeposit = Number(values.security_deposit || 5000);
  const commission = basePrice * 0.05;
  const totalEstimate = basePrice + securityDeposit - commission;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <div>
        <Typography variant="h5" sx={{ fontWeight: 800, color: "#0F172A", fontSize: { xs: "19px", sm: "22px" }, mb: 0.5 }}>
          Review & Submit
        </Typography>
        <Typography variant="body2" sx={{ color: "#64748B", fontSize: "13px" }}>
          Double check your details before publishing.
        </Typography>
      </div>

      {/* Verification Alert Banner */}
      {
        user.verified == 0 && (
            <Paper
                elevation={0}
                sx={{
                p: 2.2,
                borderRadius: "16px",
                bgcolor: "#FFFBEB",
                border: "1px solid #FEF3C7",
                display: "flex",
                alignItems: "flex-start",
                gap: 1.5,
                }}
            >
                <ShieldOutlined sx={{ color: "#D97706", fontSize: 22, mt: 0.2 }} />
                <div>
                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "#92400E", fontSize: "13px" }}>
                    Verification required
                </Typography>
                <Typography variant="caption" sx={{ color: "#B45309", fontSize: "11.5px", display: "block" }}>
                    Your service will remain pending until you verify your account via the dashboard.
                </Typography>
                </div>
            </Paper>
        )
      }

      {/* Desktop side-by-side cards: Summary on left, Breakdown on right */}
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1.3fr 1fr" }, gap: 2.5, alignItems: "start" }}>
        {/* Service Summary Card */}
        <Paper elevation={0} sx={{ p: { xs: 2.5, sm: 3 }, borderRadius: "20px", border: "1px solid #F1F5F9", bgcolor: "#FFFFFF" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2.5 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "#0F172A", fontSize: "15px" }}>
              Service Summary
            </Typography>
            <Button
              size="small"
              startIcon={<EditOutlined sx={{ fontSize: 14 }} />}
              onClick={() => onEditSection(1)}
              sx={{ textTransform: "none", color: "#10B981", fontWeight: 700, fontSize: "12px", p: 0 }}
            >
              Edit
            </Button>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <div>
              <Typography variant="caption" sx={{ color: "#94A3B8", fontWeight: 700, fontSize: "10.5px", textTransform: "uppercase" }}>
                TITLE & CATEGORY
              </Typography>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "#0F172A", fontSize: "14px" }}>
                {values.title}
              </Typography>
              <Typography variant="caption" sx={{ color: "#64748B", fontSize: "12px" }}>
                Services • {values.category}
              </Typography>
            </div>

            <div>
              <Typography variant="caption" sx={{ color: "#94A3B8", fontWeight: 700, fontSize: "10.5px", textTransform: "uppercase" }}>
                LOCATION
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 0.2 }}>
                <LocationOnOutlined sx={{ fontSize: 16, color: "#64748B" }} />
                <Typography variant="body2" sx={{ color: "#0F172A", fontSize: "13px", fontWeight: 600 }}>
                  {values.location}
                </Typography>
              </Box>
            </div>

            <div>
              <Typography variant="caption" sx={{ color: "#94A3B8", fontWeight: 700, fontSize: "10.5px", textTransform: "uppercase" }}>
                DESCRIPTION
              </Typography>
              <Typography variant="body2" sx={{ color: "#334155", fontSize: "12.5px", fontStyle: "italic", mt: 0.2 }}>
                "{values.short_description}"
              </Typography>
            </div>

            <div>
              <Typography variant="caption" sx={{ color: "#94A3B8", fontWeight: 700, fontSize: "10.5px", textTransform: "uppercase", display: "block", mb: 0.8 }}>
                MEDIA
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                {(values.images || []).slice(0, 4).map((img, idx) => (
                  <Box
                    key={idx}
                    component="img"
                    src={img}
                    alt={`Thumb ${idx}`}
                    sx={{ width: 62, height: 56, borderRadius: "10px", objectFit: "cover", border: "1px solid #E2E8F0" }}
                  />
                ))}
              </Box>
            </div>
          </Box>
        </Paper>

        {/* Pricing Breakdown Card */}
        <Paper elevation={0} sx={{ p: { xs: 2.5, sm: 3 }, borderRadius: "20px", border: "1px solid #F1F5F9", bgcolor: "#FFFFFF" }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "#0F172A", fontSize: "15px", mb: 2 }}>
            Pricing Breakdown
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.4 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body2" sx={{ color: "#64748B", fontSize: "13px" }}>
                Service Price ({values.pricing_type})
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 700, color: "#0F172A", fontSize: "13px" }}>
                ₦{basePrice.toLocaleString()}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body2" sx={{ color: "#64748B", fontSize: "13px" }}>
                Security Deposit
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 700, color: "#0F172A", fontSize: "13px" }}>
                ₦{securityDeposit.toLocaleString()}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body2" sx={{ color: "#64748B", fontSize: "13px" }}>
                Platform Commission (5%)
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 700, color: "#EF4444", fontSize: "13px" }}>
                -₦{commission.toLocaleString()}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body2" sx={{ color: "#64748B", fontSize: "13px" }}>
                Taxes
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 700, color: "#0F172A", fontSize: "13px" }}>
                ₦0.00
              </Typography>
            </Box>

            <Box sx={{ pt: 1.8, borderTop: "1px dashed #E2E8F0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "#0F172A", fontSize: "14px" }}>
                Estimated Total
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 900, color: "#10B981", fontSize: "18px" }}>
                ₦{totalEstimate.toLocaleString()}
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>

      {/* Terms Checkbox */}
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1, mt: 1 }}>
        <Checkbox
          size="small"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          sx={{ color: "#CBD5E1", "&.Mui-checked": { color: "#10B981" }, p: 0.2 }}
        />
        <Typography variant="caption" sx={{ color: "#64748B", fontSize: "12px", lineHeight: 1.4 }}>
          I agree to the <span style={{ color: "#10B981", fontWeight: 700, cursor: "pointer" }}>Service Provider Terms</span> and confirm all information provided is accurate and my own work.
        </Typography>
      </Box>

      {/* Verified Tip */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, bgcolor: "#F0FDF4", p: 1.4, borderRadius: "12px" }}>
        <VerifiedUserOutlined sx={{ color: "#10B981", fontSize: 18 }} />
        <Typography variant="caption" sx={{ color: "#065F46", fontWeight: 700, fontSize: "11.5px" }}>
          Pro Tip: Verified providers get 40% more visibility.
        </Typography>
      </Box>

      {/* Submit Button Toolbar */}
      <Box sx={{ mt: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Button
          variant="contained"
          disabled={!agreed || loading}
          endIcon={loading ? <CircularProgress size={16} color="inherit" /> : <SendOutlined sx={{ fontSize: 16 }} />}
          onClick={handleSubmit}
          sx={{
            width: { xs: "100%", sm: 280 },
            bgcolor: "#10B981",
            color: "#FFFFFF",
            fontWeight: 800,
            fontSize: "14.5px",
            borderRadius: "14px",
            py: 1.5,
            textTransform: "none",
            boxShadow: "none",
            "&:hover": { bgcolor: "#059669" },
          }}
        >
          {loading ? (isEdit ? "Updating Service..." : "Submitting...") : (isEdit ? "Update Service" : "Submit Service")}
        </Button>

        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0.5, mt: 1.5, color: "#94A3B8" }}>
          <LockOutlined sx={{ fontSize: 13 }} />
          <Typography variant="caption" sx={{ fontSize: "11px" }}>
            Secure encrypted submission
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Step3ReviewSubmit;