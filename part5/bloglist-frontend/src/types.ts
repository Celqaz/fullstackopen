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
