import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Typography,
  Button,
  Pagination,
  FormControl,
  Select,
  MenuItem,
  Skeleton,
  Paper,
} from "@mui/material";
import {
  ChevronRight,
  ErrorOutlined,
  Refresh,
  SearchOffOutlined,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import axios from "axios";

import PropertiesServicesHeader from "./components/PropertiesServicesHeader";
import PropertiesFilterTabs from "./components/PropertiesFilterTabs";
import PropertyCardItem from "./components/PropertyCardItem";
import ServiceCardItem from "./components/ServiceCardItem";
import CommunityTrustBanner from "./components/CommunityTrustBanner";

const MyPropertiesServices = () => {
  const uri = useSelector((state) => state.UriReducer.uri);
  const token = sessionStorage.getItem("userToken");

  const [activeTab, setActiveTab] = useState("all");
  const [status, setStatus] = useState("all");
  const [type, setType] = useState("All");
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
    hasNext: false,
    hasPrev: false,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    properties: [],
    services: [],
    counts: { all: 0, properties: 0, services: 0 },
  });

  // Dedicated fetch handler accepting explicit page and limit arguments
  const fetchListings = useCallback(
    async (targetPage = 1, targetLimit = limit) => {
      try {
        setLoading(true);
        setError(null);

        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const baseUrl = uri ? uri.replace(/\/+$/, "") : "";

        const params = {
          tab: activeTab,
          status: status.toLowerCase(),
          page: targetPage,
          limit: targetLimit,
        };

        if (search.trim()) {
          params.q = search.trim();
        }

        if (type && type !== "All") {
          params.type = type;
        }

        const endpoint = `${baseUrl}/agent/my/all-listings`;

        const response = await axios.get(endpoint, {
          params,
          headers,
        });

        const resData = response.data?.data || response.data || {};

        const fetchedProperties =
          resData.properties || resData.listings?.properties || [];
        const fetchedServices =
          resData.services || resData.listings?.services || [];

        const counts = resData.counts || {
          all:
            resData.total ||
            fetchedProperties.length + fetchedServices.length,
          properties: resData.totalProperties ?? fetchedProperties.length,
          services: resData.totalServices ?? fetchedServices.length,
        };

        const paginationMeta =
          resData.pagination || response.data?.pagination;
        if (paginationMeta) {
          setPagination({
            total: paginationMeta.total ?? 0,
            page: paginationMeta.page ?? targetPage,
            limit: paginationMeta.limit ?? targetLimit,
            totalPages: paginationMeta.totalPages ?? 1,
            hasNext: Boolean(paginationMeta.hasNext),
            hasPrev: Boolean(paginationMeta.hasPrev),
          });
        }

        setData({
          properties: fetchedProperties,
          services: fetchedServices,
          counts,
        });
      } catch (err) {
        console.error("Failed to fetch agent listings:", err);
        setError(
          err.response?.data?.message ||
            "Failed to load listings. Check your network connection and try again."
        );
      } finally {
        setLoading(false);
      }
    },
    [uri, token, activeTab, status, type, search, limit]
  );

  // Debounced filter triggers
  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1);
      fetchListings(1, limit);
    }, 350);

    return () => clearTimeout(timer);
  }, [activeTab, status, type, search]);

  const handlePageChange = (event, newPage) => {
    if (newPage === page) return;
    setPage(newPage);
    fetchListings(newPage, limit);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLimitChange = (event) => {
    const newLimit = Number(event.target.value);
    setLimit(newLimit);
    setPage(1);
    fetchListings(1, newLimit);
  };

  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
  };

  const handleResetFilters = () => {
    setSearch("");
    setStatus("all");
    setType("All");
  };

  const showProperties = activeTab === "all" || activeTab === "properties";
  const showServices = activeTab === "all" || activeTab === "services";

  const startItem =
    pagination.total === 0 ? 0 : (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, pagination.total);

  // ================= 1. INITIAL LOAD ERROR STATE =================
  // If request failed and there is no previous data, render the full error card
  if (error && data.properties.length === 0 && data.services.length === 0 && !loading) {
    return (
      <Box
        sx={{
          bgcolor: "#FAFBFC",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          pt: { xs: 8, md: 12 },          
          px: 2
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 4,
            maxWidth: 440,
            width: "100%",
            borderRadius: "20px",
            border: "1px solid #FEE2E2",
            bgcolor: "#FFFFFF",
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              bgcolor: "#FEF2F2",
              color: "#DC2626",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 2,
            }}
          >
            <ErrorOutlined sx={{ fontSize: 32 }} />
          </Box>

          <Typography variant="h6" sx={{ fontWeight: 800, color: "#0F172A", mb: 0.5 }}>
            Failed to Load Listings
          </Typography>

          <Typography variant="body2" sx={{ color: "#64748B", fontSize: "13px", mb: 3 }}>
            {error}
          </Typography>

          <Button
            variant="contained"
            startIcon={<Refresh />}
            onClick={() => fetchListings(page, limit)}
            sx={{
              bgcolor: "#017E53",
              color: "#FFFFFF",
              textTransform: "none",
              fontWeight: 700,
              borderRadius: "10px",
              px: 3.5,
              py: 1,
              boxShadow: "none",
              "&:hover": { bgcolor: "#016744" },
            }}
          >
            Try Again
          </Button>
        </Paper>
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
        pb: 6,
      }}
    >
      {/* 1. Header View */}
      <PropertiesServicesHeader />

      {/* 2. Filter Navigation & Add CTA */}
      <PropertiesFilterTabs
        activeTab={activeTab}
        onTabChange={handleTabChange}
        status={status}
        onStatusChange={setStatus}
        type={type}
        onTypeChange={setType}
        search={search}
        onSearchChange={setSearch}
        counts={data.counts}
      />

      <Box sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
        {/* ================= 2. SKELETON LOADING STATE ================= */}
        {loading ? (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5, py: 2 }}>
            {Array.from({ length: 3 }).map((_, idx) => (
              <Skeleton
                key={idx}
                variant="rounded"
                height={140}
                sx={{ borderRadius: "18px" }}
              />
            ))}
          </Box>
        ) : (
          <>
            {/* ================= 3. PROPERTIES SECTION ================= */}
            {showProperties && (
              <Box sx={{ mb: 4 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 800,
                      color: "#111827",
                      fontSize: "15px",
                    }}
                  >
                    Properties ({data.properties.length})
                  </Typography>

                  {data.properties.length > 0 && activeTab === "all" && (
                    <Button
                      size="small"
                      endIcon={<ChevronRight />}
                      onClick={() => handleTabChange("properties")}
                      sx={{
                        textTransform: "none",
                        color: "#017E53",
                        fontWeight: 700,
                        fontSize: "12px",
                      }}
                    >
                      View all
                    </Button>
                  )}
                </Box>

                {data.properties.length === 0 ? (
                  <Box
                    sx={{
                      p: 4,
                      borderRadius: "16px",
                      border: "1.5px dashed #E2E8F0",
                      textAlign: "center",
                      bgcolor: "#FFFFFF",
                    }}
                  >
                    <SearchOffOutlined sx={{ fontSize: 32, color: "#94A3B8", mb: 1 }} />
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#475569" }}>
                      No properties found
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#94A3B8", display: "block", mt: 0.3 }}>
                      {search || status !== "all" || type !== "All"
                        ? "Try adjusting your filters or search keywords."
                        : "You have not listed any properties under this account yet."}
                    </Typography>
                    {(search || status !== "all" || type !== "All") && (
                      <Button
                        size="small"
                        onClick={handleResetFilters}
                        sx={{ mt: 1.5, textTransform: "none", color: "#017E53", fontWeight: 700 }}
                      >
                        Clear Filters
                      </Button>
                    )}
                  </Box>
                ) : (
                  data.properties.map((property) => (
                    <PropertyCardItem key={property.id} property={property} />
                  ))
                )}
              </Box>
            )}

            {/* ================= 4. SERVICES SECTION ================= */}
            {showServices && (
              <Box sx={{ mb: 4 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 800,
                      color: "#111827",
                      fontSize: "15px",
                    }}
                  >
                    Services ({data.services.length})
                  </Typography>

                  {data.services.length > 0 && activeTab === "all" && (
                    <Button
                      size="small"
                      endIcon={<ChevronRight />}
                      onClick={() => handleTabChange("services")}
                      sx={{
                        textTransform: "none",
                        color: "#017E53",
                        fontWeight: 700,
                        fontSize: "12px",
                      }}
                    >
                      View all
                    </Button>
                  )}
                </Box>

                {data.services.length === 0 ? (
                  <Box
                    sx={{
                      p: 4,
                      borderRadius: "16px",
                      border: "1.5px dashed #E2E8F0",
                      textAlign: "center",
                      bgcolor: "#FFFFFF",
                    }}
                  >
                    <SearchOffOutlined sx={{ fontSize: 32, color: "#94A3B8", mb: 1 }} />
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#475569" }}>
                      No services found
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#94A3B8", display: "block", mt: 0.3 }}>
                      {search || status !== "all"
                        ? "Try clearing your filters or search keywords."
                        : "You have not registered any services yet."}
                    </Typography>
                    {(search || status !== "all") && (
                      <Button
                        size="small"
                        onClick={handleResetFilters}
                        sx={{ mt: 1.5, textTransform: "none", color: "#017E53", fontWeight: 700 }}
                      >
                        Clear Filters
                      </Button>
                    )}
                  </Box>
                ) : (
                  data.services.map((service) => (
                    <ServiceCardItem key={service.id} service={service} />
                  ))
                )}
              </Box>
            )}

            {/* ================= 5. PAGINATION & LIMIT BAR ================= */}
            {pagination.total > 0 && (
              <Box
                sx={{
                  mt: 4,
                  mb: 2,
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 2,
                  p: 2,
                  bgcolor: "#FFFFFF",
                  borderRadius: "12px",
                  border: "1px solid #E2E8F0",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
                  <Typography variant="caption" sx={{ color: "#64748B", fontWeight: 600 }}>
                    Showing{" "}
                    <strong style={{ color: "#0F172A" }}>
                      {startItem}–{endItem}
                    </strong>{" "}
                    of <strong style={{ color: "#0F172A" }}>{pagination.total}</strong> items
                  </Typography>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography variant="caption" sx={{ color: "#94A3B8", fontWeight: 700, fontSize: "11px" }}>
                      PER PAGE:
                    </Typography>
                    <FormControl size="small">
                      <Select
                        value={limit}
                        onChange={handleLimitChange}
                        sx={{
                          fontSize: "12px",
                          fontWeight: 700,
                          height: 28,
                          borderRadius: "8px",
                          bgcolor: "#F8FAFC",
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#E2E8F0",
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#CBD5E1",
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#017E53",
                          },
                        }}
                      >
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                        <MenuItem value={100}>100</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Box>

                <Pagination
                  count={pagination.totalPages}
                  page={page}
                  onChange={handlePageChange}
                  shape="rounded"
                  size="medium"
                  sx={{
                    "& .MuiPaginationItem-root": {
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "#475569",
                      borderRadius: "8px",
                    },
                    "& .MuiPaginationItem-root.Mui-selected": {
                      bgcolor: "#017E53 !important",
                      color: "#FFFFFF",
                    },
                    "& .MuiPaginationItem-root:hover": {
                      bgcolor: "rgba(1, 126, 83, 0.08)",
                    },
                  }}
                />
              </Box>
            )}
          </>
        )}
      </Box>

      {/* 6. Community Trust Banner */}
      <CommunityTrustBanner />
    </Box>
  );
};

export default MyPropertiesServices;