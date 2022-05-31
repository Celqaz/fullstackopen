import BlogModel from "../models/blog.model";
import {Router} from "express";
import {Blog, BlogInDB} from "../types";

require('express-async-errors')

const blogRouter = Router()

// blogRouter.get('/', (_request, response) => {
//     response.json({'message':'hi there😉'})
// })
// Get All Blogs
blogRouter.get<Blog[]>('/', async (_request, response) => {
    // BlogModel
    //     .find({})
    //     .then(blogs => {
    //         response.json(blogs)
    //     })
    const allBlogs = await BlogModel.find({})
    response.json(allBlogs)
})

// Get Blog by ID
blogRouter.get<BlogInDB>('/:id', async (request, response) => {
    // BlogModel
    //     .find({})
    //     .then(blogs => {
    //         response.json(blogs)
    //     })
    const resultBlogs = await BlogModel.findById(request.params.id)
    if (resultBlogs) {
        response.json(resultBlogs)
    } else {
        response.status(404).end()
    }
})

blogRouter.post('/', async (request, response) => {
    const blog = new BlogModel(request.body)
    // blog
    //     .save()
    //     .then(result => {
    //         response.status(201).json(result)
    //     })
    const newBlog = await blog.save()
    response.status(201).json(newBlog)
})

// find by id and delete
blogRouter.delete('/:id', async (request, response) => {
    await BlogModel.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

export {blogRouter}
