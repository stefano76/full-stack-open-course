const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://stefanobonuccelli_db_user:${password}@cluster0.5uaxnrl.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)
mongoose.connect(url, { family: 4 })

const phonebookSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Number = mongoose.model('Number', phonebookSchema)

if ( process.argv[3] && process.argv[4] ) {
    const newName = process.argv[3]
    const newNumber = process.argv[4]

    const number = new Number({
        name: newName,
        number: newNumber
    })

    number.save().then(() => {
        console.log(`Added ${newName} with number ${newNumber} to phonebook`)
        mongoose.connection.close()
    })
} else {
    Number.find({}).then(result => {
        console.log('Phonebook:')
        result.forEach(person => {
            console.log(person.name + ' ' + person.number)
        })
        mongoose.connection.close()
    })
}


