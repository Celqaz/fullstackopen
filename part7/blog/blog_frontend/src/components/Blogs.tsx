import React from 'react'
import { UserType} from '../types'
import Blog from './Blog'
import {useAppSelector} from "../app/hooks";

interface BlogProps {
    user: UserType
}

const Blogs = ({user}: BlogProps): JSX.Element => {

    const newBlogs = useAppSelector(state => state.blog)
    const sortedByLikesBlog = [...newBlogs].sort((a, b) => b.likes - a.likes)

    return (
        <div>
            <h2>Blogs</h2>
            <div className={'blogsContent'}>
                {sortedByLikesBlog.map(blog =>
                    <Blog blog={blog} key={blog.id} user={user}/>
                )}
            </div>
        </div>
    )
}

export default Blogs
