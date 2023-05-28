const express = require('express');
const router = express.Router();
const verify = require('../services/auth');
const booksController = require('../controllers/booksController');
const userController = require('../controllers/usersController');


// ========= Home =========
router.get('/', (req, res) => {
    res.render('home');
});
router.get('/home', (req, res) => {
    res.render('home');
});

// ========= About =========
router.get('/about', (req, res) => {
    res.render('about');
});

// ========= Gallery =========
router.get('/gallery', (req, res) => {
    res.render('gallery');
});


// ========= Books router =========
// Route to Home
router.get("/books", verify, booksController.books_index);

// Route to view specific book
router.get("/books/view/:id", verify, booksController.books_find);

// Route to add book
router.post('/books/add', verify, booksController.books_add);

// Update book
router.post('/books/update/:id', verify, booksController.books_update);

// Delete book
router.post('/books/:id', verify, booksController.books_delete);

// Unauthorized 
router.get("/books/unauthorized", (req, res) => {
    res.render('unauthorized');
});



// ========= User Auth router =========
router.get('/user/login', (req, res) => {
    res.render('login', { message: false, title:"Login" });
});

router.get('/user/register', (req, res) => {
    res.render('register', { message: false, title:"Register" });
});

//register user
router.post('/user/register', userController.user_register);

//login user
router.post('/user/login', userController.user_login);

router.get('/user/logout', (req, res)=>{
    res.clearCookie('token');
    res.redirect('login');
});

module.exports = router;