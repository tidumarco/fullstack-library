import { useState, useEffect } from "react";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";

interface CredentialResponse {
  credential?: string;

  select_by?:
    | "auto"
    | "user"
    | "user_1tap"
    | "user_2tap"
    | "btn"
    | "btn_confirm"
    | "brn_add_session"
    | "btn_confirm_add_session";
  clientId?: string;
}
export default function LoginButton() {
  const [token, setToken] = useState("");
  console.log("token:", token);
  

  useEffect(() => {
    const token = localStorage.getItem("token") || "";
    setToken(token);
  }, []);

  const handleGetBooks = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/v1/books", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("res", res.data);
    } catch (error: any) {
      console.log("Error", error.response.data);
    }
  };

  const handleGoogleOnSuccess = async (response: CredentialResponse) => {
    console.log("response", response);
    if (response.credential) {
      const res = await axios.post(
        "http://localhost:4000/api/v1/login",
        {},
        {
          headers: {
            id_token: response.credential,
          },
        }
      );
      const token = res.data.token;
      localStorage.setItem("token", token);
      setToken(token);
    }
  };
  return (
    <>
      <button onClick={handleGetBooks}>FETCH BOOKs</button>
      <GoogleLogin
        onSuccess={handleGoogleOnSuccess}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </>
  );
}
