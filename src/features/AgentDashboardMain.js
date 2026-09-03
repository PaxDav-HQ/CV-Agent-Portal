import React from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  LinearProgress,
  Avatar,
  AvatarGroup,
  Chip,
  Divider,
} from "@mui/material";
import {
  HomeWorkOutlined,
  CalendarTodayOutlined,
  VerifiedUserOutlined,
  AccountBalanceWalletOutlined,
  Add,
  HandymanOutlined,
  ChevronRight,
  FiberManualRecord,
  LocationOnOutlined,
  ReceiptOutlined,
  WarningAmberOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AgentDashboardMain = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.UserReducer.userInfo);

  const metrics = [
    { label: "TOTAL LISTINGS", value: "42", change: "+9.2%", icon: <HomeWorkOutlined sx={{ color: "#10B981" }} /> },
    { label: "ACTIVE BOOKINGS", value: "18", change: "+12%", icon: <CalendarTodayOutlined sx={{ color: "#10B981" }} /> },
    { label: "VERIFICATION", value: "03", change: "+3.4%", icon: <VerifiedUserOutlined sx={{ color: "#10B981" }} /> },
    { label: "TOTAL EARNINGS", value: "N4.2M", change: "+8.1%", icon: <AccountBalanceWalletOutlined sx={{ color: "#10B981" }} /> },
  ];

  const featuredListings = [
    {
      title: "Azure Heights Penthous",
      price: "₦850k/yr",
      status: "Available",
      statusColor: "#10B981",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=300",
    },
    {
      title: "Greenview Modern Stud",
      price: "₦420k/yr",
      status: "Occupied",
      statusColor: "#F59E0B",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=300",
    },
    {
      title: "Silicon Plaza Office Spa",
      price: "₦1.2M/yr",
      status: "Available",
      statusColor: "#10B981",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=300",
    },
  ];

  const recentBookings = [
    { initial: "SW", name: "Sarah Williams", date: "May 12, 2024 • Azure Heights", price: "₦120,000", status: "Confirmed", statusBg: "#ECFDF5", statusColor: "#047857" },
    { initial: "DO", name: "David Okoro", date: "May 11, 2024 • Greenview Studio", price: "₦45,000", status: "Pending", statusBg: "#FFFBEB", statusColor: "#B45309" },
    { initial: "MC", name: "Michael Chen", date: "May 10, 2024 • Silicon Plaza", price: "₦85,000", status: "Confirmed", statusBg: "#ECFDF5", statusColor: "#047857" },
    { initial: "AB", name: "Amita Barol", date: "May 09, 2024 • Office Suite", price: "₦60,000", status: "Confirmed", statusBg: "#ECFDF5", statusColor: "#047857" },
    { initial: "TA", name: "Tobi Adebayo", date: "May 08, 2024 • Studio 4", price: "₦40,000", status: "Cancelled", statusBg: "#FEF2F2", statusColor: "#B91C1C" },
  ];

  const recentActivities = [
    { title: "Property 'Azure Heights' verified", time: "15 hrs ago", icon: <VerifiedUserOutlined sx={{ fontSize: 16, color: "#10B981" }} />, bg: "#ECFDF5" },
    { title: "Payout of ₦450k successful", time: "2 hours ago", icon: <ReceiptOutlined sx={{ fontSize: 16, color: "#3B82F6" }} />, bg: "#EFF6FF" },
    { title: "Document update for Lekki Villa", time: "Yesterday", icon: <WarningAmberOutlined sx={{ fontSize: 16, color: "#EF4444" }} />, bg: "#FEF2F2" },
  ];

  return (
    <Box sx={{ width: "100%", maxWidth: "100%", minWidth: 0 }}>
      {/* 1. HERO BANNER */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: "20px",
          p: { xs: 3, md: 4 },
          mb: 3,
          color: "#FFFFFF",
          backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.85) 45%, rgba(0, 0, 0, 0.2)), url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "170px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Chip
          icon={<LocationOnOutlined sx={{ fontSize: "14px !important", color: "#10B981 !important" }} />}
          label="Victoria Island, Lagos"
          size="small"
          sx={{
            alignSelf: "flex-start",
            bgcolor: "rgba(16, 185, 129, 0.15)",
            color: "#10B981",
            fontWeight: 700,
            fontSize: "11px",
            mb: 1.5,
          }}
        />
        <Typography variant="h4" sx={{ fontWeight: 800, fontSize: { xs: "22px", md: "28px" }, mb: 0.8 }}>
          Welcome back, {user?.firstname}!
        </Typography>
        <Typography variant="body2" sx={{ color: "#D1D5DB", maxWidth: "600px", fontSize: "12.5px", lineHeight: 1.5 }}>
          You have 3 property verifications pending and 18 active bookings for this week. Your listings are performing 12% better than last month.
        </Typography>
      </Paper>

      {/* 2. TOP METRICS & EARNINGS ROW */}
      <div className="row g-3 mb-4 mx-0">
        {/* LEFT 4 METRIC CARDS */}
        <div className="col-12 col-xl-8 px-1">
          <div className="row g-2.5 mx-0">
            {metrics.map((m, idx) => (
              <div key={idx} className="col-6 col-sm-3 px-1">
                <Paper elevation={0} className="p-3 border h-100" sx={{ borderRadius: "16px", bgcolor: "#fff" }}>
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <Typography variant="caption" sx={{ color: "#9CA3AF", fontWeight: 700, fontSize: "10px" }}>
                      {m.label}
                    </Typography>
                    <Box sx={{ p: 0.6, bgcolor: "#ECFDF5", borderRadius: "8px", display: "flex" }}>
                      {m.icon}
                    </Box>
                  </div>
                  <Typography variant="h5" sx={{ fontWeight: 800, color: "#111827", my: 0.5 }}>
                    {m.value}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#10B981", fontWeight: 700, fontSize: "10.5px" }}>
                    {m.change} <span style={{ color: "#9CA3AF", fontWeight: 400 }}>vs last month</span>
                  </Typography>
                </Paper>
              </div>
            ))}
          </div>

          {/* ACTION BUTTONS */}
          <div className="row g-2 mt-2.5 mx-0">
            <div className="col-12 col-sm-6 px-1">
              <Button
                fullWidth
                variant="contained"
                disabled
                startIcon={<Add />}
                onClick={() => navigate("/agent/property-types")}
                sx={{
                  bgcolor: "#10B981",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "12.5px",
                  borderRadius: "12px",
                  py: 1.3,
                  textTransform: "none",
                  boxShadow: "none",
                  "&:hover": { bgcolor: "#059669", boxShadow: "none" },
                }}
              >
                List New Property
              </Button>
            </div>
            <div className="col-12 col-sm-6 px-1">
              <Button
                fullWidth
                variant="outlined"
                startIcon={<HandymanOutlined />}
                sx={{
                  borderColor: "#E5E7EB",
                  bgcolor: "#FFFFFF",
                  color: "#374151",
                  fontWeight: 700,
                  fontSize: "12.5px",
                  borderRadius: "12px",
                  py: 1.3,
                  textTransform: "none",
                  "&:hover": { bgcolor: "#F9FAFB", borderColor: "#D1D5DB" },
                }}
              >
                Offer New Service
              </Button>
            </div>
          </div>
        </div>

        {/* RIGHT EARNINGS SNAPSHOT */}
        <div className="col-12 col-xl-4 px-1">
          <Paper elevation={0} className="p-3.5 border h-100 d-flex flex-column justify-content-between" sx={{ borderRadius: "18px", bgcolor: "#fff" }}>
            <div>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <Typography variant="caption" sx={{ color: "#9CA3AF", fontWeight: 700, fontSize: "10.5px" }}>
                  EARNINGS SNAPSHOT
                </Typography>
                <Chip label="Payout" size="small" sx={{ bgcolor: "#F3F4F6", fontSize: "10px", fontWeight: 700, height: 20 }} />
              </div>
              <Typography variant="h4" sx={{ fontWeight: 800, color: "#111827", mb: 0.5 }}>
                ₦942,000
              </Typography>
              <Typography variant="caption" sx={{ color: "#10B981", fontWeight: 600, display: "flex", alignItems: "center", gap: 0.5, fontSize: "11px" }}>
                <FiberManualRecord sx={{ fontSize: 8 }} /> ₦125,000 pending payout
              </Typography>
            </div>

            <Box sx={{ mt: 2.5 }}>
              <div className="d-flex justify-content-between align-items-center mb-1">
                <Typography variant="caption" sx={{ color: "#6B7280", fontSize: "11px" }}>Monthly Goal</Typography>
                <Typography variant="caption" sx={{ fontWeight: 700, color: "#111827", fontSize: "11px" }}>₦1.5M</Typography>
              </div>
              <LinearProgress variant="determinate" value={65} sx={{ height: 6, borderRadius: 3, bgcolor: "#E5E7EB", "& .MuiLinearProgress-bar": { bgcolor: "#10B981" } }} />
            </Box>
          </Paper>
        </div>
      </div>

      {/* 3. MIDDLE ROW: FEATURED LISTINGS & PENDING VERIFICATIONS */}
      <div className="row g-3 mb-4 mx-0">
        {/* FEATURED LISTINGS */}
        <div className="col-12 col-xl-8 px-1">
          <div className="d-flex justify-content-between align-items-center mb-2.5">
            <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "#111827" }}>
              Featured Listings
            </Typography>
            <Button size="small" endIcon={<ChevronRight />} onClick={() => navigate("/agent/listings")} sx={{ textTransform: "none", color: "#10B981", fontWeight: 700, fontSize: "12px" }}>
              View all
            </Button>
          </div>

          <div className="row g-2.5 mx-0">
            {featuredListings.map((item, idx) => (
              <div key={idx} className="col-12 col-sm-4 px-1">
                <Box
                  sx={{
                    position: "relative",
                    borderRadius: "16px",
                    overflow: "hidden",
                    height: 150,
                    backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 60%), url('${item.image}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Chip
                    label={item.status}
                    size="small"
                    sx={{
                      alignSelf: "flex-start",
                      bgcolor: item.statusColor,
                      color: "#fff",
                      fontSize: "9.5px",
                      fontWeight: 700,
                      height: 18,
                    }}
                  />
                  <div>
                    <Typography variant="subtitle2" sx={{ color: "#fff", fontWeight: 700, fontSize: "12.5px" }}>
                      {item.title}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#D1FAE5", fontWeight: 800, fontSize: "11.5px" }}>
                      {item.price}
                    </Typography>
                  </div>
                </Box>
              </div>
            ))}
          </div>
        </div>

        {/* PENDING VERIFICATIONS WIDGET */}
        <div className="col-12 col-xl-4 px-1">
          <Paper
            elevation={0}
            sx={{
              borderRadius: "18px",
              p: 3,
              bgcolor: "#10B981",
              color: "#FFFFFF",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "#fff", mb: 0.5 }}>
                Pending Verifications
              </Typography>
              <Typography variant="body2" sx={{ color: "#D1FAE5", fontSize: "11.5px", mb: 2 }}>
                3 properties need your urgent review to go live.
              </Typography>
              <AvatarGroup max={4} sx={{ justifyContent: "flex-start", "& .MuiAvatar-root": { width: 30, height: 30, fontSize: 11 } }}>
                <Avatar src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60" />
                <Avatar src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60" />
                <Avatar src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=60" />
                <Avatar>+3</Avatar>
              </AvatarGroup>
            </div>

            <Button
              fullWidth
              variant="contained"
              sx={{
                bgcolor: "#FFFFFF",
                color: "#065F46",
                fontWeight: 800,
                fontSize: "12px",
                textTransform: "none",
                borderRadius: "10px",
                py: 1,
                mt: 2,
                boxShadow: "none",
                "&:hover": { bgcolor: "#F9FAFB", boxShadow: "none" },
              }}
            >
              Review Now
            </Button>
          </Paper>
        </div>
      </div>

      {/* 4. BOTTOM ROW: RECENT BOOKINGS & RECENT ACTIVITY */}
      <div className="row g-3 mb-4 mx-0">
        {/* RECENT BOOKINGS */}
        <div className="col-12 col-xl-8 px-1">
          <Paper elevation={0} className="p-3.5 border" sx={{ borderRadius: "18px", bgcolor: "#fff" }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "#111827" }}>
                Recent Bookings
              </Typography>
              <Button size="small" sx={{ textTransform: "none", color: "#6B7280", fontSize: "11.5px" }}>
                View all
              </Button>
            </div>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              {recentBookings.map((b, idx) => (
                <div key={idx} className="d-flex align-items-center justify-content-between p-1">
                  <div className="d-flex align-items-center gap-2.5">
                    <Avatar sx={{ bgcolor: "#ECFDF5", color: "#065F46", fontWeight: 700, fontSize: "12px", width: 36, height: 36 }}>
                      {b.initial}
                    </Avatar>
                    <div>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#111827", fontSize: "12.5px" }}>
                        {b.name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: "#9CA3AF", fontSize: "11px" }}>
                        {b.date}
                      </Typography>
                    </div>
                  </div>
                  <div className="text-end">
                    <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "#111827", fontSize: "12.5px" }}>
                      {b.price}
                    </Typography>
                    <Chip label={b.status} size="small" sx={{ bgcolor: b.statusBg, color: b.statusColor, fontWeight: 700, fontSize: "9.5px", height: 18 }} />
                  </div>
                </div>
              ))}
            </Box>
          </Paper>
        </div>

        {/* RECENT ACTIVITY */}
        <div className="col-12 col-xl-4 px-1">
          <Paper elevation={0} className="p-3.5 border h-100" sx={{ borderRadius: "18px", bgcolor: "#fff" }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "#111827" }}>
                Recent Activity
              </Typography>
              <Button size="small" sx={{ textTransform: "none", color: "#9CA3AF", fontSize: "11.5px" }}>
                Clear
              </Button>
            </div>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {recentActivities.map((act, idx) => (
                <div key={idx} className="d-flex align-items-start gap-2.5">
                  <Box sx={{ p: 0.8, bgcolor: act.bg, borderRadius: "50%", display: "flex", mt: 0.2 }}>
                    {act.icon}
                  </Box>
                  <div>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "#1F2937", fontSize: "12px", lineHeight: 1.3 }}>
                      {act.title}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#9CA3AF", fontSize: "10.5px" }}>
                      {act.time}
                    </Typography>
                  </div>
                </div>
              ))}
            </Box>
          </Paper>
        </div>
      </div>

      {/* 5. FOOTER */}
      <Divider sx={{ my: 3 }} />
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-2 pb-4">
        <Typography variant="caption" sx={{ color: "#9CA3AF", fontSize: "11px" }}>
          © 2026 PaxDav Technologies / Real Estate Management, Agent Dashboard. All rights reserved.
        </Typography>
        <Box sx={{ display: "flex", gap: 2.5 }}>
          <Typography variant="caption" sx={{ color: "#6B7280", cursor: "pointer", fontSize: "11px" }}>
            Help Center
          </Typography>
          <Typography variant="caption" sx={{ color: "#6B7280", cursor: "pointer", fontSize: "11px" }}>
            Terms of Service
          </Typography>
          <Typography variant="caption" sx={{ color: "#6B7280", cursor: "pointer", fontSize: "11px" }}>
            Privacy Policy
          </Typography>
        </Box>
      </div>
    </Box>
  );
};

export default AgentDashboardMain;