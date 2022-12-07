import { Typography } from "@mui/material";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
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
	navigate("/home")
  };

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Typography variant="h3">Please login with Google</Typography>
      <GoogleLogin
        onSuccess={handleGoogleOnSuccess}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </>
  );
}
