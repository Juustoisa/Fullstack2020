const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
    },
    {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
    },
    {
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
    },
    {
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
    },
    {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
    },
]

beforeEach(async () => {
    await Blog.deleteMany({})

    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[2])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[3])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[4])
    await blogObject.save()
})

describe('Basics', () => {

    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('there are 5 blogs', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body.length).toBe(initialBlogs.length)
    })

    test('blogs are identified with field "id"', async () => {
        const response = await api.get('/api/blogs')
        expect('id').toBeDefined()
    })
})

describe('Add new blog', () => {

    test('Adding a valid blog works', async () => {
        const newBlog = {
            title: "Type wars",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
            likes: 2,
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogs = await api.get('/api/blogs')
        expect(blogs.body.length).toBe(initialBlogs.length + 1)

        const blogtitles = blogs.body.map(x => x.title)
        expect(blogtitles).toContain('Type wars')
    })

    test('Unspecified likes defaults to 0 likes', async () => {

        await Blog.deleteMany({})
        const newBlog = {
            title: "Type wars",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)


        const blogs = await api.get('/api/blogs')
        expect(blogs.body[0].likes).toBe(0)

    })

    test('Unspecified title leads to rejection', async () => {

        const newBlog = {
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
    })

    test('Unspecified url leads to rejection', async () => {

        const newBlog = {
            title: "Type wars",
            author: "Robert C. Martin",
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
    })
})

describe('Delete blog', () => {
    test('Delete removes the right blog', async () => {
        const blogsAtBeginning = await api.get('/api/blogs')
            .expect(200)
        const blogToBeDeleted = blogsAtBeginning.body[0]

        await api
            .delete(`/api/blogs/${blogToBeDeleted.id}`)
            .expect(204)
        
        blogsAtEnd = await api.get('/api/blogs')
        expect(blogsAtEnd.body.length).toBe(blogsAtBeginning.body.length -1)

        const blogtitles = blogsAtEnd.body.map(x => x.title)
        expect(blogtitles).not.toContain(blogToBeDeleted.title)
    })
})

describe('Update blog', () => {
    test('Increasing like by 1 works', async () => {
        const blogsAtBeginning = await api.get('/api/blogs')
            .expect(200)
        const blogToBeIncreased = blogsAtBeginning.body[0]

        await api
            .put(`/api/blogs/${blogToBeIncreased.id}`) 
        blogsAtEnd = await api.get('/api/blogs')
        expect(blogsAtEnd.body[0].likes).toBe(blogToBeIncreased.likes +1)
    })
})

afterAll(() => {
    mongoose.connection.close()
})