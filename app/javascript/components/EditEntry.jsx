import React, { useState, useEffect } from "react";

function EditEntry({params}) {
    const [entry, setEntry] = useState({});
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    // Store state data for CRUD operations 
    useEffect(() => {
        getEntry();
    }, []);
    
    useEffect(() => {
        setTitle(entry.title);
        setBody(entry.body);
    }, [entry]);
    
    const onChange = (event, setFunction) => {
        setFunction(event.target.value);
     };
 
    const getEntry = async () => {
        const url = `/api/entrys/${params.id}`;
        const response = await fetch(url);
        const data = await response.json();
        setEntry(data);
    };

    const updateEntry = async (event) => {
        event.preventDefault();
        if (title.length == 0 || body.length == 0) return;
        const url = `/api/entrys/${params.id}`;
        const id = params.id;
        const body_param = { title, body, id };
        const token = document.querySelector('meta[name="csrf-token"]').content;
        try {
            const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'X-CSRF-Token': token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body_param),
            });
            await response.text();
            return response.ok;
        } catch (e) {
             console.log(e);   
            } 
        };

    return (
        <form className='flex flex-col bg-white px-8 py-8 gap-4 w-[35%] 
        max-w-4xl max-h-[90%] h-full shadow-2xl' onSubmit={updateEntry}>
            <div className='flex border-b pb-2'>
                <input className='text-3xl flex-1 outline-none' name="entryTitle" 
        onChange={(event) => onChange(event, setTitle)} placeholder="Entry Title" 
        value={title || ''} />
                <button type='submit' className='text-sky-500 self-start italic'>Update entry</button>
            </div>
            
            <div className='border-b pb-2'>
                <p className='text-gray-600'>Created on {entry.created_at}</p>
            </div>
            
            <textarea className='h-full outline-none resize-none' name="entryText" 
        onChange={(event) => onChange(event, setBody)} placeholder="Your entry here..." 
        value={body || ''} />
        </form>

    );
};

export default EditEntry;
