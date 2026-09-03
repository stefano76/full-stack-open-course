require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')

const app = express()

app.use(express.json())
app.use(express.static('dist'))
app.use(morgan('tiny'))

app.get('/api/persons', (request, response) => {
    Person.find({}).then((persons) => {
        response.json(persons)
    })
})

app.get('/info', (request, response) => {
    const datetime = new Date();
    let output = `<p>Phonebook has info for ${persons.length} people</p>`;
    output += `<p>${datetime}</p>`
    response.send(output)
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then((person) => {
        response.json(person)
    })
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    persons = persons.filter(p => p.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body;

    if (!body.name) {
        return response.status(400).json({ error: 'Name is required' })
    }

    if (!body.number) {
        return response.status(400).json({ error: 'Number is required' })
    }

    /*if ( persons.find(p => p.name === body.name) ) {
        return response.status(400).json({ error: 'Name must be unique' })
    }*/

    morgan.token('body', function (req, res) {
        return JSON.stringify(req.body)
    })

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save().then((savedPerson) => {
        console.log(savedPerson)
        response.json(savedPerson)
    })

})

const generateId = () => String(Math.floor(Math.random() * 10000000))

const PORT = 3001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))