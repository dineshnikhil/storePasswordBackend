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


// ===================== GETING ALL USERS ===================
// 1.fetch all the users from the database through FIND method
// 2.if any error occur throw that error

// respond with array of users when a GET request is made to the home route.
app.get('/', (req, res) => {
    Fruit.find((err, data) => {
        if (!err) {
            res.send(data)
        } else {
            res.send(err)
        }
    })
})

// ================= CREATING THE NEW USER ===================
// 1.fetch the user data from the front end.
// 2.check if the user is already there in our database through findOne method.
// 3.if we found the user then -> send user already there.
// 4.if we not found the user then -> we register the user into the database.
// 5.if any error happens then throw that error.

// getting the new user data from post form in createAccount page.
app.post('/createAccount', (req, res) => {
    // now let check the user is already there or not.
    Fruit.findOne({ username: req.body.username }, (err, data) => {
        // if user is there in our data base
        if (data) {
            // sending that we have user
            res.json({ status: 'user is already regesterd'})
        } else {
            // lets create user and save to the database.
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
                    res.json({ status: "user created successfully." })
                } else {
                    console.log(err);
                }
            });
        }

        if(err) {
            res.json({ status: err});
        }
    }); 
    
})


// ==================== LOGING THE USER =================== //
// 1.find the user from the database through the FINDONE method.
// 2.if the user was found in the database
//  -> check for the password if password matchs then login user.
//  -> if password is worng then send the error msg.
// 3.if we not found the user then send error msg.
// 4.if any other error occur the send that error msg.
//Login router
app.post('/login', (req, res) => {
    // finding the user through the username.
    Fruit.findOne({ username: req.body.username }, (err, doc) => {
        //if the user present in our database.
        if (doc) {
            // checking for the password
            if(req.body.password === doc.password) {
                res.json({ status: "user anthenticated!", data: doc })
            } else {
                res.json({ status: "entered password is worng!"})
            }
        } else {
            res.json({ status: "user not found"})
        }
        // if any error occures
        if (err) {
            res.json({ status: err})
        }
    })
})


// ==================== SENDING THE APPS DATA TO CLINT ====================
// 1.check user is authenticated or not(in the client side.)
// 2.through the user Id get all apps user have
app.get("/apps/:userid", (req, res) => {
    Fruit.findOne({ _id: req.params.userid }, (err, data) => {
        if(data) {
            console.log(data.appsData);
            res.json({ status: "ok", apps: data.appsData });
        } else {
            res.json({ status: "something went worng!"})
        }
        if(err) {
            res.json({ status: err })
        }
    })
})

// ===================== ADDING THE APP DATA TO THE APPS DATA ARRAY =================
// 1.get the access to appsData array with help of userId
// 2.check if the app is already exists for not.
// 3.if app dont exists then add the app to the start of the array(unshift)
// 4.if it exists then show that app is already exists.
app.post('/addapp', (req, res) => {
    console.log(req.body);
    res.json({ status: "we recived app data!"});
    // const appsArray = [];
    // Fruit.findOne({ _id: req.body.userId }, (err, data) => {
    //     if(data) {
    //         appsArray = data.appsData
    //     } else {
    //         res.json({ status: "something went worng!"})
    //     }

    //     if(err) {
    //         res.json( { status: err})
    //     }
    // })

    // res.json({ status: "ok", appsData: appsArray });
})



// listening to the port.
app.listen(8000, () => {
    console.log('listening to port no:8000');
});