const express=require("express");
const router=express.Router();
const authMiddleware=require("../helpers/authMiddleware");
const User=require("../model/User");
const bcrypt=require("bcryptjs");
const { body, validationResult } = require('express-validator');
const jwt=require("jsonwebtoken");
require("dotenv").config()

//LOAD CONNECTED USER
router.get("/",authMiddleware,(req,res)=>{
      User.findById(req.userId)
        //   .select("-Password")
          .then(user=>{
              if(!user){
                  return res.status(404).json({msg:"User Not Found"})
              }
              res.status(200).json(user)
          })
          .catch(err=>{
              console.error(err.message);
              res.status(500).send({msg:"Server Error"});
          })
})
//Login user
router.post("/",
[
    body("Email","You should enter a valid Email").isEmail(),
    body("Password","Please Write your password").notEmpty()
],(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    User.findOne({Email:req.body.Email})
        .then(user=>{
            if(!user){
                return res.status(400).json({errors:[{msg:"please register before"}]})
            }
            bcrypt.compare(req.body.Password,user.Password,(err,isMatch)=>{
                if(err){
                    throw err
                }else if(!isMatch){
                    return res.status(400).json({errors:[{msg:"wrong password"}]})
                }else{
                    let payload={
                        userId:user._id
                    }
                    jwt.sign(payload,process.env.SECRET_KEY,(err,token)=>{
                        if(err){
                            throw err ;
                        }
                        res.send({token})
                    })
                }
            })
        })
})
module.exports=router;
