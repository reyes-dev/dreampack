import React from "react";
import Homepage from "./About/Homepage";
import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";
import Entry from "./Entry/ShowEntry/Entry";
import EntryIndex from "./Entry/EntryIndex/EntryIndex";
import NewEntry from "./Entry/NewEntry/NewEntry";
import EditEntry from "./Entry/EditEntry/EditEntry";
import Settings from "./Settings/Settings";
import { Switch, Route } from "wouter";
import Interpretation from "./Interpretation/ShowInterpretation/Interpretation";
import EditInterpretation from "./Interpretation/EditInterpretation/EditInterpretation";

function App() {
  return (
    <main className="flex h-screen text-white">
      <Sidebar />
      <div className="flex w-full flex-col-reverse justify-end">
        <section className="flex h-full flex-col items-center overflow-hidden pb-8 pl-8 pr-8">
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
          </Switch>
        </section>
        <Navbar />
      </div>
    </main>
  );
}

export default App;
