import UserModel from "../models/user.model";
import {Router} from "express";
// @ts-ignore
import {User, UserInDB} from "../types";
// bcrypt
import bcrypt from "bcrypt"
import {BlogModelType} from "../models/blog.model";

require('express-async-errors')

const userRouter = Router()

userRouter.get<UserInDB[]>('/', async (_request, response) => {
    const allUsers = await UserModel.find({})
        .populate<{ blogs: BlogModelType }>('blogs',{title:1,url:1,author:1})
    response.json(allUsers)
})

userRouter.post<UserInDB>('/', async (request, response) => {
    const body: User = request.body

    if((body.password).length < 3){
        response.status(400).send({ error: '`password` to be longer than 3' })
    }

    const result = await UserModel.find({username:body.username})
    if (result){
        response.status(400).send({ error: '`username` to be unique' })
    }
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new UserModel({
        username: body.username,
        name: body.name || null,
        password: passwordHash,
    })

    const savedUser: UserInDB = await user.save()

    response.json(savedUser)
})

export {userRouter}
