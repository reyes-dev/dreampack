import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import DeleteEntry from "./DeleteEntry";
import * as Selection from 'selection-popover';
import DreamSign from './DreamSign';
import Highlighter from "react-highlight-words";

function Entry({params}) {
    const [entry, setEntry] = useState({});
    const [selectedText, setSelectedText] = useState();
    const [dreamSigns, setDreamSigns] = useState([]);

    useEffect(() => {
        getEntry();
        getDreamSigns();
    }, []);

    const getEntry = async () => {
        const url = `/api/entrys/${params.id}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        setEntry(data);
    };

    const getDreamSigns = async () => {
        const url = `/api/dream_signs`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        setDreamSigns(data);
    }

    const handleMouseUp = () => {
        console.log(`Selected text: ${window.getSelection().toString()}`);
        setSelectedText(window.getSelection().toString());
    }

    const highlightNewDreamSign = () => {
        setDreamSigns((dreamSigns) => [...dreamSigns, selectedText])
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
                <Selection.Trigger>
                    <p onMouseUp={handleMouseUp}>
                        <Highlighter searchWords={dreamSigns} textToHighlight={entry.body} />
                    </p>
                </Selection.Trigger>
                <Selection.Portal>
                    <Selection.Content side='bottom'><DreamSign phrase={selectedText} 
                    highlightNewDreamSign={highlightNewDreamSign} /></Selection.Content>
                </Selection.Portal>
            </Selection.Root>
        </section>
    );
};

export default Entry;
