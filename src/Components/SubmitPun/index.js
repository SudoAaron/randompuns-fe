import React, { useContext } from 'react';
import { StateContext } from '../../Context';
import { useHistory } from 'react-router-dom';

function SubmitPun() {
    let history = useHistory();
    const {actions} = useContext(StateContext);
    const handleSubmit = (e) => {
        e.preventDefault();
        const punSubmission = {
            "id": Math.floor(Math.random() * 1000000),
            "title": e.target.title.value,
            "setUp": e.target.setUp.value,
            "punchline": e.target.punchline.value,
            "author": e.target.punchline.value,
            "submissionDate": new Date().toLocaleDateString(),
            "approved": true
        }
        actions.setPuns(punSubmission);
        history.push('/');
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" placeholder="Title"/>
                <input type="text" name="setUp" placeholder="Set-Up"/>
                <input type="text" name="punchline" placeholder="Punchline"/>
                <input type="text" name="author" placeholder="Your Name"/>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default SubmitPun;