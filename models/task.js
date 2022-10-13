const mongoose = require('mongoose');

//everything out of the schema will be ignored
const TaskSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, 'must provide a name'],
        trim: true,
        maxlength: [20, 'name can not be more than 20 characters']
    },
    bookType:{
        type: String
    },
    woodType: {
        type: String
    },
    measures: {
        type: String
    },
    pages: {
        type: Number
    },
    thickness: {
        type: String
    },
    wayMade: {
        type: String
    },
    sideType: {
        type: String
    },
    threat: {
        type: String
    },
    completed: {
        type: Boolean,
        default: false
    },
})

module.exports = mongoose.model('Task', TaskSchema)