import React from 'react';
import { useHistory } from 'react-router-dom';
import randomPuns from '../../apis/randomPuns';
import './styles.css';

function SignUp() {
    let history = useHistory();
    const setCookie = (cname, cvalue, exdays) => {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        // document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;Secure;HttpOnly;SameSite=Lax;";
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/; Secure; SameSite=Lax;";
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const userSubmission = {
            "name": e.target.name.value,
            "email": e.target.email.value,
            "password": e.target.password.value,
        }
        randomPuns.post('/users', userSubmission)
        .then(res => {
            setCookie('token', res.data.token, 1);
            setCookie('roles', res.data.user.roles, 1);
            history.push('/');
        })
    }
    return (
        <div className="user-signup__wrapper">
            <form onSubmit={handleSubmit} className="user-signup__form">
                <input type="text" name="name" placeholder="Name"/>
                <input type="email" name="email" placeholder="Email"/>
                <input type="password" name="password" placeholder="Password"/>
                <input type="submit" className="user-signup__button" value="Sign Up"></input>
            </form>
        </div>
    )
}

export default SignUp;