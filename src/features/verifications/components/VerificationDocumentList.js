import React, { useRef, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import {
  UploadFileOutlined,
  CheckCircle,
  BadgeOutlined,
  CameraAltOutlined,
  BusinessOutlined,
  LocationCityOutlined,
  CollectionsOutlined,
  AttachFile,
  OpenInNew,
  ErrorOutlined,
  Close,
} from "@mui/icons-material";

const getDocumentIcon = (key = "") => {
  switch (key) {
    case "government_id":
      return <BadgeOutlined sx={{ color: "#017E53" }} />;
    case "selfie_with_id":
      return <CameraAltOutlined sx={{ color: "#2563EB" }} />;
    case "business_registration":
      return <BusinessOutlined sx={{ color: "#D97706" }} />;
    case "business_address_proof":
      return <LocationCityOutlined sx={{ color: "#7C3AED" }} />;
    case "business_images":
      return <CollectionsOutlined sx={{ color: "#059669" }} />;
    default:
      return <AttachFile sx={{ color: "#64748B" }} />;
  }
};

const getStatusBadge = (status) => {
  switch (status?.toLowerCase()) {
    case "approved":
      return <Chip label="Approved" size="small" sx={{ bgcolor: "#ECFDF5", color: "#017E53", fontWeight: 700, fontSize: "10px", height: 20 }} />;
    case "rejected":
      return <Chip label="Rejected" size="small" sx={{ bgcolor: "#FEF2F2", color: "#DC2626", fontWeight: 700, fontSize: "10px", height: 20 }} />;
    case "pending":
    case "under_review":
      return <Chip label="Under Review" size="small" sx={{ bgcolor: "#FFFBEB", color: "#B45309", fontWeight: 700, fontSize: "10px", height: 20 }} />;
    default:
      return null;
  }
};

const VerificationDocumentList = ({
  tabs = [],
  activeTab,
  onTabChange,
  documents = [],
  selectedFiles = {},
  onSelectFile,
}) => {
  const fileInputRefs = useRef({});
  const [previewItem, setPreviewItem] = useState(null);

  const handleTriggerUpload = (key) => {
    if (fileInputRefs.current[key]) {
      fileInputRefs.current[key].click();
    }
  };

  const handleFileChange = (key, event, isMultiple) => {
    if (isMultiple) {
      const files = Array.from(event.target.files || []);
      if (files.length > 0) onSelectFile(key, files);
    } else {
      const file = event.target.files?.[0];
      if (file) onSelectFile(key, file);
    }
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" sx={{ fontWeight: 800, color: "#0F172A", mb: 0.5 }}>
        Complete Your Verification
      </Typography>
      <Typography variant="body2" sx={{ color: "#64748B", fontSize: "13.5px", mb: 2.5 }}>
        Please upload the required documents and images below.
      </Typography>

      {/* Category Tabs */}
      {/* {tabs.length > 0 && (
        <Tabs
          value={activeTab}
          onChange={(e, val) => onTabChange(val)}
          sx={{
            borderBottom: "1px solid #E2E8F0",
            mb: 3,
            "& .MuiTabs-indicator": { bgcolor: "#017E53", height: 3 },
            "& .MuiTab-root": {
              textTransform: "none",
              fontWeight: 700,
              fontSize: "13.5px",
              color: "#64748B",
              "&.Mui-selected": { color: "#017E53" },
            },
          }}
        >
          {tabs.map((t) => (
            <Tab key={t.id} value={t.id} label={t.name} />
          ))}
        </Tabs>
      )} */}

      {/* Document Cards */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {documents.map((doc) => {
          const docKey = doc.id || doc.key;
          const isMultiple = docKey === "business_images";
          const chosenFile = selectedFiles[docKey];
          
          const hasStagedFile = isMultiple
            ? Array.isArray(chosenFile) && chosenFile.length > 0
            : Boolean(chosenFile);

          const hasServerDoc = doc.isUploaded || Boolean(doc.documentUrl) || (doc.documentUrls && doc.documentUrls.length > 0);
          const isRejected = doc.status?.toLowerCase() === "rejected";

          return (
            <Paper
              key={docKey}
              elevation={0}
              sx={{
                p: 2.5,
                borderRadius: "14px",
                border: isRejected ? "1px solid #FCA5A5" : "1px solid #E2E8F0",
                bgcolor: isRejected ? "#FFFDFD" : "#FFFFFF",
                display: "flex",
                flexDirection: "column",
                gap: 1.5,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  justifyContent: "space-between",
                  alignItems: { xs: "flex-start", sm: "center" },
                  gap: 2,
                }}
              >
                {/* Document Information */}
                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: "10px",
                      bgcolor: "#F8FAFC",
                      border: "1px solid #E2E8F0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {getDocumentIcon(docKey)}
                  </Box>

                  <div>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap", mb: 0.3 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "#0F172A", fontSize: "14px" }}>
                        {doc.name}
                      </Typography>
                      {doc.required ? (
                        <Chip
                          label="Required"
                          size="small"
                          sx={{ bgcolor: "#FEF2F2", color: "#DC2626", fontWeight: 700, fontSize: "10px", height: 20 }}
                        />
                      ) : (
                        <Chip
                          label="Optional"
                          size="small"
                          sx={{ bgcolor: "#F1F5F9", color: "#64748B", fontWeight: 700, fontSize: "10px", height: 20 }}
                        />
                      )}
                      {getStatusBadge(doc.status)}
                    </Box>

                    <Typography variant="caption" sx={{ color: "#64748B", display: "block", fontSize: "12px", mb: 0.5 }}>
                      {doc.description}
                    </Typography>

                    {/* Staged File Name or Server URL Preview */}
                    {hasStagedFile ? (
                      <Typography
                        variant="caption"
                        sx={{ color: "#017E53", fontSize: "11px", fontWeight: 700, display: "flex", alignItems: "center", gap: 0.5 }}
                      >
                        <CheckCircle sx={{ fontSize: 13 }} />
                        {isMultiple
                          ? `${chosenFile.length} new file(s) staged: ${chosenFile.map((f) => f.name).join(", ")}`
                          : `Staged: ${chosenFile.name}`}
                      </Typography>
                    ) : hasServerDoc ? (
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mt: 0.5, flexWrap: "wrap" }}>
                        {doc.documentUrl && (
                          <Button
                            size="small"
                            variant="text"
                            onClick={() => setPreviewItem({ url: doc.documentUrl, name: doc.name })}
                            endIcon={<OpenInNew sx={{ fontSize: 12 }} />}
                            sx={{ p: 0, minWidth: 0, textTransform: "none", fontSize: "11.5px", color: "#017E53", fontWeight: 700 }}
                          >
                            View Uploaded File
                          </Button>
                        )}
                        {doc.documentUrls?.map((url, i) => (
                          <Button
                            key={i}
                            size="small"
                            variant="text"
                            onClick={() => setPreviewItem({ url, name: `${doc.name} #${i + 1}` })}
                            endIcon={<OpenInNew sx={{ fontSize: 12 }} />}
                            sx={{ p: 0, minWidth: 0, textTransform: "none", fontSize: "11.5px", color: "#017E53", fontWeight: 700 }}
                          >
                            Image {i + 1}
                          </Button>
                        ))}
                        {doc.uploadedAt && (
                          <Typography variant="caption" sx={{ color: "#94A3B8", fontSize: "11px" }}>
                            • Uploaded on {doc.uploadedAt.split("T")[0]}
                          </Typography>
                        )}
                      </Box>
                    ) : (
                      <Typography variant="caption" sx={{ color: "#94A3B8", fontSize: "11px", fontWeight: 600 }}>
                        {doc.allowedFormats || "JPEG, PNG OR PDF (MAX. 5MB)"}
                      </Typography>
                    )}
                  </div>
                </Box>

                {/* Upload / Replace Action */}
                <Box sx={{ alignSelf: { xs: "stretch", sm: "center" } }}>
                  <input
                    type="file"
                    hidden
                    multiple={isMultiple}
                    ref={(el) => (fileInputRefs.current[docKey] = el)}
                    accept={doc.accept || ".jpg,.jpeg,.png,.pdf"}
                    onChange={(e) => handleFileChange(docKey, e, isMultiple)}
                  />

                  <Button
                    variant={hasStagedFile || hasServerDoc ? "outlined" : "contained"}
                    onClick={() => handleTriggerUpload(docKey)}
                    startIcon={
                      hasStagedFile || hasServerDoc ? (
                        <CheckCircle sx={{ fontSize: 16 }} />
                      ) : (
                        <UploadFileOutlined sx={{ fontSize: 16 }} />
                      )
                    }
                    sx={{
                      width: { xs: "100%", sm: "auto" },
                      py: 0.9,
                      px: 2.2,
                      borderRadius: "10px",
                      textTransform: "none",
                      fontWeight: 700,
                      fontSize: "12.5px",
                      bgcolor: hasStagedFile || hasServerDoc ? "transparent" : "#017E53",
                      borderColor: hasStagedFile || hasServerDoc ? "#017E53" : "transparent",
                      color: hasStagedFile || hasServerDoc ? "#017E53" : "#FFFFFF",
                      "&:hover": {
                        bgcolor: hasStagedFile || hasServerDoc ? "rgba(1, 126, 83, 0.04)" : "#016744",
                        borderColor: "#017E53",
                      },
                    }}
                  >
                    {hasStagedFile || hasServerDoc ? "Replace Document" : "Upload Document"}
                  </Button>
                </Box>
              </Box>

              {/* Rejection Notice Banner */}
              {isRejected && doc.reason && (
                <Box
                  sx={{
                    mt: 1,
                    p: 1.2,
                    borderRadius: "8px",
                    bgcolor: "#FEF2F2",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 1,
                  }}
                >
                  <ErrorOutlined sx={{ fontSize: 16, color: "#DC2626", mt: 0.2 }} />
                  <Typography variant="caption" sx={{ color: "#991B1B", fontWeight: 600, fontSize: "11.5px" }}>
                    <strong>Rejection reason:</strong> {doc.reason}
                  </Typography>
                </Box>
              )}
            </Paper>
          );
        })}
      </Box>

      {/* Document Zoom / Preview Modal */}
      <Dialog
        open={Boolean(previewItem)}
        onClose={() => setPreviewItem(null)}
        maxWidth="md"
        fullWidth
        PaperProps={{ sx: { borderRadius: "16px", p: 1 } }}
      >
        <DialogTitle sx={{ fontWeight: 800, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>{previewItem?.name}</span>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              size="small"
              href={previewItem?.url}
              target="_blank"
              rel="noopener noreferrer"
              endIcon={<OpenInNew fontSize="small" />}
              sx={{ textTransform: "none", color: "#017E53", fontWeight: 700 }}
            >
              Open Original
            </Button>
            <IconButton size="small" onClick={() => setPreviewItem(null)}>
              <Close fontSize="small" />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ textAlign: "center", p: 2 }}>
          {previewItem?.url?.toLowerCase().endsWith(".pdf") ? (
            <Box
              component="iframe"
              src={previewItem.url}
              title={previewItem.name}
              sx={{ width: "100%", height: "65vh", border: "none", borderRadius: "8px" }}
            />
          ) : (
            <Box
              component="img"
              src={previewItem?.url}
              alt={previewItem?.name}
              sx={{ maxWidth: "100%", maxHeight: "70vh", objectFit: "contain", borderRadius: "8px" }}
            />
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default VerificationDocumentList;