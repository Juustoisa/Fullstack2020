const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

describe('User basics', () => {

    beforeEach(async () => {
        await User.deleteMany({})
        await Blog.deleteMany({})
    })

    test('User creation works', async () => {
        const usersAtStart = await api.get('/api/users')

        const newUser = {
            username: 'TestaajaOsaNeljä',
            name: 'tehtävä 22',
            password: 'viimeinen',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await api.get('/api/users')
        expect(usersAtStart.length === usersAtEnd.length + 1)

    })

    test('User creations fails with non-unique name', async () => {
        const usersAtStart = await api.get('/api/users')

        const newUser = {
            username: 'TestaajaOsaNeljä',
            name: 'tehtävä 22',
            password: 'viimeinen',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('`username` to be unique')
        const usersAtEnd = await api.get('/api/users')
        expect(usersAtStart.length === usersAtEnd.length + 1)
    })

    test('User creations fails with short name or short password', async () => {
        const usersAtStart = await api.get('/api/users')

        let newUser = {
            username: 'Te',
            name: 'tehtävä 22',
            password: 'viimeinen',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)


        const newUser2 = {
            username: 'TestaajaOsaNeljä',
            name: 'tehtävä 22',
            password: 'ab',
        }

        await api
            .post('/api/users')
            .send(newUser2)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await api.get('/api/users')
        expect(usersAtStart.length === usersAtEnd.length)
    })
})

describe('User login', () => {
    test('Login works with valid credentials', async () => {
        const newUser = {
            username: 'TestaajaOsaNeljä',
            name: 'tehtävä 22',
            password: 'viimeinen',
        }
        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
        const response = await api
            .post('/api/login')
            .send({
                username: 'TestaajaOsaNeljä',
                password: 'viimeinen'
            })
            .expect(200)
    })

    test('Login fails with wrong credentials', async () => {

        const response = await api
            .post('/api/login')
            .send({
                username: 'TestaajaOsaVäärä',
                password: 'viimeinen'
            })
            .expect(401)
    })
})

describe('Posting blogs', () => {

    test('Posting blog with valid credentials works', async () => {
        const response = await api
            .post('/api/login')
            .send({
                username: 'TestaajaOsaNeljä',
                password: 'viimeinen'
            })
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const tokenFromLogin = response.body.token

        await api
            .post('/api/blogs')
            .set('Authorization', 'bearer ' + tokenFromLogin)
            .send({
                title: "Test Blog",
                author: "Blogs daily",
                url: "www.hopefullynotarealurl.com",
            })
            .expect(200)
            .expect('Content-Type', /application\/json/)

    })

    test('Posting blog with no credentials fails', async () => {

        await api
            .post('/api/blogs')
            .send({
                title: "Test Blog",
                author: "Blogs daily",
                url: "www.hopefullynotarealurl.com",
            })
            .expect(401)
            .expect('Content-Type', /application\/json/)
    })

    test('Posting blog with bad credentials fails', async () => {

        await api
            .post('/api/blogs')
            .set('Authorization', 'bearer dasffregreyturg5RETREGfefDGTHRTHFGHGD352355')
            .send({
                title: "Test Blog",
                author: "Blogs daily",
                url: "www.hopefullynotarealurl.com",
            })
            .expect(401)
            .expect('Content-Type', /application\/json/)
    })
})

afterAll(() => {
    mongoose.connection.close()
})