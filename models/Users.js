const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true, 
        max: 150,
        min: 6
    },
    password:{
        type: String, 
        required: true, 
        max: 1050, 
        min: 6
    },
    email:{
        type: String, 
        required: true, 
        max: 150, 
        min: 6
    },
    date:{type: Date, default: Date.now}
});

module.exports = mongoose.model('User', userSchema);
