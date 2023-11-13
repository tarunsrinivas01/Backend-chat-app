const Sequelize=require('sequelize')

const sequelize=require('../database/db')

const chat=sequelize.define('chat',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowedNull:false,
        primaryKey:true
    }
})
module.exports=chat