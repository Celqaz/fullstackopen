export interface LoginUserType {
    token:string
    username:string
    name?:string
}
export interface BlogType{
    id: string
    title:string
    author:string
    url:string
    likes?: number
}

export type newBlogType = Omit<BlogType, "id">

export interface TempMessageProps {
    type?: MessageType
    message: string | null
}
export enum MessageType {
    Success = "successInfo",
    Failure = "failureInfo"
}
