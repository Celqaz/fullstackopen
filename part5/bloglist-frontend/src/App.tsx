import {useEffect, useState} from 'react'
import Blogs from './components/Blogs'
import blogService from './services/blogs.service'
import {BlogType, LoginUserType} from "./types";
import LoginForm from "./components/LoginForm";

const App = () => {
    const [blogs, setBlogs] = useState<BlogType[]>([])
    const [user, setUser] = useState<LoginUserType>()

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            // noteService.setToken(user.token)
        }
    }, [])

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        )
    }, [])

    const logoutHandler = ()=>{
        window.localStorage.removeItem('loggedBlogAppUser')
    }

    if (!user) {
        return <LoginForm setUser={setUser}/>
    } else {
        return (
            <div>
                <div>
                    <strong><em>{user.username}</em></strong> logged in.
                    <button onClick={logoutHandler}>logout</button>
                </div>
                <Blogs blogs={blogs}/>
            </div>
        )
    }
}

export default App
