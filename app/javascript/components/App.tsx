import React, { useState, useEffect } from "react";
import Homepage from "./About/Homepage";
import SiteHeader from "./Header/SiteHeader";
import Sidebar from "./Sidebar/Sidebar";
import Entry from "./Entry/ShowEntry/Entry";
import EntryIndex from "./Entry/EntryIndex/EntryIndex";
import NewEntry from "./Entry/NewEntry/NewEntry";
import EditEntry from "./Entry/EditEntry/EditEntry";
import Settings from "./Settings/Settings";
import { Switch, Route, Redirect, useLocation } from "wouter";
import Interpretation from "./Interpretation/ShowInterpretation/Interpretation";
import EditInterpretation from "./Interpretation/EditInterpretation/EditInterpretation";
import { UserContext } from "../context/UserContext";
import { PopupMessageContext } from "../context/PopupMessageContext";
import { SidebarEntryContext } from "../context/SidebarEntryContext";

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
      <div className="flex h-screen flex-col-reverse justify-between text-white md:flex-row">
        <SidebarEntryContext.Provider
          value={{
            sidebarEntriesUpdateTrigger,
            setSidebarEntriesUpdateTrigger,
          }}
        >
          {isLoggedIn ? <Sidebar /> : isLoggedIn}
          <section className="flex h-full w-full flex-col justify-end">
            <SiteHeader />
            <main className="contents h-full flex-col items-center pb-8 pl-8 pr-8 md:flex">
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
          </section>
        </SidebarEntryContext.Provider>
      </div>
    </UserContext.Provider>
  );
}

export default App;