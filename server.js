const express = require('express');
const mongoDbConnection = require('./db/mongoConnection');
const router = require('./router/userRouter');
const cookieParser = require('cookie-parser');
require('dotenv').config();


const app = express()
mongoDbConnection();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser(  ))

const port = process.env.PORT
app.use("/api", router)
app.listen(port, ()=>console.log(`Listening on port ${port}`))