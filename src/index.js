const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/tasks')
const cors = require('cors')

const app = express()
const port = process.env.PORT

app.use(express.json())

app.use(userRouter)
app.use(taskRouter)
app.use(cors())

app.listen(port, () => {
  console.log("Server is up on Port " + port);
})
