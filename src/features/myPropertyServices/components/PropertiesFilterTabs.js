import React from "react";
import {
  Box,
  Button,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import { Add, Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const PropertiesFilterTabs = ({
  activeTab,
  onTabChange,
  status,
  onStatusChange,
  type,
  onTypeChange,
  search,
  onSearchChange,
  counts = { all: 12, properties: 8, services: 4 },
}) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ mb: 3 }}>
      {/* TABS ROW & PRIMARY ACTION */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2, mb: 2.5 }}>
        <Box sx={{ display: "flex", gap: 3, borderBottom: "1px solid #E5E7EB", pb: 0.5, flexGrow: 1 }}>
          {[
            { key: "all", label: `All (${counts.all})` },
            { key: "properties", label: `Properties (${counts.properties})` },
            { key: "services", label: `Services (${counts.services})` },
          ].map((tab) => {
            const isSelected = activeTab === tab.key;
            return (
              <Button
                key={tab.key}
                onClick={() => onTabChange(tab.key)}
                sx={{
                  textTransform: "none",
                  fontWeight: 700,
                  fontSize: "13px",
                  p: 0,
                  pb: 1,
                  minWidth: "auto",
                  color: isSelected ? "#017E53" : "#6B7280",
                  borderBottom: isSelected ? "2.5px solid #017E53" : "none",
                  borderRadius: 0,
                  "&:hover": { bgcolor: "transparent", color: "#017E53" },
                }}
              >
                {tab.label}
              </Button>
            );
          })}
        </Box>

        {/* LIST NEW BUTTON */}
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => navigate("/agent/property-types")}
          sx={{
            bgcolor: "#017E53",
            color: "#FFFFFF",
            borderRadius: "10px",
            textTransform: "none",
            fontWeight: 700,
            fontSize: "12.5px",
            px: 2.5,
            py: 0.9,
            boxShadow: "none",
            "&:hover": { bgcolor: "#016744", boxShadow: "none" },
          }}
        >
          List New
        </Button>
      </Box>

      {/* FILTER DROPDOWNS & SEARCH INPUT */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flexWrap: "wrap" }}>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <Select
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
            displayEmpty
            sx={{
              borderRadius: "10px",
              bgcolor: "#FFFFFF",
              fontSize: "12.5px",
              fontWeight: 600,
              color: "#374151",
              "& fieldset": { borderColor: "#E5E7EB" },
            }}
          >
            <MenuItem value="All">Status</MenuItem>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 120 }}>
          <Select
            value={type}
            onChange={(e) => onTypeChange(e.target.value)}
            displayEmpty
            sx={{
              borderRadius: "10px",
              bgcolor: "#FFFFFF",
              fontSize: "12.5px",
              fontWeight: 600,
              color: "#374151",
              "& fieldset": { borderColor: "#E5E7EB" },
            }}
          >
            <MenuItem value="All">Type</MenuItem>
            <MenuItem value="Duplex">Duplex</MenuItem>
            <MenuItem value="Apartment">Apartment</MenuItem>
            <MenuItem value="Event Center">Event Center</MenuItem>
          </Select>
        </FormControl>

        <TextField
          size="small"
          placeholder="Search by title or location"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          sx={{
            flexGrow: 1,
            minWidth: "220px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
              bgcolor: "#FFFFFF",
              fontSize: "12.5px",
              "& fieldset": { borderColor: "#E5E7EB" },
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
      </Box>
    </Box>
  );
};

export default PropertiesFilterTabs;