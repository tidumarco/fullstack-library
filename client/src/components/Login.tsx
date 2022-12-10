import { Box, Typography } from "@mui/material";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchTokenThunk } from "redux/services/auth.service";
import { AppDispatch } from "redux/store";

export default function AddBook() {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState<boolean>();

  const dispatch = useDispatch<AppDispatch>();

  const handleGoogleOnSuccess = async (response: CredentialResponse) => {
    setAuthenticated(true);
    dispatch(fetchTokenThunk(response));
    navigate("/home");
  };

  return (
    <div className="maincontainer">
      <div className="container-fluid">
        <div className="row no-gutter">
          <div className="col-md-6 d-none d-md-flex bg-image"></div>
          <div className="col-md-6 bg-light">
            <div className="login d-flex align-items-center py-5">
              <div className="container">
                <div className="row">
                  <div className="col-lg-10 col-xl-7 mx-auto">
                    <h3 className="display-4">Welcome back!</h3>
                    <p className="text-muted mb-4">
                      <GoogleLogin
                        onSuccess={handleGoogleOnSuccess}
                        onError={() => {
                          console.log("Login Failed");
                        }}
                      />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
