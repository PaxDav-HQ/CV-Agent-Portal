import React, { useState, useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";
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
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = sessionStorage.getItem("userToken");
      const baseUrl = uri ? uri.replace(/\/+$/, "") : "";

      const res = await axios.get(`${baseUrl}/agent/dashboard`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      setData(res.data?.data || res.data);
    } catch (err) {
      console.error("Failed to load agent dashboard data:", err);
      setError(
        err.response?.data?.message || "Failed to load dashboard data. Please try again."
      );
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
        <CircularProgress sx={{ color: "#017E53" }} />
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
        p: { xs: 1.5, sm: 2, md: 3 },
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
          
          <FeaturedListingsSection
            listings={listings}
            loading={loading}
            error={error}
            onRetry={fetchDashboard}
          />

          <RecentBookingsCard
            bookings={bookings}
            loading={loading}
            error={error}
            onRetry={fetchDashboard}
          />
        </Box>

        {/* ================= RIGHT COLUMN ================= */}
        <Box sx={{ minWidth: 0, display: "flex", flexDirection: "column", gap: 3.5 }}>
          <EarningsSnapshotCard earnings={earnings} />
          <AgentPayoutCard earnings={earnings} />
          
          <RecentActivityCard
            activities={recentActivities}
            loading={loading}
            error={error}
            onRetry={fetchDashboard}
            onClear={() => {
              setData((prev) => ({
                ...prev,
                recentActivities: [],
              }));
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default AgentDashboardMain;