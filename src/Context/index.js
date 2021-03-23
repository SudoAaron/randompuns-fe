import React, { useState } from 'react';

export const StateContext = React.createContext();

export const Provider = (props) => {
    const [title] = useState('Random Puns');

    const [randomPun, setRandomPun] = useState(null);
    const handleGetRandomPun = async () => {
        const url = 'https://randompuns-api.herokuapp.com/puns/random';
        await fetch(url)
        .then(response => response.json())
        .then(data => {
            setRandomPun(data);
        });
    }

    const handleSetRandomPun = async (punID) => {
        const url = `https://randompuns-api.herokuapp.com/puns/${punID}`;
        await fetch(url)
        .then(response => response.json())
        .then(data => {
            setRandomPun(data);
        });
    }

    const [puns, setPuns] = useState([]);
    const handleSetPuns = async () => {
        const url = 'https://randompuns-api.herokuapp.com/puns';
        await fetch(url)
        .then(response => response.json())
        .then(data => {
            setPuns(data);
        });
    }

    const handleSubmitPun = async (content) => {
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
        
        await fetch(url, options);
    }

    const handleApprovePun = async (punID) => {
        const url = `https://randompuns-api.herokuapp.com/puns/${punID}/approve`;
        const options = {
          method: 'PATCH',
        };
        
        await fetch(url, options)
          .then(response => {
              handleSetPuns();
          });
    }

    const [pun, setPun] = useState(null);
    const handleGetPunByID = async (punID) => {
        const url = `https://randompuns-api.herokuapp.com/puns/${punID}`;
        await fetch(url)
        .then(response => response.json())
        .then(data => {
            setPun(data);
        });
    }

    const handleLikePun = async (punID) => {
        const url = `https://randompuns-api.herokuapp.com/puns/${punID}/like`;
        const options = {
          method: 'PATCH',
        };
        
        await fetch(url, options)
    }

    const handleDislikePun = async (punID) => {
        const url = `https://randompuns-api.herokuapp.com/puns/${punID}/dislike`;
        const options = {
          method: 'PATCH',
        };
        
        await fetch(url, options)
    }

    const handleDeletePun = async (punID) => {
        const url = `https://randompuns-api.herokuapp.com/puns/${punID}`;
        const options = {
          method: 'DELETE'
        };
        
        await fetch(url, options)
          .then(response => {
              handleSetPuns();
          });
    }

    return (
        <StateContext.Provider value={{
            title,
            puns,
            pun,
            randomPun,
            actions: {
                getRandomPun: handleGetRandomPun,
                setRandomPun: handleSetRandomPun,
                getPuns: handleSetPuns,
                submitPun: handleSubmitPun,
                approvePun: handleApprovePun,
                deletePun: handleDeletePun,
                likePun: handleLikePun,
                dislikePun: handleDislikePun,
                getPunByID: handleGetPunByID
            }
        }}>
            { props.children }
        </StateContext.Provider>
    )
}