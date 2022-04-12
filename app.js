// importin the express module.
const express = require('express');
// importing the mongoose module which orm.
const mongoose  = require('mongoose');
// cors used the set standered rule for sending data between react and node.js
const cors = require('cors');

const app = express();

// connecting to the mongodb database through the mongoose.
mongoose.connect('mongodb://127.0.0.1:27017/storePassword').then(
    // here we are confiriming the connection of mongodb.
    (db) => {
        console.log('Connected to Mongodb..!');
    }
).catch((err) => {
    // if any error occurs this will log.
    console.log(err);
});


// Now we create schema -> structure of table.
const FruitSchema = new mongoose.Schema({
    username: { type: 'String', require: true },
    email: { type: 'String', require: true },
    password: { type: 'String', require: true },
    actionPassword: { type: 'String', require: true },
    // lastLoginDate: { type: 'Date', require: true },
    appsData: [
        {
            appname: { type: 'String', require: true },
            email: { type: 'String', require: true },
            password: { type: 'String', require: true },
        }
    ]
});

// here we the creating Modal -> table.
const Fruit = mongoose.model("fruit", FruitSchema);

// here i am creating the data for document.
const fruit1 = new Fruit(
    {
        username: 'dineshnikhil',
        email: 'dineshnikhil@gmail.com',
        password: 'dinesh059',
        actionPassword: '4882',
        // lastLoginDate: { type: 'Date', require: true },
        appsData: [
            {
                appname: 'google',
                email: 'dineshnikhil@gmail.com',
                password: 'dineshnikhil059',
            }
        ]  
    }
);


// these are middle wears.
app.use(cors());
app.use(express.json());

// now save the data fruit1.
// fruit1.save();

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
    Fruit.find((err, data) => {
        if (!err) {
            res.send(data)
        } else {
            res.send(err)
        }
    })
})

// getting the new user data from post form in createAccount page.
app.post('/createAccount', (req, res) => {
    // creating the new user
    const user1 = new Fruit(
        {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            actionPassword: req.body.actionPassword,
            // lastLoginDate: { type: 'Date', require: true },
            appsData: []
        }
    );
    // now saving to the database;
    user1.save((err, doc) => {
        if (!err) {
            console.log(doc);
            res.send(doc);
        } else {
            console.log(err);
        }
    });
})

//Login router

app.post('/login', (req, res) => {
    // finding the user through the username.
    Fruit.findOne({ username: req.body.username }, (err, doc) => {
        if (!err) {
            // again checking the users password
            if (req.body.password === doc.password) {
                res.json({ status: 'ok '});
            } else {
                res.json({ error: 'worng password!' });
            }
        } else {
            console.log(err);
            res.send(err)
        }
    })
})

// listening to the port.
app.listen(8000, () => {
    console.log('listening to port no:8000');
});