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
    // author: Pick<Blog, "author">
    blogsCount:number
}
export type {
    Blog,
    AuthorWithMostBlogs
}
