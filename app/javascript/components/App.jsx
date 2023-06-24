import React from "react";
import Entry from "./Entry";
import Navbar from "./Navbar"
function App() {
    return (
        <main className='flex w-full h-full'>
            <Navbar />
            <div className='flex flex-col w-full h-full justify-center items-center'>
                <Entry />
            </div>
        </main>
    );
};

export default App;
