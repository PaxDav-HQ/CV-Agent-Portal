import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  CircularProgress,
  Alert,
} from "@mui/material";
import { SendOutlined, LockOutlined } from "@mui/icons-material";
import { useSelector } from "react-redux";
import axios from "axios";

import VerificationStatusBanner from "./components/VerificationStatusBanner";
import VerificationDocumentList from "./components/VerificationDocumentList";
import VerificationSecurityBanner from "./components/VerificationSecurityBanner";
import VerificationTipsFaq from "./components/VerificationTipsFaq";
import { extractErrorMessage } from "../../utils/errorParser";

// Default document configuration mapping to API field names
const DEFAULT_DOCUMENTS = [
  {
    id: "government_id",
    key: "government_id",
    name: "Government ID",
    description: "Upload a valid government issued ID card, Driver's license, National ID or International Passport.",
    required: true,
    allowedFormats: "JPEG, PNG OR PDF (MAX. 5MB)",
  },
  {
    id: "selfie_with_id",
    key: "selfie_with_id",
    name: "Selfie with ID",
    description: "Take a clear selfie while holding your ID next to your face.",
    required: true,
    allowedFormats: "JPEG OR PNG (MAX. 5MB)",
  },
  {
    id: "business_registration",
    key: "business_registration",
    name: "Business Registration (CAC)",
    description: "Upload your CAC certificate or business registration document.",
    required: true,
    allowedFormats: "PDF OR JPEG (MAX. 5MB)",
  },
  {
    id: "business_address_proof",
    key: "business_address_proof",
    name: "Business Address Proof",
    description: "Utility bill, bank statement or lease agreement not older than 3 months.",
    required: false,
    allowedFormats: "PDF OR JPEG (MAX. 5MB)",
  },
  {
    id: "business_images",
    key: "business_images",
    name: "Business / Service Images",
    description: "Upload images of your office, workspace, or team at work (Up to 5).",
    required: false,
    allowedFormats: "UP TO 5 IMAGES (MAX. 5MB EACH)",
  },
];

