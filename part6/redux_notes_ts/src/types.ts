export interface NoteState {
    content: string;
    important: boolean;
    id: number;
}

export interface NewNoteState {
    content: string;
    important: boolean;
}


export enum ImportanceEnum {
    ALL = "ALL",
    IMPORTANT = "IMPORTANT",
    NONIMPORTANT = "NONIMPORTANT",
}

export type FilterType = {
    filter: ImportanceEnum
}
