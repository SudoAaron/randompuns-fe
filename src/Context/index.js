import React, { useState } from 'react';

export const StateContext = React.createContext();

export const Provider = (props) => {
    const [title] = useState('Random Puns');

    const [randomPun, setRandomPun] = useState(null);
    const handleSetRandomPun = () => {
        const url = 'https://randompuns-api.herokuapp.com/puns/random';
        fetch(url)
        .then(response => response.json())
        .then(data => {
            setRandomPun(data);
        });
    }

    const [puns, setPuns] = useState([]);
    const handleSetPuns = () => {
        const url = 'https://randompuns-api.herokuapp.com/puns';
        fetch(url)
        .then(response => response.json())
        .then(data => {
            setPuns(data);
        });
    }

    const handleSubmitPun = (content) => {
        const url = 'https://randompuns-api.herokuapp.com/puns/submit';
        const options = {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
          },
          body: JSON.stringify({
            title: content.title,
            setUp: content.setUp,
            punchline: content.punchline,
            submittedBy: content.submittedBy
          })
        };
        
        fetch(url, options);
    }

    const handleApprovePun = (punID) => {
        const url = `https://randompuns-api.herokuapp.com/puns/${punID}/approve`;
        const options = {
          method: 'PATCH',
        };
        
        fetch(url, options)
          .then(response => {
              handleSetPuns();
          });
    }

    const handleDeletePun = (punID) => {
        const url = `https://randompuns-api.herokuapp.com/puns/${punID}`;
        const options = {
          method: 'DELETE'
        };
        
        fetch(url, options)
          .then(response => {
              handleSetPuns();
          });
    }

    return (
        <StateContext.Provider value={{
            title,
            puns,
            randomPun,
            actions: {
                getRandomPun: handleSetRandomPun,
                getPuns: handleSetPuns,
                submitPun: handleSubmitPun,
                approvePun: handleApprovePun,
                deletePun: handleDeletePun
            }
        }}>
            { props.children }
        </StateContext.Provider>
    )
}