import React from 'react';
import {BlogType} from "../types";

interface BlogProps {
    blogs: BlogType[]
}

const Blogs = ({blogs}: BlogProps): JSX.Element => {

    return (
        <div>
            <h2>Blogs</h2>
            <div>
                {blogs.map(blog =>
                    <div key={blog.id}>
                        {blog.title} {blog.author}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Blogs;
