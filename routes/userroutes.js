const sequelize=require('../database/db')
const express=require('express')
const controllers=require('../controllers/usercontrollers')
// const expcontrollers=require('../controllers/expense-controllers')
const auth=require('../middleware/authentication')
const Router=express.Router()

Router.post('/signup',controllers.signup)
Router.post('/login',controllers.login)
Router.get('/getUsers',auth.auth,controllers.getUsers)
// Router.post('/')

module.exports=Router