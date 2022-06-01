import UserModel from "../models/user.model";
import {Router} from "express";
// @ts-ignore
import {User, UserInDB} from "../types";
// bcrypt
import bcrypt from "bcrypt"

require('express-async-errors')

const userRouter = Router()

userRouter.get<UserInDB[]>('/', (_request, response) => {
    response.send('<h1>hi it\'s me</h1>')
})

userRouter.post<UserInDB>('/', async (request, response) => {
    const body: User = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new UserModel({
        username: body.username,
        name: body.name,
        password: passwordHash,
    })

    const savedUser: UserInDB = await user.save()

    response.json(savedUser)
})

export {userRouter}
