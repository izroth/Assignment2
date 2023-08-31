const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

app.use(bodyParser.json())
app.use(cookieParser())

const userRouter = require('./routes/user')
app.use('/user', userRouter)

require('./db/db')
app.listen(port, () => {
    console.log(`http://localhost:${port}`)
    }
)
