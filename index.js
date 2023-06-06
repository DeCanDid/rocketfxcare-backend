const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()
const app = express()
const userRouter = require("./routes/userRoute")

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors({origin:"*"}))

app.use("/users", userRouter )
const port = process.env.PORT || 8000
mongoose.set("strictQuery",false);
const connect = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true
           
        })
        console.log("mongodb database connected");
       
    } catch (error) {
        console.log("mongodb connection failed");
    } 
}

app.listen( port, ()=>{
    connect()
    console.log("Server started")
})