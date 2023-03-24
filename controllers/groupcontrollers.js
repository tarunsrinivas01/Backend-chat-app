const express = require("express");
const bodyParser = require("body-parser");
const user = require("../models/user");
const chat = require("../models/chat");
const Group=require("../models/group")
const usergroup=require("../models/usergroup")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {Op}=require("sequelize")
const app = express();

function isstringvalidate(string) {
    if (string == undefined || string.length === 0) return true;
    return false;
  }


exports.creategroup=async(req,res,next)=>{
 try {
    const groupname=req.body.groupname
    const username=req.user.username

    if(isstringvalidate(groupname))
    {
        return res.status(400).json({message:"something is missing"})
    }

    const data=await Group.create({groupname:groupname})
    const usergrp=await usergroup.create({groupId:data.id,userId:req.user.id})
    return res.status(201).json({message:data,usergrp:usergrp})

 } catch (error) {
    console.log(error)
    return res.status(500).json({err:error})    
 }


}
exports.getAllGroups = async (req, res, next) => {
    try {
      const groupList = await Group.findAll({
        include: [
            {
              model: user,
              where: { id: req.user.id },

            },
          ],
      });
      console.log(groupList)
  
      res.status(200).json({ message: groupList, success: true });
  
    } catch (err) {
      console.log(">>>>>>>>>", err);
      res.status(500).json({ message: "Something went Wrong", success: false, error: err });
    }
  }
  exports.adduser=async (req, res) => {
    const groupId = req.params.groupId;
    const userId = req.params.userId;
    // console.log(">>>>>>>>",groupId)
    
    try {
      const group = await Group.findByPk(groupId);
      const User = await user.findByPk(userId);
        // console.log(group)
        // console.log(User)
      if (!group || !User) {
        return res.status(404).json({ message: 'Group or user not found', success: false });
      }
  
      await group.addUser(User);
  
      return res.status(200).json({ message: 'User added to group successfully', success: true });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Something went wrong', success: false, error: err });
    }
  }
  