const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
 const validator = require('validator');
const UserSchema = new Schema({
    fullName : {
        type : String ,
        required : [true," name is requirde"],
        trim : true,
        maxLength : 50,
        minLength : 3
    },

    // email :{
    //     type : String ,
    //     required :[true , "email is required"],
    //     trim : true ,
    //     unique : true ,
    //     maxLength : 150 ,
    //     lowercase : true ,

    // },
    phoneNumber :{
        type : String,
        required :[true , "email is required"],
        trim : true ,
        unique : true ,
        maxLength : 150 ,
    },
    password :{
        type : String,
        required :[true , "password is required"],
        trim : true ,
        unique : true ,
    },
    passwordConfirm :{
        type : String,
       // required :[true , "password is required"],
        trim : true ,
        unique : true ,
    },
    changedPasswordAt  : Date


}
,
{
    timestamps : true,
});
UserSchema.pre("save",async function (next) {
    try {
       if(!this.isModified("password")){// if the password field is not modified
        return next();
       } 
       this.password =await bcrypt.hash(this.password,12);
       this.passwordConfirm = undefined;
    } catch (error) {
        console.log(error);
        
    }
});
UserSchema.methods.checkPassword = async (
    candidatePassword  // enter by user
    , userPassword// save in db
     )=> {
    return await bcrypt.compare(candidatePassword,userPassword);
};

module.exports = mongoose.model("User",UserSchema);