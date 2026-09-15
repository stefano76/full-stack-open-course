const assert = require('assert')
const { test, describe, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const api = supertest(app)

const sampleUsers = [
    {
        name: 'Margaret Thatcher',
        username: 'theironlady',
        password: 'godsavethequeen'
    },
    {
        name: 'Joe Biden',
        username: 'sleepyjoe',
        password: 'godblessamerica'
    }
]

describe('an invalid user should not be created', () => {
    beforeEach(async () => {
        await User.deleteMany()

        const passwordHash = await bcrypt.hash(sampleUsers[0].password, 10)
        const user = new User({
            name: sampleUsers[0].name,
            username: sampleUsers[0].username,
            passwordHash
        })

        await user.save()
    })

    test('if user has existing username it should not be created', async () => {
        const usersAtStart = await User.find({})

        const newUser = {
            name: 'Angela Merkel',
            username: "theironlady",
            password: sampleUsers[0].password
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await User.find({})

        assert(result.body.error.includes('expected `username` to be unique'))
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

    test('users with missing username or password should not be created', async () => {
        const usersAtStart = await User.find({})

        const newUser = {
            name: sampleUsers[1].name,
            username: sampleUsers[1].username,
            // password: sampleUsers[1].password
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await User.find({})

        assert(result.body.error.includes('is required'))
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

    test('users with username or password shorter than 3 characters should not be created', async () => {
        const usersAtStart = await User.find({})

        const newUser = {
            name: "Silvio Berlusconi",
            username: "cavaliere",
            password: "bu"
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await User.find({})

        assert(result.body.error.includes('Password must be at least 3 characters'))
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })
})

after(async () => {
    await mongoose.connection.close()
})