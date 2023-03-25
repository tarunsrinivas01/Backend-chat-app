const sequelize=require('../database/db')
const express=require('express')
const controllers=require('../controllers/groupcontrollers')
const authorization=require('../middleware/authorization')

const Router=express.Router()

Router.post("/creategroup",authorization.auth,controllers.creategroup)
Router.get("/getall",authorization.auth,controllers.getAllGroups)
Router.get("/getusers/:groupid",authorization.auth,controllers.getusers)
Router.post('/adduser/:groupId/:userId', authorization.auth,controllers.adduser);
Router.delete('/deletegroup/:groupid',authorization.auth,controllers.deletegroup)
Router.post('/makeadmin/:usergroupid',controllers.makeadmin)
  


module.exports=Router
