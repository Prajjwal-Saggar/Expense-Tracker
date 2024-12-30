const express  =  require("express");
require("dotenv").config();
const cors  =  require("cors");
const routes  =require("./Routes/expenseApp")
const  app = express();
app.use(express.json());
app.use(cors());

//this is the rotue mounting here 
app.use("/expenseTracker/v1/" , routes)
//Establish MongoDB connection 
require("./Config/database").connect();

//this is the start of the server
app.listen(process.env.PORT || 4000 ,()=>{
    console.log(`server is running on port ${process.env.PORT}`);
})

