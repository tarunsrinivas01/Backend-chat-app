const express = require("express");
const bodyParser = require("body-parser");
const user = require("../models/user");
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
  return jwt.sign({ userid: id}, "Tarun@123");
}

exports.signup = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    console.log(req.body)
    console.log(email);
    if (
      isstringvalidate(email) ||
      isstringvalidate(password)
    ) {
      return res.status(401).json({ err: "something is missing" });
    }
    const saltrounds = 10;
    bcrypt.hash(password, saltrounds, async (err, hash) => {
      try {
        // await user.create({ name, email, password: hash });
        res
          .status(201)
          .json({ message: "successfully new user created", success: "true" });
      } catch (err) {
        if ((err.name = "SequelizeUniqueConstrainError")) {
          err = "User Already Exists! please login";
        } else {
          err = "OOPS! something went wrong";
        }
        console.log(err)
        res.status(500).json({
          message: err,
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err,
    });
  }
};
exports.login=async(req,res,next)=>{
  try {
    const {email,password}=req.body
    if(isstringvalidate(email)|| isstringvalidate(password))
    {
        return res.status(401).json({message:'something is missing'})
    }
    const users=await user.findAll({where:{email:email}})
    // console.log(users)
    if(users.length>0)
        {
            bcrypt.compare(password,users[0].password,(err,result)=>{
            if(err)
            {
              return res.status(400).json({message:'something went wrong'})
            }
            if(result===true)
            {
                console.log(generatetoken(users[0].id))
                return res.status(201).json({message:'user logged in','token':generatetoken(users[0].id)})
            }
            else{
               return res.status(401).json({message:'password incorrect'})
                 
            }
            })
            
        }
    else{
      return res.status(404).json({message:'user not found'})
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({message:error})
  }
}
