import {Response} from "supertest";

export interface LoginSuperTestResponse extends Response {
    token?: string
}
