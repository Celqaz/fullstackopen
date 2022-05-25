interface Person {
    name: string;
    number: string;
    id?: number;
}

export enum MessageType {
    Blank = "",
    Success = 'message_success',
    Failure = 'message_failure'

}

interface Message {
    message: string
    type: MessageType
}

export type {Person, Message}
