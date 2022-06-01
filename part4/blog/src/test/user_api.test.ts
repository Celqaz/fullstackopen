import mongoose from "mongoose";
import supertest from "supertest"
import {app} from "../app";
import bcrypt from "bcrypt";
// @ts-ignore
import {Blog as BlogBasicType, User as UserType, UserInDB} from "../types";
import UserModel, {UserReturnedMongoType} from "../models/user.model";
// helper
import userTestHelper from "./user.testHelper";
import test_helper from "./blog.testHelper";
import BlogModel from "../models/blog.model";

const api = supertest(app)

jest.setTimeout(20000)
describe("when there is initially one user in db", () => {
    beforeEach(async () => {
        await UserModel.deleteMany({})
        await BlogModel.deleteMany({})
        console.log('cleared')

        const password = await bcrypt.hash('secret', 10)
        const user = new UserModel({username: 'root',name:'Smart', password})
        await user.save()

        const initialBlogs: BlogBasicType[] = [
            {
                "title": "Full Stack Dev",
                "author": "L. Louis",
                "url": "https://meta.com/home",
                "user": user._id
            },
            {
                "title": "Test with Jest",
                "author": "P Perkins",
                "url": "https://data.com/science",
                "user": user._id
            },
        ]
        for (const blog of initialBlogs) {
            const newBlog = new BlogModel(blog)
            console.log(await newBlog.save())
        }
    })

    test('get all blogs with username', async () => {
        const result = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
        expect(result.body.length).toBe(2)
        expect(result.body[0].user.username).toBe('root')
        expect(result.body[0].user.name).toBe('Smart')
    })
    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await userTestHelper.usersInDB()

        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd: UserInDB[] = await userTestHelper.usersInDB()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames: string[] = usersAtEnd.map(user => user.username)
        expect(usernames).toContain(newUser.username)
    })

    test('fail to create a user with password shorter than 3', async () => {
        const usersAtStart = await userTestHelper.usersInDB()

        const newUser = {
            username: 'mluukkai',
            password: 'sn',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('`password` to be longer than 3')

        const usersAtEnd: UserInDB[] = await userTestHelper.usersInDB()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('fail to create a user with existing username', async () => {
        const usersAtStart = await userTestHelper.usersInDB()

        const newUser = {
            username: 'root',
            password: 'sameUsername',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('`username` to be unique')

        const usersAtEnd: UserInDB[] = await userTestHelper.usersInDB()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test.only('can post a blog with username', async () => {
        const usersAtStart :UserReturnedMongoType[] = await userTestHelper.usersInDB()

        console.log('user start', usersAtStart)
        const newBlog: BlogBasicType = {
            "title": "Post Successfully",
            "author": "L. Louis",
            "url": "https://meta.com/home",
            "user": usersAtStart[0].id
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        const blogsAtEnd: BlogBasicType[] = await test_helper.blogsInDb()
        const titles: string[] = blogsAtEnd.map((r: BlogBasicType) => r.title)

        expect(blogsAtEnd).toHaveLength(test_helper.initialBlogs.length + 1)
        expect(titles).toContain(newBlog.title)
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})

