import React, { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Avatar,
  Chip,
  CircularProgress,
  Divider,
} from "@mui/material";
import { Close, PhotoCamera, Add, DeleteOutlined } from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useSelector } from "react-redux";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  phone: Yup.string().required("Phone number is required"),
  location: Yup.string().required("Location is required"),
  tagline: Yup.string().max(80, "Maximum 80 characters"),
  bio: Yup.string().max(1000, "Maximum 1000 characters"),
});

const DEFAULT_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const EditProfileModal = ({ open, onClose, profileData, onProfileUpdated }) => {
  const uri = useSelector((state) => state.UriReducer?.uri);
  const fileInputRef = useRef(null);
  const token = sessionStorage.getItem("userToken");
  const [localBio, setLocalBio] = useState("");

  const [loading, setLoading] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");  

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phone: "",
      location: "",
      tagline: "",
      bio: "",
      skills: [],
      avatar: "",
      schedule: DEFAULT_DAYS.map((d) => ({ name: d, day: d[0], available: true })),
    },
    // Turn this OFF to prevent Formik from resetting values while typing
    enableReinitialize: false,
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema,
    onSubmit: async (values) => {
      console.log('me')
      try {
        setLoading(true);
        const headers = { Authorization: `Bearer ${token}` };

        const payload = {
          firstName: values.firstName,
          lastName: values.lastName,
          phone: values.phone,
          location: values.location,
          tagline: values.tagline,
          avatar: values.avatar,
          professionalSummary: {
            bio: values.bio,
            skills: values.skills,
          },
          upcomingAvailability: {
            schedule: values.schedule,
          },
        };
        console.log(payload)        
        await axios.put(`${uri}agent/my/profile`, payload, { headers });

        if (onProfileUpdated) onProfileUpdated();
        onClose();
      } catch (err) {
        console.error("Failed to update agent profile:", err);
        alert(err.response?.data?.message || "Failed to update profile. Please try again.");
      } finally {
        setLoading(false);
      }
    },
  });

  // Populate form ONCE when modal opens, completely isolated from typing
  useEffect(() => {
    setLocalBio(formik.values.bio || "");
    if (open && profileData) {
      const currentSchedule =
        profileData?.contactAndAvailability?.upcomingAvailability?.schedule || [];

      const initialSchedule = DEFAULT_DAYS.map((dayName) => {
        const found = currentSchedule.find(
          (s) => s.name?.toLowerCase() === dayName.toLowerCase()
        );
        return {
          name: dayName,
          day: dayName.slice(0, 1),
          available: found ? Boolean(found.available) : true,
        };
      });

      setAvatarPreview(profileData?.profile?.avatar || "");

      formik.resetForm({
        values: {
          firstName: profileData?.profile?.firstName || "",
          lastName: profileData?.profile?.lastName || "",
          phone: profileData?.profile?.phone || "",
          location: profileData?.profile?.location || "",
          tagline: profileData?.profile?.tagline || profileData?.profile?.title || "",
          bio: profileData?.professionalSummary?.bio || "",
          skills: Array.isArray(profileData?.professionalSummary?.skills)
            ? [...profileData.professionalSummary.skills]
            : [],
          avatar: profileData?.profile?.avatar || "",
          schedule: initialSchedule,
        },
      });
    }
  }, [open]); // ONLY triggers when opening or closing the modal

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result;
      setAvatarPreview(base64);
      formik.setFieldValue("avatar", base64);
    };
    reader.readAsDataURL(file);
  };

  const handleAddSkill = () => {
    const trimmed = newSkill.trim();
    if (trimmed && !formik.values.skills.includes(trimmed)) {
      formik.setFieldValue("skills", [...formik.values.skills, trimmed]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    formik.setFieldValue(
      "skills",
      formik.values.skills.filter((s) => s !== skillToRemove)
    );
  };

  const toggleDayAvailability = (index) => {
    const updated = formik.values.schedule.map((item, idx) =>
      idx === index ? { ...item, available: !item.available } : item
    );
    formik.setFieldValue("schedule", updated);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { borderRadius: "20px", p: 1 },
      }}
    >
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pb: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 800, color: "#111827", fontSize: "18px" }}>
          Edit Provider Profile
        </Typography>
        <IconButton onClick={onClose} size="small" sx={{ color: "#9CA3AF" }}>
          <Close sx={{ fontSize: 18 }} />
        </IconButton>
      </DialogTitle>

      <Divider />

      <DialogContent sx={{ py: 2.5 }}>
        <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {/* 1. Avatar Uploader */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2.5 }}>
            <Box sx={{ position: "relative" }}>
              <Avatar
                src={avatarPreview}
                sx={{ width: 80, height: 80, border: "2px solid #E5E7EB" }}
              />
              <IconButton
                size="small"
                onClick={() => fileInputRef.current?.click()}
                sx={{
                  position: "absolute",
                  bottom: -4,
                  right: -4,
                  bgcolor: "#10B981",
                  color: "#FFFFFF",
                  "&:hover": { bgcolor: "#059669" },
                  boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                }}
              >
                <PhotoCamera sx={{ fontSize: 16 }} />
              </IconButton>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleAvatarChange}
              />
            </Box>
            <div>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#111827" }}>
                Profile Photo
              </Typography>
              <Typography variant="caption" sx={{ color: "#6B7280" }}>
                Recommended 512x512px. PNG or JPG accepted.
              </Typography>
            </div>
          </Box>

          {/* 2. Basic Info (Name, Phone, Location) */}
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2 }}>
            <TextField
              label="First Name"
              size="small"
              name="firstName"
              value={formik.values.firstName || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.firstName && Boolean(formik.errors.firstName)}
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
            <TextField
              label="Last Name"
              size="small"
              name="lastName"
              value={formik.values.lastName || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
            <TextField
              label="Phone Number"
              size="small"
              name="phone"
              value={formik.values.phone || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />
            <TextField
              label="Location"
              size="small"
              name="location"
              placeholder="e.g. San Francisco, CA"
              value={formik.values.location || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.location && Boolean(formik.errors.location)}
              helperText={formik.touched.location && formik.errors.location}
            />
          </Box>

          {/* 3. Professional Tagline */}
          <TextField
            fullWidth
            label="Professional Tagline / Title"
            size="small"
            name="tagline"
            placeholder="e.g. Professional Property Manager & Architectural Photographer"
            value={formik.values.tagline || ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.tagline && Boolean(formik.errors.tagline)}
            helperText={formik.touched.tagline && formik.errors.tagline}
          />

          {/* 4. Bio / Summary */}          
          <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: "#4B5563" }}>
                Professional Summary / Bio
              </Typography>
              <Typography variant="caption" sx={{ color: "#9CA3AF" }}>
                {localBio.length}/1000
              </Typography>
            </Box>
            <TextField
              fullWidth
              multiline
              rows={4}
              name="bio"
              placeholder="Describe your background, years in service, luxury expertise, and notable highlights..."
              value={localBio}
              onChange={(e) => {
                // 1. Update UI instantly with 0ms delay
                setLocalBio(e.target.value);
                // 2. Update Formik value silently without triggering validation lag
                formik.setFieldValue("bio", e.target.value, false);
              }}
              onBlur={() => {
                // Validate only when user leaves the field
                formik.setFieldTouched("bio", true, true);
              }}
              error={formik.touched.bio && Boolean(formik.errors.bio)}
              helperText={formik.touched.bio && formik.errors.bio}
            />
          </Box>

          {/* 5. Skills Cloud Manager */}
          <Box>
            <Typography variant="caption" sx={{ fontWeight: 700, color: "#4B5563", display: "block", mb: 1 }}>
              Skills & Specializations
            </Typography>
            <Box sx={{ display: "flex", gap: 1, mb: 1.5 }}>
              <TextField
                size="small"
                placeholder="Add a new skill (e.g. Drone Licensed)"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddSkill();
                  }
                }}
                sx={{ flex: 1 }}
              />
              <Button
                variant="outlined"
                startIcon={<Add />}
                onClick={handleAddSkill}
                sx={{ borderColor: "#10B981", color: "#065F46", textTransform: "none", fontWeight: 700 }}
              >
                Add
              </Button>
            </Box>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {(formik.values.skills || []).map((skill, idx) => (
                <Chip
                  key={idx}
                  label={skill}
                  onDelete={() => handleRemoveSkill(skill)}
                  deleteIcon={<DeleteOutlined sx={{ fontSize: "14px !important" }} />}
                  sx={{
                    bgcolor: "#F0FDF4",
                    color: "#065F46",
                    fontWeight: 600,
                    borderRadius: "8px",
                    border: "1px solid #DCFCE7",
                  }}
                />
              ))}
            </Box>
          </Box>

          {/* 6. Availability Schedule Toggles */}
          <Box>
            <Typography variant="caption" sx={{ fontWeight: 700, color: "#4B5563", display: "block", mb: 1 }}>
              Weekly Availability (Click days to toggle)
            </Typography>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              {(formik.values.schedule || []).map((slot, index) => (
                <Button
                  key={slot.name}
                  onClick={() => toggleDayAvailability(index)}
                  sx={{
                    minWidth: 42,
                    height: 42,
                    borderRadius: "10px",
                    textTransform: "none",
                    fontWeight: 800,
                    fontSize: "12px",
                    bgcolor: slot.available ? "#ECFDF5" : "#F3F4F6",
                    color: slot.available ? "#017E53" : "#9CA3AF",
                    border: slot.available ? "1.5px solid #10B981" : "1px solid #E5E7EB",
                    "&:hover": {
                      bgcolor: slot.available ? "#D1FAE5" : "#E5E7EB",
                    },
                  }}
                >
                  {slot.name.slice(0, 3)}
                </Button>
              ))}
            </Box>
          </Box>
        </Box>
      </DialogContent>

      <Divider />

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} sx={{ textTransform: "none", color: "#6B7280", fontWeight: 700 }}>
          Cancel
        </Button>
        <Button
          variant="contained"
          disabled={loading}
          onClick={formik.handleSubmit}
          sx={{
            bgcolor: "#10B981",
            color: "#FFFFFF",
            textTransform: "none",
            fontWeight: 800,
            borderRadius: "10px",
            px: 3,
            "&:hover": { bgcolor: "#059669" },
          }}
        >
          {loading ? <CircularProgress size={20} color="inherit" /> : "Save Changes"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProfileModal;