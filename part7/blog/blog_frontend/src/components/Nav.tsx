import React from 'react';
import {useAppSelector} from "../app/hooks";
import {Link, useNavigate} from "react-router-dom";

export default function Nav() {

    const user = useAppSelector(state => state.user);
    const navigate = useNavigate();

    // remove saved localStorage to logout
    const logoutHandler = () => {
        window.localStorage.removeItem('loggedBlogAppUser')
        navigate('/login')
    }

    return (
        <nav>
            <span><Link to={'/'}>blogs</Link></span>
            <span><Link to={'/users'}>users</Link></span>
            <span>
                <strong><em>{user.username}</em></strong> logged in.
            </span>
            <span>
                <button onClick={logoutHandler}>logout</button>
            </span>
        </nav>
    )
}
