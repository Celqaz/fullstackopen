import {AuthorWithMostBlogs, Blog} from "../types";
import _ from "lodash"

const dummy = (_blogs:Blog[]) => {
    return 1
}

const totalLikes = (blogs: Blog[])=>{
    return _.sumBy(blogs,blog=> blog.likes)
}

const favoriteBlog = (blogs: Blog[])=>{
    return _.maxBy(blogs,blog=>blog.likes)
}

const mostBlogs = (blogs:Blog[]) : AuthorWithMostBlogs | undefined =>{
    const authorsBlogs :AuthorWithMostBlogs[] =[]
    const blogsGroupedByAuthor = _.groupBy(blogs,blog=>blog.author)
    _.forEach(blogsGroupedByAuthor,(v,k)=>{
        authorsBlogs.push({"author":k,"blogsCount":v.length})
    })
    return _.maxBy(authorsBlogs,info => info.blogsCount)
}

export default {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}
