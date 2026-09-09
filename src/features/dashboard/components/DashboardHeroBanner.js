import React from "react";
import { Paper, Typography, Chip } from "@mui/material";
import { VerifiedUserOutlined, WarningAmberOutlined } from "@mui/icons-material";

const DashboardHeroBanner = ({ user, cards = [] }) => {
  const isVerified = user?.verified == 1;
  const verificationCount = cards.find((c) => c.key?.includes("verification"))?.value ?? 0;
  const activeBookingsCount = cards.find((c) => c.key?.includes("booking"))?.value ?? 0;
  const listingsCard = cards.find((c) => c.key?.includes("listings"));

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: "24px",
        p: { xs: 3, sm: 4 },
        mb: 3.5,
        color: "#FFFFFF",
        backgroundImage: `linear-gradient(to right, rgba(10, 15, 20, 0.92) 35%, rgba(10, 15, 20, 0.45)), url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: 180,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Chip
        icon={
          isVerified ? (
            <VerifiedUserOutlined sx={{ fontSize: "13px !important", color: "#10B981 !important" }} />
          ) : (
            <WarningAmberOutlined sx={{ fontSize: "13px !important", color: "#EF4444 !important" }} />
          )
        }
        label={isVerified ? "Verified Agent" : "Unverified Agent"}
        size="small"
        sx={{
          alignSelf: "flex-start",
          bgcolor: isVerified ? "rgba(16, 185, 129, 0.2)" : "rgba(239, 68, 68, 0.2)",
          color: isVerified ? "#10B981" : "#EF4444",
          fontWeight: 700,
          fontSize: "11px",
          height: 24,
          mb: 1.5,
          px: 0.5,
        }}
      />
      <Typography
        variant="h4"
        sx={{ fontWeight: 800, fontSize: { xs: "22px", sm: "30px" }, mb: 1, letterSpacing: "-0.5px" }}
      >
        Welcome back, {user?.firstname}!
      </Typography>
      <Typography
        variant="body2"
        sx={{ color: "#9CA3AF", maxWidth: "600px", fontSize: "12.5px", lineHeight: 1.6 }}
      >
        You have {verificationCount} property verifications pending and {activeBookingsCount} active
        bookings for this week. Your listings are performing {listingsCard?.percentage}%{" "}
        {listingsCard?.trend === "up" ? "better" : "worse"} than last month.
      </Typography>
    </Paper>
  );
};

export default DashboardHeroBanner;