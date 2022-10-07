const express = require('express');
const app = express();
const tasks = require('./routes/tasks');


//middleware
//I do not need to install bodyparse anymore, with express.json(), it does the same in the latests versions
app.use(express.json());

//routes
app.get('/hello', (req, res) => {
    res.send('My Apps')
})

app.use('/api/v1/tasks', tasks)

app.listen(3000, console.log(`server is listening in port 3000 ....`));