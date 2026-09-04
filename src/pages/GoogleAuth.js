import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Dialog, DialogContent } from "@mui/material";

const GoogleAuth = () => {
    const location = useLocation()
      const [err, setErr] = useState('')
      const navigate = useNavigate()
      const uri = useSelector(state=>state.UriReducer.uri)
      const [isLoading, setIsLoading] = useState(true)
    
      useEffect(() => {    
        const params = new URLSearchParams(location.search);
        const tokenParam = params.get('token');            
        if (tokenParam) {
          axios.get(`${uri}auth/me`, {
                headers: { Authorization: `Bearer ${decodeURIComponent(tokenParam)}` }
            })
            .then((res)=>{   
              if (res.data.account.role == 'agent'){
                sessionStorage.setItem("route", "/agent/dashboard")
                sessionStorage.setItem("userToken", tokenParam);
                navigate("/agent/dashboard");
              } else {
                navigate(`/login?error=${'You are not authorized to access this page'}`)
              }              
              setIsLoading(false);
            })
            .catch((err)=>{
              console.log(err);
                // navigate(`/login?error=${err.response.data.message}`)
            })
        }else navigate('/login?error=Authentication failed')
      }, [location.search]);
  return (
    <Fragment>
        {/* <Navbar /> */}
        <Dialog open={isLoading} PaperProps={{
              style: {
              backgroundColor: 'transparent',
              boxShadow: 'none',
              }
          }}
          >
              <DialogContent>
                  <p>
                      <span className='spinner-border'></span>
                  </p>
              </DialogContent>
          </Dialog>
        {/* <Footer /> */}
    </Fragment>
  )
}

export default GoogleAuth;