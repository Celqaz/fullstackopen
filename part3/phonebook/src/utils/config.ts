import {config} from "dotenv";

config();

const MONGODB_URI = process.env.MONGODB_URI;
const PORT =  process.env.PORT;

export  {
    MONGODB_URI,
    PORT
};
