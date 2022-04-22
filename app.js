// importin the express module.
// also import some crazy stuff.
const express = require('express');
// importing the mongoose module which orm.
const mongoose  = require('mongoose');
// cors used the set standered rule for sending data between react and node.js
const cors = require('cors');
// Here we are importing the model
const Model = require('./models/usermodal');
const routes = require('./routers/routes');

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


// these are middle wears.
app.use(cors());
app.use(express.json());


app.use('/', routes); 



// listening to the port.
app.listen(8000, () => {
    console.log('listening to port no:8000');
});