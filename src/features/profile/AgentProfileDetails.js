import React, { useState, useEffect, useCallback } from "react";
import { Box, Typography, CircularProgress, Alert, Breadcrumbs, Link } from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";

import ProfileHeaderCard from "./components/ProfileHeaderCard";
import ProfessionalSummaryCard from "./components/ProfessionalSummaryCard";
import VerifiedStatusCard from "./components/VerifiedStatusCard";
import ContactAvailabilityCard from "./components/ContactAvailabilityCard";
import ClientReviewsSection from "./components/ClientReviewsSection";
import EditProfileModal from "./components/EditProfileModal";

const AgentProfileDetails = () => {
  const uri = useSelector((state) => state.UriReducer?.uri);
  const token = sessionStorage.getItem("userToken");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const baseUrl = uri ? uri.replace(/\/+$/, "") : "";
      const res = await axios.get(`${baseUrl}/agent/my/profile`, { headers });

      setProfileData(res.data?.data || res.data);
    } catch (err) {
      console.error("Failed to load agent profile details:", err);
      setError(err.response?.data?.message || "Could not retrieve profile information.");
    } finally {
      setLoading(false);
    }
  }, [uri, token]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  if (loading && !profileData) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh" }}>
        <CircularProgress sx={{ color: "#017E53" }} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: "#FAFBFC",
        minHeight: "100vh",
        width: "100%",
        maxWidth: "100%",
        overflowX: "hidden",
        boxSizing: "border-box",
        p: { xs: 1, md: 1 },
      }}
    >
      {/* 1. Breadcrumbs & Title */}
      <Box sx={{ mb: 3 }}>
        <Breadcrumbs sx={{ fontSize: "12px", color: "#9CA3AF", mb: 0.5 }}>
          <Link underline="hover" color="inherit" href="#">
            Management
          </Link>
          <Link underline="hover" color="inherit" href="#">
            Service Providers
          </Link>
          <Typography sx={{ fontSize: "12px", color: "#4B5563", fontWeight: 600 }}>
            Profile Details
          </Typography>
        </Breadcrumbs>

        <Typography variant="h5" sx={{ fontWeight: 800, color: "#111827", fontSize: { xs: "22px", md: "26px" } }}>
          {profileData?.header?.title || "Provider Profile"}
        </Typography>
      </Box>

      {/* Error Alert */}
      {error && (
        <Box sx={{ mb: 3 }}>
          <Alert severity="error" sx={{ borderRadius: "12px" }}>
            {error}
          </Alert>
        </Box>
      )}

      {/* 2. Profile Banner & Stats Card */}
      <ProfileHeaderCard
        profile={profileData?.profile}
        kpiMetrics={profileData?.kpiMetrics}
        onEditClick={() => setIsEditModalOpen(true)}
      />

      {/* 3. Two-Column Layout */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "1.7fr 1fr" },
          gap: 3,
          alignItems: "start",
        }}
      >
        {/* Left Column: Summary & Reviews */}
        <Box sx={{ minWidth: 0 }}>
          <ProfessionalSummaryCard
            summary={profileData?.professionalSummary}
            onEditClick={() => setIsEditModalOpen(true)}
          />
          <ClientReviewsSection reviewsData={profileData?.recentClientReviews} />
        </Box>

        {/* Right Column: Verification & Availability */}
        <Box sx={{ minWidth: 0 }}>
          <VerifiedStatusCard verifiedAccount={profileData?.verifiedAccount} />
          <ContactAvailabilityCard
            contactInfo={profileData?.contactAndAvailability}
            onEditClick={() => setIsEditModalOpen(true)}
          />
        </Box>
      </Box>

      {/* 4. Edit Profile Modal Dialog */}
      <EditProfileModal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        profileData={profileData}
        onProfileUpdated={fetchProfile}
      />
    </Box>
  );
};

export default AgentProfileDetails;