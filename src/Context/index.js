import React, { useState } from 'react';

export const StateContext = React.createContext();

export const Provider = (props) => {
    const [puns, setPuns] = useState([
        {
            "id": 1,
            "title": "Knock-Knock Joke",
            "setUp": "knock-knock, who's there? Orange. Orange who?",
            "punchline": "orangea glad I didn't say banana",
            "author": "Aaron Williams",
            "submissionDate": "2021-03-18",
            "approved": false
        },
        {
            "id": 2,
            "title": "Chicken Farmer",
            "setUp": "What do you call someone who takes care of chickens?",
            "punchline": "A chicken tender!",
            "author": "Don Potbury",
            "submissionDate": "2021-03-18",
            "approved": true
        }
    ]);

    const handleSetPuns = (pun) => {
        setPuns(prevPuns => {
            return(prevPuns.concat(pun));
        })
    }

    return (
        <StateContext.Provider value={{
            puns,
            actions: {
                setPuns: handleSetPuns
            }
        }}>
            { props.children }
        </StateContext.Provider>
    )
}