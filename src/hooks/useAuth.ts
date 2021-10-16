import { useContext } from "react";
import { AuthContext } from "../store/auth-context";

export const useAuth = () => {
  const ctx = useContext(AuthContext);

  return { ...ctx };
};
