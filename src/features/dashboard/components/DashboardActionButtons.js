import React from "react";
import { Box, Button } from "@mui/material";
import { Add, HandymanOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const DashboardActionButtons = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
        gap: 2,
        width: "100%",
      }}
    >
      <Button
        fullWidth
        variant="contained"
        startIcon={<Add />}
        onClick={() => navigate("/agent/property-types")}
        sx={{
          bgcolor: "#10B981",
          color: "#FFFFFF",
          fontWeight: 700,
          fontSize: "13.5px",
          borderRadius: "14px",
          py: 1.5,
          textTransform: "none",
          boxShadow: "none",
          "&:hover": { bgcolor: "#059669", boxShadow: "none" },
        }}
      >
        List New Property
      </Button>

      <Button
        fullWidth
        variant="outlined"
        startIcon={<HandymanOutlined sx={{ color: "#10B981" }} />}
        onClick={() => navigate("/agent/offer-services")}
        sx={{
          borderColor: "#E5E7EB",
          bgcolor: "#FFFFFF",
          color: "#1F2937",
          fontWeight: 700,
          fontSize: "13.5px",
          borderRadius: "14px",
          py: 1.5,
          textTransform: "none",
          "&:hover": { bgcolor: "#F9FAFB", borderColor: "#D1D5DB" },
        }}
      >
        Offer New Service
      </Button>
    </Box>
  );
};

export default DashboardActionButtons;