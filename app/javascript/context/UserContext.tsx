import { Dispatch, SetStateAction, createContext } from "react";

interface IUserContext {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

export const UserContext = createContext<IUserContext>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});
