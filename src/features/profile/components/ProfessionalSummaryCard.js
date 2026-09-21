import React from "react";
import { Box, Paper, Typography, Chip, Button } from "@mui/material";
import { DescriptionOutlined, Add, AutoAwesomeOutlined } from "@mui/icons-material";

const ProfessionalSummaryCard = ({ summary, onEditClick }) => {
  const bio = summary?.bio?.trim();
  const skills = Array.isArray(summary?.skills) ? summary.skills : [];
  const isEmpty = !bio && skills.length === 0;

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2.5, sm: 3 },
        borderRadius: "16px",
        border: "1px solid #E2E8F0",
        bgcolor: "#FFFFFF",
        mb: 3,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 800, color: "#0F172A", fontSize: "16px" }}>
          Professional Summary
        </Typography>
        {!isEmpty && onEditClick && (
          <Button
            size="small"
            onClick={onEditClick}
            sx={{ textTransform: "none", color: "#017E53", fontWeight: 700, fontSize: "12.5px" }}
          >
            Edit
          </Button>
        )}
      </Box>

      {isEmpty ? (
        <Box
          sx={{
            py: 3,
            px: 2,
            borderRadius: "12px",
            border: "1.5px dashed #CBD5E1",
            bgcolor: "#F8FAFC",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              bgcolor: "#ECFDF5",
              color: "#017E53",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 1.5,
            }}
          >
            <AutoAwesomeOutlined sx={{ fontSize: 22 }} />
          </Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#1E293B", mb: 0.5 }}>
            Highlight your expertise & skills
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: "#64748B", maxWidth: 360, mb: 2, lineHeight: 1.5, display: "block" }}
          >
            Add a professional bio and key specializations to help clients understand your services and increase bookings.
          </Typography>
          <Button
            variant="contained"
            size="small"
            startIcon={<Add />}
            onClick={onEditClick}
            sx={{
              bgcolor: "#017E53",
              color: "#FFFFFF",
              textTransform: "none",
              fontWeight: 700,
              fontSize: "12px",
              borderRadius: "8px",
              px: 2.2,
              boxShadow: "none",
              "&:hover": { bgcolor: "#016744" },
            }}
          >
            Add Bio & Skills
          </Button>
        </Box>
      ) : (
        <>
          {/* Bio Text */}
          {bio ? (
            <Typography
              variant="body2"
              sx={{ color: "#475569", lineHeight: 1.6, fontSize: "13.5px", mb: 2.5, whiteSpace: "pre-line" }}
            >
              {bio}
            </Typography>
          ) : (
            <Box
              sx={{
                p: 1.5,
                mb: 2,
                borderRadius: "8px",
                bgcolor: "#F8FAFC",
                border: "1px dashed #E2E8F0",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="caption" sx={{ color: "#94A3B8", fontStyle: "italic" }}>
                No written bio provided yet.
              </Typography>
              <Button size="small" onClick={onEditClick} sx={{ color: "#017E53", textTransform: "none", fontWeight: 700, fontSize: "11px" }}>
                + Add Bio
              </Button>
            </Box>
          )}

          {/* Skills Badges */}
          <Box>
            <Typography
              variant="caption"
              sx={{ color: "#64748B", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", display: "block", mb: 1 }}
            >
              Specializations & Skills
            </Typography>
            {skills.length > 0 ? (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {skills.map((skill, index) => (
                  <Chip
                    key={index}
                    label={skill}
                    size="small"
                    sx={{
                      bgcolor: "#F1F5F9",
                      color: "#334155",
                      fontWeight: 600,
                      borderRadius: "6px",
                      fontSize: "11.5px",
                    }}
                  />
                ))}
              </Box>
            ) : (
              <Button size="small" onClick={onEditClick} sx={{ color: "#017E53", textTransform: "none", fontWeight: 700, fontSize: "11.5px", p: 0 }}>
                + Add skills tags
              </Button>
            )}
          </Box>
        </>
      )}
    </Paper>
  );
};

export default ProfessionalSummaryCard;