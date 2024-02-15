const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient

app.listen(3000)

MongoClient.connect('mongodb+srv://kirk:X6ua8gVN4ebQsLzt@cluster0.2c4ae6s.mongodb.net/?retryWrites=true&w=majority', { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to Database')
        const db = client.db('cluster0')
        const quotesCollection = db.collection('quotes')
        // app.use(/*--*/)
        // app.get(/*--*/)
        app.post('/quotes', (req, res) => {
            quotesCollection
                .insertOne(req.body)
                .then(result => {
                    res.redirect('/')
                })
                .catch(error => console.error(error))
        })
        // app.listen(/*--*/)
    })
    .catch(error => console.error(error))

//Make sure to place body-parser berfor the CRUD handlers!
app.use(bodyParser.urlencoded({ extended: true }))

// All CRUD handlers go here ... 
app.get('/', (req,res) => {
    res.sendFile(__dirname + '/index.html')
})



