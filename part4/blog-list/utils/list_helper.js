const {init} = require("express/lib/application");
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

module.exports = { dummy, totalLikes, favoriteBlog }