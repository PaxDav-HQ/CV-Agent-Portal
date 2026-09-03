import { Alert } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {  
    const uri = useSelector(state=>state.UriReducer.uri)
    const navigate = useNavigate()
    const [checkAccount, setCheckAccount] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [code, setCode] = useState()
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')

    const verifyCode = () => {
        setError('')        
        if (code) {
            setIsLoading(true)
            axios.post(`${uri}auth/verify-forgot-password`, { email, code: parseInt(code) })
            .then((res) => {
                sessionStorage.setItem('resetToken', res.data.token)
                navigate('/reset-password')
                console.log(res.data)
            })
            .catch((err) => {
                setIsLoading(false)
                err.response ? setError(err.response.data.message) : setError('An error occurred')
            })
        } else {
            setError('Enter verification code')
        }    
        // Verification logic here
    }

    const checkUser = () => {
        setError('')
        if(!email){
            setError('Please enter your email address')            
        } else{
            setIsLoading(true)
            axios.post(`${uri}auth/forgot-password`, {email})
            .then((res)=>{
                setIsLoading(false)
                setCheckAccount(true)
                setSuccess(res.data.message)
                console.log(res.data)            
            })                        
            .catch((err)=>{
                setIsLoading(false)
                err.response ? setError(err.response.data.message) : setError('An error occurred')
            })
        }
    }

  return (
    <>        
        <div
            className="d-flex justify-content-center align-items-center py-2"
            style={{ minHeight: "100vh" }}
        >
            <div
                className=""
                style={{                            
                padding: "40px 32px",
                width: "100%",
                maxWidth: "420px",
                }}
            >
                {/* Header */}
                <h4 className="text-center fw-semibold mb-1">Forgot Password</h4>
                {
                    !checkAccount
                    ?
                    <>
                        <p
                            className="text-center text-muted mb-4"
                            style={{ fontSize: "14px" }}
                        >
                            No worries, we’ll send your reset instructions
                        </p>
                        {error &&
                            <Alert severity="error" className="mb-3">
                                {error}
                            </Alert>
                        }
                        <div className="mb-3">
                            <label className="form-label fw-medium" style={{ fontSize: "13px" }}>
                            Email Address
                            </label>
                            <input
                            type="email"
                            className="form-control"
                            placeholder="falanayemi.com"
                            onChange={(e)=>setEmail(e.target.value)}
                            style={{
                                border: "1px solid #e9e9e9",
                                height: "42px",
                                fontSize: "14px",
                            }}
                            />
                        </div>
                        <button
                            onClick={checkUser}
                            type="submit"
                            className="btn w-100 fw-semibold mb-4"
                            disabled={isLoading}
                            style={{
                            backgroundColor: "#004225",
                            color: "#fff",
                            borderRadius: "6px",
                            height: "45px",
                            }}
                        >
                            {isLoading ? 'Please wait...' : 'Continue'}
                        </button>
                    </>                
                    :
                    <>
                        {error && (
                        <Alert severity="error" className="mb-3">
                            {error}
                        </Alert>
                        )}                        
                        <p
                            className="text-center text-muted mb-4"
                            style={{ fontSize: "14px" }}
                        >
                            {success}
                        </p>
                            
                        <div>               
                            <div className="mb-3">
                                <label className="form-label fw-medium" style={{ fontSize: "13px" }}>
                                Enter Code
                                </label>
                                <input
                                type="number"
                                className="form-control"
                                placeholder="123456"
                                onChange={(e)=>setCode(e.target.value)}
                                style={{
                                    border: "1px solid #e9e9e9",
                                    height: "42px",
                                    fontSize: "14px",
                                }}
                                />
                            </div>                            

                            <button
                                onClick={verifyCode}
                                type="submit"
                                className="btn w-100 fw-semibold"
                                disabled={isLoading}
                                style={{
                                backgroundColor: "#004225",
                                color: "#fff",
                                borderRadius: "6px",
                                height: "45px",
                                }}
                            >
                                {isLoading ? 'Please wait...' : 'Continue'}
                            </button>

                            <p className="text-center mt-3 mb-0" style={{ fontSize: "13px" }}> 
                                Didn't receive the mail? {" "}
                                <a className="fw-semibold">
                                    Click Me
                                </a>
                            </p>
                        </div>
                    </>
                }
                <p className="text-center">
                    <Link to={'/login'} className="fw-semibold" style={{ fontSize: "13px" }}>
                        <i className="fa fa-arrow-left"></i> Back to Login
                    </Link>
                </p>
            </div>
        </div>
    </>
  );
}

export default ForgotPassword;