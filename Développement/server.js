const express=require("express")

const ConnectDB=require("./helpers/ConnectDB")

const app=express()

const cors=require('cors')

//Port
PORT=process.env.PORT || 4100
//connect app to db
ConnectDB();
//middleware
//cors
app.use(cors())
app.use(express.json())

app.use("/uploads",express.static(__dirname + "/uploads"))
//define routes
app.use("/register",require("./routes/Register"));
app.use("/login",require("./routes/login"));
app.use("/post",require("./routes/post"));
app.use("/img",require("./routes/upload"));

app.listen(PORT,()=>{
    console.log(`server is running at port ${PORT}`)
})