const AgentVerification = () => {
  const uri = useSelector((state) => state.UriReducer?.uri);
  const token = sessionStorage.getItem("userToken");
  const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  // Document files held in state before final submission
  const [selectedFiles, setSelectedFiles] = useState({
    government_id: null,
    selfie_with_id: null,
    business_registration: null,
    business_address_proof: null,
    business_images: [],
  });

  const [activeTab, setActiveTab] = useState("required_docs");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "" });

  // 1. Fetch Verification Status
  const fetchVerificationStatus = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(`${uri}agent/verify`, {
        headers: authHeaders,
      });

      const verificationData = res.data?.data || res.data || {};
      setData(verificationData);

      if (verificationData.tabs?.length > 0) {
        const defaultActive =
          verificationData.tabs.find((t) => t.active)?.id || verificationData.tabs[0].id;
        setActiveTab(defaultActive);
      }
    } catch (err) {
      console.error("Failed to load verification status:", err);
      setError(extractErrorMessage(err, "Failed to load verification status."));
    } finally {
      setLoading(false);
    }
  }, [uri, token]);

  useEffect(() => {
    fetchVerificationStatus();
  }, [fetchVerificationStatus]);

  // 2. Select file handler
  const handleSelectFile = (key, fileOrFiles) => {
    setSelectedFiles((prev) => ({
      ...prev,
      [key]: fileOrFiles,
    }));
  };

  // 3. Submit Form Data to POST /api/agent/verify
  const handleSubmitVerification = async () => {
    setFeedback({ type: "", message: "" });

    // Client-side validation of required files
    if (!selectedFiles.government_id) {
      setFeedback({ type: "error", message: "Please select your Government ID." });
      return;
    }
    if (!selectedFiles.selfie_with_id) {
      setFeedback({ type: "error", message: "Please select your Selfie with ID." });
      return;
    }
    if (!selectedFiles.business_registration) {
      setFeedback({ type: "error", message: "Please select your Business Registration (CAC)." });
      return;
    }

    try {
      setSubmitting(true);

      const formData = new FormData();

      // Append single binary fields
      if (selectedFiles.government_id) {
        formData.append("government_id", selectedFiles.government_id);
      }
      if (selectedFiles.selfie_with_id) {
        formData.append("selfie_with_id", selectedFiles.selfie_with_id);
      }
      if (selectedFiles.business_registration) {
        formData.append("business_registration", selectedFiles.business_registration);
      }
      if (selectedFiles.business_address_proof) {
        formData.append("business_address_proof", selectedFiles.business_address_proof);
      }

      // Append multiple images for business_images
      if (Array.isArray(selectedFiles.business_images)) {
        selectedFiles.business_images.forEach((img) => {
          formData.append("business_images", img);
        });
      }

      await axios.post(`${uri}agent/verify`, formData, {
        headers: {
          ...authHeaders,
          "Content-Type": "multipart/form-data",
        },
      });

      setFeedback({
        type: "success",
        message: "Documents uploaded successfully! Your verification is now under review.",
      });

      // Refresh view
      fetchVerificationStatus();
    } catch (err) {
      console.error("Submission failed:", err);
      setFeedback({
        type: "error",
        message: extractErrorMessage(err, "Failed to submit verification documents."),
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading && !data) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh" }}>
        <CircularProgress sx={{ color: "#017E53" }} />
      </Box>
    );
  }

  // Combine schema documents from API with fallback structure
  const documentList =
    data?.documents && data.documents.length > 0 ? data.documents : DEFAULT_DOCUMENTS;

  return (
    <Box sx={{ bgcolor: "#FAFBFC", minHeight: "100vh", p: { xs: 2, sm: 3, md: 4 }, pb: 8 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 800, color: "#0F172A", letterSpacing: "-0.5px" }}>
          Verification
        </Typography>
        <Typography variant="body2" sx={{ color: "#64748B", fontSize: "13.5px" }}>
          Verification helps build trust and keeps our community safe. Complete the process below to unlock all features and boost your visibility.
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: "12px" }}>
          {error}
        </Alert>
      )}

      {feedback.message && (
        <Alert severity={feedback.type} sx={{ mb: 3, borderRadius: "12px" }}>
          {feedback.message}
        </Alert>
      )}

      {/* 1. Status Banner & Steps */}
      <VerificationStatusBanner data={data} />

      {/* 2. Documents Section */}
      <VerificationDocumentList
        tabs={data?.tabs || []}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        documents={documentList}
        selectedFiles={selectedFiles}
        onSelectFile={handleSelectFile}
      />      
      {/* 3. Security Reassurance */}
      <VerificationSecurityBanner security={data?.security} />

      {/* 4. Tips & FAQ */}
      <VerificationTipsFaq />

      {/* 5. Bottom Submission Action */}
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 4, gap: 2 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              sx={{ color: "#017E53", "&.Mui-checked": { color: "#017E53" } }}
            />
          }
          label={
            <Typography variant="body2" sx={{ color: "#475569", fontSize: "13px" }}>
              By submitting, you confirm that all information provided is accurate and genuine.
            </Typography>
          }
        />

        <Button
          variant="contained"
          size="large"
          disabled={!agreedToTerms || submitting}
          onClick={handleSubmitVerification}
          endIcon={!submitting && <SendOutlined sx={{ fontSize: 18 }} />}
          sx={{
            py: 1.4,
            px: 6,
            borderRadius: "10px",
            bgcolor: "#017E53",
            fontWeight: 800,
            fontSize: "14px",
            textTransform: "none",
            "&:hover": { bgcolor: "#016744" },
            "&.Mui-disabled": { bgcolor: "#E2E8F0", color: "#94A3B8" },
          }}
        >
          {submitting ? <CircularProgress size={20} color="inherit" /> : "Submit for Verification"}
        </Button>

        <Typography variant="caption" sx={{ color: "#94A3B8", display: "flex", alignItems: "center", gap: 0.5, fontSize: "11px" }}>
          <LockOutlined sx={{ fontSize: 13 }} /> End-to-end encrypted secure verification
        </Typography>
      </Box>
    </Box>
  );
};

export default AgentVerification;