import React, { useContext, useEffect, useState } from 'react';
import { StateContext } from '../../Context';
import LikeBar from '../LikeBar';
import './styles.css';

function PunDisplay() {
  const { randomPun, actions } = useContext(StateContext);


  useEffect(() => {
    actions.getRandomPun();
    },[]) // eslint-disable-line react-hooks/exhaustive-deps


  const [reveal, setReveal] = useState(false);
  const handleReveal = () => {
    setReveal(prevState => !prevState);
  }

  return (
    randomPun ?
    <div className="pun-wrapper">
      <div className="pun-header">
        <LikeBar pun={randomPun} />
        <h2 className="pun-title">{randomPun.title}</h2>
      </div>
      <p className="pun-setup">{randomPun.setUp}</p>
      {
        reveal ? 
        <p className="pun-punchline">{randomPun.punchline}</p>
        :
        <p className="pun-punchline reveal-button" onClick={handleReveal}>Click to Reveal</p>
      }
      <p className="pun-submittedBy">Submitted By: {randomPun.submittedBy}</p>
      <p className="refresh-link" onClick={() => {window.location.reload()}}>Refresh Page</p>
    </div>
    :
    <div className="pun-wrapper">
      <i className="fas fa-circle-notch fa-spin pun-loader"></i>
      <p className="pun-error">Loading..</p>

    </div>
  )
}

export default PunDisplay;
