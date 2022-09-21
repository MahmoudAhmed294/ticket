import { LoginResponse } from "api/types";
import { useLayoutEffect, useState } from "react";
import { getUser } from "store/ticketsSlice";
import { useAppSelector } from "./useStore";

export const useAuth = () => {
  const userData = useAppSelector(getUser);
  const [User, setUser] = useState<string | undefined>(undefined);

  useLayoutEffect(() => {
    setUser(userData);
  }, [userData]);

  return User;
};
