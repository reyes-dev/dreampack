import { Dispatch, SetStateAction, createContext } from "react";

interface ISidebarEntryContext {
  sidebarEntriesUpdateTrigger: boolean;
  setSidebarEntriesUpdateTrigger: Dispatch<SetStateAction<boolean>>;
}

export const SidebarEntryContext = createContext<ISidebarEntryContext>({
  sidebarEntriesUpdateTrigger: false,
  setSidebarEntriesUpdateTrigger: () => {},
});
