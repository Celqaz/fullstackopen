import React, {useRef} from 'react'
import Blog from './Blog'
import {useAppSelector} from "../app/hooks";
import BlogForm from "./BlogForm";
import Toggleable from "./Toggleable";

const Blogs = (): JSX.Element => {

    const newBlogs = useAppSelector(state => state.blog)
    const sortedByLikesBlog = [...newBlogs].sort((a, b) => b.likes - a.likes)

    // toggle ref
    const blogFormRef = useRef<{ toggleVisibility: () => void; } | undefined>()

    return (
        <div>
            {/* add new blog*/}
            <Toggleable buttonLabel={'add new note'} ref={blogFormRef}>
                <BlogForm blogFormRef={blogFormRef}/>
            </Toggleable>
            <div className={'blogsContent'}>
                {sortedByLikesBlog.map(blog =>
                    <Blog blog={blog} key={blog.id}/>
                )}
            </div>

        </div>
    )
}

export default Blogs
