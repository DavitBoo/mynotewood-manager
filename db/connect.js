const mongoose = require('mongoose');


connectDB = (url) => {
    return mongoose.connect(url, {            //these are used in order to remove "deprectaion error" that might happens.
        useNewUrlParser:true,               
        useCreateIndex:true,
        useFindAndModify:false,
        useUnifiedTopology:true
    });
}


module.exports = connectDB
