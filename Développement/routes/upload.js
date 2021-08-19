const express=require('express')
const multer = require('multer')
const router =express.Router()
const Image=require('../model/Image')


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null,Date.now() + "-"+ file.originalname)
    }
  })
   
  var upload = multer({ storage: storage })


router.post('/',upload.single('avatar'),(req,res)=>{
   console.log(req.file)
   let path=req.protocol+"://"+req.hostname+":"+4100+"/uploads/"+req.file.filename
   let newImage = new Image({imageName:path});
       newImage.save()
               .then(img=>res.status(201).send(img))
               .catch((err)=>{
                 console.error(err.message)
                 res.status(500).send("server error")
               })
});
module.exports=router;