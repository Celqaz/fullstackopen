import BlogModel, {BlogType} from "../models/blog.model";
import UserModel, {UserReturnedMongoType} from "../models/user.model";
import {Router} from "express";
// @ts-ignore
import {Blog, BlogInDB, User} from "../types";


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
    console.log('get blogs')
    const allBlogs = await BlogModel.find({})
        .populate<{ user: UserReturnedMongoType }>('user',{username:1,name:1})
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
    const body: Blog = request.body
    const user = await UserModel.findById(body.user)
    if (user) {
        const blog = new BlogModel<BlogType>(
            {
                title: body.title,
                author: body.author,
                url: body.url,
                likes: body.likes === undefined ? 0 : body.likes,
                user: user._id
            }
        )
        // blog
        //     .save()
        //     .then(result => {
        //         response.status(201).json(result)
        //     })
        const savedBlog = await blog.save()

        console.log('savedBlog',savedBlog)
        user.blogs = user.blogs.concat(savedBlog.id)
        console.log('new user',await user.save())

        response.status(201).json(savedBlog)
    }else{
        response.status(400).send('wrong')
    }
})

// find by id and update
blogRouter.post('/:id', async (request, response) => {
    // const newBlog = new BlogModel(request.body)
    const newLikes: number = request.body.likes

    // const updatedBlog = await BlogModel.findByIdAndUpdate(request.params.id,newBlog,{new:true,runValidators:true})
    const updatedBlog = await BlogModel.findByIdAndUpdate(request.params.id, {$set: {likes: newLikes}}, {
        new: true,
        runValidators: true
    })
    response.status(200).json(updatedBlog)
})

// find by id and delete
blogRouter.delete('/:id', async (request, response) => {
    await BlogModel.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

export {blogRouter}
