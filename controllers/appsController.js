const Model = require('../models/usermodal');

// ==================== SENDING THE APPS DATA TO CLINT ====================
// 1.check user is authenticated or not(in the client side.)
// 2.through the user Id get all apps user have
const get_all_apps_by_user_id = (req, res) => {
    Model.findOne({ _id: req.params.userid }, (err, data) => {
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
}

// ===================== ADDING THE APP DATA TO THE APPS DATA ARRAY =================
// 1.get the access to appsData array with help of userId
// 2.check if the app is already exists for not.
// 3.if app dont exists then add the app to the start of the array(unshift)
// 4.if it exists then show that app is already exists.
const add_app_data = (req, res) => {
    var appData = {
        appname: req.body.appname,
        email: req.body.email,
        password: req.body.password
    }
    // This is through the findoneandupdate methode
    Model.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { appsData: appData}},
        (err, data) => {
            if (err) {
                console.log(err);
                res.json({ status: err }); 
            } else {
                console.log(data);
                res.json({ status: "ok" })
            }
        }
    )
}

module.exports = {
    get_all_apps_by_user_id,
    add_app_data
}