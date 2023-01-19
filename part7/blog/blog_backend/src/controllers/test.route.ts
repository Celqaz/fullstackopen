import BlogModel from "../models/blog.model";
import UserModel from "../models/user.model";
import {Router} from "express";

const testRouter = Router()
testRouter.post('/reset', async (_request, response) => {
    await BlogModel.deleteMany({})
    await UserModel.deleteMany({})

    response.status(204).end()
})

export {testRouter}
