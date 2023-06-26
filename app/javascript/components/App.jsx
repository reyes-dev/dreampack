import React from "react";
import Entry from "./Entry";
import Navbar from "./Navbar"
import AllEntrys from "./AllEntrys";
import { Route } from "wouter";

function App() {
    return (
        <main className='flex w-full h-full'>
            <Navbar />
            <div className='flex flex-col w-full h-full justify-center items-center'>
                <Entry />
            </div>

            <Route path="/entry" component={AllEntrys} />
        </main>
    );
};

export default App;
