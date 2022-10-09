require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()

//router
const authRouter = require('./routes/auth')


app.use('/api/v1/auth', authRouter)


//middlewares:
const errorsHandlerMiddleware = require('./middleware/error-handler')
const notFoundMiddleware = require('./middleware/not-found')
app.use(errorsHandlerMiddleware)
app.use(notFoundMiddleware)

//connect to databaase
const connect = require('./db/connect')

port = process.env.PORT || 5000
const start = async () => {
    try {
        await connect(process.env.URI_MONGO)
        app.listen(port, () => { console.log(`servre running on port ${port}`); })
    } catch (error) {
        console.log(error);
    }
}

start()