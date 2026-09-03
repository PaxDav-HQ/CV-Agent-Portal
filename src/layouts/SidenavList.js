import React from "react";
import {
  Box,
  Typography,
  Avatar,
  Badge,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  DashboardOutlined,
  HomeWorkOutlined,
  CalendarTodayOutlined,
  AccountBalanceWalletOutlined,
  VerifiedUserOutlined,
  PersonOutlineOutlined,
  SettingsOutlined,
  KeyboardArrowDown,
  CheckCircle,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const MENU_ITEMS = [
  { title: "Dashboard", icon: <DashboardOutlined />, path: "/agent/dashboard" },
  { title: "My Listings", subtitle: "Properties & Services", icon: <HomeWorkOutlined />, path: "/agent/listings" },
  // { title: "Bookings", icon: <CalendarTodayOutlined />, path: "/agent/bookings" },
  { title: "Finance", icon: <AccountBalanceWalletOutlined />, path: "/agent/transactions" },
  { title: "Verification", icon: <VerifiedUserOutlined />, path: "/agent/verification" },
  { title: "Profile", icon: <PersonOutlineOutlined />, path: "/agent/profile" },
  // { title: "Settings", icon: <SettingsOutlined />, path: "/agent/settings" },
];

const SidenavList = ({ onCloseMobile }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = useSelector((state) => state.UserReducer?.userInfo);

  const handleNav = (path) => {
    navigate(path);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column", p: 2 }}>
      {/* USER PROFILE CARD */}
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 2, mb: 3 }}>
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          badgeContent={
            <Box
              sx={{
                bgcolor: "#10B981",
                width: 18,
                height: 18,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid #FFFFFF",
              }}
            >
              <CheckCircle sx={{ fontSize: 12, color: "#fff" }} />
            </Box>
          }
        >
          <Avatar
            src={currentUser?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"}
            sx={{ width: 58, height: 58 }}
          />
        </Badge>
        <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "#111827", mt: 1.2, lineHeight: 1.2 }}>
          {currentUser?.firstname ? `${currentUser.firstname} ${currentUser.lastname}` : "John Doe"}
        </Typography>
        <Typography variant="caption" sx={{ color: "#9CA3AF", fontSize: "11px", mb: 1.5 }}>
          Lagos, Nigeria
        </Typography>

        {/* ROLE SWITCHER PILL */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.8,
            px: 1.5,
            py: 0.6,
            borderRadius: "20px",
            bgcolor: "#F9FAFB",
            border: "1px solid #E5E7EB",
            cursor: "pointer",
          }}
        >
          <HomeWorkOutlined sx={{ fontSize: 14, color: "#10B981" }} />
          <Typography variant="caption" sx={{ fontSize: "11px", fontWeight: 700, color: "#374151" }}>
            Agent (Service Provider)
          </Typography>
          <KeyboardArrowDown sx={{ fontSize: 14, color: "#9CA3AF" }} />
        </Box>
      </Box>

      {/* NAVIGATION LIST */}
      <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
        <List disablePadding>
          {MENU_ITEMS.map((item) => {
            const isActive =
              location.pathname === item.path ||
              (item.path !== "/admin" && location.pathname.startsWith(item.path));

            return (
              <ListItem key={item.title} disablePadding sx={{ mb: 0.6 }}>
                <ListItemButton
                  onClick={() => handleNav(item.path)}
                  sx={{
                    borderRadius: "12px",
                    py: 1.2,
                    px: 1.8,
                    bgcolor: isActive ? "#10B981" : "transparent",
                    color: isActive ? "#FFFFFF" : "#4B5563",
                    "&:hover": {
                      bgcolor: isActive ? "#059669" : "#F3F4F6",
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 34, color: isActive ? "#FFFFFF" : "#6B7280" }}>
                    {React.cloneElement(item.icon, { sx: { fontSize: 20 } })}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.title}
                    secondary={item.subtitle}
                    primaryTypographyProps={{
                      fontSize: "13px",
                      fontWeight: isActive ? 700 : 600,
                      color: isActive ? "#FFFFFF" : "#1F2937",
                      lineHeight: 1.2,
                    }}
                    secondaryTypographyProps={{
                      fontSize: "10px",
                      color: isActive ? "#D1FAE5" : "#9CA3AF",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Box>
  );
};

export default SidenavList;