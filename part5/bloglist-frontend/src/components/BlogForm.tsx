import React, {useState} from 'react';
import {BlogType, newBlogType} from "../types";
import blogsService from "../services/blogs.service";
import {AxiosError} from "axios";

interface BlogFormProps {
    blogs: BlogType[]
    setBlogs: React.Dispatch<BlogType[]>
}

const BlogForm = ({blogs,setBlogs}: BlogFormProps): JSX.Element => {
    const [newBlog, setNewBlog] = useState<newBlogType>({title: '', url: '', author: ''})

    const formChangeHandler = (event: React.ChangeEvent<HTMLInputElement>, type: string) => {
        console.log(type, 'changed')
        switch (type) {
            case "title":
                setNewBlog({...newBlog, "title": event.target.value})
                break;
            case "author":
                setNewBlog({...newBlog, "author": event.target.value})
                break;
            case "url":
                setNewBlog({...newBlog, "url": event.target.value})
                break;
            default:
                throw new Error("invalid input type, please try again")
        }
    }
    console.log('newBlog', newBlog)
    const formSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (newBlog.title && newBlog.author && newBlog.url) {
            try {
                const savedBlog = await blogsService.postNewBlog(newBlog)
                setBlogs([...blogs,savedBlog])
                console.log('success')
                setNewBlog({title:'',author:'',url:''})
            }catch (error) {
                if (error instanceof AxiosError){
                    console.log(error.response?.data.error)
                } else if (error instanceof Error) {
                    console.log(error.message)
                }
            }
        } else {
            console.log('fill the empty')
        }
    }
    return (
        <fieldset>
            <h2>Create New</h2>
            <div>
                <form onSubmit={formSubmitHandler}>
                    <div>
                        <label>
                            <span>title</span>
                            <input type={"text"} value={newBlog?.title}
                                   onChange={(event) => formChangeHandler(event, 'title')}/>
                        </label>
                        <label>
                            <span>author</span>
                            <input type={"text"} value={newBlog?.author}
                                   onChange={(event) => formChangeHandler(event, 'author')}/>
                        </label>
                        <label>
                            <span>url</span>
                            <input type={"text"} value={newBlog?.url}
                                   onChange={(event) => formChangeHandler(event, 'url')}/>
                        </label>
                    </div>
                    <button type={'submit'}>Submit</button>
                </form>
            </div>
        </fieldset>
    );
};

export default BlogForm;
