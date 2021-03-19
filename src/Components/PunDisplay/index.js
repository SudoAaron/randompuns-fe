import React, { useContext } from 'react';
import { StateContext } from '../../Context';

function PunDisplay() {
  const { puns } = useContext(StateContext);
  return (
    <div>
      {
        puns.map(pun => {
          if (pun.approved) {
            return(
              <div key={pun.id}>
                <h3>{pun.title}</h3>
                <p>Set-Up: {pun.setUp}</p>
                <p>Punchline: {pun.punchline}</p>
                <p>Author: {pun.author}</p>
                <p>Submitted: {pun.submissionDate}</p>
              </div>
            )
          }
        })
      }
    </div>
  );
}

export default PunDisplay;
