//if I want to setup and error handler, I need to send to the function 4 parameters (documentation)
const errorHandlerMiddleware = (err, req, res, next) => { 
    console.log(err)  
    return res.status(err.status).json({msg:err.message})
}

module.exports = errorHandlerMiddleware; 