require('dotenv').config()
const app = require('express')()
const PORT = process.env.PORT || 8000
const mongoURI = process.env.MONGO_URI
const {connectToMongoDB} = require('./connection')
connectToMongoDB(mongoURI).then(console.log('Connected to MongoDB'))

app.get('/',(req,res)=>{
    res.send('Hello World')
})