import React from "react";
import Entry from "./Entry";
import Navbar from "./Navbar"
import EntryIndex from "./EntryIndex";
import { Route } from "wouter";

function App() {
    return (
        <main className='flex w-full h-full'>
            <Navbar />
            <div className='flex flex-col w-full h-full justify-center items-center'>
                <Entry />
            </div>

            <Route path="/entry" component={EntryIndex} />
        </main>
    );
};

export default App;
