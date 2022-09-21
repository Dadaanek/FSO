require('dotenv').config()

// const mongoose = require('mongoose')
const express = require('express')
const app = express()

const morgan = require('morgan')
const cors = require('cors')

const Person = require('../models/phoneSchema')

morgan.token('body', function(req) {
    return JSON.stringify(req.body)
})

app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body '))
app.use(express.static('build'))

app.get('/api/persons', (request, response) => {
    Person.find({}).then(notes => {
        console.log(notes)
        response.json(notes)
    })
})

app.get('/api/info', (request, response) => {
    Person.find({}).then(notes => {
        response.send(
            `<p>Phonebook has info for ${notes.length} people</p>
            <p>${Date().toString()}</p>`
        )
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(note => {
            if(note) {
                response.json(note)
            }
            else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(() => {
            response.status(204).end()
        })
        .catch(error => next(error))

    response.status(204).end()
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'name or number missing'
        })
    }

    Person.find({}).then(persons => {
        console.log(persons)
        persons.forEach(person => {
            if(person.name === body.name) {
                return response.status(400).json({
                    error: 'name must be unique'
                })
            }
        })
    })

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save()
        .then(saved => response.json(saved))
        .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const { name, number } = request.body

    Person.findByIdAndUpdate(
        request.params.id,
        { name, number },
        { new: true, runValidators: true, context: 'query' }
    )
        .then(updatedNote => {
            response.json(updatedNote)
        })
        .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.log(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malforamted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: 'Validation failed (name must be longer than 2 characters and number must be longer than 7 digits)' })
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})