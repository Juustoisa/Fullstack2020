const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs.map(blog => blog.toJSON()))

})

blogsRouter.post('/', async (request, response) => {
    const body = request.body
    if (!request.token){
        return response.status(401).json({ error: 'JsonWebTokenError' })
    
    }
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'JsonWebTokenError' })
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: user._id,
    })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.json(savedBlog.toJSON())
})

blogsRouter.put('/:id', async (request, response) => {

    const blog = await Blog.findById(request.params.id)

    blog.likes++

    await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(blog.toJSON())
})

blogsRouter.delete('/:id', async (request, response) => {

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'JsonWebTokenError' })
    }

    const targetBlog = await Blog.findById(request.params.id)
    const userInToken = await User.findById(decodedToken.id)

    if (targetBlog.user.toString() !== userInToken.id.toString()) {
        return response.status(401).json({ error: 'this user is unable to delete this blog' })
    }
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

module.exports = blogsRouter