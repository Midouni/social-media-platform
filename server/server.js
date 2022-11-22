require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()

//router
const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')
const postRouter = require('./routes/post')
const adminRouter = require('./routes/admin')

//middlewares:
const errorsHandlerMiddleware = require('./middleware/error-handler')
const notFoundMiddleware = require('./middleware/not-found')



app.use(express.json());
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/user', userRouter)
app.use('/api/v1/post', postRouter)
app.use('/api/v1/admin', adminRouter)

//middlewares:
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