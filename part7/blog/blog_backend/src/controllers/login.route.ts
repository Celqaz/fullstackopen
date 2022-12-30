import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import {Router} from "express";
import UserModel from "../models/user.model";
import {SECRET} from "../utils/config";
import {UserTokenType} from "../types";

require('express-async-errors')

const loginRouter = Router()

loginRouter.post('/', async (request, response) => {
    const body = request.body

    const user = await UserModel.findOne({username: body.username})

    // bcrypt.compare 检查密码是否正确
    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(body.password, user.password)

    if (!(user && passwordCorrect)) {
        return response.status(401).json({
            error: 'invalid username or password'
        })
    }

    const userForToken: UserTokenType = {
        username: user.username,
        id: user._id,
    }

    // token expires in 60*60 seconds, that is, in one hour
    const token = jwt.sign(userForToken, SECRET,{ expiresIn: 60*60 })


    response
        .status(200)
        .send({token, username: user.username, name: user.name})
})


export {loginRouter}
