import mongoose from "mongoose";
import supertest from "supertest"
import {app} from "../app";
import {Blog as BlogType} from "../types";
import BlogModel from "../models/blog.model";
// helper
import test_helper from "./blog.testHelper";
import UserModel from "../models/user.model";
import bcrypt from "bcrypt";
import {LoginSuperTestResponse} from "../@types/supertest";

const api = supertest(app)

jest.setTimeout(20000)
describe("blog utility test", () => {
    const userInfo = {
        username:"root",
        name:'Smart',
        password:"secret"
    }
    let authInfo  = ''
    beforeEach(async () => {
        await UserModel.deleteMany({})
        await BlogModel.deleteMany({})
        console.log('🧹 Cleared MongoDB')

        const password = await bcrypt.hash(userInfo.password, 10)
        const user = new UserModel({username: userInfo.username,name:userInfo.name, password})
        await user.save()

        for (const blog of test_helper.initialBlogs) {
            let blogObject = new BlogModel({...blog,user:user._id})
            await blogObject.save()
            console.log('✏️ Saved a blog.')
        }
        console.log('✅ Done')
        const loginInfo : LoginSuperTestResponse  = await api
            .post('/api/login')
            .send({
                username:userInfo.username,
                password:userInfo.password
            })
        authInfo = loginInfo.body.token ? loginInfo.body.token : ""
        console.log('authInfo',authInfo)
    })

    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('there are two blogs', async () => {
        const blogsInDb: BlogType[] = await test_helper.blogsInDb()
        expect(blogsInDb).toHaveLength(test_helper.initialBlogs.length)
    })

    test("id are defined", async () => {
        const blogsInDb: BlogType[] = await test_helper.blogsInDb()
        blogsInDb.forEach(blog => expect(blog.id).toBeDefined())
    })

    test('the first blog is about HTTP methods', async () => {
        const blogsInDb: BlogType[] = await test_helper.blogsInDb()
        expect(blogsInDb[0].title).toBe(test_helper.initialBlogs[0].title)
    })

    test('a valid blog can be added', async () => {
        const newNote: BlogType = {
            "title": "New auth way",
            "author": "L. Louis",
            "url": "https://meta.com/home",
            // "authorization":authorization
        }

        await api
            .post('/api/blogs')
            // .set('Content-type', 'application/json')
            .set({Authorization: `bearer ${authInfo}`})
            .send(newNote)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd: BlogType[] = await test_helper.blogsInDb()
        const titles: string[] = blogsAtEnd.map((r: BlogType) => r.title)

        expect(blogsAtEnd).toHaveLength(test_helper.initialBlogs.length + 1)
        expect(titles).toContain(newNote.title)
    })

    test("blog posted without likes will set likes to 0", async () => {
        const newNote: BlogType = {
            "title": "Full Stack Dev",
            "author": "L. Louis",
            "url": "https://meta.com/home"
        }

        await api
            .post('/api/blogs')
            .set({Authorization: `bearer ${authInfo}`})
            .send(newNote)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd: BlogType[] = await test_helper.blogsInDb()
        const blogInServer = blogsAtEnd.find(blog => blog.title === newNote.title)
        expect(blogInServer?.likes).toBe(0)

    })
    test('blog without title and url will not be added', async () => {
        const newNote = {
            "author": "L. Louis",
        }

        await api
            .post('/api/blogs')
            .set({Authorization: `bearer ${authInfo}`})
            .send(newNote)
            .expect(400)

        const blogsAtEnd: BlogType[] = await test_helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(test_helper.initialBlogs.length)
    })

    test("get a blog by ID", async () => {
        const blogsAtStart: BlogType[] = await test_helper.blogsInDb()

        const blogToView: BlogType = blogsAtStart[0]

        const resultBlog = await api
            .get(`/api/blogs/${blogToView.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        /**
         * 我们从服务器收到的对象，作为response body，经过JSON的序列化和格式化处理。
         * 这种处理会将对象的date 属性的值类型从Date 类型转换成string。
         * 正是由于此，我们不能直接比较resultBlog.body 和 blogToView的相等性能。
         * 相反，我们必须像服务器对对象的操作那样，首先利用类似的方法，用JSON来序列化和格式化blogToView 。
         * https://fullstackopen.com/zh/part4/%E6%B5%8B%E8%AF%95%E5%90%8E%E7%AB%AF%E5%BA%94%E7%94%A8#initializing-the-database-before-tests
         */
        const processedBlogToView = JSON.parse(JSON.stringify(blogToView))
        expect(resultBlog.body).toEqual(processedBlogToView)
    })

    test("updated a post's likes", async () => {
        const blogsAtStart: BlogType[] = await test_helper.blogsInDb()

        const blogToUpdate = blogsAtStart[0]

        const newLikes = {
            likes: 10
        }

        console.log('blogToView', blogToUpdate)

        const updatedBlog = await api
            .post(`/api/blogs/${blogToUpdate.id}`)
            .send(newLikes)
            .expect(200)
        expect(updatedBlog.body.likes).toBe(10)
    })

    test("delete a blog by its Id", async () => {
        const blogsAtStart: BlogType[] = await test_helper.blogsInDb()

        console.log('blogsAtStart', blogsAtStart)
        const blogToDelete: BlogType = blogsAtStart[0]
        console.log('blog id', blogToDelete.id)

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set({Authorization: `bearer ${authInfo}`})
            .expect(204)

        const blogsAtEnd: BlogType[] = await test_helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(test_helper.initialBlogs.length - 1)
        const titles: string[] = blogsAtEnd.map((r: BlogType) => r.title)
        expect(titles).not.toContain(blogToDelete.title)
    })

    // describe("auth test",()=>{
    //     beforeEach()
    // })

    afterAll(async () => {
        await mongoose.connection.close()
    })
})
