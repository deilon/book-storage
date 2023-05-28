const Books = require('../models/Books');

// Get all books
const books_index = async (req, res) => {
    try {
        
        const search = req.query.search || "";
        let filter = req.query.filter || "All";

        if (req.query) {
            
            if (filter === "Completed") {
                query = {$and: [ { $or:[ {title: {$regex: search, $options: "i"}}, {author: {$regex: search, $options: "i"}} ]}, {completed: true}]} 
            } else if (filter === "Incomplete") {
                query = {$and: [ { $or:[ {title: {$regex: search, $options: "i"}}, {author: {$regex: search, $options: "i"}} ]}, {completed: false}]}
            } else {
                query = {$or:[ {title: {$regex: search, $options: "i"}}, {author: {$regex: search, $options: "i"}} ]}
            }

            Books.find(query, function(err, books) 
            {
                if (err) { res.send(err); }
                res.render('booksView', { data: books } );
            });

        } else {
            Books.find().sort({createdAt: -1})
            .then((result) => {
                res.render('booksView', { data: result } );
            })
            .catch(err => console.log(err));
        }
		
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: true, message: "Internal Server Error" });
	}    
}

// Get specific book
const books_find = (req,res) => {
    const id = req.params.id;
    Books.findById(id)
    .then((result) => {
        res.render('view', {book: result});
    })
    .catch(err => console.log(err))
}


// Add new book
const books_add = (req, res) => {
    // console.log(req.body);
    const book = new Books(req.body);
    book.save()
    .then(result => res.redirect("/books"))
    .catch(err => console.log(err));

}

const books_update = async (req, res) => {
    let id = req.params.id;

    let bookUpdate = await Books.findByIdAndUpdate(id, {
        title: req.body.title,
        order: req.body.order,
        completed: req.body.completed,
        author: req.body.author,
        linkBookImage: req.body.linkBookImage
    })

    if(!bookUpdate) return res.status(404).send(`Book can't be updated`);
    res.redirect('/books')
    
}

// Delete book
const books_delete = async (req, res) => {
    const id = req.params.id;
  const deleteBook = await  Books.findByIdAndDelete(id)
  
  if(!deleteBook){
    return res.status(404).send(`Book can't be deleted`);
  }
  res.redirect('/books');
}

// Book search
const books_search = async (req, res) => {

}



module.exports = {
    books_index,
    books_find,
    books_add,
    books_update,
    books_delete,
    books_search
}