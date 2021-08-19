const mongoose=require("mongoose")

const UserSchema=mongoose.Schema({
    firstName:String,
    lastName:String,
    Phone:Number,
    Email:String,
    Password:String,
    created_at:{
        type:Date,
        default:Date.now
    }
});
module.exports=mongoose.model('user',UserSchema);