import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import DeleteEntry from "./DeleteEntry";
import * as Selection from 'selection-popover';

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
            <div className='flex justify-between'>
                <h1>{entry.title}</h1>
                <div className='flex gap-4'>
                    <DeleteEntry id={params.id} />
                    <Link href={`/entrys/index/${params.id}/edit`} 
                className='text-sky-500 self-start italic'>Edit Entry</Link>
                </div>
            </div>
            <p>{entry.created_at}</p>
            <Selection.Root>
                <Selection.Trigger><p>{entry.body}</p></Selection.Trigger>
                <Selection.Portal>
                    <Selection.Content>Dream Sign</Selection.Content>
                </Selection.Portal>
            </Selection.Root>
        </section>
    );
};

export default Entry;
