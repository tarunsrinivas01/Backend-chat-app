require('dotenv').config()
const express = require("express");
const app = express();
const sequelize = require("./database/db");
const mongoose = require('mongoose')

// routes
const userroutes = require("./routes/userroutes");
const chatroutes=require("./routes/chatroutes")


// models
const user=require('./models/user')
const chats=require('./models/chat')
const Group=require('./models/group')
const usergroup=require('./models/usergroup')

const fileupload=require('express-fileupload');

app.use(fileupload());

const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors({
  origin:"*"
}));
console.log("entered");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use("/chat",chatroutes)
app.use("/user", userroutes);
// app.use("/group",grouproutes)


// relations
// user.hasMany(chats)
// chats.belongsTo(user)

// user.belongsToMany(Group,{through:usergroup})
// Group.belongsToMany(user,{through:usergroup})

// Group.hasMany(chats)
// chats.belongsTo(Group)

mongoose.connect("mongodb+srv://tarun:tarun@cluster0.uef6x77.mongodb.net/userDb?retryWrites=true&w=majority").catch((err)=>{
  if(err){
    console.log(err)
  }
  else{
    console.log('success')
  }
})

app.listen(3000)
