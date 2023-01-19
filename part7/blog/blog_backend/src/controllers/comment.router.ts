import {Router} from "express";
import {CommentRequestType} from "../types";
import {CustomRequest} from "../@types/express";
import {UserJwtPayload} from "../@types/jwt";
import jwt from "jsonwebtoken";
import {SECRET} from "../utils/config";
import UserModel from "../models/user.model";
import BlogModel from "../models/blog.model";
import CommentModel, {CommentType} from "../models/comment.model";

const commentRouter = Router()

commentRouter.get('/',async (_request,response)=>{
    const comments = await CommentModel.find({})
    response.status(200).json(comments)
})
commentRouter.post('/', async (request:CustomRequest,response)=>{
    const body: CommentRequestType = request.body
    const token = request.token
    const decodedToken = <UserJwtPayload>jwt.verify(token ? token : "", SECRET)

    const user = await UserModel.findById(decodedToken.id)
    const blog = await BlogModel.findById(body.blogID)

    if(user && blog){
        const comment  = new CommentModel<Omit<CommentType, "id">>(
            {
                content: body.content,
                blog:blog._id,
                user:user._id,
            }
        )
        const savedComment = await comment.save()

        blog.comments = blog.comments.concat(savedComment._id)
        await blog.save()

        response.status(201).json(savedComment)
    }else{
        response.status(400).json("Bad request")
    }
})

commentRouter.delete('/',async (_request,response)=>{
    await CommentModel.deleteMany({})
    response.status(200).json('clear')
})

export {commentRouter}
