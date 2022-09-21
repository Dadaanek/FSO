const mongoose = require('mongoose')

const url = process.env.URL

console.log('connecting to MongoDB')

mongoose
    .connect(url)
    .then(() => {
        console.log('connected')
    }
    )
    .catch((error) => {
        console.log('error: ', error.message)
    })

const phoneSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: {
        type: String,
        minLength: 8,
        validate: {
            validator: function(value) {
                if (value.includes('-')) {
                    const separated = value.split('-')
                    if ((separated[0].length >= 2 && separated[0].length <= 3) && (separated[0].length + separated[1].length) >= 8 && separated.length === 2) {
                        return undefined
                    } else {
                        return 0
                    }
                }
            },
            message: props => `${props.value} is not a valid phone number. Use for example '44-52525252' or '4452525252'.`
        },
        required: true
    },
})

phoneSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', phoneSchema)