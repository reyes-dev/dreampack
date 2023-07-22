import React from "react";
import Navbar from "./Navbar";
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
    <main className="flex h-full w-full">
      <Navbar />
      <div className="flex h-full w-full flex-col items-center justify-center">
        <Switch>
          <Route path="/entries/:id/edit" component={EditEntry} />
          <Route path="/entries/:id" component={Entry} />
          <Route path="/entries" component={EntryIndex} />
          <Route path="/" component={NewEntry} />
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
      </div>
    </main>
  );
}

export default App;
