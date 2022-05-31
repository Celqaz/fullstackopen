interface Blog{
    _id:string,
    title:string,
    author:string,
    url:string,
    likes:number,
    __v: 0
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
    AuthorWithMostBlogs,
    AuthorWithMostLikes
}
