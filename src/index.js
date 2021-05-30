const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/tasks')

const app = express();
const port = process.env.PORT || 3000;

// //For Maintainence
// app.use((req, res, next) => {
//   res.status(503).send('The site is under maintainence')
  
// })

app.use(express.json());

app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
  console.log("Server is up on Port " + port);
})
