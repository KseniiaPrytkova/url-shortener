// how to create basic express applications - first we connect it in node.js
// to include packages there is a global function require
const express = require('express')
const config = require('config')
// to connect to mongoDB:
const mongoose = require('mongoose')
const nodemon = require('nodemon')

// variable, which is the result of express fn working
// this is our future server
const app = express()

app.use(express.json({ extended:true }))

// router - the concept of a middlewire in the express, so add a middlewire
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/link', require('./routes/link.routes'))
app.use('/t', require('./routes/redirect.routes'))

// capital letters for a constant, if suddenly it is not defined by default it's 5000
const PORT = config.get('port') || 5000

async function start() {
    try {
        // wait for the promise to complete
        // 1st pair - the url adr to which we will add the database
        // 2nd pair - a set of options
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true

        })
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
    } catch (e) {
        console.log('Server Error', e.message)
        // exit node.js using the process object global and its exit method
        process.exit(1)

    }
}

start()