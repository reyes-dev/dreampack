import React, { useState } from "react";

function NewEntry() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    // Store state data for CRUD operations 
    const onChange = (event, setFunction) => {
        setFunction(event.target.value);
     };
    // POST entry data to Rails API
    const createEntry = async (event) => {
        event.preventDefault();
        // Validate body 
        if (body.length == 0) return;
        const dataBody = { body, title }
        const token = document.querySelector("meta[name='csrf-token']").content;
        const data = await fetch(`/api/entrys`, {
            method: 'POST',
            headers: {
                'X-CSRF-Token': token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataBody),
        });
        const response = await data.json();
        console.log(response);
        return response;
    };
    return (
        <form className='flex flex-col bg-white px-8 py-8 gap-4 w-[35%] 
        max-w-4xl max-h-[90%] h-full shadow-2xl' onSubmit={createEntry}>
            <div className='flex border-b pb-2'>
                <input className='text-3xl flex-1 outline-none' name="entryTitle" 
        onChange={(event) => onChange(event, setTitle)} placeholder="Entry Title" />
                <button type='submit' className='text-sky-500 self-start italic'>Save entry</button>
            </div>
            
            <div className='border-b pb-2'>
                <p className='text-gray-600'>Created on {new Date().toDateString()}</p>
            </div>
            
            <textarea className='h-full outline-none resize-none' name="entryText" 
        onChange={(event) => onChange(event, setBody)} placeholder="Your entry here..." />
        </form>
    );
};

export default NewEntry;
