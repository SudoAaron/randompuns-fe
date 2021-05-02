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
            <h2>Submit a Pun</h2>
            <form onSubmit={handleSubmit} className="submit-pun__form">
                <input type="text" name="title" placeholder="Pun Title"/>
                <input type="text" name="setUp" placeholder="Pun Set Up"/>
                <input type="text" name="punchline" placeholder="Pun Punchline"/>
                <input type="text" name="submittedBy" placeholder="Submitted By: Name"/>
                <input type="submit" className="submit-pun__button" value="Submit"></input>
            </form>
        </div>
    )
}

export default SubmitPun;