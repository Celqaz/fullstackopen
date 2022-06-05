import React, { useState } from 'react'
import { BlogType } from '../types'
import blogsService from '../services/blogs.service'
import { AxiosError } from 'axios'

interface BlogProps {
  blog: BlogType
}

function errorHandler(error: unknown) {
  if (error instanceof AxiosError) {
    console.log(error.response?.data.error)
  } else if (error instanceof Error) {
    console.log(error.message)
  } else {
    console.log('something wrong')
  }
}

const Blog = ({ blog }: BlogProps): JSX.Element => {
  const [visible, setVisible] = useState<boolean>(false)
  // const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  //  change visibility conversely
  const visibleHandler = () => {
    setVisible(!visible)
  }

  //remove a blog by ID
  const removeHandler = async ({ id, title, author }: Pick<BlogType, 'id' | 'title' | 'author'>) => {
    try {
      if (window.confirm(`Remove blog ${title} by ${author}`)) {
        // deleteBlogByID(id:Pick)
        const res = await blogsService.deleteBlogByID({ id })
        if (res.status === 204) {
          // setBlogs(blogs.filter(blog => blog.id !== id))
          console.log('delete successfully')
        }
      }
    } catch (error) {
      errorHandler(error)
    }
  }
  // +1 like
  const likeHandler = async (id: Pick<BlogType, 'id'>) => {
    try {
      await blogsService.addBlogLike(id)
      // awesome
      // setBlogs(blogs.map(blog => blog.id === id.id ? {...blog, likes: blog.likes + 1} : blog))
      // setBlogs(blogs.map(blog => blog.id === id.id ? updatedBlog : blog))
      console.log('update successfully')
    } catch (error) {
      errorHandler(error)
    }
  }
  return (
    <div className={'blogContent'}>
      <div className={'defaultBlogInfo'}>{blog.title} {blog.author}
        <button onClick={visibleHandler}>{visible ? 'hide' : 'show'}</button>
      </div>
      <div className={'hiddenContent'} style={showWhenVisible}>
        <p>{blog.url}</p>
        <p>likes:{blog.likes}
          <button onClick={() => likeHandler({ id: blog.id })}>like</button>
        </p>
        <p>{blog.author}</p>
        {/*{ user.username === blog.user.username &&*/}
        {/*            <button onClick={() => removeHandler({*/}
        {/*              id: blog.id,*/}
        {/*              title: blog.title,*/}
        {/*              author: blog.author*/}
        {/*            })}>remove</button>*/}
        {/*}*/}

        <button onClick={() => removeHandler({ id: blog.id, title: blog.title, author: blog.author })}>
          remove
        </button>

      </div>
    </div>
  )
}

export default Blog
