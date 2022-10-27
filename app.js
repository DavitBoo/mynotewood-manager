const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session')
const tasks = require('./routes/tasks');
require('dotenv').config()
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

const MongoStore = require('connect-mongo');


//middleware
app.use(express.static('./public'))
app.use(express.json());

console.log(MongoStore)

const sessionStore = MongoStore.create({ mongoUrl: process.env.MONGO_URI, collection: 'sessions' })

app.use(session({
    secret: process.env.SECRET,
    saveUninitialized: true,
    resave: false,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
  }));


//it will be running this middleware until we use the <<next()>>
app.use('/api/v1/tasks', tasks)

app.use(notFound)
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 3000

const start =  async () =>{
    try {
    // maybe I should use createConnection (?)
      await mongoose.connect(process.env.MONGO_URI)    //we are using process.env in order to access the .env file -it is a global variable-
        app.listen(port, console.log(`server is listening in port 3000 ....`));
    } catch (error) {
        console.log(error)
    }
}

start();