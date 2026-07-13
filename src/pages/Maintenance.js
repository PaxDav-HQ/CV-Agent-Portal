import React from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import { EngineeringOutlined, ArrowBackOutlined } from "@mui/icons-material";

// Background backdrop asset link
const MaintenanceBackdrop = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80";

const Maintenance = () => {
  return (
    <Box
      className="font-poppins"
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        backgroundImage: `url(${MaintenanceBackdrop})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        px: 2,
      }}
    >
      {/* Deep Forest Green Overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, rgba(1, 28, 14, 0.94) 0%, rgba(2, 44, 22, 0.88) 100%)",
          zIndex: 1,
        }}
      />

      {/* Main Banner Card */}
      <Paper
        elevation={0}
        sx={{
          position: "relative",
          zIndex: 2,
          maxWidth: "500px",
          width: "100%",
          p: { xs: 4, md: 6 },
          textAlign: "center",
          borderRadius: "24px",
          bgcolor: "rgba(255, 255, 255, 0.04)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          color: "#ffffff",
          boxShadow: "0 30px 60px rgba(0,0,0,0.4)",
        }}
      >
        {/* Animated Icon Box */}
        <Box
          sx={{
            display: "inline-flex",
            p: 2,
            borderRadius: "50%",
            bgcolor: "rgba(34, 197, 94, 0.15)",
            color: "#22C55E",
            mb: 3,
            animation: "pulse 2.5s infinite ease-in-out",
            "@keyframes pulse": {
              "0%": { transform: "scale(1)" },
              "50%": { transform: "scale(1.05)" },
              "100%": { transform: "scale(1)" },
            },
          }}
        >
          <EngineeringOutlined sx={{ fontSize: 42 }} />
        </Box>

        <Typography 
          variant="caption"       
          sx={{ 
            color: "#22C55E", 
            fontWeight: 700, 
            letterSpacing: "2px", 
            textTransform: "uppercase", 
            display: "block", 
            mb: 1,
            fontFamily: 'Poppins'
          }}
        >
          CV Properties
        </Typography>
        
        <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: "-1px", mb: 2, fontFamily: 'Poppins' }}>
          Portal Under Maintenance
        </Typography>

        <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.6, mb: 4, fontSize: "15px", fontFamily: 'Poppins' }}>
          The Agent Portal is currently undergoing system development and infrastructure upgrades.
        </Typography>

        <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.4)", fontStyle: "italic", mb: 2, fontSize: "13px", fontFamily: 'Poppins' }}>
          Please check back shortly. Thank you for your patience.
        </Typography>

        {/* Global Escape Button */}
        <Button
          onClick={() => window.location.href = "https://cvproperties.co"}
          startIcon={<ArrowBackOutlined />}
          variant="outlined"
          sx={{
            mt: 2,
            color: "#ffffff",
            borderColor: "rgba(255,255,255,0.2)",
            borderRadius: "12px",
            textTransform: "none",
            fontWeight: 600,
            px: 3,
            py: 1,
            fontFamily: 'Poppins',
            "&:hover": { 
              borderColor: "#ffffff", 
              bgcolor: "rgba(255,255,255,0.05)" 
            },
          }}
        >
          Return to Main Website
        </Button>
      </Paper>
    </Box>
  );
};

export default Maintenance;