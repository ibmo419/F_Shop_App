const express=require("express");
const router=express.Router();
const authMiddleware=require('../helpers/authMiddleware');
const Post=require('../model/Post');

//Add new Post
router.post("/",authMiddleware,(req,res)=>{
    let newPost=new Post({...req.body,owner:req.userId})
        newPost.save()
               .then(post=>res.status(201).send(post))
               .catch((err)=>{
                   console.error(err.message);
                   res.status(500).send({msg:"Server Error"});
               })
})
// Get all posts 
router.get("/",authMiddleware,(req,res)=>{
    Post.find()
        .then(posts=>res.send(posts))
        .catch((err)=>{
            console.error(err.message);
            res.status(500).send({msg:"Server Error"});
        })
})
// Get my posts
router.get("/myPosts",authMiddleware,(req,res)=>{
    Post.find({owner:req.userId})
    .then(posts=>res.send(posts))
    .catch((err)=>{
        console.error(err.message);
        res.status(500).send({msg:"Server Error"});
    })
})

module.exports=router;