import React, { useContext, useEffect, useState } from 'react';
import { StateContext } from '../../Context';
import './styles.css';

function PunDisplay() {
  const [reveal, setReveal] = useState(false);
  const handleReveal = () => {
    setReveal(prevState => !prevState);
  }

  const { randomPun, actions } = useContext(StateContext);
  useEffect(() => {
    actions.getRandomPun();
  },[]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    randomPun ?
    <div className="pun-wrapper">
      <h2 className="pun-title">{randomPun.title}</h2>
      <p className="pun-setup">{randomPun.setUp}</p>
      {
        reveal ? 
        <p className="pun-punchline">{randomPun.punchline}</p>
        :
        <p className="pun-punchline reveal-button" onClick={handleReveal}>Click to Reveal</p>
      }
      <p className="pun-author">Author: {randomPun.author}</p>
    </div>
    :
    <div className="pun-wrapper">
      <p className="pun-error">No Puns Currently Available</p>
    </div>
  )
}

export default PunDisplay;
