import {useEffect, useState} from 'react'
import Blogs from './components/Blogs'
import blogService from './services/blogs.service'
import {BlogType, LoginUserType, TempMessageProps} from "./types";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import TempMessage from "./components/utils/TempMessage";
// style
import './app.css'

const App = () => {
    const [blogs, setBlogs] = useState<BlogType[]>([])
    const [user, setUser] = useState<LoginUserType>()
    const [messageObj, setMessageObj] = useState<TempMessageProps | null>(null)
    // const [messageObj,setMessageObj]= useState<TempMessageProps | null>({type:MessageType.Success,message:null})

    // reset messageObj to null after 2s, so you don't need to set them in components
    if (messageObj) {
        setTimeout(() => setMessageObj(null), 2000)
    }
    // try to get saved login info from localStorage
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            // noteService.setToken(user.token)
        }
    }, [])

    // get blogs form server
    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        )
    }, [])

    // remove saved localStorage to logout
    const logoutHandler = () => {
        window.localStorage.removeItem('loggedBlogAppUser')
    }

    // if localStorage doesn't have logged user info, then redirect to log in component
    // otherwise display common content
    if (!user) {
        return (
            <div>
                {messageObj && <TempMessage type={messageObj.type} message={messageObj.message}/>}
                <LoginForm setUser={setUser} setMessageObj={setMessageObj}/>
            </div>
        )
    } else {
        return (
            <div>
                {messageObj && <TempMessage type={messageObj.type} message={messageObj.message}/>}
                {/*<TempMessage type={MessageType.Failure} message={'What\'s up'}/>*/}
                <div>
                    <strong><em>{user.username}</em></strong> logged in.
                    <button onClick={logoutHandler}>logout</button>
                </div>
                <Blogs blogs={blogs}/>
                <BlogForm blogs={blogs} setBlogs={setBlogs} setMessageObj={setMessageObj}/>
            </div>
        )
    }
}

export default App
