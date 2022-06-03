import {Types} from 'mongoose';
interface Blog{
    id?:string,
    title:string,
    author:string,
    url:string,
    likes?:number,
    user?: Types.ObjectId | string
}

interface BlogInDB{
    id:string,
    title:string,
    author:string,
    url:string,
    likes:number,
}

interface User{
    username:string
    name?:string
    password:string
}

interface UserInDB{
    id:string,
    username:string
    name:string
    password:string
}

interface AuthorWithMostBlogs {
    author: string
    blogsCount:number
}

interface AuthorWithMostLikes {
    author: string
    likes:number
}

interface UserTokenType{
    username: string,
    id: Types.ObjectId,
}

export type {
    Blog,
    BlogInDB,
    AuthorWithMostBlogs,
    AuthorWithMostLikes,
    User,
    UserInDB,
    UserTokenType
}
