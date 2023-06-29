import React from "react";
import Navbar from "./Navbar";
import Entry from "./Entry";
import EntryIndex from "./EntryIndex";
import NewEntry from "./NewEntry";
import EditEntry from "./EditEntry";
import { Switch, Route } from "wouter";

function App() {
    return (
        <main className='flex w-full h-full'>
            <Navbar /> 
            <div className='flex flex-col w-full h-full justify-center items-center'>
                <Switch>
                    <Route path="/entrys/index/:id/edit" component={EditEntry} />
                    <Route path="/entrys/index/:id" component={Entry} />
                    <Route path="/entrys/index" component={EntryIndex} />
                    <Route path='/' component={NewEntry} />
                </Switch>    
            </div>

        </main>
    );
};

export default App;
