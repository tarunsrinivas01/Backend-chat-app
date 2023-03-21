const Sequelize=require('sequelize')

const sequelize=require('../database/db')

const chat=sequelize.define('chat',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowedNull:false,
        primaryKey:true
    },
    username:{
        type:Sequelize.STRING,
        allowedNull:false
    },
    message:{
        type:Sequelize.STRING,
        allowedNull:false
    }
})
module.exports=chat