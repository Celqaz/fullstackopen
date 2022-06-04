import React from 'react';
import {BlogType} from "../types";

interface BlogProps {
    blog: BlogType
}

const Blog = ({blog}: BlogProps): JSX.Element => {

    return (
        <div>
            {blog.title} {blog.author}
        </div>
    );
};

export default Blog;
