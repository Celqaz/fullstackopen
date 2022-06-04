import React from 'react';
import {BlogType} from "../types";
import Blog from "./Blog";

interface BlogProps {
    blogs: BlogType[]
}

const Blogs = ({blogs}: BlogProps): JSX.Element => {

    const sortedByLikesBlog = blogs.sort((a,b)=> b.likes-a.likes)
    return (
        <div>
            <h2>Blogs</h2>
            <div>
                {sortedByLikesBlog.map(blog =>
                  <Blog blog={blog} key={blog.id}/>
                )}
            </div>
        </div>
    );
};

export default Blogs;
