import React, { useState, useEffect } from 'react';
import { Link } from "wouter";

function EntryIndex() {
    const [entries, setEntries] = useState([]);
    
    useEffect(() => {
        getEntries();
    }, []);

    const getEntries = async () => {
        const url = `/api/entrys/`;
        const response = await fetch(url);
        console.log(response);
        const data = await response.json();
        console.log(data);
        setEntries(data);
    }
        
    const entryList = entries.map((entry) => {
        return ( 
            <ul key={entry.id}>
                <div className="flex justify-between">
                    <Link href={`/entrys/index/${entry.id}`}>{entry.title}</Link>
                    <Link href={`/entrys/index/${entry.id}/edit`}
                    className="text-sky-500">Edit Entry</Link>
                </div>
                <li>{entry.body}</li>
            </ul>
        );
    });

    return (
        <section className='flex flex-col bg-white px-8 py-8 gap-4 w-[35%] 
        max-w-4xl max-h-[90%] h-full shadow-2xl'>
            <h1>Journal Entries</h1>
            {entryList}
        </section>
    );
};

export default EntryIndex;
