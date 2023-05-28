const joi = require("joi");
const user_db = require('../models/Users');

const userValidation = joi.object({
    username: joi.string().alphanum().min(3).max(25).trim(true).required(),
    password: joi.string().min(6).trim(true).required(),
    email: joi.string().email().trim(true).required()
});

const emailValidation = joi.object({
    email: joi.string().email().trim(true).required(),
    password: joi.string().min(6).trim(true).required()
});

const isExisting = async (User) => {
    const email = await user_db.findOne({email: User.email}); 
    if(email) {
        error = `${User.email} is already exist!`;
        return error;
    }
}

module.exports = {
    userValidation,
    emailValidation,
    isExisting
}