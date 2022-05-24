interface Part
{
    name: string
    exercises: number
    id: number
}
interface Courses{
    name:string
    id:number
    parts: Part[]
}

export type {Courses,Part}
