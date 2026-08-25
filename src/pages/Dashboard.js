import * as React from "react";
import {
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  Toolbar,
  AppBar,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import DashboardHeader from "../layouts/DashboardHeader";
import SidenavList from "../layouts/SidenavList";

const drawerWidth = 260;

function Dashboard(props) {
  const uri = useSelector((state) => state.UriReducer.uri);
  const token = sessionStorage.getItem("userToken");
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      axios
        .get(`${uri}auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          dispatch({ type: "SET_USER_INFO", payload: res.data.account });
        })
        .catch(() => {
          sessionStorage.removeItem("userToken");
          sessionStorage.removeItem("avatar");
          navigate("/login");
        });
    }
  }, [uri, token, dispatch, navigate]);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex", bgcolor: "#FAFBFC", minHeight: "100vh", maxWidth: "100vw", overflowX: "hidden" }}>
      <CssBaseline />

      {/* TOP APP BAR */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: "#FFFFFF",
          borderBottom: "1px solid #F0F2F5",
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
        }}
      >
        <Toolbar sx={{ px: { xs: 2, md: 4 }, py: 1 }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" }, color: "#111827" }}
          >
            <MenuIcon />
          </IconButton>
          <DashboardHeader />
        </Toolbar>
      </AppBar>

      {/* NAVIGATION DRAWER */}
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              borderRight: "1px solid #F0F2F5",
              bgcolor: "#FFFFFF",
            },
          }}
        >
          <SidenavList onCloseMobile={handleDrawerClose} />
        </Drawer>

        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              borderRight: "1px solid #F0F2F5",
              bgcolor: "#FFFFFF",
            },
          }}
          open
        >
          <SidenavList />
        </Drawer>
      </Box>

      {/* MAIN VIEWPORT */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3, md: 4 },
          width: { xs: "100%", md: `calc(100% - ${drawerWidth}px)` },
          maxWidth: "100%",
          minWidth: 0,
          boxSizing: "border-box",
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

export default Dashboard;