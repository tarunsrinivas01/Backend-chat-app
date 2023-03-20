const Sequelize=require('sequelize')

const sequelize=new Sequelize("chat-users", "root","Tarun@123",{dialect:'mysql',host:"localhost"})

module.exports=sequelize