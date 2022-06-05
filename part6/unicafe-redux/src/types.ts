export enum ReviewType{
    'GOOD' = "good",
    "OK" = "ok",
    "BAD" = "bad",
    "ZERO" = "zero"
}
export interface ActionType {
    type: ReviewType
}
