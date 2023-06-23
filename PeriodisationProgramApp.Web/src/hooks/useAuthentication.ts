import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/Firebase";

const useAuthentication = () => {
  const [user] = useAuthState(auth);
  const isUserAuthenticated = user !== undefined && user !== null;

  return { isUserAuthenticated, user };
};

export default useAuthentication;
