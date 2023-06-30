import React from "react";

function DeleteEntry({id}) {
    const deleteEntry = async () => {
        const url = `/api/entrys/${id}`
        const token = document.querySelector('meta[name="csrf-token"]').content;
        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'X-CSRF-Token': token,
                    'Content-Type': 'application/json',
                },
            });
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <button className='text-rose-700' onClick={deleteEntry}>
            [ - ]
        </button>
    );
};

export default DeleteEntry;
