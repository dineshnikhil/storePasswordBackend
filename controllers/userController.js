const Model = require('../models/usermodal');

const get_all_users = (req, res) => {
    Model.find((err, data) => {
        if (!err) {
            res.send(data)
        } else {
            res.send(err)
        }
    })
}

// ================= CREATING THE NEW USER ===================
// 1.fetch the user data from the front end.
// 2.check if the user is already there in our database through findOne method.
// 3.if we found the user then -> send user already there.
// 4.if we not found the user then -> we register the user into the database.
// 5.if any error happens then throw that error.

// getting the new user data from post form in createAccount page.
const create_user = (req, res) => {
    // now let check the user is already there or not.
    Model.findOne({ username: req.body.username }, (err, data) => {
        // if user is there in our data base
        if (data) {
            // sending that we have user
            res.json({ status: 'user is already regesterd'})
        } else {
            // lets create user and save to the database.
            // creating the new user
            const user1 = new Model(
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
}

// ==================== LOGING THE USER =================== //
// 1.find the user from the database through the FINDONE method.
// 2.if the user was found in the database
//  -> check for the password if password matchs then login user.
//  -> if password is worng then send the error msg.
// 3.if we not found the user then send error msg.
// 4.if any other error occur the send that error msg.

const login_the_user = (req, res) => {
    // finding the user through the username.
    Model.findOne({ username: req.body.username }, (err, doc) => {
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
}

module.exports = {
    get_all_users,
    create_user,
    login_the_user
}