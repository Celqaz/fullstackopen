import React from 'react'
import {BlogType} from '../types'
import {Link} from "react-router-dom";

interface BlogProps {
    blog: BlogType
}

// function errorHandler(error: unknown) {
//   if (error instanceof AxiosError) {
//     console.log(error.response?.data.error)
//   } else if (error instanceof Error) {
//     console.log(error.message)
//   } else {
//     console.log('something wrong')
//   }
// }

const Blog = ({blog}: BlogProps): JSX.Element => {
    return (
        <div className={''}>
            <p className={'hover:ring-2 flex justify-between items-center border-2 shadow-sm rounded-md border-gray-200 my-2 text-blue-600 underline hover:font-bold visited:text-purple-500'}>
                <Link className={'ml-6'} to={`/blogs/${blog.id}`}>{blog.title} - {blog.author}</Link>
                <img className={'h-32 w-32 object-cover object-center'} src="https://images.unsplash.com/photo-1480796927426-f609979314bd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt=""/>
            </p>
        </div>
    )
}

export default Blog
