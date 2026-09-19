import React, { useRef } from "react";
import {
  Box,
  Typography,
  TextField,
  Paper,
  Button,
  IconButton,
  Chip,
} from "@mui/material";
import {
  Close,
  Add,
  VideocamOutlined,
  ChevronRight,
  ArrowForward,
  LightbulbOutlined,
} from "@mui/icons-material";

const pricingTypes = [
  { id: "fixed", label: "Fixed Price" },
  { id: "hourly", label: "Hourly Rate" },
  { id: "negotiable", label: "Negotiable" },
];

const formatCurrency = (val) => {
  const num = Number(val);
  if (isNaN(num) || num <= 0) return "₦0";
  return num.toLocaleString("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  });
};

const Step2PricingMedia = ({ formik, onNext }) => {
  const fileInputRef = useRef(null);
  const { values, errors, touched, handleChange, handleBlur, setFieldValue } = formik;

  // Converts a single File to a Base64 string via FileReader
  const readFileAsBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    try {
      const base64Images = await Promise.all(files.map((file) => readFileAsBase64(file)));
      setFieldValue("images", [...(values.images || []), ...base64Images]);
    } catch (err) {
      console.error("Failed to convert image to base64:", err);
    } finally {
      // Clear input value so the same file can be re-uploaded if desired
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const removeImage = (index) => {
    const filtered = (values.images || []).filter((_, idx) => idx !== index);
    setFieldValue("images", filtered);
  };

  const formattedBasePrice = formatCurrency(values.base_price);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3, width: "100%", minWidth: 0 }}>
      <div>
        <Typography variant="h5" sx={{ fontWeight: 800, color: "#0F172A", fontSize: { xs: "19px", sm: "22px" }, mb: 0.5 }}>
          Set your price & showcase your work
        </Typography>
        <Typography variant="body2" sx={{ color: "#64748B", fontSize: "13px" }}>
          Add your pricing details and photos of your work.
        </Typography>
      </div>

      {/* 1. PRICING CONTAINER */}
      <Paper elevation={0} sx={{ p: { xs: 2.5, sm: 3.5 }, borderRadius: "20px", border: "1px solid #F1F5F9", bgcolor: "#FFFFFF" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2.5 }}>
          <Box sx={{ width: 24, height: 24, borderRadius: "50%", bgcolor: "#ECFDF5", color: "#10B981", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 900 }}>
            ₦
          </Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "#0F172A", fontSize: "15px" }}>
            Pricing
          </Typography>
        </Box>

        {/* Pricing Type Options */}
        {/* Pricing Type Options */}
        <Box sx={{ mb: 3, width: "100%", minWidth: 0 }}>
          <Typography
            variant="caption"
            sx={{ fontWeight: 700, color: "#1E293B", fontSize: "12px", display: "block", mb: 1 }}
          >
            Pricing Type <span style={{ color: "#EF4444" }}>*</span>
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: { xs: 1, sm: 1.5 },
              width: "100%",
              maxWidth: { xs: "100%", sm: "540px" }, // stays centered and proportional on desktop
            }}
          >
            {pricingTypes.map((pt) => {
              const isSelected = values.pricing_type === pt.id;
              return (
                <Button
                  key={pt.id}
                  onClick={() => setFieldValue("pricing_type", pt.id)}
                  sx={{
                    minWidth: 0,
                    width: "100%",
                    height: { xs: 44, sm: 48 }, // Uniform fixed height ensures identical sizing
                    p: { xs: "4px 6px", sm: "8px 12px" },
                    borderRadius: "12px",
                    textTransform: "none",
                    fontSize: { xs: "11px", sm: "13px" },
                    fontWeight: isSelected ? 800 : 600,
                    lineHeight: 1.15,
                    textAlign: "center",
                    whiteSpace: "nowrap", // Prevents awkward vertical word breaks
                    bgcolor: isSelected ? "#F0FDF4" : "#F8FAFC",
                    color: isSelected ? "#10B981" : "#64748B",
                    border: isSelected ? "1.5px solid #10B981" : "1px solid #E2E8F0",
                    transition: "all 0.15s ease-in-out",
                    "&:hover": {
                      bgcolor: isSelected ? "#DCFCE7" : "#F1F5F9",
                      borderColor: isSelected ? "#10B981" : "#CBD5E1",
                    },
                  }}
                >
                  {pt.label}
                </Button>
              );
            })}
          </Box>
        </Box>

        {/* Row: Price & Price Includes */}
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1.5fr" }, gap: 2.5, mb: 2.5 }}>
          <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.6 }}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: "#1E293B", fontSize: "12px" }}>
                Price (₦) <span style={{ color: "#EF4444" }}>*</span>
              </Typography>
              {Number(values.base_price) > 0 && (
                <Chip
                  label={formattedBasePrice}
                  size="small"
                  sx={{
                    bgcolor: "#ECFDF5",
                    color: "#017E53",
                    fontWeight: 800,
                    fontSize: "11px",
                    height: 20,
                  }}
                />
              )}
            </Box>

            <TextField
              fullWidth
              size="small"
              type="number"
              name="base_price"
              placeholder="e.g. 25000"
              value={values.base_price || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.base_price && Boolean(errors.base_price)}
              helperText={touched.base_price && errors.base_price}
              InputProps={{
                startAdornment: <Typography sx={{ mr: 1, color: "#0F172A", fontWeight: 700, fontSize: "13px" }}>₦</Typography>,
              }}
              sx={{
                "& .MuiOutlinedInput-root": { borderRadius: "12px", bgcolor: "#FFFFFF", fontSize: "13px" },
              }}
            />
          </Box>

          <Box>
            <Typography variant="caption" sx={{ fontWeight: 700, color: "#1E293B", fontSize: "12px", display: "block", mb: 0.6 }}>
              Price Includes
            </Typography>
            <TextField
              fullWidth
              size="small"
              name="price_includes"
              placeholder="e.g. General home cleaning (2-3 bedroom)"
              value={values.price_includes}
              onChange={handleChange}
              onBlur={handleBlur}
              sx={{
                "& .MuiOutlinedInput-root": { borderRadius: "12px", bgcolor: "#FFFFFF", fontSize: "13px" },
              }}
            />
          </Box>
        </Box>

        {/* Additional Notes */}
        <Box>
          <Typography variant="caption" sx={{ fontWeight: 700, color: "#1E293B", fontSize: "12px", display: "block", mb: 0.6 }}>
            Additional Notes (Optional)
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={2.5}
            name="additional_notes"
            placeholder="Any extra charges or conditions..."
            value={values.additional_notes}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.additional_notes && Boolean(errors.additional_notes)}
            helperText={touched.additional_notes && errors.additional_notes}
            sx={{
              "& .MuiOutlinedInput-root": { borderRadius: "12px", bgcolor: "#FFFFFF", fontSize: "13px" },
            }}
          />
          <Typography variant="caption" sx={{ color: "#94A3B8", fontSize: "10.5px", float: "right", mt: 0.4 }}>
            {values.additional_notes?.length || 0}/200
          </Typography>
        </Box>
      </Paper>

      {/* 2. MEDIA CONTAINER (FileReader Base64) */}
      <Paper elevation={0} sx={{ p: { xs: 2.5, sm: 3.5 }, borderRadius: "20px", border: "1px solid #F1F5F9", bgcolor: "#FFFFFF" }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "#0F172A", fontSize: "15px" }}>
          Media
        </Typography>
        <Typography variant="caption" sx={{ color: "#64748B", fontSize: "12px", display: "block", mb: 2 }}>
          Add photos of your work. Minimum 3 photos required. ({values.images?.length || 0} added)
        </Typography>

        <input
          type="file"
          ref={fileInputRef}
          multiple
          accept="image/png, image/jpeg, image/webp"
          style={{ display: "none" }}
          onChange={handleFileUpload}
        />

        {/* 6-col desktop / 3-col mobile preview grid */}
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "repeat(3, 1fr)", sm: "repeat(4, 1fr)", md: "repeat(6, 1fr)" }, gap: 1.5, mb: 2 }}>
          {(values.images || []).map((imgBase64, idx) => (
            <Box
              key={idx}
              sx={{
                position: "relative",
                borderRadius: "14px",
                overflow: "hidden",
                height: 105,
                border: "1px solid #E2E8F0",
              }}
            >
              <Box component="img" src={imgBase64} alt={`Upload ${idx}`} sx={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <IconButton
                size="small"
                onClick={() => removeImage(idx)}
                sx={{
                  position: "absolute",
                  top: 4,
                  right: 4,
                  bgcolor: "rgba(15, 23, 42, 0.7)",
                  color: "#FFFFFF",
                  width: 20,
                  height: 20,
                  "&:hover": { bgcolor: "rgba(15, 23, 42, 0.9)" },
                }}
              >
                <Close sx={{ fontSize: 13 }} />
              </IconButton>
            </Box>
          ))}

          <Box
            onClick={() => fileInputRef.current?.click()}
            sx={{
              height: 105,
              borderRadius: "14px",
              border: "1.5px dashed #CBD5E1",
              bgcolor: "#F8FAFC",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.15s ease",
              "&:hover": { borderColor: "#10B981", bgcolor: "#ECFDF5" },
            }}
          >
            <Box sx={{ width: 28, height: 28, borderRadius: "50%", bgcolor: "#10B981", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", mb: 0.5 }}>
              <Add sx={{ fontSize: 18 }} />
            </Box>
            <Typography variant="caption" sx={{ fontWeight: 700, color: "#64748B", fontSize: "11px" }}>
              Add More
            </Typography>
          </Box>
        </Box>

        {touched.images && errors.images && (
          <Typography variant="caption" sx={{ color: "#EF4444", fontSize: "11px", display: "block", mb: 2 }}>
            {errors.images}
          </Typography>
        )}

        <Paper
          elevation={0}
          sx={{
            p: 1.8,
            borderRadius: "14px",
            border: "1px solid #F1F5F9",
            bgcolor: "#F8FAFC",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "pointer",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <VideocamOutlined sx={{ color: "#64748B", fontSize: 22 }} />
            <div>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "#1E293B", fontSize: "12.5px" }}>
                Add Video (Optional)
              </Typography>
              <Typography variant="caption" sx={{ color: "#94A3B8", fontSize: "11px" }}>
                Showcase your work with a short video clip
              </Typography>
            </div>
          </Box>
          <ChevronRight sx={{ color: "#94A3B8", fontSize: 20 }} />
        </Paper>
      </Paper>

      {/* Tip Card */}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          borderRadius: "14px",
          bgcolor: "#F0FDF4",
          border: "1px solid #DCFCE7",
          display: "flex",
          alignItems: "flex-start",
          gap: 1.5,
        }}
      >
        <LightbulbOutlined sx={{ color: "#10B981", fontSize: 20, mt: 0.2 }} />
        <div>
          <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "#065F46", fontSize: "12px" }}>
            Tips
          </Typography>
          <Typography variant="caption" sx={{ color: "#047857", fontSize: "11.5px", lineHeight: 1.4, display: "block" }}>
            A clear and detailed description helps clients understand your service better and boosts your visibility.
          </Typography>
        </div>
      </Paper>

      {/* Button Toolbar */}
      <Box sx={{ mt: 1, display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
        <Typography variant="caption" sx={{ color: "#64748B", fontSize: "11.5px", mb: 1.5 }}>
          • Your progress is saved automatically
        </Typography>
        <Button
          variant="contained"
          endIcon={<ArrowForward sx={{ fontSize: 16 }} />}
          onClick={onNext}
          sx={{
            width: { xs: "100%", sm: 260 },
            bgcolor: "#10B981",
            color: "#FFFFFF",
            fontWeight: 800,
            fontSize: "14px",
            borderRadius: "14px",
            py: 1.5,
            textTransform: "none",
            boxShadow: "none",
            "&:hover": { bgcolor: "#059669" },
          }}
        >
          Continue
        </Button>
      </Box>
    </Box>
  );
};

export default Step2PricingMedia;