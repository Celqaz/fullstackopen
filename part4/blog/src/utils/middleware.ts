import logger from "./logger";
import {ErrorRequestHandler, NextFunction, Request, Response} from "express";
import {CustomRequest} from "../@types/express";
import {UserJwtPayload} from "../@types/jwt";
import jwt from "jsonwebtoken";
import {SECRET} from "./config";

const requestLogger = (request: Request, _response: Response, next: NextFunction) => {
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
    next()
}

// 从request中提取认证信息
const tokenExtractor = (request: CustomRequest, _response: Response, next: NextFunction) => {
    const authorization = request.get('Authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        // return authorization.substring(7)
        request.token = authorization.substring(7)
    } else {
        request.token = ''
    }
    next()
}

// 从token中提取user.id
const userExtractor = (request: CustomRequest, _response: Response, next: NextFunction) => {
    if (request.token) {
        const token = request.token
        const decodedToken = <UserJwtPayload>jwt.verify(token ? token : "", SECRET)
        request.user = decodedToken.id
    }
    next()
}
const unknownEndpoint = (_request: Request, response: Response) => {
    response.status(404).send({error: 'unknown endpoint'})
}

const errorHandler: ErrorRequestHandler = (error, _request, response, next) => {
    logger.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({error: 'malformatted id'})
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({error: error.message})
    } else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({
            error: 'Token is invalid.'
        })
    } else if (error.name === 'TokenExpiredError') {
        return response.status(401).json({
            error: 'Token is Expired'
        })
    }

    logger.error(error.message)
    next(error)
}

export default {
    requestLogger,
    tokenExtractor,
    userExtractor,
    unknownEndpoint,
    errorHandler
}
