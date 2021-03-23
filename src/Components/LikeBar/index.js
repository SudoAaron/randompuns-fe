import React, { useContext, useEffect, useState } from 'react';
import { StateContext } from '../../Context';
import './styles.css';


function LikeBar (props) {
    const { randomPun, actions } = useContext(StateContext);
    const [punID, setPunID] = useState(0);
    const [likedStatus, setLikedStatus] = useState('first');

    useEffect(() => {
        actions.setRandomPun(props.pun._id);
    },[likedStatus]) // eslint-disable-line react-hooks/exhaustive-deps

    const handleLikedStatus = (status, punID) => {
        if(likedStatus === 'first') {
            if(status === 'liked') {
                actions.likePun(punID);
            } else if (status === 'disliked') {
                actions.dislikePun(punID);
            } else {
                actions.setRandomPun(punID);
            }
            async function getPun() {
            await actions.setRandomPun(punID)
            .then(() => {
                setPunID(punID);
                setLikedStatus(status);
            })
            }
            getPun();
        }
    }

    if(likedStatus === 'liked') {
        return (
        <div className="icons-wrapper">
            <i className="fas fa-thumbs-up status-icon liked-icon" onClick={async () => {await handleLikedStatus('null', randomPun._id)}}></i>{randomPun.likes}
            <i className="far fa-thumbs-down status-icon disliked-icon" onClick={async () => {await handleLikedStatus('disliked', randomPun._id)}}></i>{randomPun.dislikes}
        </div>
        )
    } else if (likedStatus === 'disliked') {
        return (
        <div className="icons-wrapper">
            <i className="far fa-thumbs-up status-icon liked-icon" onClick={async () => {await handleLikedStatus('liked', randomPun._id)}}></i>{randomPun.likes}
            <i className="fas fa-thumbs-down status-icon disliked-icon" onClick={async () => {await handleLikedStatus('null', randomPun._id)}}></i>{randomPun.dislikes}
        </div>
        )
    } else {
        return(
        <div className="icons-wrapper">
            <i className="far fa-thumbs-up status-icon liked-icon" onClick={async () => {await handleLikedStatus('liked', randomPun._id)}}></i>{randomPun.likes}
            <i className="far fa-thumbs-down status-icon disliked-icon" onClick={async () => {await handleLikedStatus('disliked', randomPun._id)}}></i>{randomPun.dislikes}
        </div>
        )
    }
}

export default LikeBar;