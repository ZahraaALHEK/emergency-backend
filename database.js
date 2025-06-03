const mongoose = require("mongoose");
require("dotenv").config();
exports.MongoConnection = async () => {
    try {
        await  mongoose.connect(process.env.MongoDB_URI);
        console.log("Mongo DB connected");
    } catch (error) {
        console.error(error);
        process.exit(1);
        
    }
  
}