const sequelize=require('../database/db')
const express=require('express')
const controllers=require('../controllers/groupcontrollers')
const authorization=require('../middleware/authorization')

const Router=express.Router()

Router.post("/creategroup",authorization.auth,controllers.creategroup)
Router.get("/getall",authorization.auth,controllers.getAllGroups)
Router.post('/adduser/:groupId/:userId', authorization.auth,controllers.adduser);
  


module.exports=Router
