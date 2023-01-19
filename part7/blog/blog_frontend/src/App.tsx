import React, {useEffect} from 'react'
// import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
// import BlogForm from './components/BlogForm'
import TempMessage from './components/utils/TempMessage'
// style
import './app.css'
// import Toggleable from './components/Toggleable'
import {useAppDispatch, useAppSelector} from "./app/hooks";
import {initializeBlogs} from "./features/blogReducers";
import {initializeUser} from "./features/userReducer";
// router
import {Outlet} from "react-router-dom";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
const App = () => {
    const user = useAppSelector(state => state.user)
    // const blogFormRef = useRef<{ toggleVisibility: () => void; } | undefined>()
    const dispatch = useAppDispatch()
    const notification = useAppSelector(state => state.notification)
    // try to get saved login info from localStorage
    // and get blogs form server
    useEffect(() => {
        dispatch(initializeUser())
        dispatch(initializeBlogs())
    }, [dispatch])

    // if localStorage doesn't have logged user info, then redirect to log in component
    // otherwise display common content
    if (!user.username) {
        return (
            <div className={''}>
                {notification.message && <TempMessage type={notification.type} message={notification.message}/>}
                <LoginForm/>
            </div>
        )
    } else {
        return (
            <div className={'bg-primary text-gray-800 relative min-h-screen'}>
                <Nav/>
                <div className={'flex flex-col w-4/5 md:w-3/5 mx-auto '}>
                    {notification.message && <TempMessage type={notification.type} message={notification.message}/>}
                    <Outlet/>

                </div>
                <Footer/>
            </div>
        )
    }
}

export default App
