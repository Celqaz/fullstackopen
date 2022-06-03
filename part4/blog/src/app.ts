import express, {Express} from "express";
import cors from 'cors';
import logger from "./utils/logger";
//router
import {blogRouter} from "./controllers/blog.router";
import {userRouter} from "./controllers/user.router";
import {loginRouter} from "./controllers/login.route";
// import MongoDB stuff
import {connect} from 'mongoose';
import {MONGODB_URI} from "./utils/config";
// middleware
import middleware from "./utils/middleware";

//init express app
const app: Express = express()

// connect MongoDB
logger.info('🪝 Connecting to MongoDB...');
if (MONGODB_URI) {
    connect(MONGODB_URI)
        .then(() => logger.info('📬 Successfully Connected to MongoDB'))
        .catch(err => logger.error(err));
} else {
    throw 'MongoDB Uri undefined';
}

// init necessary modules
app.use(express.static('build'))
app.use(cors({
    origin: ['http://localhost:3000']
}));
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.getTokenFrom)
//router
app.use('/api/login', loginRouter)
app.use('/api/blogs/', blogRouter)
app.use('/api/users/', userRouter)

// error handling
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

export {app}
