import list_helper from "../utils/list_helper";
import {Blog} from "../types";

const testBlogs: Blog[] = [
    {
        id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
    },
    {
        id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
    },
    {
        id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
    },
    {
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
    },
    {
        id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
    },
    {
        id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
    }
]
describe("should sum the total likes", () => {
    test('sum the total like of Blog array', () => {
        const result = list_helper.totalLikes(testBlogs)
        expect(result).toBe(36)

    })
})

describe("should return a post with most likes", () => {
    test('return a most liked post', () => {
        const result = list_helper.favoriteBlog(testBlogs)
        const expectObj : Blog = {
            id: "5a422b3a1b54a676234d17f9",
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 12,
        }
        expect(result).toEqual(expectObj)
    })
})

describe('should return an author with most blogs', () => {
    test('return the author with amount of posts', () => {
        const result = list_helper.mostBlogs(testBlogs)
        const expectObj = {author: 'Robert C. Martin', blogsCount: 3}

        expect(result).toEqual(expectObj)
    })
})


describe('should return an author with most likes', () => {
    test('return the author with likes', () => {
        const result = list_helper.mostLikes(testBlogs)
        const expectObj = {
            author: "Edsger W. Dijkstra",
            likes: 17
        }
        expect(result).toEqual(expectObj)
    })
})
