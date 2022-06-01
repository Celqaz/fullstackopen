// Init Database
import {Blog as BlogType} from "../types";
import BlogModel from "../models/blog.model";

const initialBlogs:BlogType[] = [
    {
        "title": "Test is fun",
        "author": "F. Barkley",
        "url": "https://lodash.com/docs/"
    },
    {
        "title": "Celtics entered the finals.",
        "author": "P. Pritchard",
        "url": "https://twitter.com/home"
    },
]

// const nonExistingId = async () => {
//     const note = new BlogModel({ content: 'willremovethissoon',date: new Date() })
//     await note.save()
//     await note.remove()
//
//     return note._id.toString()
// }


const blogsInDb = async () => {
    const blogs = await BlogModel.find({})
    return blogs.map(blog => blog.toJSON())
}

export default {initialBlogs,blogsInDb}
