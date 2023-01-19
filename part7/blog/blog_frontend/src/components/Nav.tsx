import React, {useState} from 'react';
import {useAppSelector} from "../app/hooks";
import {Link, useNavigate} from "react-router-dom";

export default function Nav() {
    const [dropdown, setDropdown] = useState<boolean>(false)
    const user = useAppSelector(state => state.user);
    const navigate = useNavigate();

    // remove saved localStorage to logout
    const logoutHandler = () => {
        window.localStorage.removeItem('loggedBlogAppUser')
        navigate('/login')
    }

    return (
        // 长、宽、颜色；排列相关：flex；对齐方式；自适应方式
        <nav className={'flex items-center bg-gray-800 p-3 text-white'}>
            {/*<nav className={'h-12 w-screen bg-gray-800 flex flex-row justify-around items-center flex-wrap'}>*/}
            {/*flex-shrink-0 prevent shrink*/}
            {/*logo*/}
            <div className={'flex items-center flex-shrink-0 mr-6'}>
                <svg className="object-cover fill-white h-8 w-8 mr-2" viewBox="0 0 54 54"
                     xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"/>
                </svg>
                <span
                    className="font-bold text-xl text-white">Blog App</span>
            </div>
            {/*right*/}
            <div className={'w-full flex items-center w-auto flex-grow font-light'}>
                {/*menu*/}
                <div className="flex-grow text-xl">
                    <Link className={'inline-block mr-4 hover:text-green-300'} to={'/'}>Blogs</Link>
                    <Link className={'inline-block hover:text-green-300'} to={'/users'}>Users</Link>
                </div>
                <div className={'relative mx-4'}>
                    <button onClick={() => setDropdown(!dropdown)}
                            className={'relative z-10 block h-10 w-10 rounded-full overflow-hidden border-2 border-gray-300 focus:outline-none focus:border-white'}>
                        <img className={'w-full h-full object-cover'}
                             src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
                             alt=""/>
                        {/*<div>{user.username}</div>*/}
                    </button>
                    {dropdown &&
                        <button
                            onClick={() => setDropdown(false)}
                            tabIndex={-1}
                            className={'fixed inset-0 w-screen h-screen bg-black opacity-30 cursor-default'}
                        ></button>
                    }
                    {/*dropdown*/}
                    {
                        dropdown &&
                        <div className={'absolute right-0 w-32 mt-2 shadow-md bg-white rounded-lg py-2 text-gray-700'}>
                            <div
                                className={'block px-4 py-2 text-gray-500 hover:bg-green-300 hover:text-white'}>{user.username}</div>
                            <div className={'block px-4 py-2 hover:bg-green-300 hover:text-white'}>
                                <button
                                    onClick={logoutHandler}>logout
                                </button>
                            </div>
                        </div>
                    }
                </div>
            </div>

        </nav>
    )
}
