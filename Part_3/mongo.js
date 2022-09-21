const mongoose = require('mongoose')

console.log(process.argv.length)

if (process.argv.length !== 3 && process.argv.length !== 5) {
    console.log('Require all arguments: "node mongo.js <password> <name> <number>" or "node mongo.js <password>"</password>')
    process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://dadanekxd:${password}@cluster0.xqedf6b.mongodb.net/phoneApp?retryWrites=true&w=majority`

const phoneSchema = new mongoose.Schema({
    name: String,
    number: Number,
})
const Phone = mongoose.model('Phone', phoneSchema)

if (process.argv.length === 5) {
    const personName = process.argv[3]
    const personNumber = process.argv[4]

    mongoose
        .connect(url)
        .then(() => {
            console.log('connected')

            const phone = new Phone({
                name: personName,
                number: personNumber,
            })

            return phone.save()
        })
        .then(() => {
            console.log(`added ${personName} number ${personNumber} to phonebook`)
            return mongoose.connection.close()
        })
        .catch((err) => {
            console.log(err)
        })
}

else {
    Phone
        .find({})
        .then(result => {
            result.forEach(phone => {
                console.log(phone)
            })
            mongoose.connection.close()
        })
}