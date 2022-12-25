export interface NoteState {
    content: string;
    important: boolean;
    id: number;
}

export enum ImportanceEnum {
    ALL = "ALL",
    IMPORTANT = "IMPORTANT",
    NONIMPORTANT = "NONIMPORTANT",
}

export type FilterType = {
    filter: ImportanceEnum
}
