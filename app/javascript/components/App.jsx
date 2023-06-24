import React from "react";
import Entry from "./Entry";
import Navbar from "./Navbar"
function App() {
    return (
        <main className='flex justify-center w-full h-full'>
            <Entry />
            <Navbar />
        </main>
    );
};

export default App;
