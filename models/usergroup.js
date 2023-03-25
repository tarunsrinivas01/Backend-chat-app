const Sequelize=require('sequelize')

const sequelize=require('../database/db')



const UserGroup= sequelize.define('usergroup',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
      },
    isadmin:{
      type:Sequelize.BOOLEAN,
      allowedNull:false
    }
});
module.exports=UserGroup;