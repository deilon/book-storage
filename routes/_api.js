// import modules
// const express = require('express');
// const api = express.Router();
// const booksRecords = require('../fakeDb/booksRecord');


// // Create a get function with the given json Array.
// api.get('/', (req, res) => {
//     res.status(200).send(booksRecords);
// });


// Create a get function using id
// api.get('/:id', (req, res) => {
    
//     let check = booksRecords.find((item)=>{
//             return item.id === parseInt(req.params.id);
//         });

//    if (check) {
//         res.status(201).send(check);
//     } else{
//         res.status(404).send('No Record Found');
//     }

// });


// Create a post function using params and body  (id, title, order, author)  
// api.post('/create', (req, res) => {
//     let body = req.body;
//     // let params = req.params;
//     booksRecords.push(body);
//     res.status(200).send(body);
// });


// Create a put function using id send status 404/message if  not existing id 
// api.put('/:id/update', (req, res) => {

//     let paramId = +req.params.id
//     let body = req.body
//     let index = booksRecords.findIndex((rec)=> rec.id === paramId);

//     if(index >= 0){
//         let updateRecord = {id: paramId, ...body};
//         booksRecords[index] = updateRecord;
//         res.status(201).json(updateRecord);
//         console.log(`id: ${paramId} updated.`);
//     } else {
//         res.status(404).send('Id does not exist.');
//     }

// });


// Create a delete function using id send status 404/message if not existing id
// api.delete('/:id', (req, res) => {

//     let paramId = +req.params.id
//     let index = booksRecords.findIndex((rec)=> rec.id === paramId);
    
//     if(index >= 0){
//         booksRecords.splice(index, 1);
//         res.status(201).json(booksRecords);
//         console.log(`id: ${paramId} deleted.`);
//     } else {
//         res.status(404).send('Id does not exist.');
//     }

// });


//export module 
// module.exports = api;