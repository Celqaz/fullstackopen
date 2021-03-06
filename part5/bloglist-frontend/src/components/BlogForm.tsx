import React, { useState } from 'react'
import { BlogType, MessageType, newBlogType, TempMessageProps } from '../types'
import blogsService from '../services/blogs.service'
import { AxiosError } from 'axios'

interface BlogFormProps {
    blogs: BlogType[]
    setBlogs: React.Dispatch<BlogType[]>
    setMessageObj: React.Dispatch<React.SetStateAction<TempMessageProps | null>>
    blogFormRef:  React.MutableRefObject<{toggleVisibility: () => void} | undefined>
}

const BlogForm = ({ blogs, setBlogs, setMessageObj,blogFormRef }: BlogFormProps): JSX.Element => {
  const [newBlog, setNewBlog] = useState<newBlogType>({ title: '', url: '', author: '' })


  const formChangeHandler = (event: React.ChangeEvent<HTMLInputElement>, type: string) => {
    switch (type) {
    case 'title':
      setNewBlog({ ...newBlog, 'title': event.target.value })
      break
    case 'author':
      setNewBlog({ ...newBlog, 'author': event.target.value })
      break
    case 'url':
      setNewBlog({ ...newBlog, 'url': event.target.value })
      break
    default:
      throw new Error('invalid input type, please try again')
    }
  }
  const formSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (newBlog.title && newBlog.author && newBlog.url) {
      try {
        const savedBlog = await blogsService.postNewBlog(newBlog)
        setBlogs([...blogs, savedBlog])
        setMessageObj({
          message: `a new blog ${savedBlog.title} by ${savedBlog.author} added`
        })
        setNewBlog({ title: '', author: '', url: '' })
        // useRef
        blogFormRef.current?.toggleVisibility()
        // FormRef.current.toggleVisibility()
        // setTimeout(() => setMessageObj(null), 2000)
      } catch (error) {
        if (error instanceof AxiosError) {
          setMessageObj({ type: MessageType.Failure, message: error.response?.data.error })
        } else if (error instanceof Error) {
          setMessageObj({ type: MessageType.Failure, message: error.message })
        }
      }
    } else {
      console.log('fill the empty')
    }
  }
  return (
    <fieldset>
      <h2>Create New</h2>
      <div>
        <form onSubmit={formSubmitHandler}>
          <div>
            <label>
              <span>title</span>
              <input id={'title_input'} type={'text'} value={newBlog?.title}
                onChange={(event) => formChangeHandler(event, 'title')}/>
            </label>
            <div>
            </div>
            <label>
              <span>author</span>
              <input id={'author_input'} type={'text'} value={newBlog?.author}
                onChange={(event) => formChangeHandler(event, 'author')}/>
            </label>
          </div>
          <div>
            <label>
              <span>url</span>
              <input id={'url_input'} type={'text'} value={newBlog?.url}
                onChange={(event) => formChangeHandler(event, 'url')}/>
            </label>
          </div>
          <button id={'submit_newBlog'} type={'submit'}>Submit</button>
        </form>
      </div>
    </fieldset>
  )
}

export default BlogForm
