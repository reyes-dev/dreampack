import React from "react";

function DreamSign({phrase, highlightNewDreamSign}) {
    // POST entry data to Rails API
    const createDreamSign = async () => {
        if (phrase.length <= 1) return;
        const token = document.querySelector("meta[name='csrf-token']").content;
        const data = await fetch(`/api/dream_signs`, {
            method: 'POST',
            headers: {
                'X-CSRF-Token': token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ phrase, description: '' }),
        });
        const response = await data.json();
        console.log(response);
        return response;
    };
 

    return ( 
        <button onClick={() => {createDreamSign(); highlightNewDreamSign();}}>
            Dream Sign
        </button>
    );
};

export default DreamSign;
