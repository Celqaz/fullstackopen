import BlogModel from "../models/blog.model";
import {Router} from "express";

const blogRouter = Router()

// blogRouter.get('/', (_request, response) => {
//     response.json({'message':'hi there😉'})
// })
blogRouter.get('/', (_request, response) => {
    BlogModel
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

blogRouter.post('/', (request, response) => {
    const blog = new BlogModel(request.body)
    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
})

export {blogRouter}
