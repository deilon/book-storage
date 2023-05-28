const jwt = require('jsonwebtoken');
module.exports = function(req, res, next){

    const token = req.cookies.token;
    
    // if(!token) return res.status(401).send('Not Authorized User');
    if(!token) return res.redirect('books/unauthorized');

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verified;
        next();

    } catch (error) {
        res.redirect('books/unauthorized');
    }
    
}