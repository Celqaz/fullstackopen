interface Blog{
    id?:string,
    title:string,
    author:string,
    url:string,
    likes?:number,
}

interface BlogInDB{
    id:string,
    title:string,
    author:string,
    url:string,
    likes:number,
}

interface AuthorWithMostBlogs {
    author: string
    blogsCount:number
}

interface AuthorWithMostLikes {
    author: string
    likes:number
}

export type {
    Blog,
    BlogInDB,
    AuthorWithMostBlogs,
    AuthorWithMostLikes
}
