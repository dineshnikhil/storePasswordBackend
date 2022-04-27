const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const appsController = require('../controllers/appsController');

router.get('/', userController.get_all_users);
router.post('/createAccount', userController.create_user);
router.post('/login', userController.login_the_user);

router.get("/apps/:userid", appsController.get_all_apps_by_user_id);
router.post('/addapp', appsController.add_app_data);
router.get('/app-delete/:userid/:appid', appsController.delete_app);
router.get('/app-edit/:userid/:appid', appsController.get_app);

module.exports = router;