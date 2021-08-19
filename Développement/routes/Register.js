const express=require("express")
const router=express.Router()
const { body, validationResult } = require('express-validator');
const User =require("../model/User");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
require("dotenv").config();

router.post("/",
[
    body('firstName',"FirstName should contain only alphabetics").isAlpha(),
    body("lastName","FirstName should contain only alphabetics").isAlpha(),
    body("Phone","Phone should only contain numbers").isNumeric(),
    body("Email","You should enter a valid Email").isEmail(),
    body("Password","Minimum length allowed is 5 characters").isLength({min:5})
]
,(req,res)=>
{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
}
User.find({Email:req.body.Email})
    .then(users=>{
        if(users.length){
            return res.status(400).send({errors:[{msg:"user already exists!"}]})
        }
        let newUser= new User(req.body)
        bcrypt.genSalt(10,(err,salt)=>{
            if(err){
                throw err;
            }
            bcrypt.hash(req.body.Password,salt,(error,hashedpwd)=>{
                if(error){
                    throw error;
                }
                newUser.Password=hashedpwd;
                newUser.save()
                let payload={
                    userId:newUser._id
                }
                jwt.sign(payload,process.env.SECRET_KEY,(err,token)=>{
                    if(err){
                        throw err ;
                    }
                    res.send({token})
                })
            });
        });
    });
});


module.exports=router;