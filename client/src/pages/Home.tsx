import BooksTable from "../components/BooksTable";
import { GoogleLogin } from "@react-oauth/google";

export default function Home() {
  const handleGoogleOnSuccess = (response: any) => {
    console.log("response", response);
  };
  return (
    <>
      <GoogleLogin
        onSuccess={handleGoogleOnSuccess}
        onError={() => {
          console.log("Login Failed");
        }}
      />
      <BooksTable />
    </>
  );
}
