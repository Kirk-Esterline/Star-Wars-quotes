const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient

app.listen(8000)

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))
app.use('/public', express.static('public'))
app.use(bodyParser.json())

MongoClient.connect('mongodb+srv://kirk:X6ua8gVN4ebQsLzt@cluster0.2c4ae6s.mongodb.net/?retryWrites=true&w=majority', { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to Database')
        const db = client.db('cluster0')
        const quotesCollection = db.collection('quotes')
        app.use(bodyParser.urlencoded({ extended: true }))
        app.use(bodyParser.json())
        app.get('/', (req, res) => {
            quotesCollection
                .find()
                .toArray()
                .then(results => {
                    res.render('index.ejs', { quotesCollection: results })
                })
                .catch(/*--*/)
            // res.render('index.ejs',{})
        })
        app.post('/quotes', (req, res) => {
            quotesCollection
                .insertOne(req.body)
                .then(result => {
                    res.redirect('/')
                })
                .catch(error => console.error(error))
        })
        app.put('/quotes', (req, res) => {
            quotesCollection
            .findOneAndUpdate(
                { name: 'Yoda' },
                {
                    $set: {
                        name: req.body.name,
                        quote: req.body.quote,
                    },
                },
                {
                    upsert: true,
                }
            )
            .then(result => {
                res.json('Success')
            })
            .catch((error => console.error(error)))
        })
        app.delete('/quotes', (req, res) => {
            quotesCollection
            .deleteOne({ name: req.body.name })
            .then(result => {
                if (result.deletedCount === 0) {
                    return res.json('No quote to delete')
                }
                res.json('Darth Vader Deleted')
            })
            .catch(error => console.error(error))
        })

    })
    .catch(error => console.error(error))

//Make sure to place body-parser berfor the CRUD handlers!
// app.use(bodyParser.urlencoded({ extended: true }))

// All CRUD handlers go here ... 
// app.get('/', (req,res) => {
//     res.sendFile(__dirname + '/index.html')
// })




