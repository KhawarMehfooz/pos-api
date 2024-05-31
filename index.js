require('dotenv').config()
const express = require('express')
const PORT = process.env.PORT || 8000
const mongoURI = process.env.MONGO_URI
const {connectToMongoDB} = require('./connection')
connectToMongoDB(mongoURI,{
    useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(console.log('Connected to MongoDB')).catch(err=>console.error(err))

const app = express()
app.use(express.json())

const categoryRoutes = require('./routes/category');
app.use('/', categoryRoutes);

app.get('/',(req,res)=>{
    res.send('Hello World')
})

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})