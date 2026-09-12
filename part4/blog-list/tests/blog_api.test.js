const assert = require('assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
    {
        _id: '6aa5b77d461aee79de94edaa',
        title: 'How to sing',
        author: 'Freddie Mercury',
        url: "https//www.queen.com",
        likes: 8000,
        __v: 0
    },
    {
        _id: '6aa5b7898f1145b782fd3379',
        title: 'How to play the guitar',
        author: 'Jimi Hendrix',
        url: "https//www.experience.com",
        likes: 20000,
        __v: 0
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

after(async () => {
    await mongoose.connection.close()
})