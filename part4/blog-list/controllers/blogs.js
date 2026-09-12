const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)

    if (!request.body.likes) {
        blog.likes = 0
    }

    if (!request.body.title || !request.body.url) {
        response.status(400).end('Title or URL missing!')
    } else {
        await blog.save()
        response.status(201).json(blog)
    }

})

module.exports = blogsRouter