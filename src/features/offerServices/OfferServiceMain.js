import React, { useState, useEffect } from "react";
import { Box, Paper, CircularProgress } from "@mui/material";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import axios from "axios";

import ServiceStepHeader from "./components/ServiceStepHeader";
import Step1ServiceDetails from "./components/Step1ServiceDetails";
import Step2PricingMedia from "./components/Step2PricingMedia";
import Step3ReviewSubmit from "./components/Step3ReviewSubmit";
import { step1Schema, step2Schema } from "../../schemas";

const defaultInitialValues = {
  title: "",
  short_description: "",
  full_description: "",
  category: "",
  location: "",
  coordinates: {
    latitude: 6.5244,
    longitude: 3.3792,
  },
  pricing_type: "fixed",
  base_price: 0,
  security_deposit: 5000,
  price_includes: "",
  additional_notes: "",
  amenities: [1, 2],
  images: [],
  availability: [
    {
      day_of_week: "monday",
      start_time: "08:00",
      end_time: "18:00",
      is_available: true,
    },
  ],
};

const OfferServiceMain = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();  
  const uri = useSelector((state) => state.UriReducer?.uri);
  const token = sessionStorage.getItem("userToken");
  const isEdit = Boolean(id || location.state?.serviceData);

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [fetchingDetails, setFetchingDetails] = useState(false);

  const formik = useFormik({
    initialValues: location.state?.serviceData || defaultInitialValues,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema: step === 1 ? step1Schema : step === 2 ? step2Schema : null,
    onSubmit: async (values) => {
      try {
        setLoading(true);        
        const headers = { Authorization: `Bearer ${token}` };

        if (isEdit) {
          await axios.put(`${uri}v2/service/${id || values.id}`, values, { headers });
        } else {
          await axios.post(`${uri}v2/service`, values, { headers });
        }

        navigate("/agent/dashboard");
      } catch (err) {
        console.error("Service submission failed:", err);
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    if (id && !location.state?.serviceData) {
      fetchServiceDetails(id);
    }
  }, [id]);

  const fetchServiceDetails = async (serviceId) => {
    try {
      setFetchingDetails(true);      
      const res = await axios.get(`${uri}v2/service/${serviceId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data?.data) {
        formik.setValues(res.data.data);
      }
    } catch (err) {
      console.error("Failed to load service details for edit:", err);
    } finally {
      setFetchingDetails(false);
    }
  };

  const handleNextStep = async () => {
    const errors = await formik.validateForm();
    if (step === 1) {
      const step1Fields = ["title", "category", "location", "short_description", "full_description"];
      formik.setTouched(
        step1Fields.reduce((acc, field) => ({ ...acc, [field]: true }), {})
      );
      const hasStep1Error = step1Fields.some((f) => errors[f]);
      if (!hasStep1Error) setStep(2);
    } else if (step === 2) {
      const step2Fields = ["pricing_type", "base_price", "images"];
      formik.setTouched(
        step2Fields.reduce((acc, field) => ({ ...acc, [field]: true }), {})
      );
      const hasStep2Error = step2Fields.some((f) => errors[f]);
      if (!hasStep2Error) setStep(3);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    } else {
      navigate(-1);
    }
  };

  if (fetchingDetails) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "70vh" }}>
        <CircularProgress sx={{ color: "#10B981" }} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "100%",
        minWidth: 0,
        overflowX: "hidden",
        boxSizing: "border-box",
        minHeight: "100vh",
        bgcolor: "#F8FAFC",
        py: { xs: 2, sm: 3, md: 5 },
        px: { xs: 1.5, sm: 3, md: 4 },
        display: "flex",
        justifyContent: "center",
      }}
    >
      {/* Broad, spacious container on desktop; narrow edge-to-edge on mobile */}
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: { xs: "100%", sm: 600, md: 840, lg: 920 },
          borderRadius: { xs: "20px", sm: "28px" },
          border: "1px solid #E2E8F0",
          bgcolor: "#FFFFFF",
          p: { xs: 2.5, sm: 4, md: 5 },
          boxSizing: "border-box",
        }}
      >
        <ServiceStepHeader
          step={step}
          totalSteps={3}
          onBack={handleBack}
          isEdit={isEdit}
        />

        {step === 1 && (
          <Step1ServiceDetails
            formik={formik}
            onNext={handleNextStep}
          />
        )}

        {step === 2 && (
          <Step2PricingMedia
            formik={formik}
            onNext={handleNextStep}
          />
        )}

        {step === 3 && (
          <Step3ReviewSubmit
            formik={formik}
            onEditSection={(targetStep) => setStep(targetStep)}
            loading={loading}
            isEdit={isEdit}
          />
        )}
      </Paper>
    </Box>
  );
};

export default OfferServiceMain;