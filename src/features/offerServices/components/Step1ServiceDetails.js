import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputAdornment,
  Paper,
  Button,
  FormHelperText,
  Autocomplete,
  CircularProgress,
  Chip,
} from "@mui/material";
import {
  PersonOutlined,
  PlaceOutlined,
  LightbulbOutlined,
  ShieldOutlined,
  CheckCircle,
  ArrowForward,
} from "@mui/icons-material";
import axios from "axios";
import debounce from "lodash/debounce"; // or implement a native setTimeout debounce

const categories = [
  { value: "cleaning", label: "Cleaning Agent" },
  { value: "repair", label: "Handyman & Repair" },
  { value: "painting", label: "Painting & Renovation" },
  { value: "moving", label: "Relocation & Moving" },
  { value: "electrical", label: "Electrical & Plumbing" },
];

const Step1ServiceDetails = ({ formik, onNext }) => {
  const { values, errors, touched, handleChange, handleBlur, setFieldValue } = formik;

  const [locationInput, setLocationInput] = useState(values.location || "");
  const [options, setOptions] = useState([]);
  const [loadingLocations, setLoadingLocations] = useState(false);

  // Debounced search for places/geocoding (matches CreateListing autocomplete)
  const fetchPlaces = useMemo(
    () =>
      debounce(async (query) => {
        if (!query || query.trim().length < 3) {
          setOptions([]);
          return;
        }
        try {
          setLoadingLocations(true);
          // Standard OpenStreetMap Nominatim or your backend geocode route
          const res = await axios.get(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
              query
            )}&addressdetails=1&limit=5&countrycodes=ng`
          );

          const formatted = (res.data || []).map((item) => ({
            label: item.display_name,
            latitude: parseFloat(item.lat),
            longitude: parseFloat(item.lon),
          }));
          setOptions(formatted);
        } catch (err) {
          console.error("Failed to fetch address suggestions:", err);
        } finally {
          setLoadingLocations(false);
        }
      }, 400),
    []
  );

  useEffect(() => {
    return () => {
      fetchPlaces.cancel();
    };
  }, [fetchPlaces]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5, width: "100%", minWidth: 0 }}>
      <div>
        <Typography variant="h5" sx={{ fontWeight: 800, color: "#0F172A", fontSize: { xs: "19px", sm: "22px" }, mb: 0.5 }}>
          Tell us about your service
        </Typography>
        <Typography variant="body2" sx={{ color: "#64748B", fontSize: "13px" }}>
          Provide basic information about the service you offer.
        </Typography>
      </div>

      {/* Row 1: Title & Category */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1.3fr 1fr" },
          gap: 2.5,
          width: "100%",
          minWidth: 0,
        }}
      >
        <Box sx={{ minWidth: 0 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.8 }}>
            <Typography variant="caption" sx={{ fontWeight: 700, color: "#1E293B", fontSize: "12px" }}>
              Service Title <span style={{ color: "#EF4444" }}>*</span>
            </Typography>
            <Typography variant="caption" sx={{ color: "#94A3B8", fontSize: "10.5px" }}>
              {values.title?.length || 0}/50
            </Typography>
          </Box>
          <TextField
            fullWidth
            size="small"
            name="title"
            placeholder="e.g. Professional Home Cleaning"
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.title && Boolean(errors.title)}
            helperText={touched.title && errors.title}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutlined sx={{ color: "#94A3B8", fontSize: 18 }} />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": { borderRadius: "12px", bgcolor: "#FFFFFF", fontSize: "13px" },
            }}
          />
        </Box>

        <Box sx={{ minWidth: 0 }}>
          <Typography variant="caption" sx={{ fontWeight: 700, color: "#1E293B", fontSize: "12px", display: "block", mb: 0.8 }}>
            Category <span style={{ color: "#EF4444" }}>*</span>
          </Typography>
          <FormControl fullWidth size="small" error={touched.category && Boolean(errors.category)}>
            <Select
              name="category"
              value={values.category}
              onChange={handleChange}
              onBlur={handleBlur}
              displayEmpty
              sx={{
                borderRadius: "12px",
                bgcolor: "#FFFFFF",
                fontSize: "13px",
                "& .MuiSelect-select": { py: 1.1 },
              }}
            >
              <MenuItem value="" disabled>
                <em>Select category</em>
              </MenuItem>
              {categories.map((c) => (
                <MenuItem key={c.value} value={c.value}>
                  {c.label}
                </MenuItem>
              ))}
            </Select>
            {touched.category && errors.category && (
              <FormHelperText>{errors.category}</FormHelperText>
            )}
          </FormControl>
        </Box>
      </Box>

      {/* Row 2: Autocomplete Location Search */}
      <Box sx={{ width: "100%", minWidth: 0 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.8 }}>
          <Typography variant="caption" sx={{ fontWeight: 700, color: "#1E293B", fontSize: "12px" }}>
            Service Location <span style={{ color: "#EF4444" }}>*</span>
          </Typography>
          {values.coordinates?.latitude && values.coordinates?.longitude ? (
            <Chip
              label={`GPS: ${values.coordinates.latitude.toFixed(4)}, ${values.coordinates.longitude.toFixed(4)}`}
              size="small"
              sx={{
                bgcolor: "#ECFDF5",
                color: "#017E53",
                fontWeight: 700,
                fontSize: "10.5px",
                height: 20,
                borderRadius: "6px",
              }}
            />
          ) : null}
        </Box>

        <Autocomplete
          freeSolo
          options={options}
          getOptionLabel={(option) => (typeof option === "string" ? option : option.label || "")}
          filterOptions={(x) => x}
          value={values.location || ""}
          inputValue={locationInput}
          onInputChange={(e, newInputValue) => {
            setLocationInput(newInputValue);
            setFieldValue("location", newInputValue);
            fetchPlaces(newInputValue);
          }}
          onChange={(e, selectedOption) => {
            if (typeof selectedOption === "object" && selectedOption !== null) {
              setFieldValue("location", selectedOption.label);
              setFieldValue("coordinates", {
                latitude: selectedOption.latitude,
                longitude: selectedOption.longitude,
              });
            }
          }}
          renderInput={(params) => {
            const inputProps = params.InputProps || params.slotProps?.input || {};

            return (
              <TextField
                {...params}
                size="small"
                name="location"
                placeholder="Search by street, area, or city (e.g. Victoria Island, Lagos)..."
                error={touched.location && Boolean(errors.location)}
                helperText={touched.location && errors.location}
                InputProps={{
                  ...inputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <PlaceOutlined sx={{ color: "#94A3B8", fontSize: 18 }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <>
                      {loadingLocations ? (
                        <CircularProgress color="inherit" size={16} sx={{ color: "#10B981", mr: 1 }} />
                      ) : null}
                      {inputProps.endAdornment}
                    </>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": { borderRadius: "12px", bgcolor: "#FFFFFF", fontSize: "13px" },
                }}
              />
            );
          }}
          renderOption={(props, option) => (
            <Box component="li" {...props} sx={{ fontSize: "12.5px", py: 1, display: "flex", alignItems: "flex-start", gap: 1 }}>
              <PlaceOutlined sx={{ fontSize: 16, color: "#10B981", mt: 0.3, flexShrink: 0 }} />
              <Typography variant="body2" sx={{ fontSize: "12.5px", color: "#1E293B" }}>
                {option.label}
              </Typography>
            </Box>
          )}
        />
      </Box>

      {/* Row 3: Short & Full Description */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1.5fr" },
          gap: 2.5,
          width: "100%",
          minWidth: 0,
        }}
      >
        <Box sx={{ minWidth: 0 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.8 }}>
            <Typography variant="caption" sx={{ fontWeight: 700, color: "#1E293B", fontSize: "12px" }}>
              Short Description <span style={{ color: "#EF4444" }}>*</span>
            </Typography>
            <Typography variant="caption" sx={{ color: "#94A3B8", fontSize: "10.5px" }}>
              {values.short_description?.length || 0}/120
            </Typography>
          </Box>
          <TextField
            fullWidth
            multiline
            rows={5}
            name="short_description"
            placeholder="Brief summary shown in search results..."
            value={values.short_description}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.short_description && Boolean(errors.short_description)}
            helperText={touched.short_description && errors.short_description}
            sx={{
              "& .MuiOutlinedInput-root": { borderRadius: "12px", bgcolor: "#FFFFFF", fontSize: "13px" },
            }}
          />
        </Box>

        <Box sx={{ minWidth: 0 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.8 }}>
            <Typography variant="caption" sx={{ fontWeight: 700, color: "#1E293B", fontSize: "12px" }}>
              Full Description <span style={{ color: "#EF4444" }}>*</span>
            </Typography>
            <Typography variant="caption" sx={{ color: "#94A3B8", fontSize: "10.5px" }}>
              {values.full_description?.length || 0}/1000
            </Typography>
          </Box>
          <TextField
            fullWidth
            multiline
            rows={5}
            name="full_description"
            placeholder="Detailed breakdown of your offering, procedures, packages..."
            value={values.full_description}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.full_description && Boolean(errors.full_description)}
            helperText={touched.full_description && errors.full_description}
            sx={{
              "& .MuiOutlinedInput-root": { borderRadius: "12px", bgcolor: "#FFFFFF", fontSize: "13px" },
            }}
          />
        </Box>
      </Box>

      {/* Row 4: Tips & Trust cards */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
          gap: 2,
          width: "100%",
          minWidth: 0,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 2,
            borderRadius: "14px",
            bgcolor: "#F0FDF4",
            border: "1px solid #DCFCE7",
            display: "flex",
            alignItems: "flex-start",
            gap: 1.5,
            minWidth: 0,
          }}
        >
          <LightbulbOutlined sx={{ color: "#10B981", fontSize: 20, mt: 0.2, flexShrink: 0 }} />
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "#065F46", fontSize: "12px" }}>
              Tips
            </Typography>
            <Typography variant="caption" sx={{ color: "#047857", fontSize: "11.5px", lineHeight: 1.4, display: "block" }}>
              Selecting an accurate address from the suggestions automatically binds GPS coordinates so clients can find your services by distance.
            </Typography>
          </Box>
        </Paper>

        <Paper
          elevation={0}
          sx={{
            p: 2,
            borderRadius: "14px",
            border: "1px solid #F1F5F9",
            bgcolor: "#FFFFFF",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            minWidth: 0,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, minWidth: 0 }}>
            <Box
              sx={{
                width: 34,
                height: 34,
                borderRadius: "10px",
                bgcolor: "#ECFDF5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <ShieldOutlined sx={{ color: "#10B981", fontSize: 18 }} />
            </Box>
            <Box sx={{ minWidth: 0 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "#0F172A", fontSize: "12.5px" }}>
                Fast. Simple. Trusted.
              </Typography>
              <Typography variant="caption" sx={{ color: "#64748B", fontSize: "11px", display: "block" }}>
                Complete these 3 steps to start receiving client bookings today.
              </Typography>
            </Box>
          </Box>
          <CheckCircle sx={{ color: "#10B981", fontSize: 20, flexShrink: 0, ml: 1 }} />
        </Paper>
      </Box>

      {/* Button Toolbar */}
      <Box sx={{ mt: 1, display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
        <Typography variant="caption" sx={{ color: "#64748B", fontSize: "11.5px", mb: 1.5 }}>
          • Your progress is saved automatically
        </Typography>
        <Button
          variant="contained"
          endIcon={<ArrowForward sx={{ fontSize: 16 }} />}
          onClick={onNext}
          sx={{
            width: { xs: "100%", sm: 260 },
            bgcolor: "#10B981",
            color: "#FFFFFF",
            fontWeight: 800,
            fontSize: "14px",
            borderRadius: "14px",
            py: 1.5,
            textTransform: "none",
            boxShadow: "none",
            "&:hover": { bgcolor: "#059669" },
          }}
        >
          Continue
        </Button>
      </Box>
    </Box>
  );
};

export default Step1ServiceDetails;