import React from "react";

function Entry() {
    return (
        <section>
            <input name="entryTitle" placeholder="Title" />
            <textarea name="entryText" placeholder="Your entry here..." />
            <button>Save Entry</button>
        </section>
    );
};

export default Entry;
