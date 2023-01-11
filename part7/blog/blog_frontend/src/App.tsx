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

    // remove saved localStorage to logout
    const logoutHandler = () => {
        window.localStorage.removeItem('loggedBlogAppUser')
        console.log('logout')
    }

    // if localStorage doesn't have logged user info, then redirect to log in component
    // otherwise display common content
    if (!user.username) {
        return (
            <div className={'container'}>
                {notification.message && <TempMessage type={notification.type} message={notification.message}/>}
                <LoginForm/>
            </div>
        )
    } else {
        return (
            <div className={'container'}>
                {notification.message && <TempMessage type={notification.type} message={notification.message}/>}
                {/*<TempMessage type={MessageType.Failure} message={'What\'s up'}/>*/}
                <div>
                    <strong><em>{user.username}</em></strong> logged in.
                    <button onClick={logoutHandler}>logout</button>
                </div>
                <Outlet/>
                {/*<Blogs/>*/}
                {/*<button onClick={changeDisplayOfNewNote}>add new note</button>*/}
                {/*<Toggleable buttonLabel={'add new note'} ref={blogFormRef}>*/}
                {/*    <BlogForm blogFormRef={blogFormRef}/>*/}
                {/*</Toggleable>*/}
                <Footer/>
            </div>
        )
    }
}

export default App
