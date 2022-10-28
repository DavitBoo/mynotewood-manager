const mongoose = require('mongoose');
//const { connection } = require('../config/database')

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please provide an Email!"],
        unique: [true, "Email Exist"],
      },
    
      password: {
        type: String,
        required: [true, "Please provide a password!"],
        unique: false,
      },
})

//const User = connection.model('User', Schema)

module.exports = mongoose.model.Users || mongoose.model("Users", UserSchema);