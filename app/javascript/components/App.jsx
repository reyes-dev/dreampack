import React from "react";
import Entry from "./Entry";
import Navbar from "./Navbar"
import EntryIndex from "./EntryIndex";
import NewEntry from "./NewEntry";
import { Switch, Route } from "wouter";

function App() {
    return (
        <main className='flex w-full h-full'>
            <Navbar />
            <div className='flex flex-col w-full h-full justify-center items-center'>
                <Switch>
                    <Route path="/entrys/index" component={EntryIndex} />
                    <Route path='/' component={NewEntry} />
                </Switch>    
            </div>

        </main>
    );
};

export default App;
