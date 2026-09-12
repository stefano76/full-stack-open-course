const {init} = require("express/lib/application")
const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((total, blog) => {
        return total + blog.likes
    }, 0)
}

const favoriteBlog = (blogs) => {
    const initialBlog = {likes: 0}

    return blogs.reduce((mostLiked, blog) => {
        return mostLiked.likes > blog.likes ? mostLiked : blog
    }, initialBlog)
}

const mostBlogs = (blogs) => {
    const countBlogsAuthor = _.countBy(blogs, 'author')
    const mostFrequentAuthor = _.maxBy(Object.keys(countBlogsAuthor), (author) => countBlogsAuthor[author])

    return {
        author: mostFrequentAuthor,
        blogs: countBlogsAuthor[mostFrequentAuthor]
    }
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs }