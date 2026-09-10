const express = require('express')
const mongoose = require('mongoose')

const app = express()

app.use(express.json())

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

const mongoUrl = "mongodb+srv://stefanobonuccelli_db_user:Uvy3HfNV9g8aHTXW@cluster0.5uaxnrl.mongodb.net/bloglistApp?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(mongoUrl, { family: 4 })

app.get('/api/blogs', (request, response) => {
    Blog.find({}).then(blogs => {
        response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
    const blog = new Blog(request.body)

    blog.save().then(result => {
        response.status(201).json(result)
    })
})

const PORT = 3003
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
})