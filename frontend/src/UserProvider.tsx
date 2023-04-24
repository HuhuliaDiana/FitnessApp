import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
} from "react";
import Cookies from "js-cookie";

interface UserContextInterface {
  userLoading: boolean;
  setToken: Dispatch<any>;
  signOut: () => void;
}
const defaultValues: UserContextInterface = {
  userLoading: false,
  setToken(): void {},
  signOut(): void {},
};
interface Token {
  jwt: string;
  refreshJwt: string;
}
const UserContext = createContext<UserContextInterface>(defaultValues);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userLoading, setUserLoading] = useState(
    Boolean(localStorage.getItem("jwt"))
  );
  const [jwt, setJwt] = useState(Cookies.get("jwt"));
  const setToken = async (data: Token) => {
    const jwt = data.jwt ? data.jwt : "";
    const refreshJwt = data.refreshJwt ? data.refreshJwt : "";
    localStorage.setItem("jwt", jwt);
    localStorage.setItem("refreshJwt", refreshJwt);
  };
  const signOut = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("refreshJwt");
  };

  const value = { jwt, setJwt };
  return (
    <UserContext.Provider value={{ userLoading, setToken, signOut }}>
      {children}
    </UserContext.Provider>
  );
};

function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
}

export { useUser, UserProvider };
