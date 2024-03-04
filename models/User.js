const mongoose = require('mongoose');

// Define Mongoose Schema
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true }, 
    location: String,
    street: String,
    lvl2: String,
    lvl3: String,
    broughtByLvl1: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to another User
    supervisor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to another User
    superCommissionPermitted: Boolean,
    IBAN: String // International Bank Account Number
});

module.exports = mongoose.model('User', userSchema);