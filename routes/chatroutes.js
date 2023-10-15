const sequelize=require('../database/db')
const express=require('express')
const controllers=require('../controllers/chatcontorllers')
const authorization=require('../middleware/authorization')

const Router=express.Router()
Router.post('/sendmessage/:groupid',authorization.auth,controllers.postchat)
Router.get('/getmessages/:lastmsgid/:groupid',controllers.getmessages)
// Router.post('/sendfile/:groupId',authorization.auth,controllers.uploadFile)
Router.delete('/removeuser/:usergroupid/:groupid/:userid',authorization.auth,controllers.removeuser)

module.exports=Router 