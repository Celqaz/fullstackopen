import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs.service'
import {BlogType} from "./types";
import LoginForm from "./components/LoginForm";

const App = () => {
  const [blogs, setBlogs] = useState<BlogType[]>([])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  return (
    <div>
      <LoginForm/>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
