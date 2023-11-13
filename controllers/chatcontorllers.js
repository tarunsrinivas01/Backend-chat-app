const express = require("express");
const bodyParser = require("body-parser");
const chat = require("../models/chat");
const jwt = require("jsonwebtoken");
// const AWS=require('aws-sdk');
const UserGroup = require("../models/usergroup");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

function isstringvalidate(string) {
  if(string == undefined || string.length === 0) return true;
  return false;
}
function generatetoken(id) {
  return jwt.sign({ userid: id, ispremiumuser: ispremiumuser }, "Tarun@123");
}

exports.postchat = async (req, res, next) => {
  try {
    console.log(">>>>>>>>>>>>");
    const message = req.body.chat;
    const username = req.user.name;
    const user = req.user;
    const groupid=req.params.groupid
    console.log(user);

    if (isstringvalidate(message)) {
      return res.status(401).json({ message: "chat is missing" });
    }
    const data = await chat.create({
      message: message,
      username: username,
      userId: req.user.id,
      groupId:groupid
    });
    console.log(data);
    res.status(201).json({ message: data});
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
exports.getmessages = async (req, res, next) => {
  const lastmsgid=+req.params.lastmsgid||0;
  const groupid=req.params.groupid
  console.log(lastmsgid);
  const data = await chat.findAll({
    groupId:groupid,
    offset:lastmsgid
  });
  if (data.length > 0) {
    return res.status(201).json({ message: data });
  }
};
// function uploadToS3(file){

//   const BUCKET_NAME= 'expensetracker1';
//   const IAM_USER_KEY= 'AKIAYQF6SJQJ26LSJ6UW';
//   const  IAM_USER_SECRET= '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';

//   let s3bucket=new AWS.S3({
//       accessKeyId: IAM_USER_KEY,
//       secretAccessKey:IAM_USER_SECRET,
//   })
//    var params={
//           Bucket:BUCKET_NAME,
//           Key:file.name,
//           Body:file.data,
//           ContentType:file.mimetype,
//           ACL:'public-read'
//       }
//      return new Promise((resolve, reject) => {
//           s3bucket.upload(params,(err,s3response)=>{
//               if(err){
//                   console.log("SOMETHING WENT WRONG",err)
//                   reject(err);
//               } 
//               else{
//                   resolve(s3response.Location)
//                   }
//               })
//      })      


// }
// exports.uploadFile=async(req,res,next)=>{
//   try{
//     const groupId=req.params.groupId;


//     const file=req.files.file
//     console.log(">>>>>>>",file);
//     const fileURL= await uploadToS3(file);
//     console.log(fileURL);
//     const user = await req.user.createChat({username:req.user.name,message:fileURL,groupId:groupId});
//     res.status(200).json({message:user,success:true})
      
      
//   }catch(err){
//       console.log(">>>>>>>>>>>>>>>",err);
//       res.status(500).json({message:"Something went Wrong",error:err,success:false})
//   }
// }

exports.removeuser = async (req, res, next) => {
  const usergroupid = req.params.usergroupid;
  const groupId=req.params.groupid
  const userid=req.params.userid

  try {
    if(userid==req.user.id)
    {
      return res.status(400).json({message:"you cannot delete yourself",success:false})
    }
    const isAdmin=await UserGroup.findOne({where:{groupId:groupId,isadmin:true,userId:req.user.id}})
  if(!isAdmin)
  {
    return res.status(400).json({message:"you are not allowed",success:false})
  }
    const deletedRows = await UserGroup.destroy({ where: { id: usergroupid } });
    if (deletedRows === 0) {
      return res.status(404).json({ message: "User group not found", success: false });
    }
    res.status(201).json({ message: "User removed", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong", success: false });
  }
};
