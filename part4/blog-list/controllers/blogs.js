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

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
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