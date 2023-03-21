const express = require("express");
const bodyParser = require("body-parser");
const user = require("../models/user");
const chat=require("../models/chat")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

function isstringvalidate(string) {
    if (string == undefined || string.length === 0) return true;
    return false;
  }
  function generatetoken(id) {
    return jwt.sign({ userid: id, ispremiumuser: ispremiumuser }, "Tarun@123");
  }

exports.postchat=async(req,res,next)=>{
    try {
        console.log(">>>>>>>>>>>>")
        const message=req.body.chat
    const username=req.user.name
    const user=req.user
    console.log(user)

    if(isstringvalidate(message))
    {
        return res.status(401).json({message:"chat is missing"})
    }
    const data=await chat.create({message:message,username:username,userId:req.user.id})
    console.log(data)
    res.status(201).json({message:"sent",msgs:data})
    } catch (error) {
        res.status(500).json({message:error})
    }
  }