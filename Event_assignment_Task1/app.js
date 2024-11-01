const express = require("express");
const app = express();
require('dotenv').config({path:"./store.env"});
const {dbConnect} = require("./Db/Connection");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Router
const mainRouter = require("./Router/EventRouter");
app.use("/api/v3/app",mainRouter)



app.get("/",(req,res)=>{
   res.send(req.body)
    
})


dbConnect();

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log("listening");
})