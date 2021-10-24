import React from 'react';
import axios from "axios";
import cookie from 'js-cookie';
import {ExitToAppOutlined} from '@material-ui/icons';


//after a logout, the user's cookie is removed so they have to log in to access to their content and profile again
function Logout() {
    const logout = async () => {

        const removeCookie = (key) => {
            if (window !== "undefined") {
                cookie.remove(key, { expires:1 });
            }
        };
        await axios({
            method:'get', 
            url:`${process.env.REACT_APP_API_URL}api/auth/logout`,
            withCredentials:true,
        })
        .then(() => removeCookie('jwt'))
        .catch((err) => console.log(err))
        // redirect to the login page
        window.location = "/login";
    };

    return (
        <li onClick={logout} className='logoutLi'>
            < ExitToAppOutlined />
        </li>
    );
};


export default Logout;
