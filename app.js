const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
require('dotenv').config()

//middleware
//I do not need to install bodyparse anymore, with express.json(), it does the same in the latests versions
app.use(express.json());

//routes
app.get('/hello', (req, res) => {
    res.send('My Apps')
})

app.use('/api/v1/tasks', tasks)


const start =  async () =>{
    try {
      await connectDB(process.env.MONGO_URI)    //we are using process.env in order to access the .env file -it is a global variable-
        app.listen(3000, console.log(`server is listening in port 3000 ....`));
    } catch (error) {
        console.log(error)
    }
}

start();