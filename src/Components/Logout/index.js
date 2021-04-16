import { useHistory } from 'react-router-dom';
import randomPuns from '../../apis/randomPuns';

function Logout() {
    let history = useHistory();

    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    const deleteCookie = (cname) => {
        document.cookie = `${cname}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
    }

    const token = getCookie('token');
    const logout = async (token) => { 
        deleteCookie('token');
        deleteCookie('roles');
        await (randomPuns.post('/users/logout',{}, {
            headers: { Authorization: `Bearer ${token}` }
        })).finally(() => {
            history.push('/');
        });
    }
    logout(token);

    return null;

}

export default Logout;