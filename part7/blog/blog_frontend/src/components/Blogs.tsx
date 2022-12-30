import React from 'react'
import {BlogType, UserType} from '../types'
import Blog from './Blog'

interface BlogProps {
    blogs: BlogType[]
    setBlogs: React.Dispatch<BlogType[]>
    user: UserType
}

const Blogs = ({blogs, setBlogs, user}: BlogProps): JSX.Element => {

    const sortedByLikesBlog = blogs.sort((a, b) => b.likes - a.likes)
    console.log('blogs',blogs)

    return (
        <div>
            <h2>Blogs</h2>
            <div className={'blogsContent'}>
                {sortedByLikesBlog.map(blog =>
                    <Blog blog={blog} blogs={blogs} setBlogs={setBlogs} key={blog.id} user={user}/>
                )}
            </div>
        </div>
    )
}

export default Blogs
