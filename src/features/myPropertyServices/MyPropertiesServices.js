import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { ChevronRight } from "@mui/icons-material";

import { DUMMY_PROPERTIES, DUMMY_SERVICES } from "./data/dummyListingsData";
import PropertiesServicesHeader from "./components/PropertiesServicesHeader";
import PropertiesFilterTabs from "./components/PropertiesFilterTabs";
import PropertyCardItem from "./components/PropertyCardItem";
import ServiceCardItem from "./components/ServiceCardItem";
import CommunityTrustBanner from "./components/CommunityTrustBanner";

const MyPropertiesServices = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [status, setStatus] = useState("All");
  const [type, setType] = useState("All");
  const [search, setSearch] = useState("");

  const showProperties = activeTab === "all" || activeTab === "properties";
  const showServices = activeTab === "all" || activeTab === "services";

  return (
    <Box
      sx={{
        backgroundColor: "#FAFBFC",
        minHeight: "100vh",
        width: "100%",
        maxWidth: "100%",
        overflowX: "hidden",
        boxSizing: "border-box",
        pb: 6,
      }}
    >
      {/* 1. Header View */}
      <PropertiesServicesHeader />

      {/* 2. Filter Navigation & Add CTA (Routes to /agent/property-types) */}
      <PropertiesFilterTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        status={status}
        onStatusChange={setStatus}
        type={type}
        onTypeChange={setType}
        search={search}
        onSearchChange={setSearch}
        counts={{
          all: DUMMY_PROPERTIES.length + DUMMY_SERVICES.length,
          properties: DUMMY_PROPERTIES.length,
          services: DUMMY_SERVICES.length,
        }}
      />

      {/* 3. Properties Section */}
      {showProperties && (
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "#111827", fontSize: "15px" }}>
                Properties ({DUMMY_PROPERTIES.length})
              </Typography>
            </Box>
            <Button size="small" endIcon={<ChevronRight />} sx={{ textTransform: "none", color: "#017E53", fontWeight: 700, fontSize: "12px" }}>
              View all
            </Button>
          </Box>

          {DUMMY_PROPERTIES.map((property) => (
            <PropertyCardItem key={property.id} property={property} />
          ))}
        </Box>
      )}

      {/* 4. Services Section */}
      {showServices && (
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "#111827", fontSize: "15px" }}>
                Services ({DUMMY_SERVICES.length})
              </Typography>
            </Box>
            <Button size="small" endIcon={<ChevronRight />} sx={{ textTransform: "none", color: "#017E53", fontWeight: 700, fontSize: "12px" }}>
              View all
            </Button>
          </Box>

          {DUMMY_SERVICES.map((service) => (
            <ServiceCardItem key={service.id} service={service} />
          ))}
        </Box>
      )}

      {/* 5. Bottom Community Trust Banner */}
      <CommunityTrustBanner />
    </Box>
  );
};

export default MyPropertiesServices;