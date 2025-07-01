import { useContext } from "react";
import { UsersContext } from "../Context/UsersContext";

export const useUsers = () => {
  const context = useContext(UsersContext);

  return context;
};
