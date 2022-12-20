const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Thing = require ('./models/thing');

const app = express();
//running express to create our app

mongoose.connect('mongodb+srv://filipa:RKpdUJfS7ZLnmj5S@cluster0.xyab63i.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
        console.log('Successfully connected to MongoDB Atlas!');
    })
    .catch((error) => {
        console.log('Unable to connect to MongoDB Atlas!');
        console.error('error');
    });

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

//save route; our POST route:
app.post('/api/stuff', (req, res, next) => {
    console.log(req.body);
    //we will receive the json response by the front-end by using the req.body
    
    const thing = new Thing({
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        userId: req.body.userId
    });
    thing.save().then( //save it to the database
        () => {
            res.status(201).json({ //status 201 = sucessfully
                message: 'Post saved succefully!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({ //status 400 = error
                error: error
            });
        }
    )
});

//app.get only responds to get responses
app.get('/api/stuff/:id', (req, res, next) => {
//:id means that this is a dynamic parameter 
    Thing.findOne({
        _id: req.params.id
    }).then(
        (thing) => {
            res.status(200).json(thing);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
});

//update-modify it is a put request
app.put('/api/stuff/:id', (req, res, next) => {
    const thing = new Thing({
    _id: req.params.id,
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    userId: req.body.userId
    });
    Thing.updateOne({_id: req.params.id}, thing).then(
    () => {
        res.status(201).json({
        message: 'Thing updated successfully!'
        });
    }
    ).catch(
    (error) => {
        res.status(400).json({
        error: error
        });
    }
    );
});

//route to delete the thing
app.delete('/api/stuff/:id', (req, res, next) => {
    Thing.deleteOne({_id: req.params.id}).then(
    () => {
        res.status(200).json({
        message: 'Deleted!'
        });
    }
    ).catch(
    (error) => {
        res.status(400).json({
        error: error
        });
    }
    );
});

//This is a piece of middleware; added "next" argument so you can send one response to the next middle ware by finishing with next();

 //we are going ot use the "thing" model we created
//and then use the "find" method
app.use('/api/stuff', (req, res, next) => {
    Thing.find().then(
        (things) => {
        res.status(200).json(things);
        }
    ).catch(
        (error) => {
        res.status(400).json({
            error: error
        });
        }
    );
    });
//enfoce a data schema on our MongoDB -> Models

module.exports = app;
//access outside this js file
//which we need to run our express app on a node server


