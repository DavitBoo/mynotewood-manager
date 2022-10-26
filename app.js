const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session')
const tasks = require('./routes/tasks');
require('dotenv').config()
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')



//middleware
app.use(express.static('./public'))
//I do not need to install bodyparse anymore, with express.json(), it does the same in the latests versions
app.use(express.json());

//it will be running this middleware until we use the <<next()>>
app.use('/api/v1/tasks', tasks)

app.use(notFound)
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 3000

const start =  async () =>{
    try {
      await mongoose.connect(process.env.MONGO_URI)    //we are using process.env in order to access the .env file -it is a global variable-
        app.listen(port, console.log(`server is listening in port 3000 ....`));
    } catch (error) {
        console.log(error)
    }
}

start();