const assert = require('assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require("bcrypt");

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

const userLogged = {
    id: '6ac2def1a8114dceb208a260',
    username: 'john',
    name: 'John Doe',
    password: '123456'
}

const addUser = async () => {
    const user = new User({
        username: 'john',
        name: 'John Doe',
        passwordHash: await bcrypt.hash("123456", 10)
    })
    await user.save()
}

beforeEach(async () => {
    await Blog.deleteMany()
    await User.deleteMany()
    await addUser()

    const login = await api
        .post('/api/login')
        .send({
            username: 'john',
            password: '123456'
        })
        .expect(200)

    token = login.body.token

    await Blog.insertMany(initialBlogs)
})

let token

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

test('a valid blog can be added', async () => {
    const newBlog = {
        title: 'How to play the bass',
        author: 'Jaco Pastorius',
        url: "https//www.jaco.com",
        // likes: 1000
    }

    const response = await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await Blog.find({})
    assert.strictEqual(blogsAtEnd.length, initialBlogs.length + 1)
    // const { id, ...responseClean } = response.body
    // assert.strictEqual(response.body.likes, 0)
})

test('a blog without likes has 0 likes', async () => {
    const newBlog = {
        title: 'How to play the bass',
        author: 'Jaco Pastorius',
        url: "https//www.jaco.com",
    }

    const response = await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.likes, 0)
})

test('a blog without title or url returns Bad request', async () => {
    const newBlog = {
        // title: 'How to play the bass',
        author: 'Jaco Pastorius',
        // url: "https//www.jaco.com",
    }

    const response = await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(400)
})

test('a blog can’t be added if a token is not provided', async () => {
    const newBlog = {
        title: 'How to play the bass',
        author: 'Jaco Pastorius',
        url: "https//www.jaco.com",
    }

    const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
})

test('a blog can be deleted', async () => {
    const blogsAtStart = await Blog.find({})
    const blogToDelete = blogsAtStart[0]

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

    const blogsAtEnd = await Blog.find({})
    const ids = blogsAtEnd.map(blog => blog.id)

    assert.strictEqual(blogsAtEnd.length, initialBlogs.length - 1)
    assert(!ids.includes(blogToDelete.id))
})

test('a blog can be updated', async () => {
    const blogs = await Blog.find({})
    const blogToUpdate = blogs[0]

    blogToUpdate.likes = 50000

    await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogToUpdate)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    assert.notStrictEqual(blogToUpdate.likes, initialBlogs[0].likes)
})

after(async () => {
    await mongoose.connection.close()
})