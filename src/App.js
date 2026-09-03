import logo from './logo.svg';
import './App.css';
import { Fragment } from 'react';
import Maintenance from './pages/Maintenance';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import NotFound from './pages/NotFound';
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AgentDashboardMain from './features/AgentDashboardMain';
import MyPropertiesServices from './features/myPropertyServices/MyPropertiesServices';
import ListPropertyType from './features/ListPropertyType';
import CreateListingWizard from './features/createListing/CreateListingWizard';
import AgentRegister from './pages/AgentRegister';
import VerifyEmail from './pages/VerifyEmail';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import UnderConstruction from './pages/UnderConstruction';

function App() {
  const uri = useSelector(state=>state.UriReducer.uri)
  const dispatch = useDispatch()
  const theme = createTheme({
    typography: {
      fontFamily: "'Poppins', sans-serif",
    },
  });
  useEffect(()=>{
    axios.post(`${uri}payment/update-rates`).then((res)=>{
      let { usd, gbp, eur } = res.data.data
      dispatch({type: 'SET_EXCHANGE_RATE', payload: { NGN: 1, USD: usd, GBP: gbp, EUR: eur}})      
    }).catch((err)=>{
      console.log("Error updating currency rates");
    })
  }, [])
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate replace to="/login" />} />
        {/* <Route path='/' element={<Maintenance />} /> */}
        <Route path='/login' element={<Login />} />    
        <Route path='/register' element={<AgentRegister />} />   
        <Route path='/create-account/verify' element={<VerifyEmail />} />          
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} /> 
        <Route path='/agent' element={<Dashboard />}>
          <Route path='dashboard' element={<AgentDashboardMain />} />
          <Route path='listings' element={<MyPropertiesServices />} />
          <Route 
            path="profile" 
            element={<UnderConstruction featureName="Profile" />} 
          />
          <Route 
            path="verification" 
            element={<UnderConstruction featureName="Agent Verification" />} 
          />
          <Route path='transactions' element={<UnderConstruction featureName="Earnings and Transactions" />} />          
        </Route>
        <Route path='/agent/property-types' element={<ListPropertyType />} />        
        <Route path='/list-property/details' element={<CreateListingWizard />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;