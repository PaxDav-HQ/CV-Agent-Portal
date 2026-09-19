import React, { useState, useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";
import {
  ReceiptOutlined,
  WarningAmberOutlined,
  CheckCircleOutlined,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import axios from "axios";

import DashboardHeroBanner from "./components/DashboardHeroBanner";
import AgentMetricsCards from "./components/AgentMetricsCards";
import DashboardActionButtons from "./components/DashboardActionButtons";
import FeaturedListingsSection from "./components/FeaturedListingsSection";
import RecentBookingsCard from "./components/RecentBookingsCard";
import EarningsSnapshotCard from "./components/EarningsSnapshotCard";
import AgentPayoutCard from "./components/AgentPayoutCard";
import RecentActivityCard from "./components/RecentActivityCard";

const AgentDashboardMain = () => {
  const user = useSelector((state) => state.UserReducer?.userInfo);
  const uri = useSelector((state) => state.UriReducer?.uri);

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const token = sessionStorage.getItem("userToken");
      const res = await axios.get(`${uri}agent/dashboard`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      console.log(res.data)
      setData(res.data);
    } catch (err) {
      console.error("Failed to load agent dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  const cards = data?.webAnalytics?.cards || [];
  const earnings = data?.webAnalytics?.earningsSnapshot;
  const listings = data?.featuredListings || [];
  const bookings = data?.recentBookings || [];

  const recentActivities = data?.recentActivities || [];

  if (loading && !data) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh" }}>
        <CircularProgress sx={{ color: "#10B981" }} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "100%",
        minWidth: 0,
        overflowX: "hidden",
        boxSizing: "border-box",
        p: { xs: 1, sm: 1, md: 2 },
        bgcolor: "#FBFBFC",
        minHeight: "100vh",
      }}
    >
      {/* 1. Hero Banner */}
      <DashboardHeroBanner user={user} cards={cards} />

      {/* 2. Main Dashboard Content Grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "1fr 340px" },
          gap: 3.5,
          alignItems: "start",
          width: "100%",
          minWidth: 0,
        }}
      >
        {/* ================= LEFT COLUMN ================= */}
        <Box sx={{ minWidth: 0, display: "flex", flexDirection: "column", gap: 3.5 }}>
          <AgentMetricsCards cards={cards} />
          <DashboardActionButtons />
          <FeaturedListingsSection listings={listings} />
          <RecentBookingsCard bookings={bookings} />
        </Box>

        {/* ================= RIGHT COLUMN ================= */}
        <Box sx={{ minWidth: 0, display: "flex", flexDirection: "column", gap: 3.5 }}>
          <EarningsSnapshotCard earnings={earnings} />
          <AgentPayoutCard earnings={earnings} />
          <RecentActivityCard activities={recentActivities} />
        </Box>
      </Box>
    </Box>
  );
};

export default AgentDashboardMain;