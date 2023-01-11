import React, {useEffect, useRef, useState} from 'react'
import Blogs from './components/Blogs'
import blogService from './services/blogs.service'
import {UserType} from './types'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import TempMessage from './components/utils/TempMessage'
// style
import './app.css'
import Toggleable from './components/Toggleable'
import {useAppDispatch, useAppSelector} from "./app/hooks";
import {initializeBlogs} from "./features/blogReducers";

const App = () => {
    const [user, setUser] = useState<UserType>()
    // const [messageObj, setMessageObj] = useState<TempMessageProps | null>(null)
    const blogFormRef = useRef<{ toggleVisibility: () => void; } | undefined>()
    const dispatch = useAppDispatch()
    // const blogsTest = useAppSelector(state => state.blog)
    const notification = useAppSelector(state => state.notification)
    // try to get saved login info from localStorage
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
            // noteService.setToken(user.token)
        }
    }, [])

    // get blogs form server
    useEffect(() => {
        dispatch(initializeBlogs())
    }, [dispatch])

    // remove saved localStorage to logout
    const logoutHandler = () => {
        window.localStorage.removeItem('loggedBlogAppUser')
    }

    // if localStorage doesn't have logged user info, then redirect to log in component
    // otherwise display common content
    if (!user) {
        return (
            <div className={'container'}>
                {notification.message && <TempMessage type={notification.type} message={notification.message}/>}
                <LoginForm setUser={setUser}/>
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
                <Blogs user={user}/>
                {/*<button onClick={changeDisplayOfNewNote}>add new note</button>*/}
                <Toggleable buttonLabel={'add new note'} ref={blogFormRef}>
                    <BlogForm blogFormRef={blogFormRef}/>
                </Toggleable>
            </div>
        )
    }
}

export default App
