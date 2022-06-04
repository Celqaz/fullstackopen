export interface UserType {
    id: string,
    username: string
    name?: string
}

export interface BlogType {
    id: string
    title: string
    author: string
    url: string
    likes: number
    user: UserType
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
