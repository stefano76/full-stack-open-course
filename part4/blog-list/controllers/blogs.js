const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require("../models/user")
const jwt = require("jsonwebtoken")

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken) {
        return response.status(401).json({ error: 'token invalid' })
    }

    const user = await User.findById(decodedToken.id)
    if (!user) {
        return response.status(400).json({ error: 'userId missing or invalid' })
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: user._id
    })

    if (!body.title || !body.url) {
        response.status(400).end('Title or URL missing!')
    } else {
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()

        response.status(201).json(blog)
    }
})

blogsRouter.delete('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken) {
        return response.status(401).json({ error: 'token invalid' })
    }

    const user = await User.findById(decodedToken.id)
    if (!user) {
        return response.status(400).json({ error: 'userId missing or invalid' })
    }

    if ( blog.user.toString() === user._id.toString() ) {
        await blog.deleteOne()
    } else {
        return response.status(401).json({ error: 'userId missing or invalid' })
    }

    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const { title, author, url, likes } = request.body

    const blogToUpdate = await Blog.findById(request.params.id)
    if (!blogToUpdate) response.status(404).end()

    blogToUpdate.title = title
    blogToUpdate.author = author
    blogToUpdate.url = url
    blogToUpdate.likes = likes

    await blogToUpdate.save()
    response.json(blogToUpdate)
})

module.exports = blogsRouter