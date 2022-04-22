const mongoose = require('mongoose');

// creating the mongoose schema
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

// exporting our model schema user.
module.exports = mongoose.model("fruit", FruitSchema);