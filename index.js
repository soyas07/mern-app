import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotEnv from 'dotenv/config'

import postRoutes from './routes/posts.js'

const app = express()
const db = process.env.DB_URL // db url
const port = process.env.PORT || 5000

// middlewares

app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())

// post routes
app.use('/posts', postRoutes) 

app.get('/', (req, res) => {
    res.send('Hello to Memmories')
})

// connect to db
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(port, () => console.log(`Server running at port ${port}`)))
    .catch(err => console.log(err.message))


