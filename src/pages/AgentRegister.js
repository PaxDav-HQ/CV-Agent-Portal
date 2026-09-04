import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import axios from "axios";
import { useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Chip,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import {
  MailOutlined,
  PhoneOutlined,
  ArrowForward,
  VerifiedUserOutlined,
  BadgeOutlined,
} from "@mui/icons-material";
import { createAccountSchema } from "../schemas";
import { extractErrorMessage } from "../utils/errorParser";
import icon from "../assets/icon.png"

const PROFESSIONAL_TYPES = [
  { value: "real_estate_agent", label: "Real Estate Agent" },
  { value: "property_manager", label: "Property Manager" },
  { value: "developer", label: "Property Developer / Builder" },
];

const EXPERIENCE_LEVELS = [
  { value: "beginner", label: "Beginner (0–2 years)" },
  { value: "intermediate", label: "Intermediate (3–5 years)" },
  { value: "expert", label: "Expert (5+ years)" },
];

const EyeIcon = ({ slash }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {slash ? (
      <>
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </>
    ) : (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </>
    )}
  </svg>
);

const AgentRegister = () => {
  const uri = useSelector((state) => state.UriReducer.uri);
  const navigate = useNavigate();
  const location = useLocation()

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const errorParam = params.get("error");
    if (errorParam) setError(errorParam);
  }, [location.search]);

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
      isAgent: true,
      professional_type: "real_estate_agent",
      experience_level: "beginner",
      phone_number: "",
    },
    validationSchema: createAccountSchema,
    onSubmit: (formValues) => {
      setError("");
      setIsSubmitting(true);

      const payload = {
        firstname: formValues.firstname,
        lastname: formValues.lastname,
        email: formValues.email,
        password: formValues.password,
        role: "agent",
        isAgent: true,
        professional_type: formValues.professional_type,
        experience_level: formValues.experience_level,
        phone_number: formValues.phone_number,
      };

      axios
        .post(`${uri}auth/register`, payload)
        .then((res) => {
          console.log(res.data)
          setIsSubmitting(false);
          sessionStorage.setItem("tempUserEmail", formValues.email);
          navigate("/create-account/verify");
        })
        .catch((err) => {
          setIsSubmitting(false);
          console.error(err);
          setError(extractErrorMessage(err));
        });
    },
  });

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        display: "flex",
        bgcolor: "#FFFFFF",
        overflow: "hidden", // Locks outer screen; prevents window scrolling
      }}
    >
      {/* LEFT FORM COLUMN: ONLY THIS SCROLLS */}
      <Box
        sx={{
          flex: { xs: "1", md: "0 0 540px", lg: "0 0 600px" },
          height: "100vh",
          overflowY: "auto", // Dedicated internal scroll
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          p: { xs: 3, sm: 5, md: 6 },
          boxSizing: "border-box",
          "&::-webkit-scrollbar": { width: "6px" },
          "&::-webkit-scrollbar-thumb": {
            bgcolor: "#E2E8F0",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb:hover": { bgcolor: "#CBD5E1" },
        }}
      >
        {/* Brand */}
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box
              src={icon}
              alt="CV Properties Logo"
              component="img"
              sx={{
                width: 35,
                height: 35,
                // borderRadius: "10px",
                // bgcolor: "#017E53",
                // color: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 900,
                fontSize: "18px",
                // filter: "brightness(0) invert(1)"
              }}
            >
              {/* <img src={icon} alt="CV Properties Logo" width="24" height="24" /> */}
            </Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "#0F172A", letterSpacing: "-0.5px" }}>
              CV Properties
            </Typography>
          </Box>

          <Chip
            label="AGENT"
            size="small"
            sx={{ bgcolor: "#ECFDF5", color: "#017E53", fontWeight: 800, fontSize: "10px" }}
          />
        </Box>

        {/* Form Body */}
        <Box sx={{ maxWidth: 460, width: "100%", mx: "auto", my: "auto", py: 2 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, color: "#0F172A", letterSpacing: "-1px", mb: 0.5 }}>
            Become an Accredited Agent
          </Typography>
          <Typography variant="body2" sx={{ color: "#64748B", mb: 3, fontSize: "14px" }}>
            List your properties, gain verified exposure, and connect with serious property seekers.
          </Typography>

          {/* Social Agent Signup */}
          <Box sx={{ mb: 3 }}>
            <button
              type="button"
              onClick={() => {
                window.location.href = `${uri}auth/google/register?type=agent&origin=${encodeURIComponent(window.location.origin)}`;
              }}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "10px",
                backgroundColor: "#F8FAFC",
                border: "1px solid #E2E8F0",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "13px",
                color: "#1E293B",
              }}
            >
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google"
                style={{ height: "17px", marginRight: "8px" }}
              />
              Continue with Google as an Agent
            </button>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <Box sx={{ flex: 1, height: "1px", bgcolor: "#E2E8F0" }} />
            <Typography variant="caption" sx={{ px: 2, color: "#94A3B8", fontWeight: 600 }}>
              OR REGISTER WITH BUSINESS EMAIL
            </Typography>
            <Box sx={{ flex: 1, height: "1px", bgcolor: "#E2E8F0" }} />
          </Box>

          {error && (
            <Alert severity="error" onClose={() => setError("")} sx={{ mb: 3, borderRadius: "10px" }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit} noValidate>
            {/* Names */}
            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.5, mb: 2 }}>
              <Box>
                <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#1E293B", marginBottom: "4px" }}>
                  First Name *
                </label>
                <TextField
                  fullWidth
                  size="small"
                  name="firstname"
                  placeholder="Ade"
                  value={values.firstname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.firstname && errors.firstname)}
                  helperText={touched.firstname && errors.firstname}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px",
                      bgcolor: "#F8FAFC",
                      "& fieldset": { borderColor: "#E2E8F0" },
                      "&.Mui-focused fieldset": { borderColor: "#017E53" },
                    },
                  }}
                />
              </Box>

              <Box>
                <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#1E293B", marginBottom: "4px" }}>
                  Last Name *
                </label>
                <TextField
                  fullWidth
                  size="small"
                  name="lastname"
                  placeholder="Balogun"
                  value={values.lastname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.lastname && errors.lastname)}
                  helperText={touched.lastname && errors.lastname}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px",
                      bgcolor: "#F8FAFC",
                      "& fieldset": { borderColor: "#E2E8F0" },
                      "&.Mui-focused fieldset": { borderColor: "#017E53" },
                    },
                  }}
                />
              </Box>
            </Box>

            {/* Email */}
            <Box sx={{ mb: 2 }}>
              <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#1E293B", marginBottom: "4px" }}>
                Work / Agency Email *
              </label>
              <TextField
                fullWidth
                size="small"
                name="email"
                type="email"
                placeholder="ade@agency.com"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
                InputProps={{
                  startAdornment: <MailOutlined sx={{ color: "#94A3B8", fontSize: 18, mr: 1 }} />,
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                    bgcolor: "#F8FAFC",
                    "& fieldset": { borderColor: "#E2E8F0" },
                    "&.Mui-focused fieldset": { borderColor: "#017E53" },
                  },
                }}
              />
            </Box>

            {/* Agency Details Card */}
            <Box
              sx={{
                p: 2,
                mb: 2,
                borderRadius: "12px",
                bgcolor: "#F0FDF4",
                border: "1px solid #DCFCE7",
              }}
            >
              <Typography variant="caption" sx={{ fontWeight: 800, color: "#065F46", letterSpacing: "0.5px", display: "block", mb: 1.5 }}>
                AGENT VERIFICATION PROFILE
              </Typography>

              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 1.5, mb: 1.5 }}>
                <Box>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#1E293B", marginBottom: "4px" }}>
                    Category *
                  </label>
                  <FormControl fullWidth size="small">
                    <Select
                      name="professional_type"
                      value={values.professional_type}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      sx={{ borderRadius: "10px", bgcolor: "#FFFFFF", fontSize: "13px" }}
                    >
                      {PROFESSIONAL_TYPES.map((pt) => (
                        <MenuItem key={pt.value} value={pt.value}>{pt.label}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                <Box>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#1E293B", marginBottom: "4px" }}>
                    Experience *
                  </label>
                  <FormControl fullWidth size="small">
                    <Select
                      name="experience_level"
                      value={values.experience_level}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      sx={{ borderRadius: "10px", bgcolor: "#FFFFFF", fontSize: "13px" }}
                    >
                      {EXPERIENCE_LEVELS.map((el) => (
                        <MenuItem key={el.value} value={el.value}>{el.label}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Box>

              <Box>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#1E293B", marginBottom: "4px" }}>
                  WhatsApp / Phone Number *
                </label>
                <TextField
                  fullWidth
                  size="small"
                  name="phone_number"
                  type="tel"
                  placeholder="+234 800 000 0000"
                  value={values.phone_number}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.phone_number && errors.phone_number)}
                  helperText={touched.phone_number && errors.phone_number}
                  InputProps={{
                    startAdornment: <PhoneOutlined sx={{ color: "#94A3B8", fontSize: 18, mr: 1 }} />,
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px",
                      bgcolor: "#FFFFFF",
                      "& fieldset": { borderColor: "#E2E8F0" },
                      "&.Mui-focused fieldset": { borderColor: "#017E53" },
                    },
                  }}
                />
              </Box>
            </Box>

            {/* Password */}
            <Box sx={{ mb: 2 }}>
              <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#1E293B", marginBottom: "4px" }}>
                Password *
              </label>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  bgcolor: "#F8FAFC",
                  border: Boolean(touched.password && errors.password) ? "1.5px solid #d32f2f" : "1px solid #E2E8F0",
                  borderRadius: "10px",
                  px: 1.5,
                  height: "40px",
                  "&:focus-within": { bgcolor: "#FFFFFF", borderColor: "#017E53" },
                }}
              >
                <input
                  name="password"
                  key={showPassword ? "pw-show" : "pw-hidden"}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••••"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{
                    width: "100%",
                    border: "none",
                    outline: "none",
                    backgroundColor: "transparent",
                    fontSize: "13.5px",
                    color: "#0F172A",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "4px",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    color: showPassword ? "#017E53" : "#64748B",
                  }}
                >
                  <EyeIcon slash={showPassword} />
                  <span style={{ fontSize: "10px", fontWeight: 700 }}>
                    {showPassword ? "HIDE" : "SHOW"}
                  </span>
                </button>
              </Box>
              {touched.password && errors.password && (
                <Typography variant="caption" sx={{ color: "#d32f2f", fontSize: "11px", mt: 0.5, display: "block" }}>
                  {errors.password}
                </Typography>
              )}
            </Box>

            {/* Confirm Password */}
            <Box sx={{ mb: 3 }}>
              <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#1E293B", marginBottom: "4px" }}>
                Confirm Password *
              </label>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  bgcolor: "#F8FAFC",
                  border: Boolean(touched.confirmPassword && errors.confirmPassword) ? "1.5px solid #d32f2f" : "1px solid #E2E8F0",
                  borderRadius: "10px",
                  px: 1.5,
                  height: "40px",
                  "&:focus-within": { bgcolor: "#FFFFFF", borderColor: "#017E53" },
                }}
              >
                <input
                  name="confirmPassword"
                  key={showConfirmPassword ? "cpw-show" : "cpw-hidden"}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••••••"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{
                    width: "100%",
                    border: "none",
                    outline: "none",
                    backgroundColor: "transparent",
                    fontSize: "13.5px",
                    color: "#0F172A",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "4px",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    color: showConfirmPassword ? "#017E53" : "#64748B",
                  }}
                >
                  <EyeIcon slash={showConfirmPassword} />
                  <span style={{ fontSize: "10px", fontWeight: 700 }}>
                    {showConfirmPassword ? "HIDE" : "SHOW"}
                  </span>
                </button>
              </Box>
              {touched.confirmPassword && errors.confirmPassword && (
                <Typography variant="caption" sx={{ color: "#d32f2f", fontSize: "11px", mt: 0.5, display: "block" }}>
                  {errors.confirmPassword}
                </Typography>
              )}
            </Box>

            <Button
              type="submit"
              fullWidth
              disabled={isSubmitting}
              variant="contained"
              endIcon={!isSubmitting && <ArrowForward sx={{ fontSize: 16 }} />}
              sx={{
                py: 1.4,
                borderRadius: "10px",
                bgcolor: "#017E53",
                color: "#FFFFFF",
                fontSize: "14px",
                fontWeight: 700,
                textTransform: "none",
                "&:hover": { bgcolor: "#016744" },
              }}
            >
              {isSubmitting ? (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <CircularProgress size={18} color="inherit" />
                  <span>Submitting Agent Application...</span>
                </Box>
              ) : (
                "Apply as an Agent"
              )}
            </Button>
          </form>

          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Typography variant="body2" sx={{ color: "#64748B", fontSize: "13px" }}>
              Already registered as an agent?{" "}
              <Link to="/login" style={{ color: "#017E53", fontWeight: 700, textDecoration: "none" }}>
                Sign in to Agent Portal
              </Link>
            </Typography>
          </Box>
        </Box>

        <Typography variant="caption" sx={{ color: "#94A3B8", fontSize: "11px", mt: 2 }}>
          © {new Date().getFullYear()} CV Properties Ltd. All rights reserved.
        </Typography>
      </Box>

      {/* RIGHT HERO COLUMN: FIXED & PINNED */}
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          flex: 1,
          height: "100vh",
          position: "sticky",
          top: 0,
          bgcolor: "#064E3B",
          backgroundImage:
            "linear-gradient(rgba(4, 47, 36, 0.78), rgba(4, 47, 36, 0.88)), url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          p: 8,
          flexDirection: "column",
          justifyContent: "space-between",
          color: "#FFFFFF",
          boxSizing: "border-box",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              px: 2,
              py: 1,
              borderRadius: "20px",
              bgcolor: "rgba(255, 255, 255, 0.12)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
            }}
          >
            <VerifiedUserOutlined sx={{ fontSize: 16, color: "#34D399" }} />
            <Typography variant="caption" sx={{ fontWeight: 700 }}>
              VERIFIED AGENT ECOSYSTEM
            </Typography>
          </Box>
        </Box>

        <Box sx={{ maxWidth: 480 }}>
          <Typography variant="h3" sx={{ fontWeight: 800, letterSpacing: "-1.5px", lineHeight: 1.15, mb: 2 }}>
            Accelerate your property sales across Nigeria.
          </Typography>
          <Typography variant="body1" sx={{ color: "rgba(255, 255, 255, 0.8)", lineHeight: 1.6, fontSize: "15px", mb: 4 }}>
            Join thousands of accredited agents and developers. Benefit from verified badge trust, client inspection scheduling, and zero lead leakage.
          </Typography>

          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 2,
              p: 2,
              borderRadius: "14px",
              bgcolor: "rgba(0, 0, 0, 0.35)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "10px",
                bgcolor: "#017E53",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <BadgeOutlined sx={{ fontSize: 22 }} />
            </Box>
            <div>
              <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                Direct Client Leads
              </Typography>
              <Typography variant="caption" sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
                Direct inspection inquiries dispatched instantly to your dashboard
              </Typography>
            </div>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AgentRegister;