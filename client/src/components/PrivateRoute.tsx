import jwt_decode from "jwt-decode";

type DecodedUser = {
  userId: string;
  isAdmin: boolean;
  iat: number;
  exp: number;
};

function PrivateRoute({ children }: { children: React.ReactElement }) {
  const token = localStorage.getItem("token") || "";
  const authUser = jwt_decode(token) as DecodedUser;
  if (!authUser.isAdmin) {
    return <div></div>;
  }
  return children;
}

export default PrivateRoute;
