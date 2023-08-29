import React from "react";
import Homepage from "./Homepage";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Entry from "./Entry";
import EntryIndex from "./EntryIndex";
import NewEntry from "./NewEntry";
import EditEntry from "./EditEntry";
import Settings from "./Settings";
import { Switch, Route } from "wouter";
import Interpretation from "./Interpretation";
import EditInterpretation from "./EditInterpretation";

function App() {
  return (
    <main className="flex text-white">
      <Sidebar />
      <div className="flex w-full flex-col-reverse justify-end">
        <section className="flex flex-col items-center">
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
