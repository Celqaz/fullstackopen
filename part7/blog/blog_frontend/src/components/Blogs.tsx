import React from 'react'
import Blog from './Blog'
import {useAppSelector} from "../app/hooks";

const Blogs = (): JSX.Element => {

    const newBlogs = useAppSelector(state => state.blog)
    const sortedByLikesBlog = [...newBlogs].sort((a, b) => b.likes - a.likes)

    return (
        <div>
            <h2>Blogs</h2>
            <div className={'blogsContent'}>
                {sortedByLikesBlog.map(blog =>
                    <Blog blog={blog} key={blog.id}/>
                )}
            </div>
        </div>
    )
}

export default Blogs
