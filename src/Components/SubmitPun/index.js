import React from 'react';
import { useHistory } from 'react-router-dom';
import randomPuns from '../../apis/randomPuns';
import './styles.css';

function SubmitPun() {
    let history = useHistory();
    const handleSubmit = (e) => {
        e.preventDefault();
        const punSubmission = {
            "title": e.target.title.value,
            "setUp": e.target.setUp.value,
            "punchline": e.target.punchline.value,
            "submittedBy": e.target.submittedBy.value
        }
        randomPuns.post('/puns/submit', punSubmission)
        .then(res => {
            history.push('/');
        })
    }
    return (
        <div className="submit-pun__wrapper">
            <form onSubmit={handleSubmit} className="submit-pun__form">
                <input type="text" name="title" placeholder="Joke Title"/>
                <input type="text" name="setUp" placeholder="Joke Set Up"/>
                <input type="text" name="punchline" placeholder="Joke Punchline"/>
                <input type="text" name="submittedBy" placeholder="Submitted By Name"/>
                <input type="submit" className="submit-pun__button" value="submit"></input>
            </form>
        </div>
    )
}

export default SubmitPun;