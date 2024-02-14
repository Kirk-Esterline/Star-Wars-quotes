const bodyParser = require('body-parser')
const express = require('express')
const app = express()

app.listen(3000)

//Make sure to place body-parser berfor the CRUD handlers!
app.use(bodyParser.urlencoded({ extended: true }))

// All CRUD handlers go here ... 
app.get('/', (req,res) => {
    res.sendFile(__dirname + '/index.html')
})

app.post('/quotes', (req, res) => {
    console.log(req.body)
})