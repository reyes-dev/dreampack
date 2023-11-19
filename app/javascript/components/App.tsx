import React, { useState, useEffect } from "react";
import Homepage from "components/About/Homepage";
import SiteHeader from "components/Header/SiteHeader";
import Sidebar from "components/Sidebar/Sidebar";
import Entry from "components/Entry/ShowEntry/Entry";
import EntryIndex from "components/Entry/EntryIndex/EntryIndex";
import NewEntry from "components/Entry/NewEntry/NewEntry";
import EditEntry from "components/Entry/EditEntry/EditEntry";
import Settings from "components/Settings/Settings";
import Interpretation from "components/Interpretation/ShowInterpretation/Interpretation";
import EditInterpretation from "components/Interpretation/EditInterpretation/EditInterpretation";
import { Switch, Route, Redirect, useLocation } from "wouter";
import { UserContext } from "context/UserContext";
import { PopupMessageContext } from "context/PopupMessageContext";
import { SidebarEntryContext } from "context/SidebarEntryContext";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorExists, setErrorExists] = useState(false);
  const [sidebarEntriesUpdateTrigger, setSidebarEntriesUpdateTrigger] =
    useState(false);
  const [, navigate] = useLocation();
  // Check logged in status to conditionally render components
  // Look into protected routes
  useEffect(() => {
    getCurrentUser();
  }, []);

  const getCurrentUser = async () => {
    const url = `/current_user`;
    try {
      const response = await fetch(url);
      if (response.status === 204) {
        return navigate("/");
      }
      const data = await response.json();
      setIsLoggedIn(true);
      return data;
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <div className="container mx-auto grid min-h-screen grid-cols-[1fr_3fr_1fr] grid-rows-[min-content_1fr] gap-[40px] text-white md:flex-row">
        <SidebarEntryContext.Provider
          value={{
            sidebarEntriesUpdateTrigger,
            setSidebarEntriesUpdateTrigger,
          }}
        >
          <SiteHeader />
          {isLoggedIn ? <Sidebar /> : isLoggedIn}
          <main className="break-all pb-8 pl-8 pr-8">
            <PopupMessageContext.Provider
              value={{ errorExists, setErrorExists }}
            >
              <Switch>
                <Route path="/" component={Homepage} />
                <Route path="/entries/new" component={NewEntry} />
                <Route path="/entries/:id/edit" component={EditEntry} />
                <Route path="/entries/:id" component={Entry} />
                <Route path="/entries/page/:page" component={EntryIndex} />
                <Route path="/settings" component={Settings} />
                <Route
                  path="/entries/:id/interpretation"
                  component={Interpretation}
                />
                <Route
                  path="/entries/:id/interpretation/edit"
                  component={EditInterpretation}
                />
                <Route>
                  <Redirect to="/" />
                </Route>
              </Switch>
            </PopupMessageContext.Provider>
          </main>
        </SidebarEntryContext.Provider>
      </div>
    </UserContext.Provider>
  );
}

export default App;
