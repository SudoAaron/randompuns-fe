import React, { useContext } from 'react';
import { StateContext } from '../../Context';
import { useHistory } from 'react-router-dom';
import './styles.css';

function SubmitPun() {
    let history = useHistory();
    const {actions} = useContext(StateContext);
    const handleSubmit = (e) => {
        e.preventDefault();
        const punSubmission = {
            "title": e.target.title.value,
            "setUp": e.target.setUp.value,
            "punchline": e.target.punchline.value,
            "author": e.target.author.value
        }
        actions.submitPun(punSubmission);
        history.push('/');
    }
    return (
        <div className="submit-pun__wrapper">
            <form onSubmit={handleSubmit} className="submit-pun__form">
                <input type="text" name="title" placeholder="Joke Title"/>
                <input type="text" name="setUp" placeholder="Joke Set Up"/>
                <input type="text" name="punchline" placeholder="Joke Punchline"/>
                <input type="text" name="author" placeholder="Author Name"/>
                <input type="submit" className="submit-pun__button" value="submit"></input>
            </form>
        </div>
    )
}

export default SubmitPun;