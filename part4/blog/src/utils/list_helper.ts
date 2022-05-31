import {AuthorWithMostBlogs, AuthorWithMostLikes, Blog} from "../types";
import _ from "lodash"

const dummy = (_blogs: Blog[]) => {
    return 1
}

const totalLikes = (blogs: Blog[]) => {
    return _.sumBy(blogs, blog => blog.likes ? blog.likes :0)
}

const favoriteBlog = (blogs: Blog[]) => {
    return _.maxBy(blogs, blog => blog.likes)
}

const mostBlogs = (blogs: Blog[]): AuthorWithMostBlogs | undefined => {
    const authorsBlogs: AuthorWithMostBlogs[] = []
    const blogsGroupedByAuthor = _.groupBy(blogs, blog => blog.author)
    _.forEach(blogsGroupedByAuthor, (v: Blog[], k: string) => {
        authorsBlogs.push({"author": k, "blogsCount": v.length})
    })
    return _.maxBy(authorsBlogs, info => info.blogsCount)
}

const mostLikes = (blogs: Blog[]): AuthorWithMostLikes | undefined => {
    const authorsLikes: AuthorWithMostLikes[] = []
    const blogsGroupedByAuthor = _.groupBy(blogs, blog => blog.author)
    _.forEach(blogsGroupedByAuthor, (v: Blog[], k: string) => {
        const likes: number = totalLikes(v)
        authorsLikes.push({"author": k, "likes": likes})
    })
    return _.maxBy(authorsLikes, info => info.likes)
}

export default {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}
