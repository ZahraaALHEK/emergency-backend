const jwt = require("jsonwebtoken");
const User = require("../models/UserSchema");

exports.post = async (req,res) => {
    try {
        const ExcisteUser = await User.findById(req.body['id']);
        if (ExcisteUser) {
            return res.status(409).json({message : "This user already exists"});
        }
        const NewUser = await User.create({
            Name : req.body["Name"],
            password : req.body["password"],
            phoneNumber : req.body["phoneNumber"]
        });
        return res.status(201).json({message : "User add successfully",data : NewUser});
    } catch (error) {
        console.error(error);
        res.status(500).json({message : error});
    }
};

// sign token 
const signToken = (user) => {

    return jwt.sign(
        {
            id : user._id , name : user.name 
        },process.env.JWT_SECRET 
        ,{expiresIn : process.env.JWT_Expires || 1}
    );
} ;
// create and send token utility 
const createsendToken = (user , statusCode , message , res ) => {
    const token = signToken(user);
    const sanitizedUser = {
        id : user._id ,
        name : user.name
    }
    res.status(statusCode).json({
        "status" : "success",
        "token" : token ,
        
        "data" : {user :  sanitizedUser ,
            "message" : message ,
        }
    });
};


exports.login = async (req , res) => {
    try {
        
       const {email, phoneNumber , password} = req.body ;
               const user = await User.findOne({email : email });
               if(!user || !(await user.checkPasswprd(password , user.password))|| !phoneNumber){
                   return res.status(401).json({
                       "success": false,
                       "message" : " Invalide credentials",
                       "data" : null 
                   });
               }
        // every thing ok 
      //TODO:  creatsendToken();
      createsendToken(user,200,"you are logged successfully" , res)
    } catch (error) {
        console.error(error);
         res.status(500).json({message : e.message});
    }
};
exports.protect = async (req , res , next) => {
    try {
        let token ;
        const authHeader = req.headers.authorization ;
        if (authHeader?.startWith("Bearer ")) {
            authHeader.split(" ")[1];
        }
        if (!token) {
            res.status(401).json({"message" : "not authonticated"});
        }
        // to verifie the token 
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        // chek if user exist 
        const currentUser = await User.findById(decoded.id);
        if(!currentUser){
             res.status(401).json({"message" : "user not found"});
        }
        // verify password not changed after token is send
        if (currentUser.changedAt) {
            const changedTimestamp = parseInt(
                currentUser.changedPasswordAt.getTime() / 1000, 
                10
            );

            if (decoded.iat < changedTimestamp) {
                return res.status(401).json({
                    success: false,
                    message: "Password was changed recently - Please log in again"
                });
            }
        }
        // if token is valide
        req.user = currentUser;
        next();

    } catch (error) {
        if (error.name = "jsonWebTokenError") {
            res.status(401).json({"message" : "invalaid token"});
        }
        if (error.name = "tokenExpiredError") {
            res.status(401).json({"message" : "token expired , you should login again"});
        }
        console.error(error);
        res.status(500).json({"message" : "faile"});
    }
};
