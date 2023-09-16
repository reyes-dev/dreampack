import React, { useState, useEffect } from "react";
import Homepage from "./About/Homepage";
import Navbar from "./Navbar/Navbar";
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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorExists, setErrorExists] = useState(false);
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
      <main className="flex h-screen text-white">
        {isLoggedIn ? <Sidebar /> : isLoggedIn}
        <div className="flex w-full flex-col-reverse justify-end">
          <section className="flex h-full flex-col items-center pb-8 pl-8 pr-8">
            <PopupMessageContext.Provider
              value={{ errorExists, setErrorExists }}
            >
              <Switch>
                <Route path="/" component={Homepage} />
                <Route path="/entries/new" component={NewEntry} />
                <Route path="/entries/:id/edit" component={EditEntry} />
                <Route path="/entries/:id" component={Entry} />
                <Route path="/entries" component={EntryIndex} />
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
          </section>
          <Navbar />
        </div>
      </main>
    </UserContext.Provider>
  );
}

export default App;
