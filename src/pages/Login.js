import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Alert,
  CircularProgress,
  Chip,
} from "@mui/material";
import {
  MailOutlined,
  LockOutlined,  
  ArrowForward,
  VerifiedUserOutlined,
  TrendingUpOutlined,
} from "@mui/icons-material";
import { loginSchema } from "../schemas";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const uri = useSelector((state) => state.UriReducer?.uri);
  const navigate = useNavigate();

  const { handleChange, handleBlur, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: loginSchema,
      onSubmit: (formValues) => {
        setError("");
        setIsLoading(true);

        axios
          .post(`${uri}auth/login`, formValues)
          .then((res) => {
            if (res.data?.role !== "agent") {
              setIsLoading(false);
              setError("Access restricted: This portal is exclusively for registered CV Properties agents.");
            } else {
              sessionStorage.setItem("userToken", res.data.token);
              sessionStorage.setItem("route", "/agent/dashboard");
              navigate("/agent/dashboard");
            }
          })
          .catch((err) => {
            setIsLoading(false);
            const message =
              err.response?.data?.message ||
              err.response?.data?.error ||
              "Invalid email or password. Please try again.";
            setError(message);
          });
      },
    });

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

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", bgcolor: "#FFFFFF" }}>
      {/* LEFT COLUMN: FORM */}
      <Box
        sx={{
          flex: { xs: "1", md: "0 0 500px", lg: "0 0 540px" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          p: { xs: 3.5, sm: 6, md: 8 },
          minHeight: "100vh",
          boxSizing: "border-box",
        }}
      >
        {/* Brand Header */}
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box
              sx={{
                width: 38,
                height: 38,
                borderRadius: "10px",
                bgcolor: "#017E53",
                color: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 900,
                fontSize: "18px",
              }}
            >
              CV
            </Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "#0F172A", letterSpacing: "-0.5px" }}>
              CV Properties
            </Typography>
            <Chip
              label="AGENT"
              size="small"
              sx={{
                bgcolor: "#ECFDF5",
                color: "#017E53",
                fontWeight: 800,
                fontSize: "10px",
                height: "22px",
              }}
            />
          </Box>
        </Box>

        {/* Central Form Area */}
        <Box sx={{ my: "auto", py: 4, maxWidth: 400, width: "100%", mx: "auto" }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: 800, color: "#0F172A", letterSpacing: "-1px", mb: 1 }}
          >
            Welcome back
          </Typography>
          <Typography variant="body2" sx={{ color: "#64748B", mb: 4, fontSize: "14px" }}>
            Enter your credentials to manage your listings and client leads.
          </Typography>

          {error && (
            <Alert
              severity="error"
              onClose={() => setError("")}
              sx={{ mb: 3, borderRadius: "10px", fontSize: "12.5px" }}
            >
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <Box sx={{ mb: 2.5 }}>
              <label
                htmlFor="agent-email"
                style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#1E293B", marginBottom: "6px" }}
              >
                Work Email
              </label>
              <TextField
                id="agent-email"
                name="email"
                type="email"
                fullWidth
                size="small"
                placeholder="name@agency.com"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MailOutlined sx={{ color: "#94A3B8", fontSize: 18 }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                    bgcolor: "#F8FAFC",
                    "& fieldset": { borderColor: "#E2E8F0" },
                    "&:hover fieldset": { borderColor: "#CBD5E1" },
                    "&.Mui-focused": {
                      bgcolor: "#FFFFFF",
                      "& fieldset": { borderColor: "#017E53", borderWidth: "1.5px" },
                    },
                  },
                }}
              />
            </Box>

            <Box sx={{ mb: 3 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: "6px" }}>
                    <label
                    htmlFor="agent-password"
                    style={{ fontSize: "13px", fontWeight: 700, color: "#1E293B" }}
                    >
                    Password
                    </label>
                    <Link
                    to="/forgot-password"
                    style={{
                        fontSize: "12px",
                        fontWeight: 700,
                        color: "#017E53",
                        textDecoration: "none",
                    }}
                    >
                    Forgot password?
                    </Link>
                </Box>

                <Box sx={{ mb: 2 }}>                  
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
                </Box>

            <Button
              type="submit"
              fullWidth
              disabled={isLoading}
              variant="contained"
              endIcon={!isLoading && <ArrowForward sx={{ fontSize: 16 }} />}
              sx={{
                py: 1.3,
                borderRadius: "10px",
                bgcolor: "#017E53",
                color: "#FFFFFF",
                fontSize: "14px",
                fontWeight: 700,
                textTransform: "none",
                boxShadow: "none",
                "&:hover": {
                  bgcolor: "#016744",
                  boxShadow: "0 6px 16px rgba(1, 126, 83, 0.25)",
                },
              }}
            >
              {isLoading ? (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <CircularProgress size={18} color="inherit" />
                  <span>Signing in...</span>
                </Box>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Typography variant="body2" sx={{ color: "#64748B", fontSize: "13px" }}>
              New agent?{" "}
              <Link
                to="/register"
                style={{ color: "#017E53", fontWeight: 700, textDecoration: "none" }}
              >
                Create an agent account
              </Link>
            </Typography>
          </Box>
        </Box>

        {/* Footer info */}
        <Typography variant="caption" sx={{ color: "#94A3B8", fontSize: "11px" }}>
          © {new Date().getFullYear()} CV Properties Ltd. All rights reserved.
        </Typography>
      </Box>

      {/* RIGHT COLUMN: HERO VISUAL (Hidden on small mobile screens) */}
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          flex: 1,
          position: "relative",
          bgcolor: "#064E3B",
          backgroundImage:
            "linear-gradient(rgba(4, 47, 36, 0.75), rgba(4, 47, 36, 0.85)), url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          p: 8,
          flexDirection: "column",
          justifyContent: "space-between",
          color: "#FFFFFF",
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
            <Typography variant="caption" sx={{ fontWeight: 700, letterSpacing: "0.4px" }}>
              VERIFIED AGENT NETWORK
            </Typography>
          </Box>
        </Box>

        <Box sx={{ maxWidth: 480 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              letterSpacing: "-1.5px",
              lineHeight: 1.15,
              mb: 2,
            }}
          >
            Close deals faster. Manage listings effortlessly.
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "rgba(255, 255, 255, 0.8)", lineHeight: 1.6, fontSize: "15px", mb: 4 }}
          >
            Access real-time lead analytics, manage client inspections, and list verified properties directly across Nigeria's fastest growing network.
          </Typography>

          {/* Micro Stat Pill */}
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
              <TrendingUpOutlined sx={{ fontSize: 22 }} />
            </Box>
            <div>
              <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                98.4% Listing Approval Rate
              </Typography>
              <Typography variant="caption" sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
                Verified listings go live in under 2 hours
              </Typography>
            </div>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;