const sequelize=require('../database/db')
const express=require('express')
const controllers=require('../controllers/chatcontorllers')
const authorization=require('../middleware/authorization')

const Router=express.Router()
Router.post('/sendmessage',authorization.auth,controllers.postchat)

module.exports=Router