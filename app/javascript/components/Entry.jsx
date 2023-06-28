import React, { useState, useEffect } from "react";

function Entry({params}) {
    const [entry, setEntry] = useState({});

    useEffect(() => {
        getEntry();
    }, []);

    const getEntry = async () => {
        const url = `/api/entrys/${params.id}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        setEntry(data);
    };

    return (
        <section className='flex flex-col bg-white px-8 py-8 gap-4 w-[35%] 
        max-w-4xl max-h-[90%] h-full shadow-2xl'>
            <h1>{entry.title}</h1>
            <p>{entry.created_at}</p>
            <p>{entry.body}</p>
        </section>
    );
};

export default Entry;
