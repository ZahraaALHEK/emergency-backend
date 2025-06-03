const express = require("express");
const app = express();
const DB = require("./database").MongoConnection;
DB();
app.use(express.json());
app.listen("3000",()=>{
    console.log("server is running in port 3000");
    
});