
const express = require('express')
const app = express()
const path = require('path')
const morgan = require('morgan')
const cors = require('cors')
const env = require('dotenv')
const router = require('./router')
const connectDatabase = require('./connectDatabase')
const fileUpload = require("express-fileupload") 

env.config()

app.use(express.json())
app.use(cors({
    // All domains can access
    origin: "*"
}))

app.use(fileUpload())



app.use(morgan('combined'));
connectDatabase()
app.use(express.static(path.join(__dirname, 'data'))) // xu ly file static lay path den cho hien tai

app.use(router)

app.listen(process.env.PORT || 3001, () => {
    console.log("Example app listening at http://localhost:" + process.env.PORT)
})

