import React, { useState, useEffect, useCallback } from "react";
import { Box, Grid, Alert, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";

import EarningsHeader from "./components/EarningsHeader";
import EarningsOverviewCards from "./components/EarningsOverviewCards";
import EarningsAnalyticsChart from "./components/EarningsAnalyticsChart";
import AvailableBalanceCard from "./components/AvailableBalanceCard";
import PayoutBankAccountsCard from "./components/PayoutBankAccountsCard";
import WithdrawalHistoryTable from "./components/WithdrawalHistoryTable";
import RequestWithdrawalModal from "./components/RequestWithdrawalModal";
import AddBankAccountModal from "./components/AddBankAccountModal";

const AgentEarningsWithdrawals = () => {
  const uri = useSelector((state) => state.UriReducer?.uri);
  const token = sessionStorage.getItem("userToken");
  const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);

  // Period filters
  const [period, setPeriod] = useState("this_month");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Modals state
  const [openWithdrawModal, setOpenWithdrawModal] = useState(false);
  const [openAddBankModal, setOpenAddBankModal] = useState(false);

  // Bank accounts & Supported Banks
  const [supportedBanks, setSupportedBanks] = useState([]);
  const [loadingBanks, setLoadingBanks] = useState(false);
  const [bankAccounts, setBankAccounts] = useState([]);

  // 1. Fetch Earnings Dashboard Overview
  const fetchEarnings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const params = { period };
      if (period === "custom" && startDate && endDate) {
        params.startDate = startDate;
        params.endDate = endDate;
      }

      const res = await axios.get(`${uri}agent/earnings`, {
        headers: authHeaders,
        params,
      });

      const resData = res.data?.data || res.data || {};
      setDashboardData(resData);

      if (resData.payout_bank_accounts) {
        setBankAccounts(resData.payout_bank_accounts);
      }
    } catch (err) {
      console.error("Failed to load earnings:", err);
      setError(err.response?.data?.message || "Failed to load earnings data.");
    } finally {
      setLoading(false);
    }
  }, [uri, period, startDate, endDate]);

  // 2. Fetch Supported Banks List
  const fetchSupportedBanks = async () => {
    try {
      setLoadingBanks(true);
      const res = await axios.get(`${uri}payment/supported-banks`, {
        headers: authHeaders,
      });      
      const banks = res.data?.banks|| [];
      setSupportedBanks(Array.isArray(banks) ? banks : []);
    } catch (err) {
      console.error("Failed to load supported banks:", err);
    } finally {
      setLoadingBanks(false);
    }
  };

  useEffect(() => {
    fetchEarnings();
  }, [fetchEarnings]);

  const handleOpenAddBank = () => {
    if (supportedBanks.length === 0) {
      fetchSupportedBanks();
    }
    setOpenAddBankModal(true);
  };

  // Add Bank
  const handleAddBank = async (bankPayload) => {
    // bankPayload is: { bank_name, bank_code, account_number, account_name }
    const res = await axios.post(`${uri}payment/add-bank`, bankPayload, {
      headers: authHeaders,
    });
    const newAccount = res.data?.data || res.data;
    setBankAccounts((prev) => [...prev, newAccount]);
    fetchEarnings();
  };

  // Delete Bank
  const handleDeleteBank = async (bankAccountId) => {
    if (!window.confirm("Are you sure you want to remove this bank account?")) return;
    try {
      await axios.delete(`${uri}payment/bank-account`, {
        headers: authHeaders,
        data: { bankAccountId },
      });
      setBankAccounts((prev) => prev.filter((b) => b.id !== bankAccountId));
      fetchEarnings();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to remove bank account.");
    }
  };

  // Submit Withdrawal
  const handleInitiateWithdrawal = async (withdrawPayload) => {
    await axios.post(`${uri}payment/initiate-withdrawal`, withdrawPayload, { headers: authHeaders });
    fetchEarnings();
  };

  if (loading && !dashboardData) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh" }}>
        <CircularProgress sx={{ color: "#017E53" }} />
      </Box>
    );
  }

  const overview = dashboardData?.overview || {};
  const accountBalance = dashboardData?.accountBalance || {};
  const chartData = dashboardData?.chartData || dashboardData?.earningsOverview?.chart || [];
  const withdrawalHistory = dashboardData?.withdrawalHistory || [];

  return (
    <Box sx={{ bgcolor: "#FAFBFC", minHeight: "100vh", p: { xs: 2, sm: 3, md: 4 }, pb: 8 }}>
      {/* 1. Header with Period Selector */}
      <EarningsHeader
        period={period}
        onPeriodChange={setPeriod}
        startDate={startDate}
        onStartDateChange={setStartDate}
        endDate={endDate}
        onEndDateChange={setEndDate}
      />

      {error && <Alert severity="error" sx={{ mb: 3, borderRadius: "12px" }}>{error}</Alert>}

      {/* 2. Top Metric Cards */}
      <EarningsOverviewCards overview={overview} accountBalance={accountBalance} />

      {/* 3. Middle Section: Analytics Chart + Wallet & Bank Details */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} lg={8}>
          <EarningsAnalyticsChart
            chartData={chartData}
            changeText={dashboardData?.earningsOverview?.changeText || "0% vs last month"}
          />
        </Grid>

        <Grid item xs={12} lg={4}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5, height: "100%" }}>
            <AvailableBalanceCard
              accountBalance={accountBalance}
              onWithdrawClick={() => setOpenWithdrawModal(true)}
            />
            <PayoutBankAccountsCard
              bankAccounts={bankAccounts}
              onAddBankClick={handleOpenAddBank}
              onDeleteBank={handleDeleteBank}
            />
          </Box>
        </Grid>
      </Grid>

      {/* 4. Withdrawal Logs */}
      <WithdrawalHistoryTable withdrawalHistory={withdrawalHistory} />

      {/* 5. Modals */}
      <RequestWithdrawalModal
        open={openWithdrawModal}
        onClose={() => setOpenWithdrawModal(false)}
        availableBalance={Number(accountBalance.available || 0)}
        bankAccounts={bankAccounts}
        onSubmit={handleInitiateWithdrawal}
      />

      <AddBankAccountModal
        open={openAddBankModal}
        onClose={() => setOpenAddBankModal(false)}
        supportedBanks={supportedBanks}
        loadingBanks={loadingBanks}
        onSubmit={handleAddBank}
      />
    </Box>
  );
};

export default AgentEarningsWithdrawals;