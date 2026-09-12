const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('total blogs likes', () => {
    const listOfOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'How to cook an egg',
            author: 'Gordon Ramsay',
            url: "https//www.gordonramsay.com",
            likes: 1000,
            __v: 0
        }
    ]

    const listOfTwoBlogs = [
        {
            _id: '5a422aa71b54a676234d17g5',
            title: 'How to sing',
            author: 'Freddie Mercury',
            url: "https//www.queen.com",
            likes: 10000,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17h9',
            title: 'How to play a guitar',
            author: 'Jimi Hendrix',
            url: "https//www.experience.com",
            likes: 20000,
            __v: 0
        }
    ]

    test('when the list is made of one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listOfOneBlog)
        assert.strictEqual(result, 1000)
    })

    test('when the list is made of multiple blogs, equals the sum of the likes of all the blogs', () => {
        const result = listHelper.totalLikes(listOfTwoBlogs)
        assert.strictEqual(result, 30000)
    })
})