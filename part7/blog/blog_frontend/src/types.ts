export interface UserType {
    id: string,
    username: string
    name?: string
    blogs: BlogType[]
}

export type BlogCommentType = {
    content: string,
    id: string
}

export interface BlogType {
    id: string
    title: string
    author: string
    url: string
    likes: number
    user: UserType
    comments: BlogCommentType[]
}

// export type newBlogType = Omit<BlogType, "id"|"likes">
export type newBlogType = Pick<BlogType, 'title' | 'author' | 'url'>

export interface TempMessageProps {
    type?: MessageType
    message: string | null
}

export enum MessageType {
    Success = 'successInfo',
    Failure = 'failureInfo'
}

// login type
export interface credentialsType {
    username: string,
    password: string
}

export interface UserInfo {
    id:string,
    username: string,
    blogsCreated: number
}

export interface CommentType {
    content: string,
    blogID: string
}
