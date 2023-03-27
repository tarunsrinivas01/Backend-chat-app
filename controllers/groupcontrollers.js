const express = require("express");
const bodyParser = require("body-parser");
const user = require("../models/user");
const chat = require("../models/chat");
const Group=require("../models/group")
const usergroup=require("../models/usergroup")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {Op}=require("sequelize");
const { group } = require("console");
const app = express();

function isstringvalidate(string) {
    if (string == undefined || string.length === 0) return true;
    return false;
  }


exports.creategroup=async(req,res,next)=>{
 try {
    const groupname=req.body.groupname

    if(isstringvalidate(groupname))
    {
        return res.status(400).json({message:"something is missing"})
    }

    const data=await Group.create({groupname:groupname})
    const usergrp=await usergroup.create({isadmin:true,groupId:data.id,userId:req.user.id})
    return res.status(201).json({message:data,usergrp:usergrp})

 } catch (error) {
    console.log(error)
    return res.status(500).json({err:error})    
 }


}
exports.getusers = async (req, res, next) => {
  const groupId =req.params.groupid;
  console.log(">>>>>",groupId)
  try {
    const group = await Group.findByPk(groupId);
    if (!group) {
      return res.status(404).json({ message: 'Group not found', success: false });
    }
    const users=await group.getUsers({
      attributes:["name","id"]
    })
    console.log(">>>>>>>>",users)
    res.status(200).json({ message: users, success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Something went wrong', success: false, error: err });
  }
};
exports.makeadmin=async(req,res,next)=>{
  const usergroupid=req.params.usergroupid
  const groupId=req.params.groupid
 try {
  const isAdmin=await usergroup.findOne({where:{groupId:groupId,isadmin:true,userId:req.user.id}})
  if(!isAdmin)
  {
    return res.status(400).json({message:"you are not allowed",success:false})
  }
  const usrgrp=await usergroup.findByPk(usergroupid)

  if(usrgrp.isadmin)
  {
    return res.status(400).json({message:"this user is already admin",success:false})
  }
  await usrgrp.update({isadmin:true})
  res.status(201).json({message:"this user is now admin",success:true})
 } catch (error) {
  console.log(error)
  res.status(500).json({message:"something went wrong",success:false})
 }
}


exports.getAllGroups = async (req, res, next) => {
    try {
      const user=req.user
      const groupList=await user.getGroups()
      console.log(groupList)
  
      res.status(200).json({ message: groupList, success: true });
  
    } catch (err) {
      console.log(">>>>>>>>>", err);
      res.status(500).json({ message: "Something went Wrong", success: false, error: err });
    }
  }
  exports.removeadmin=async(req,res,next)=>{
    const usergroupid=req.params.usergroupid
    const groupId=req.params.groupid
    console.log(">>>>>usergrpid",usergroupid)
    console.log(">>>>>grpid",groupId)
    try {
      const isAdmin=await usergroup.findOne({where:{groupId:groupId,isadmin:true,userId:req.user.id}})
      if(isAdmin.id==usergroupid)
      {
        return res.status(400).json({ message: 'you can perform operations on youself', success: false });
      }
      if(!isAdmin)
      {
        return res.status(400).json({ message: 'you are not allowed', success: false });
      }
      const usrgrp=await usergroup.findByPk(usergroupid)
      if(!usrgrp.isadmin)
      {
        return res.status(400).json({message:"this user not a admin",success:false})
      }
      usrgrp.update({isadmin:false})
      res.status(201).json({message:"removed admin access for user ",success:true})
    } catch (error) {
      console.log(error)
      res.status(500).json({message:"something went wrong",success:false})
    }

  }
  exports.adduser=async (req, res) => {
    const groupId = req.params.groupId;
    const userId = req.params.userId;
    // console.log(">>>>>>>>",groupId)
    
    try {
      const group = await Group.findByPk(groupId);
      const User = await user.findByPk(userId);

      const isadmin=await usergroup.findOne({where:{groupId:groupId,isadmin:true,userId:req.user.id}})
        // console.log(group)
        // console.log(User)
    if(!isadmin)
    {
        return res.status(400).json({ message: 'you are not allowed to add user', success: false });
    }
      else if (!group || !User) {
        return res.status(404).json({ message: 'Group or user not found', success: false });
      }
  
      await group.addUser(User);
  
      return res.status(200).json({ message: 'User added to group successfully', success: true });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Something went wrong', success: false, error: err });
    }
  }
  exports.deletegroup=async(req,res,next)=>{
    const groupid=+req.params.groupid
    try {
      const isadmin=await usergroup.findOne({where:{isadmin:true,groupId:groupid,userId:req.user.id}})
    if(!isadmin)
    {
      return res.status(400).json({message:"you are not allowed to delete",success:false})
    }
    await Group.destroy({where:{id:groupid}})
    await chat.destroy({where:{groupId:groupid}}) 
    res.status(201).json({message:"group deleted",success:true})
    } catch (error) {
      console.log(error)
      res.status(401).json({message:"something went wrong",success:false})
    }
  }
  