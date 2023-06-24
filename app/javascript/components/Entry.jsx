import React from "react";

function Entry() {
    return (
        <section className='flex flex-col bg-white px-8 py-8 gap-4 w-[35%] max-w-4xl max-h-[90%] h-full shadow-2xl'>
            <div className='flex border-b pb-2'>
                <input className='text-3xl flex-1 outline-none' name="entryTitle" placeholder="Entry Title" />
                <button className='text-sky-500 self-start italic'>Save entry</button>
            </div>
            
            <div className='border-b pb-2'>
                <p className='text-gray-600'>Created on {new Date().toDateString()}</p>
            </div>
            
            <textarea className='h-full outline-none resize-none' name="entryText" placeholder="Your entry here..." />
        </section>
    );
};

export default Entry;
