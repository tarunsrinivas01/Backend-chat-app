const express = require("express");
const bodyParser = require("body-parser");
const user = require("../models/user");
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

function isstringvalidate(string)
{
    if(string==undefined || string.length===0)return true;
    return false;
}
function generatetoken(id,ispremiumuser)
{
  return jwt.sign({userid:id,ispremiumuser:ispremiumuser},'Tarun@123')
}


exports.signup = async (req, res, next) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    console.log(name);
    if(isstringvalidate(name)|| isstringvalidate(email)|| isstringvalidate(password))
    {
        return res.status(401).json({err:'something is missing'})
    }
    const saltrounds=10;
    bcrypt.hash(password,saltrounds,async(err,hash)=>{
      await user.create({name,email,password:hash})
     res.status(201).json({message:'successfully new user created',success:'true'})
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({err:err});
  }
};