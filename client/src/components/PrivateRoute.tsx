import { useSelector } from "react-redux";
import { RootState } from "redux/store";

function PrivateRoute({ children }: { children: React.ReactElement }) {
  const { auth } = useSelector((state: RootState) => state);
  const isAdmin = auth.decodedUser.isAdmin ;
  if (!isAdmin) {
    return <div></div>;
  }
  return children;
}

export default PrivateRoute;
