import {useEffect, useState} from 'react'
import Blogs from './components/Blogs'
import blogService from './services/blogs.service'
import {BlogType, LoginUserType} from "./types";
import LoginForm from "./components/LoginForm";

const App = () => {
    const [blogs, setBlogs] = useState<BlogType[]>([])
    const [user, setUser] = useState<LoginUserType>()

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        )
    }, [])

    if (!user) {
        return <LoginForm setUser={setUser}/>
    } else {
        return (
            <div>
                <p><strong><em>{user.username}</em></strong> logged in.</p>
                <Blogs blogs={blogs}/>
            </div>
        )
    }
}

export default App
