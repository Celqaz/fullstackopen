export interface Anecdote {
    id: string;
    content: string;
    votes: number;
}

export interface NewAnecdote {
    content: string;
    votes: number;
}

export interface NotificationType {
    content : string
}


export interface FilterType {
    filter: string;
}
