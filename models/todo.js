const mongoose  = require('mongoose');

const Schema = mongoose.Schema;
const TodoSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    aim: {
        type: String,
        required: true
    },
    daysToDo: {
        type: Number,
        required: true,
    }
    
},{timestamps: true})

const Todo = mongoose.model('todo',TodoSchema);

module.exports = Todo;