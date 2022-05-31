import mongoose from "mongoose";
import supertest from "supertest"
import {app} from "../app";

const api = supertest(app)

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
},100000)

test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(2)
},100000)

test('the first note is about HTTP methods', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[1].title).toBe('Test is fun')
},100000)

afterAll(async () => {
    await mongoose.connection.close()
})
