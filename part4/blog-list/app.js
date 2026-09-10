const express = require('express')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')

const app = express()

const mongoUrl = "mongodb+srv://stefanobonuccelli_db_user:Uvy3HfNV9g8aHTXW@cluster0.5uaxnrl.mongodb.net/bloglistApp?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(mongoUrl, { family: 4 })

app.use(express.json())
app.use('/api/blogs', blogsRouter)

module.exports = app