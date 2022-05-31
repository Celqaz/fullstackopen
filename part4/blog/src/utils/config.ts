import {config} from "dotenv";

config();

const PRO_MONGODB_URI = process.env.PRO_MONGODB_URI;
const PORT = process.env.PORT;
const TEST_MONGODB_URI = process.env.TEST_MONGODB_URI
// 如果为测试环境，则只连接测试MongoDB
const MONGODB_URI = process.env.NODE_ENV === "test" ? TEST_MONGODB_URI : PRO_MONGODB_URI
export {
    MONGODB_URI,
    PORT
}
