import React from "react";
import { Box, TextField, InputAdornment, IconButton, Button } from "@mui/material";
import { Search, NotificationsNoneOutlined, Add, Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const DashboardHeader = () => {
  const navigate = useNavigate();

  const logout = () => {
    // Clear user session or token here if needed
    navigate("/login");
    sessionStorage.removeItem("userToken");
  }

  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
      {/* SEARCH PILL */}
      <TextField
        placeholder="Search listings, users, bookings..."
        size="small"
        sx={{
          width: { xs: "200px", sm: "320px", md: "380px" },
          "& .MuiOutlinedInput-root": {
            borderRadius: "30px",
            bgcolor: "#F9FAFB",
            fontSize: "13px",
            "& fieldset": { borderColor: "#E5E7EB" },
            "&:hover fieldset": { borderColor: "#D1D5DB" },
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search sx={{ color: "#9CA3AF", fontSize: 18 }} />
            </InputAdornment>
          ),
        }}
      />

      {/* RIGHT ACTIONS */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <IconButton
          sx={{
            border: "1px solid #E5E7EB",
            borderRadius: "50%",
            width: 38,
            height: 38,
            color: "#4B5563",
          }}
        >
          <NotificationsNoneOutlined sx={{ fontSize: 18 }} />
        </IconButton>

        <Button
          variant="contained"
          startIcon={<Logout />}
          onClick={() => logout()}
          sx={{
            bgcolor: "#10B981",
            color: "#FFFFFF",
            borderRadius: "24px",
            textTransform: "none",
            fontWeight: 700,
            fontSize: "12.5px",
            px: 2.2,
            py: 0.8,
            boxShadow: "none",
            "&:hover": { bgcolor: "#059669", boxShadow: "none" },
          }}
        >
          Log out
        </Button>
      </Box>
    </Box>
  );
};

export default DashboardHeader;