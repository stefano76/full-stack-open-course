const assert = require('assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
    {
        id: '6aa5b77d461aee79de94edaa',
        title: 'How to sing',
        author: 'Freddie Mercury',
        url: "https//www.queen.com",
        likes: 8000,
    },
    {
        id: '6aa5b7898f1145b782fd3379',
        title: 'How to play the guitar',
        author: 'Jimi Hendrix',
        url: "https//www.jmexperience.com",
        likes: 20000,
    }
]

beforeEach(async () => {
    await Blog.deleteMany()
    await Blog.insertMany(initialBlogs)
})

test('blogs are returned as json', async () => {
     const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.length, initialBlogs.length)
})

test('blogs identifiers are named "id"', async () => {
    const response = await api.get('/api/blogs')
    const ids = response.body.map(blog => blog.id)
    assert.notDeepStrictEqual(ids, [undefined, undefined])
})

after(async () => {
    await mongoose.connection.close()
})