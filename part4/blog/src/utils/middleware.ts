import logger from "./logger";
import {ErrorRequestHandler, NextFunction, Request, Response} from "express";
import {CustomRequest} from "../@types/express";

const requestLogger = (request: Request, _response: Response, next: NextFunction) => {
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
    next()
}

const getTokenFrom = (request: CustomRequest,_response: Response, next: NextFunction) => {
    const authorization = request.body.authorization

    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        // return authorization.substring(7)
        request.token = authorization.substring(7)
        console.log('request.token',request.token)
    }else{
        request.token = ''
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
    }else if (error.name === 'TokenExpiredError') {
        return response.status(401).json({
            error: 'Token is Expired'
        })
    }

    logger.error(error.message)
    next(error)
}

export default {
    requestLogger,
    getTokenFrom,
    unknownEndpoint,
    errorHandler
}
