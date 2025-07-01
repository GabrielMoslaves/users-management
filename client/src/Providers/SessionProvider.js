import { useContext } from "react";
import { SessionContext } from "../Context/SessionContext";

export const useSession = () => {
  const context = useContext(SessionContext);

  return context;
};
