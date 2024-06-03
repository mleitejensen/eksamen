require("dotenv").config()
const express = require("express")
const app = express()
const mongoose = require('mongoose')
const cors = require("cors")

const authRoutes = require("./routes/authRoutes")
const itemRoutes = require("./routes/itemRoutes")

const port = process.env.PORT
const dbURI = process.env.DB_URI

app.use(cors())
app.use(express.json())

app.use(authRoutes)
app.use(itemRoutes)

const {
    mongoConnect
} = require('./handlers/dbHandler');

app.listen(port, ()=>{
    console.log(`Server running on port: ${port}`)
    mongoConnect(dbURI);   
});