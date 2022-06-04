import React, {useState} from 'react';
import {BlogType} from "../types";

interface BlogProps {
    blog: BlogType
}

const Blog = ({blog}: BlogProps): JSX.Element => {
    const [visible, setVisible] = useState<boolean>(false)
    // const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = {display: visible ? '' : 'none'}
    //  change visibility conversely
    const visibleHandler = ()=>{
        setVisible(!visible)
    }
    // +1 like
    const likeHandler = () => {
        console.log('+like')
    }
    return (
        <div className={'blogContent'}>
            <p>{blog.title} {blog.author}
                <button onClick={visibleHandler}>{visible ? "hide" : "show"}</button>
            </p>
            <div style={showWhenVisible}>
                <p>{blog.url}</p>
                <p>likes:{blog.likes}
                    <button onClick={likeHandler}>like</button>
                </p>
                <p>{blog.author}</p>
            </div>
        </div>
    );
};

export default Blog;
