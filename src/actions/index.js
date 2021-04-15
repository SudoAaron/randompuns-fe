import randomPuns from '../apis/randomPuns';

const setCookie = (cname, cvalue, exdays) => {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    // document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;Secure;HttpOnly;SameSite=Lax;";
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

const deleteCookie = (cname) => {
    document.cookie = `${cname}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
}

export const fetchPuns = () => async (dispatch) => {
    const response = await randomPuns.get('/puns');
    dispatch({ type: 'FETCH_PUNS', payload: response.data });
}

export const fetchRandomPun = () => async (dispatch) => {
    const response = await randomPuns.get('/puns/random');
    dispatch({ type: 'FETCH_RANDOM_PUN', payload: response.data });
}

export const loginUser = (email, password) => async (dispatch) => {
    const response = await (randomPuns.post('/users/login', {
        email,
        password
    }));
    setCookie('token', response.data.token, 1);
    dispatch({ type: 'LOGIN_USER', payload: { email: '', token: response.data.token }});
}

export const logoutUser = (token) => async (dispatch) => {
    await (randomPuns.post('/users/logout',{}, {
        headers: { Authorization: `Bearer ${token}` }
    }));
    deleteCookie('token');
    dispatch({ type: 'LOGOUT_USER', payload: "" });
}