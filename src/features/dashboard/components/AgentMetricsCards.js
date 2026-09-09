import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import {
  ApartmentOutlined,
  CalendarTodayOutlined,
  VerifiedUserOutlined,
  AccountBalanceWalletOutlined,
} from "@mui/icons-material";

const getMetricIcon = (iconName, color = "#10B981") => {
  const props = { sx: { fontSize: 20, color } };
  switch (iconName?.toLowerCase()) {
    case "building":
    case "apartment":
      return <ApartmentOutlined {...props} />;
    case "calendar":
    case "booking":
      return <CalendarTodayOutlined {...props} />;
    case "verified":
    case "verification":
      return <VerifiedUserOutlined {...props} />;
    case "wallet":
    case "money":
      return <AccountBalanceWalletOutlined {...props} />;
    default:
      return <ApartmentOutlined {...props} />;
  }
};

const AgentMetricsCards = ({ cards = [] }) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(4, 1fr)" },
        gap: 2,
        width: "100%",
        minWidth: 0,
      }}
    >
      {cards.map((card, idx) => (
        <Paper
          key={card.key || idx}
          elevation={0}
          sx={{
            p: 2.2,
            borderRadius: "18px",
            border: "1px solid #F1F5F9",
            bgcolor: "#FFFFFF",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            minHeight: 125,
            minWidth: 0,
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <Typography
              variant="caption"
              sx={{
                color: "#94A3B8",
                fontWeight: 700,
                fontSize: "10.5px",
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {card.title || card.key?.replace(/_/g, " ").toUpperCase()}
            </Typography>
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: "10px",
                bgcolor: card.bgColor || "#ECFDF5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {getMetricIcon(card.icon, card.color || "#10B981")}
            </Box>
          </Box>

          <div>
            <Typography variant="h4" sx={{ fontWeight: 900, color: "#0F172A", fontSize: "24px", my: 0.5 }}>
              {card.formatted ?? card.value}
            </Typography>
            <Typography variant="caption" sx={{ color: card.color || "#10B981", fontWeight: 700, fontSize: "11px" }}>
              {card.change || `${card.percentage}%`}{" "}
              <span style={{ color: "#94A3B8", fontWeight: 500 }}>{card.period || "vs last month"}</span>
            </Typography>
          </div>
        </Paper>
      ))}
    </Box>
  );
};

export default AgentMetricsCards;