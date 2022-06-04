import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs.service'
import {BlogType, LoginUserType} from "./types";
import LoginForm from "./components/LoginForm";

const App = () => {
  const [blogs, setBlogs] = useState<BlogType[]>([])
    const [user, setUser] = useState<LoginUserType>()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  console.log('user',user)
  return (
    <div>
      <LoginForm setUser={setUser}/>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
