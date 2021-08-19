const mongoose=require("mongoose")

require("dotenv").config();

const ConnectDB=()=>{
    mongoose.connect(process.env.MONGO_URI,
      {useNewUrlParser: true,
       useUnifiedTopology: true})
            .then(()=>{
                console.log(`connection to database established`)
            }).catch(err=>{
                console.log(`db error ${err.message}`);
                process.exit(-1)
            })
}

module.exports=ConnectDB;