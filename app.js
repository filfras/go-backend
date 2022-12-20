//it will contain our express app
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
//running express to create our app

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); //allow any request
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());
//app.use(express.json());
//This tells Express to take any incoming request that has Content-Type  application/json  and make its  body  available on the  req  object, 
//allowing you to write the following POST middleware:

app.post('/api/stuff', (req, res, next) => {
    console.log(req.body);
    //we will receive the jason response by the front-end by using the req.body
    res.status(201).json({
        message: 'Thing created successfully!'
    });
});

//check app.use (#)
//This is a piece of middleware; added "next" argument so you can send one response to the next middle ware by finishing with next();
//app.get only intersepts get requests
app.get('/api/stuff', (req, res, next) => {
    const stuff = [
    {
        _id: 'oeihfzeoi',
        title: 'My first thing',
        description: 'All of the info about my first thing',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Hasselblad_500_CM.jpg/1024px-Hasselblad_500_CM.jpg',
        price: 4900,
        userId: 'qsomihvqios',
    },
    {
        _id: 'oeihfzeomoihi',
        title: 'My second thing',
        description: 'All of the info about my second thing',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Hasselblad_500_CM.jpg/1024px-Hasselblad_500_CM.jpg',
        price: 2900,
        userId: 'qsomihvqios',
    },
    ];
    res.status(200).json(stuff);
    //res.json({ message: 'Your request was successful!' }); 
});

module.exports = app;
//access outside this js file
//which we need to run our express app on a node server


