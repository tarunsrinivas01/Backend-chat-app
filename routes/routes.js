var logger = require('logger')
var express = require('express')
var app = express()

var userController = require("../controllers/usercontrollers");

const Router = express.Router();

Router.post('/user/signup',userController.signup)
Router.post('/user/login',userController.login)
// Router.get('/getUsers',auth.auth,controllers.getUsers)

module.exports = Router;
