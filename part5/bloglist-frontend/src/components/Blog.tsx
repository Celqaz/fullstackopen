import React, {useState} from 'react';
import {BlogType} from "../types";
import blogsService from "../services/blogs.service";
import {AxiosError} from "axios";

interface BlogProps {
    blog: BlogType
}

const Blog = ({blog}: BlogProps): JSX.Element => {
    const [visible, setVisible] = useState<boolean>(false)
    // const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = {display: visible ? '' : 'none'}
    //  change visibility conversely
    const visibleHandler = () => {
        setVisible(!visible)
    }
    // +1 like
    const likeHandler = async ({id}: Pick<BlogType, 'id'>) => {
        console.log('+like', id)
        try {
            const res = await blogsService.addBlogLike({id})
            console.log('updated', res)
        }catch (error) {
            if (error instanceof AxiosError) {
                console.log(error.response?.data.error)
            } else if (error instanceof Error) {
                console.log(error.message)
            }
        }
    }
    return (
        <div className={'blogContent'}>
            <p>{blog.title} {blog.author}
                <button onClick={visibleHandler}>{visible ? "hide" : "show"}</button>
            </p>
            <div style={showWhenVisible}>
                <p>{blog.url}</p>
                <p>likes:{blog.likes}
                    <button onClick={() => likeHandler({id: blog.id})}>like</button>
                </p>
                <p>{blog.author}</p>
            </div>
        </div>
    );
};

export default Blog;
