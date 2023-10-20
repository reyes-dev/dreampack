import { Dispatch, SetStateAction, createContext } from "react";

interface IPopupMessageContext {
  errorExists: boolean;
  setErrorExists: Dispatch<SetStateAction<boolean>>;
}

export const PopupMessageContext = createContext<IPopupMessageContext>({
  errorExists: false,
  setErrorExists: () => {},
});
