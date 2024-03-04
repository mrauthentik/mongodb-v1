const mongoose = require('mongoose')
// Defining Mongoose Schema
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {type: String, unique:true},
    location:String,
    street: String,
    lvl2: String,
    lvl3: String
    
})

module.exports = mongoose.model('Users', userSchema)