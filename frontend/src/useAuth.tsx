import { useContext, useDebugValue } from "react";
import AuthContext from "./AuthProvider";
const auth= useContext(AuthContext);

const useAuth = () => {
  useDebugValue(auth, (auth) => (auth?.user? "Logged In" : "Logged Out"));
  return useContext(AuthContext);
};

export default useAuth;
