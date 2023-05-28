const user_DB = require('../models/Users');
const validation = require('../services/validator');
const bcrypt = require('../services/bcrypt');
const jwt = require('jsonwebtoken');

const user_register = async (req, res) => {

	try {
        const { error } =  validation.userValidation.validate(req.body);
        const isExisting = await validation.isExisting(req.body);

        if(error) {
            // res.status(400).send(error.details[0].message);
            res.render('register', {message: error.details[0].message});
        } else if(isExisting) {
            // res.status(400).send(isExisting);
            res.render('register', {message: isExisting});
        } else {
            const newUser = new user_DB({
                username: req.body.username,
                password: await bcrypt.securePassword(req.body.password),
                email: req.body.email,
            });
            await newUser.save();
            res.render('login', {message: "Successfully registered! You can now login to your account."});
        }
	} catch (error) {
		// res.status(400).send("ERROR");
        res.render('register', {message: "Something went wrong."});
		console.log(error);
	}

}

const user_login = async (req, res) => {
    try {
        const { error } = validation.emailValidation.validate(req.body);
        if(error) {
            const errorMessage = error.details[0].message;
            return  res.render('login', {message: errorMessage})
        }

        const user = await user_DB.findOne( {email: req.body.email} );
        if(!user) return res.render('login', {message: "The email you've entered is not connected to an account."} );
        
        const isValid = await bcrypt.comparePassword(req.body.password, user.password);
        if(!isValid) return res.render('login', {message: "The password you've entered is incorrect."} );

        const token = jwt.sign({id: user._id}, process.env.TOKEN_SECRET);
        res.cookie("token", token, { httpOnly: true });
        res.redirect('/books');
        
	} catch (error) {
		res.status(400).send("ERROR");
		console.log(error);
	}
    
}

module.exports = {
    user_register,
    user_login
}