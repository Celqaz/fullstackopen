import {config} from "dotenv";

config();

// require('dotenv').config()
//
// console.log('dotenv', require("dotenv").config())
const PRO_MONGODB_URI = process.env.PRO_MONGODB_URI;
// const PORT = process.env.PORT;
const PORT = process.env.REACT_APP_PORT

const TEST_MONGODB_URI = process.env.TEST_MONGODB_URI
// 如果为测试环境，则只连接测试MongoDB
const MONGODB_URI = process.env.NODE_ENV === "test" ? TEST_MONGODB_URI : PRO_MONGODB_URI
// jwt secret
const SECRET = process.env.SECRET ? process.env.SECRET : ''
const TOKEN_FOR_TEST = process.env.TOKEN_FOR_TEST

export {
    MONGODB_URI,
    PORT,
    SECRET,
    TOKEN_FOR_TEST
}
