import { Alert, Dialog, DialogContent } from "@mui/material";
import axios from "axios";
import React, { use, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { extractErrorMessage } from "../utils/errorParser";

const VerifyEmail = () => {  
    const navigate = useNavigate()
    const email = sessionStorage.getItem('tempUserEmail')
    const [code, setCode] = useState()
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const uri = useSelector(state=>state.UriReducer.uri)
    const [isLoading, setIsLoading] = useState(false)
    const [openDialog, setOpenDialog] = useState(false)

    const verify = () => {
        setError('')
        setSuccess('')
        if (code) {
            setIsLoading(true)
            axios.post(`${uri}auth/verify-email`, { email, code: String(code) })
            .then((res) => {
                console.log(res.data)
                navigate('/login')
            })
            .catch((err) => {
                setIsLoading(false)
                setError(extractErrorMessage(err))
            })
        } else {
            setError('Enter verification code')
        }
    }
    const resendCode = () => {
        setError('')
        setSuccess('')
        setOpenDialog(true)
        axios.post(`${uri}auth/resend-verification`, { email })
        .then((res) => {
            console.log(res.data)
            setSuccess(res.data.message)
            setOpenDialog(false)
        })
        .catch((err) => {
            setOpenDialog(false)
            setError(extractErrorMessage(err))
        })
    }

    useEffect(() => {
        if(!email){
            navigate('/create-account')
        }
    }, [email, navigate])

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
                <h4 className="text-center fw-semibold mb-1">Lets verify your email</h4>
                <p
                className="text-center text-muted mb-4"
                style={{ fontSize: "14px" }}
                >
                    Check <b>{email}</b> to verify your account and get started
                </p>

                {error !== '' && (
                <Alert severity="error" className="mb-3">
                    {error}
                </Alert>
                )}
                {success && (
                <Alert severity="success" className="mb-3">
                    {success}
                </Alert>
                )}
                {/* Form */}
                <div>               
                <div className="mb-3">
                    <label className="form-label fw-medium" style={{ fontSize: "13px" }}>
                    Enter Code
                    </label>
                    <input
                    type="number"
                    className="form-control"
                    placeholder="falanayemi.com"
                    style={{
                        border: "1px solid #e9e9e9",
                        height: "42px",
                        fontSize: "14px",
                    }}
                    onChange={(e)=>setCode(e.target.value)}
                    />
                </div>                            

                <button
                    onClick={verify}
                    disabled={isLoading}
                    type="submit"
                    className="btn w-100 fw-semibold"
                    style={{
                    backgroundColor: "#004225",
                    color: "#fff",
                    borderRadius: "6px",
                    height: "45px",
                    }}
                >
                    {isLoading ? 'Verifying...' : 'Verify'}
                </button>

                <p onClick={resendCode} className="text-center mt-3 mb-0 text-primary fw-bold cursor-pointer" style={{ fontSize: "13px" }}>
                    Resend                    
                </p>
                </div>
            </div>
            <Dialog open={openDialog} PaperProps={{
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
        </div>
    </>
  );
}

export default VerifyEmail;